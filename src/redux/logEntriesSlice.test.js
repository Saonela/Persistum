import React from "react";
import logEntriesReducer, {
    getLogEntries, getLogEntryByTimestamp,
    getLoggedActivityIds,
    toggleLogEntryActivity,
    updateLogEntry
} from "./logEntriesSlice";
import {getCurrentShortTimestamp} from "../services/utilityService";
import {ASYNC_STATE_STATUS} from "./asyncStateStatus";

jest.mock('../services/utilityService', () => ({
    getCurrentShortTimestamp: jest.fn()
}));

describe('LogEntriesReducer', () => {

    const state = {data: [{timestamp: '2020-01-01', activities: [1, 2]}, {timestamp: '2010-04-05', activities: [1]}]};

    it('should dispatch toggle data log activity action', () => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-01-01');
        expect(logEntriesReducer(state, toggleLogEntryActivity(3))).toEqual({
            data: [
                {timestamp: '2020-01-01', activities: [1, 2, 3]},
                {timestamp: '2010-04-05', activities: [1]}
            ]
        });
        expect(logEntriesReducer(state, toggleLogEntryActivity(1))).toEqual({
            data: [
                {timestamp: '2020-01-01', activities: [2]},
                {timestamp: '2010-04-05', activities: [1]}
            ]
        });
    });

    it('should dispatch toggle data log activity and create new entry if dont exist', () => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-08-09');
        expect(logEntriesReducer(state, toggleLogEntryActivity(3))).toEqual({
            data: [
                {timestamp: '2020-01-01', activities: [1, 2]},
                {timestamp: '2010-04-05', activities: [1]},
                {timestamp: '2020-08-09', activities: [3]}
            ]
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
})
;
