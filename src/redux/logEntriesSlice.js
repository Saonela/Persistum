import {createSelector, createSlice} from "@reduxjs/toolkit";
import UtilityService from "../services/utilityService";
import LogEntriesService from "../services/logEntriesService";
import {getFilteredActivities} from "./activitiesSlice";

const logEntriesSlice = createSlice({
    name: 'logEntries',
    initialState: [
        {timestamp: '2010-11-02', activities: [123456]},
        {timestamp: '2020-04-15', activities: [999]},
        {timestamp: '2020-05-18', activities: [123456]},
        {timestamp: '2020-05-20', activities: [123456, 999]},
        {timestamp: '2020-05-21', activities: [123456, 999]}
    ],
    reducers: {
        toggleLogEntryActivity: {
            reducer(state, action) {
                const logEntry = state.find(entry => entry.timestamp === action.payload.timestamp);
                if (logEntry) {
                    if (logEntry.activities.includes(action.payload.activityId)) {
                        logEntry.activities = logEntry.activities.filter(id => id !== action.payload.activityId);
                    } else {
                        logEntry.activities.push(action.payload.activityId);
                    }
                } else {
                    state.push({timestamp: action.payload.timestamp, activities: [action.payload.activityId]});
                }
            },
            prepare(activityId) {
                return {
                    payload: {
                        timestamp: UtilityService.getCurrentShortTimestamp(),
                        activityId
                    }
                }
            }
        }
    }
});

export const { toggleLogEntryActivity } = logEntriesSlice.actions;

export const getLogEntries = state => state.logEntries;

export const getLoggedActivityIds = createSelector(
    [getLogEntries, () => UtilityService.getCurrentShortTimestamp()],
    (logEntries, currentTimestamp) => {
        const currentLogEntry = logEntries.find(entry => entry.timestamp === currentTimestamp);
        return currentLogEntry ? currentLogEntry.activities : [];
    }
);

export const getCalendarDataLog = createSelector(
    [getLogEntries, getFilteredActivities],
    (logEntries, activities) => {
        return LogEntriesService.getCalendarLog(LogEntriesService.populateLogEntriesWithActivities(logEntries, activities));
    }
);

const logEntriesReducer = logEntriesSlice.reducer;
export default logEntriesReducer;
