import React from "react";
import {Link} from "react-router-dom";
import AuthProviders from "../auth/auth-providers/AuthProviders";
import AuthForm from "../auth/auth-form/AuthForm";
import AuthAPIService from "../../services/api/authAPIService";
import withAuthHandler from "../auth/with-auth-handler/WithAuthHandler";
import "./LoginView.css"

function LoginView({onAuthSuccess}) {

    function login(email, password) {
        AuthAPIService.login(email, password).then(({user}) => {
            onAuthSuccess(user);
        }, (error) => {
            console.log('LOGIN ERROR', error);
        });
    }

    return (
        <div className="app-panel-container">
            <div className="app-panel app-border login-view">
                <h1 className="app-panel__header">Login</h1>
                <div className="login-view__form">
                    <AuthForm buttonLabel={'Login'} onSubmit={login}/>
                    <p className="form__auth-separator">Or</p>
                    <AuthProviders onAuth={(user) => onAuthSuccess(user)}/>
                </div>
                <div className="form__redirect">Don't have an account ? <Link to="/register">Register</Link></div>
            </div>
        </div>
    )
}

export default withAuthHandler(LoginView);
export {LoginView as PureLoginView}
