import React from "react";
import LoginForm from "./login-form/LoginForm";
import {Link, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/userSlice";
import {fetchActivities} from "../../redux/slices/activitiesSlice";
import {fetchLogEntries} from "../../redux/slices/logEntriesSlice";
import AuthProviders from "../auth-providers/AuthProviders";

function LoginView({history}) {

    const dispatch = useDispatch()

    function handleLoginSuccess(user) {
        dispatch(setUser({id: user.uid, email: user.email}));
        dispatch(fetchActivities());
        dispatch(fetchLogEntries());
        history.push('/form');
    }

    return (
        <div>
            <LoginForm onLogin={(user) => handleLoginSuccess(user)}/>
            <AuthProviders onAuth={(user) => handleLoginSuccess(user)}/>
            <div>Don't have account ? <Link to="/register">Register</Link></div>
        </div>
    )
}

export default withRouter(LoginView);
