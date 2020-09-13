import React from 'react';
import './Header.css'
import Navigation from "./navigation/Navigation";

function Header() {
    return (
        <div className="header">
            <div className="header__content">
                <Navigation/>
            </div>
        </div>
    );
}

export default Header;
