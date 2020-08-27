import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import AuthAPIService from "../../services/api/authAPIService";

function Logout({history}) {

    useEffect(() => {
        AuthAPIService.logout().then();
        history.push('/login');
    });

}

export default withRouter(Logout);
