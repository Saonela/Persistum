import React from "react";
import userReducer, {setUser} from "./userSlice";

describe('UserReducer', () => {

    const state = null;

    it('should set user', () => {
        expect(userReducer(state, setUser({name: 'John Doe'}))).toEqual({name: 'John Doe'});
    });

});
