import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        logout() {
            return null;
        }
    }
});

export const { setUser, logout } = userSlice.actions;

export const getUserId = state => state.user.id;

const userReducer = userSlice.reducer;
export default userReducer;
