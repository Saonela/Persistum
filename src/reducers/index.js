import {activitiesReducer} from "./activitiesReducer";
import {combineReducers} from "redux";
import {dataLogReducer} from "./dataLogReducer";

const rootReducer = combineReducers({
    activities: activitiesReducer,
    dataLog: dataLogReducer
});

export default rootReducer;
