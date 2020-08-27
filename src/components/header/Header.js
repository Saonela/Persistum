import React from 'react';
import './Header.css'
import logo from '../../assets/logo.svg'
import Navigation from "./navigation/Navigation";

function Header() {
    return (
        <div className="header">
            <div className="header__content">
                <img src={logo} className="logo" alt="logo" role="img" aria-label="Logo"/>
                <Navigation/>
            </div>
        </div>
    );
}

export default Header;
