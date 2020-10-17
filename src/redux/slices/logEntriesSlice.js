import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import UtilityService from "../../services/utilityService";
import LogEntriesService from "../../services/logEntriesService";
import {deleteActivity, getAllActivities} from "./activitiesSlice";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";
import LogEntriesAPIService from "../../services/api/logEntriesAPIService";
import {getUserId, logout} from "./userSlice";
import {getFilters} from "./filtersSlice";

export const fetchLogEntries = createAsyncThunk('logEntries/fetchLogEntries', async (data, thunkAPI) => {
    return await LogEntriesAPIService.getAll(getUserId(thunkAPI.getState()));
});

export const updateLogEntry = createAsyncThunk('logEntries/updateLogEntry', async (timestamp, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = getUserId(state);
    let logEntry = state.logEntries.data.find(entry => entry.timestamp === timestamp);

    if (!logEntry.activities.length) {
        LogEntriesAPIService.delete(logEntry.id, userId).then();
    } else {
        if (!logEntry.id) {
            logEntry = Object.assign({}, logEntry, {id: UtilityService.generateId()});
        }
        LogEntriesAPIService.upsert(logEntry, userId).then();
    }

    return logEntry;
});

export const updateAllLogEntries = createAsyncThunk('logEntries/updateAllLogEntries', async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = getUserId(state);
    const toUpdate = state.logEntries.data.filter(entry => entry.activities.length);
    const toDelete = state.logEntries.data.filter(entry => !entry.activities.length);
    LogEntriesAPIService.updateMany(toUpdate, userId).then();
    LogEntriesAPIService.deleteMany(toDelete, userId).then();
    return toDelete.map(logEntry => logEntry.id);
});

const logEntriesSlice = createSlice({
    name: 'logEntries',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: [],
        timestamp: UtilityService.getCurrentShortTimestamp()
    },
    reducers: {
        setTimestamp(state, action) {
            state.timestamp = action.payload;
        },
        resetTimestamp(state, action) {
            state.timestamp = UtilityService.getCurrentShortTimestamp();
        },
        toggleLogEntryActivity(state, action) {
            const activityId = action.payload;
            const logEntry = state.data.find(entry => entry.timestamp === state.timestamp);
            if (logEntry) {
                if (logEntry.activities.includes(activityId)) {
                    logEntry.activities = logEntry.activities.filter(id => id !== activityId);
                } else {
                    logEntry.activities.push(activityId);
                    logEntry.activities.sort();
                }
            } else {
                state.data.push({timestamp: state.timestamp, activities: [activityId]});
            }
        }
    },
    extraReducers: {
        [fetchLogEntries.pending]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.LOADING;
        },
        [fetchLogEntries.fulfilled]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
            action.payload.sort((a, b) => {
                return new Date(a.timestamp) - new Date(b.timestamp);
            });
            state.data = action.payload;
        },
        [fetchLogEntries.rejected]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.FAILED;
        },
        [updateLogEntry.fulfilled]: (state, action) => {
            const logEntry = getLogEntryByTimestamp({logEntries: state}, action.payload.timestamp);
            if (logEntry) {
                if (!logEntry.id) {
                    logEntry.id = action.payload.id;
                }
            } else {
                state.data.push(action.payload);
            }
            state.data = state.data.filter(entry => entry.activities.length);
        },
        [updateAllLogEntries.fulfilled]: (state, action) => {
            state.data = state.data.filter(logEntry => !action.payload.includes(logEntry.id));
        },
        [deleteActivity.fulfilled]: (state, action) => {
            state.data.forEach((logEntry) => {
                logEntry.activities = logEntry.activities.filter(id => id !== action.payload);
            });
        },
        [logout]: (state) => {
            return {
                status: ASYNC_STATE_STATUS.IDLE,
                error: null,
                data: [],
                timestamp: ''
            }
        }
    }
});

export const { setTimestamp, resetTimestamp, toggleLogEntryActivity } = logEntriesSlice.actions;

export const getTimestamp = state => {
    return state.logEntries.timestamp;
}
export const getLogEntries = state => state.logEntries.data;
export const getLogEntryByTimestamp = (state, timestamp) => state.logEntries.data.find(entry => entry.timestamp === timestamp);

export const getLoggedActivityIds = createSelector(
    [getLogEntries, getTimestamp],
    (logEntries, currentTimestamp) => {
        const currentLogEntry = logEntries.find(entry => entry.timestamp === currentTimestamp);
        return currentLogEntry ? currentLogEntry.activities : [];
    }
);

export const getCalendarDataLog = createSelector(
    [getLogEntries, getFilters],
    (logEntries, filteredActivityIds) => {
        const filteredLogEntries = LogEntriesService.filterActivitiesFromLogEntries(logEntries, filteredActivityIds);
        const calendarLog = LogEntriesService.getCalendarLog(filteredLogEntries)
        return calendarLog.length ? calendarLog : LogEntriesService.getCalendarLog(logEntries);
    }
);

export const getOverallStatistics = createSelector(
    [getLogEntries, getAllActivities],
    (logEntries, activities) => {
        return LogEntriesService.getActivitiesOverallStatistics(logEntries, activities);
    }
);

export const getTimePeriodStatistics = createSelector(
    [getLogEntries, getAllActivities],
    (logEntries, activities) => {
        return LogEntriesService.getActivitiesTimePeriodStatistics(logEntries, activities);
    }
);

const logEntriesReducer = logEntriesSlice.reducer;
export default logEntriesReducer;
