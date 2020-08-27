import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import activitiesReducer from "./activitiesSlice";
import logEntriesReducer from "./logEntriesSlice";
import filtersReducer from "./filtersSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        activities: activitiesReducer,
        logEntries: logEntriesReducer,
        filters: filtersReducer
    }
});

