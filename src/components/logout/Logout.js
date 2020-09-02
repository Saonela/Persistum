import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import AuthAPIService from "../../services/api/authAPIService";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/userSlice";

function Logout({history}) {

    const dispatch = useDispatch();

    useEffect(() => {
        AuthAPIService.logout().then();
        dispatch(logout());
        history.push('/login');
    });

    return null;
}

export default withRouter(Logout);
