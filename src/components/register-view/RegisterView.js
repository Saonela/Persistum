import React from "react";
import {Link} from "react-router-dom";
import AuthAPIService from "../../services/api/authAPIService";
import AuthProviders from "../auth/auth-providers/AuthProviders";
import AuthForm from "../auth/auth-form/AuthForm";
import withAuthHandler from "../auth/with-auth-handler/WithAuthHandler";

function RegisterView({onAuthSuccess}) {

    function register(email, password) {
        AuthAPIService.register(email, password).then(({user}) => {
            onAuthSuccess(user);
        }, (error) => {
            console.log('REGISTER ERROR', error);
        });
    }

    return (
        <div className="app-panel-container">
            <div className="app-panel app-border login-view">
                <h1 className="app-panel__header">Register</h1>
                <div className="login-view__form">
                    <AuthForm buttonLabel={'Register'} withPasswordConfirm={true} onSubmit={register}/>
                    <p className="form__auth-separator">Or</p>
                    <AuthProviders onAuth={(user) => onAuthSuccess(user)}/>
                </div>
                <div className="form__redirect">Already have an account ? <Link to="/login">Login</Link></div>
            </div>
        </div>
    )
}

export default withAuthHandler(RegisterView);
export {RegisterView as PureRegisterView};
