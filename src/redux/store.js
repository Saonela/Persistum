import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import activitiesReducer from "./slices/activitiesSlice";
import logEntriesReducer from "./slices/logEntriesSlice";
import filtersReducer from "./slices/filtersSlice";
import settingsReducer from "./slices/settingsSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        activities: activitiesReducer,
        logEntries: logEntriesReducer,
        settings: settingsReducer,
        filters: filtersReducer
    }
});
