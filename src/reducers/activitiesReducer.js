import {ADD_ACTIVITY, DELETE_ACTIVITY, UPDATE_ACTIVITY} from "../actions/actions";

export const activitiesReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            return state.concat([action.payload]);
        case UPDATE_ACTIVITY:
            return state.map(item => item.id === action.payload.id ? {...item, ...action.payload} : item);
        case DELETE_ACTIVITY:
            return state.filter(item => item.id !== action.payload)
        default:
            return state;
    }
};
