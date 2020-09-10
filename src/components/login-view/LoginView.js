import React, {useState} from "react";
import {Link} from "react-router-dom";
import AuthProviders from "../auth/auth-providers/AuthProviders";
import AuthForm from "../auth/auth-form/AuthForm";
import AuthAPIService from "../../services/api/authAPIService";
import withAuthHandler from "../auth/with-auth-handler/WithAuthHandler";
import "../auth/AuthView.css"

function LoginView({onAuthSuccess}) {

    const [errorMessage, setErrorMessage] = useState(null);

    function login(email, password) {
        setErrorMessage(null);
        AuthAPIService.login(email, password).then(({user}) => {
            onAuthSuccess(user);
        }, (error) => {
            console.log('login error', error);
            setErrorMessage('Wrong email or password');
        });
    }

    return (
        <div className="app-panel-container">
            <div className="app-panel app-border login-view">
                <h1 className="app-panel__header">Login</h1>
                <div className="auth__form">
                    <AuthForm buttonLabel={'Login'} generalErrorMessage={errorMessage} onSubmit={login}/>
                    <p className="auth__separator">Or</p>
                    <AuthProviders onAuth={(user) => onAuthSuccess(user)}/>
                </div>
                <div className="auth__redirect">Don't have an account ? <Link to="/register">Register</Link></div>
            </div>
        </div>
    )
}

export default withAuthHandler(LoginView);
export {LoginView as PureLoginView}
