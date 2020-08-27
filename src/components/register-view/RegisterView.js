import React from "react";
import {Link, withRouter} from "react-router-dom";
import RegisterForm from "./register-form/RegisterForm";
import AuthAPIService from "../../services/api/authAPIService";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/userSlice";

function RegisterView({history}) {

    const dispatch = useDispatch()

    function register(email, password) {
        AuthAPIService.register(email, password).then(({user}) => {
            dispatch(setUser({email: user.email}));
            history.push('/form');
        }, (error) => {
            console.log('REGISTER ERROR', error);
        });
    }

    return (
        <div>
            <RegisterForm onSubmit={register}/>
            <div>Already have an account ? <Link to="/login">Login</Link></div>
        </div>
    )
}

export default withRouter(RegisterView);
