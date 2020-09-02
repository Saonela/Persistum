import React from "react";
import userReducer, {logout, setUser} from "./userSlice";

describe('UserReducer', () => {

    const state = null;

    it('should set user', () => {
        expect(userReducer(state, setUser({name: 'John Doe'}))).toEqual({name: 'John Doe'});
    });

    it('should clear data on logout', () => {
        const state = {
            name: 'John Doe'
        };
        expect(userReducer(state, logout())).toEqual(null);
    });

});
