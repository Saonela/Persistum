import {createSlice} from "@reduxjs/toolkit";

const activitiesSlice = createSlice({
    name: 'activities',
    initialState: [
        {id: 123456, name: 'Learn redux', style: {background: '#ebebeb'}},
        {id: 999, name: 'Read a book', style: {background: 'red'}},
        {id: 11, name: 'Tell a secret', style: {background: 'black'}}
    ],
    reducers: {
        addActivity(state, action) {
            return state.concat([action.payload]);
        },
        updateActivity(state, action) {
            return state.map(item => item.id === action.payload.id ? {...item, ...action.payload} : item);
        },
        deleteActivity(state, action) {
            return state.filter(item => item.id !== action.payload);
        }
    }
});
export const { addActivity, updateActivity, deleteActivity } = activitiesSlice.actions

export const getFilteredActivities = state => state.activities.filter(activity => !state.filters.includes(activity.id));

const activitiesReducer = activitiesSlice.reducer;
export default activitiesReducer;
