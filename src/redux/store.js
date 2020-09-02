import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import activitiesReducer from "./slices/activitiesSlice";
import logEntriesReducer from "./slices/logEntriesSlice";
import filtersReducer from "./slices/filtersSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        activities: activitiesReducer,
        logEntries: logEntriesReducer,
        filters: filtersReducer
    }
});

