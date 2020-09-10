import React from 'react';
import {render} from "@testing-library/react";
import AuthProviders from "./AuthProviders";
import AuthAPIService from "../../../services/api/authAPIService";

jest.mock('../../../services/api/authAPIService', () => {
    return {
        loginWithProvider(provider) {
            return Promise.resolve({
                user: {
                    email: 'provider@mail.com'
                }
            });
        }
    }
});

jest.mock('../../../firebase', () => ({
    FirebaseGoogleAuthProvider: 'FirebaseGoogleAuthProvider',
    FirebaseFacebookAuthProvider: 'FirebaseFacebookAuthProvider'
}));

describe('AuthProviders', () => {

    it('should emit provider click', async () => {
        const spy = jest.fn();
        const authAPISpy = jest.spyOn(AuthAPIService, 'loginWithProvider');
        const {getByText} = render(<AuthProviders onAuth={spy}/>);
        const googleButton = getByText('Sign in with Google');
        const facebookButton = getByText('Sign in with Facebook');
        await googleButton.click();
        await facebookButton.click();
        expect(authAPISpy).toBeCalledWith('FirebaseGoogleAuthProvider');
        expect(authAPISpy).toBeCalledWith('FirebaseFacebookAuthProvider');
        expect(spy).toHaveBeenCalledTimes(2);
    });
});
