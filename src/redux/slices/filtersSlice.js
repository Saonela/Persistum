import {createSlice} from "@reduxjs/toolkit";
import {logout} from "./userSlice";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: [],
    reducers: {
        toggleFilter(state, action) {
            if (state.includes(action.payload)) {
                return state.filter(id => id !== action.payload);
            }
            return [...state, action.payload];
        }
    },
    extraReducers: {
        [logout]: (state) => {
            return [];
        }
    }
});

export const { toggleFilter } = filtersSlice.actions;

export const getFilters = state => state.filters;

const filtersReducer = filtersSlice.reducer;
export default filtersReducer;
