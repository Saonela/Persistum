import React from "react";
import logEntriesReducer, {getLoggedActivityIds, toggleLogEntryActivity} from "./logEntriesSlice";
import {getCurrentShortTimestamp} from "../services/utilityService";

jest.mock('../services/utilityService', () => ({
    getCurrentShortTimestamp: jest.fn()
}));

describe('LogEntriesReducer', () => {

    const state = [{timestamp: '2020-01-01', activities: [1, 2]}, {timestamp: '2010-04-05', activities: [1]}];

    it('should dispatch toggle data log activity action', () => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-01-01');
        expect(logEntriesReducer(state, toggleLogEntryActivity(3))).toEqual([
            {timestamp: '2020-01-01', activities: [1, 2, 3]},
            {timestamp: '2010-04-05', activities: [1]}
        ]);
        expect(logEntriesReducer(state, toggleLogEntryActivity(1))).toEqual([
            {timestamp: '2020-01-01', activities: [2]},
            {timestamp: '2010-04-05', activities: [1]}
        ]);
    });

    it('should dispatch toggle data log activity and create new entry if dont exist', () => {
        getCurrentShortTimestamp.mockImplementation(() => '2020-08-09');
        expect(logEntriesReducer(state, toggleLogEntryActivity(3))).toEqual([
            {timestamp: '2020-01-01', activities: [1, 2]},
            {timestamp: '2010-04-05', activities: [1]},
            {timestamp: '2020-08-09', activities: [3]}
        ]);
    });

    it('get logged activity ids', () => {
        expect(getLoggedActivityIds.resultFunc(state, '2010-04-05')).toEqual([1]);
    });
});
