import React from "react";
import logo from "../../../../assets/google.svg"

function GoogleAuthButton({onClick}) {
    return (
        <button className="provider-button" style={{backgroundColor: "#FFFFFF", color: "#757575"}} onClick={() => onClick()}>
            <img className="provider-button__image" src={logo} alt="Google logo"/>
            Sign in with Google
        </button>
    )
}

export default GoogleAuthButton;
