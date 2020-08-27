import AuthAPIService from "../../services/api/authAPIService";
import React from "react";
import LoginForm from "./login-form/LoginForm";
import {Link, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";

function LoginView({history}) {

    const dispatch = useDispatch()

    function login(email, password) {
        AuthAPIService.login(email, password).then(({user}) => {
            dispatch(setUser({email: user.email}));
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
