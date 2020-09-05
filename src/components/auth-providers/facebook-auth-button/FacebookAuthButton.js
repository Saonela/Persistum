import React from "react";
import logo from "../../../assets/facebook.svg"

function FacebookAuthButton({onClick}) {
    return (
        <button className="provider-button" style={{backgroundColor: "#3b5998", color: "#FFFFFF"}} onClick={() => onClick()}>
            <img className="provider-button__image" src={logo} alt="Facebook logo"/>
            Sign in with Facebook
        </button>
    )
}

export default FacebookAuthButton;
