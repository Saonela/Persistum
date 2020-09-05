import React from "react";
import GoogleAuthButton from "./google-auth-button/GoogleAuthButton";
import FacebookAuthButton from "./facebook-auth-button/FacebookAuthButton";
import {FirebaseFacebookAuthProvider, FirebaseGoogleAuthProvider} from "../../firebase";
import AuthAPIService from "../../services/api/authAPIService";
import "./AuthProviders.css"

function AuthProviders({onAuth}) {

    function providerAuth(provider) {
        AuthAPIService.loginWithProvider(provider).then(({user}) => {
            onAuth(user);
        }, (error) => {
            console.log('PROVIDER LOGIN ERROR', error);
        });
    }

    return (
        <div className="auth-providers">
            <GoogleAuthButton onClick={() => providerAuth(FirebaseGoogleAuthProvider)}/>
            <FacebookAuthButton onClick={() => providerAuth(FirebaseFacebookAuthProvider)}/>
        </div>
    )
}

export default AuthProviders;
