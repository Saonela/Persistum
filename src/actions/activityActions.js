import ActivityAPIService from "../services/api/activityAPIService";
import {ADD_ACTIVITY, DELETE_ACTIVITY, UPDATE_ACTIVITY, UPDATE_DATA_LOG} from "./actions";

export const addActivity = (activity) => {
    return {
        type: ADD_ACTIVITY,
        payload: activity
    };
}

export const updateActivity = (activity) => {
    return {
        type: UPDATE_ACTIVITY,
        payload: activity
    };
}

export const deleteActivity = (id) => {
    return {
        type: DELETE_ACTIVITY,
        payload: id
    };
}

export const addActivityAPI = (name) => {
    return function (dispatch) {
        ActivityAPIService.create(name).then((response) => {
            dispatch(addActivity(Object.assign(response, {name: name})));
        });
    }
};

export const updateActivityAPI = (activity) => {
    return function (dispatch) {
        ActivityAPIService.update(activity);
        dispatch(updateActivity(activity));
    }
};

export const deleteActivityAPI = (activity) => {
    return function (dispatch) {
        ActivityAPIService.delete(activity.id);
        dispatch(deleteActivity(activity.id));
    }
};
