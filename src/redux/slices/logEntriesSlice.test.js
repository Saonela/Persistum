import React from "react";
import logEntriesReducer, {
    fetchLogEntries,
    getLogEntries, getLogEntryByTimestamp,
    getLoggedActivityIds, resetTimestamp, setTimestamp,
    toggleLogEntryActivity,
    updateLogEntry
} from "./logEntriesSlice";
import {getCurrentShortTimestamp} from "../../services/utilityService";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";
import {logout} from "./userSlice";

jest.mock('../../services/utilityService', () => ({
    getCurrentShortTimestamp: jest.fn()
}));

describe('LogEntriesReducer', () => {

    const state = {
        timestamp: '2020-09-21',
        data: [{timestamp: '2020-01-01', activities: [1, 2]}, {timestamp: '2010-04-05', activities: [1]}]
    };

    it('should set current timestamp', () => {
        expect(logEntriesReducer(state, setTimestamp('2020-09-01'))).toEqual({
            timestamp: '2020-09-01',
            data: [{timestamp: '2020-01-01', activities: [1, 2]}, {timestamp: '2010-04-05', activities: [1]}]
        });
    });

    it('should reset current timestamp', () => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-01-01');
        expect(logEntriesReducer(state, resetTimestamp())).toEqual({
            timestamp: '2020-01-01',
            data: [{timestamp: '2020-01-01', activities: [1, 2]}, {timestamp: '2010-04-05', activities: [1]}]
        });
    });


    it('should dispatch toggle data log activity action', () => {
        const localState = Object.assign({}, state, {timestamp: '2020-01-01'});
        expect(logEntriesReducer(localState, toggleLogEntryActivity(3))).toEqual({
            timestamp: '2020-01-01',
            data: [
                {timestamp: '2020-01-01', activities: [1, 2, 3]},
                {timestamp: '2010-04-05', activities: [1]}
            ]
        });
        expect(logEntriesReducer(localState, toggleLogEntryActivity(1))).toEqual({
            timestamp: '2020-01-01',
            data: [
                {timestamp: '2020-01-01', activities: [2]},
                {timestamp: '2010-04-05', activities: [1]}
            ]
        });
    });

    it('should dispatch toggle data log activity and create new entry if dont exist', () => {
        const localState = Object.assign({}, state, {timestamp: '2020-08-09'})
        expect(logEntriesReducer(localState, toggleLogEntryActivity(3))).toEqual({
            timestamp: '2020-08-09',
            data: [
                {timestamp: '2020-01-01', activities: [1, 2]},
                {timestamp: '2010-04-05', activities: [1]},
                {timestamp: '2020-08-09', activities: [3]}
            ]
        });
    });

    it('should sort and set fetched log entries', () => {
        const logEntries = [
            {timestamp: '2010-04-05', activities: [1]},
            {timestamp: '2020-08-09', activities: [3]},
            {timestamp: '2020-01-01', activities: [1, 2]}
        ];
        let state = {
            data: []
        }

        expect(logEntriesReducer(state, fetchLogEntries.fulfilled(logEntries))).toEqual({
            data: [
                {timestamp: '2010-04-05', activities: [1]},
                {timestamp: '2020-01-01', activities: [1, 2]},
                {timestamp: '2020-08-09', activities: [3]}
            ],
            status: ASYNC_STATE_STATUS.SUCCEEDED
        });
    });

    it('should update log entry', () => {
        const logEntry = {id: '112', timestamp: '2020-01-01', activities: [1, 2]};

        let state = {
            data: []
        }
        expect(logEntriesReducer(state, updateLogEntry.fulfilled(logEntry))).toEqual({
            data: [{id: '112', timestamp: '2020-01-01', activities: [1, 2]}]
        });

        state = {
            data: [{timestamp: '2020-01-01', activities: [1,2]}]
        };
        expect(logEntriesReducer(state, updateLogEntry.fulfilled(logEntry))).toEqual({
            data: [{id: '112', timestamp: '2020-01-01', activities: [1, 2]}]
        });
    });

    it('should get log entries', () => {
        expect(getLogEntries({logEntries: state})).toEqual([{
            timestamp: '2020-01-01',
            activities: [1, 2]
        }, {timestamp: '2010-04-05', activities: [1]}]);
    });

    it('should get log entry by timestamp', () => {
        expect(getLogEntryByTimestamp({logEntries: state}, '2020-01-01')).toEqual({
            timestamp: '2020-01-01',
            activities: [1, 2]
        });
    });

    it('should get logged activity ids', () => {
        expect(getLoggedActivityIds.resultFunc(state.data, '2010-04-05')).toEqual([1]);
    });

    it('should clear data on logout', () => {
        const state = {
            status: ASYNC_STATE_STATUS.SUCCEEDED,
            error: {code: 404},
            data: [{}]
        };
        expect(logEntriesReducer(state, logout())).toEqual({
            status: ASYNC_STATE_STATUS.IDLE,
            error: null,
            data: []
        });
    });
});
