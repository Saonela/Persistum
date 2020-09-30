import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUserId, logout} from "./userSlice";
import SettingsAPIService from "../../services/api/settingsAPIService";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";
import {CALENDAR_DISPLAY_TYPE} from "../../types/settings";


export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (data, thunkAPI) => {
    return await SettingsAPIService.get(getUserId(thunkAPI.getState()));
});

export const updateSettings = createAsyncThunk('settings/updateSettings', async (settings, thunkAPI) => {
    SettingsAPIService.update(settings, getUserId(thunkAPI.getState())).then();
    return settings;
});

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: {}
    },
    reducers: {
    },
    extraReducers: {
        [fetchSettings.pending]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.LOADING;
        },
        [fetchSettings.fulfilled]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
            state.data = action.payload;
            if (!state.data.calendarDisplayType) {
                state.data.calendarDisplayType = CALENDAR_DISPLAY_TYPE.GRID;
            }
        },
        [fetchSettings.rejected]: (state, action) => {
            state.status = ASYNC_STATE_STATUS.FAILED;
        },
        [updateSettings.fulfilled]: (state, action) => {
            Object.assign(state.data, action.payload);
        },
        [logout]: (state) => {
            return {};
        }
    }
});

export const { toggleCalendarDisplayType } = settingsSlice.actions;

export const getSettings = state => state.settings.data;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
