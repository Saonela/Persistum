import React, {useState} from "react";
import {Link} from "react-router-dom";
import AuthAPIService from "../../services/api/authAPIService";
import AuthProviders from "../auth/auth-providers/AuthProviders";
import AuthForm from "../auth/auth-form/AuthForm";
import withAuthHandler from "../auth/with-auth-handler/WithAuthHandler";
import "../auth/AuthView.css"
import {compose} from "redux";
import withLoader from "../with-loader/WithLoader";

function RegisterView({onAuthSuccess, onLoadingStateChange}) {

    const [errorMessage, setErrorMessage] = useState(null);

    function register(email, password) {
        onLoadingStateChange(true);
        setErrorMessage(null);
        AuthAPIService.register(email, password).then(({user}) => {
            onAuthSuccess(user);
            onLoadingStateChange(false);
        }, (error) => {
            console.log('register error', error);
            if (error.code === 'auth/weak-password') {
                setErrorMessage('Password has to be at least 6 characters');
            } else {
                setErrorMessage('Something went wrong. Please try again later');
            }
            onLoadingStateChange(false);
        });
    }

    return (
        <div className="app-panel-container">
            <div className="app-panel app-border login-view">
                <h1 className="app-panel__header">Register</h1>
                <div className="auth__form">
                    <AuthForm buttonLabel={'Register'} generalErrorMessage={errorMessage} withPasswordConfirm={true} onSubmit={register}/>
                    <p className="auth__separator">Or</p>
                    <AuthProviders onAuth={(user) => onAuthSuccess(user)}/>
                </div>
                <div className="auth__redirect">Already have an account ? <Link to="/login">Login</Link></div>
            </div>
        </div>
    )
}

export default compose(withLoader, withAuthHandler)(RegisterView);
export {RegisterView as PureRegisterView};
