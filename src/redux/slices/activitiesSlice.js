import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";
import ActivityAPIService from "../../services/api/activityAPIService";
import UtilityService from "../../services/utilityService";
import {getUserId, logout} from "./userSlice";

export const fetchActivities = createAsyncThunk('activities/fetchActivities', async (data, thunkAPI) => {
    return await ActivityAPIService.getAll(getUserId(thunkAPI.getState()));
});

export const createActivity = createAsyncThunk('activities/createActivity', async (name, thunkAPI) => {
    const activity = {
        id: UtilityService.generateId(),
        name,
        style: {
            background: '#ebebeb'
        }
    };
    ActivityAPIService.create(activity, getUserId(thunkAPI.getState())).then();
    return activity;
});

export const updateActivity = createAsyncThunk('activities/updateActivity', async (activity, thunkAPI) => {
    ActivityAPIService.update(activity, getUserId(thunkAPI.getState())).then();
    return activity;
});

export const deleteActivity = createAsyncThunk('activities/deleteActivity', async (id, thunkAPI) => {
    ActivityAPIService.delete(id, getUserId(thunkAPI.getState())).then();
    return id;
});

export const updateActivitiesOrder = createAsyncThunk('activities/updateActivitiesOrder', async (data, thunkAPI) => {
    const activitiesData = thunkAPI.getState().activities.data.map((activity, i) => {
        return {
            id: activity.id,
            positionIndex: activity.positionIndex || activity.positionIndex === 0 ? activity.positionIndex : i};
    });
    ActivityAPIService.updateMany(activitiesData, getUserId(thunkAPI.getState())).then();
});

const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: []
    },
    reducers: {
        reorderActivities(state, action) {
            const {sourceIndex, destinationIndex} = action.payload;
            let activities = state.data.slice();
            const [removed] = activities.splice(sourceIndex, 1);
            activities.splice(destinationIndex, 0, removed);
            state.data = activities;
        },
    },
    extraReducers: {
        [fetchActivities.pending]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.LOADING;
        },
        [fetchActivities.fulfilled]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
            action.payload.sort((a, b) => a.positionIndex - b.positionIndex);
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

export const {reorderActivities} = activitiesSlice.actions;

export const getAllActivities = state => state.activities.data;
export const getFilteredActivities = state => state.activities.data.filter(activity => state.filters.includes(activity.id));

const activitiesReducer = activitiesSlice.reducer;
export default activitiesReducer;
