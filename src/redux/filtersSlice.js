import {createSlice} from "@reduxjs/toolkit";

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
    }
});

export const { toggleFilter } = filtersSlice.actions;

const filtersReducer = filtersSlice.reducer;
export default filtersReducer;
