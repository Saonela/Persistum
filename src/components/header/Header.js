import React from 'react';
import './Header.css'
import logo from '../../assets/logo.svg'
import Navigation from "./navigation/Navigation";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header__content">
                    <img src={logo} className="logo" alt="logo" />
                    <Navigation/>
                </div>
            </div>
        );
    }
}

export default Header;
