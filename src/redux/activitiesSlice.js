import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ASYNC_STATE_STATUS} from "./asyncStateStatus";
import ActivityAPIService from "../services/api/activityAPIService";
import UtilityService from "../services/utilityService";

export const fetchActivities = createAsyncThunk('activities/fetchActivities', async () => {
    return await ActivityAPIService.getAll();
});

export const createActivity = createAsyncThunk('activities/createActivity', async (name) => {
    const activity = {
        id: UtilityService.generateId(),
        name,
        style: {
            background: '#ebebeb'
        }
    };
    ActivityAPIService.create(activity).then();
    return activity;
});

export const updateActivity = createAsyncThunk('activities/updateActivity', async (activity) => {
    ActivityAPIService.update(activity).then();
    return activity;
});

export const deleteActivity = createAsyncThunk('activities/deleteActivity', async (id) => {
    ActivityAPIService.delete(id).then();
    return id;
});

const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: []
    },
    reducers: {},
    extraReducers: {
        [fetchActivities.pending]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.LOADING;
        },
        [fetchActivities.fulfilled]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
            state.data = action.payload;
        },
        [fetchActivities.rejected]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.FAILED;
        },
        [createActivity.fulfilled]: (state, action) => {
            state.data = state.data.concat([action.payload]);
        },
        [updateActivity.fulfilled]: (state, action) => {
            state.data = state.data.map(item => item.id === action.payload.id ? {...item, ...action.payload} : item);
        },
        [deleteActivity.fulfilled]: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        }
    }
});

export const getAllActivities = state => state.activities.data;
export const getFilteredActivities = state => state.activities.data.filter(activity => !state.filters.includes(activity.id));

const activitiesReducer = activitiesSlice.reducer;
export default activitiesReducer;
