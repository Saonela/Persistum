import AuthAPIService from "../../services/api/authAPIService";
import React from "react";
import LoginForm from "./login-form/LoginForm";
import {Link, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/slices/userSlice";
import {fetchActivities} from "../../redux/slices/activitiesSlice";
import {fetchLogEntries} from "../../redux/slices/logEntriesSlice";

function LoginView({history}) {

    const dispatch = useDispatch()

    function login(email, password) {
        AuthAPIService.login(email, password).then(({user}) => {
            dispatch(setUser({id: user.uid, email: user.email}));
            dispatch(fetchActivities());
            dispatch(fetchLogEntries());
            history.push('/form');
        }, (error) => {
            console.log('LOGIN ERROR', error);
        });
    }

    return (
        <div>
            <LoginForm onSubmit={login}/>
            <div>Don't have account ? <Link to="/register">Register</Link></div>
        </div>
    )
}

export default withRouter(LoginView);
