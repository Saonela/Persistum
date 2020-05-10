import {UPDATE_DATA_LOG} from "./actions";
import UtilityService from "../services/utilityService";

export const updateDataLog = (timestamp, activityIds) => {
    return {
        type: UPDATE_DATA_LOG,
        payload: {
            timestamp: timestamp,
            activityIds: activityIds
        }
    };
}


export const toggleCurrentLogActivities = (activityIds) => {
    return function (dispatch, getState) {
        const {dataLog} = getState();
        const timestamp = UtilityService.getCurrentShortTimestamp();

        let ids = [];
        if (dataLog[timestamp]) {
            ids = dataLog[timestamp].activities.filter((id) => {
                return activityIds.indexOf(id) < 0;
            }).concat(activityIds.filter((id) => {
                return dataLog[timestamp].activities.indexOf(id) < 0;
            }));
        } else {
            ids = activityIds;
        }

        dispatch(updateDataLog(timestamp, ids))
    };
}

export const removeFromCurrentDataLog = (activityIds) => {
    return function (dispatch, getState) {
        // dispatch(updateDataLog(moment().utc().format('YYYY-MM-DD'), activityIds))
    };
}
