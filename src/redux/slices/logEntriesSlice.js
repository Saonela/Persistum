import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import UtilityService from "../../services/utilityService";
import LogEntriesService from "../../services/logEntriesService";
import {getFilteredActivities} from "./activitiesSlice";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";
import LogEntriesAPIService from "../../services/api/logEntriesAPIService";
import {getUserId, logout} from "./userSlice";

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
            state.data = action.payload;
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
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
        },
        [logout]: (state) => {
            return {
                status: ASYNC_STATE_STATUS.IDLE,
                error: null,
                data: []
            }
        }
    }
});

export const { setTimestamp, resetTimestamp, toggleLogEntryActivity } = logEntriesSlice.actions;

export const getTimestamp = state => state.logEntries.timestamp;
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
    [getLogEntries, getFilteredActivities],
    (logEntries, activities) => {
        return LogEntriesService.getCalendarLog(LogEntriesService.populateLogEntriesWithActivities(logEntries, activities));
    }
);

const logEntriesReducer = logEntriesSlice.reducer;
export default logEntriesReducer;
