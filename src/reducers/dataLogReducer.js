import {UPDATE_DATA_LOG} from "../actions/actions";
import UtilityService from "../services/utilityService";

export const dataLogReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_DATA_LOG:
            state = UtilityService.deepCopy(state);
            if (state[action.payload.timestamp]) {
                state[action.payload.timestamp].activities = action.payload.activityIds.slice();
            } else {
                state[action.payload.timestamp] = {
                    activities: action.payload.activityIds.slice()
                }
            }
            return state;
        default:
            return state;
    }
};
