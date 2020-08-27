import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {"email":"demo@gmail.com"},
    reducers: {
        setUser(state, action) {
            return action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
