import React, {useEffect, useState} from 'react';
import './Header.css'
import Navigation from "./navigation/Navigation";
import {withRouter} from "react-router-dom";

const routeNamesTable = {
    '/form': 'Activities',
    '/calendar': 'Calendar',
    '/statistics': 'Statistics'
};

function Header({history}) {
    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        setActiveRoute(history.location.pathname);
    }, [history.location.pathname]);

    return (
        <div className="header">
            <div className="header__content">
                <p className="header__current-route">{routeNamesTable[history.location.pathname]}</p>
                <Navigation activeRoute={activeRoute} setActiveRoute={setActiveRoute}/>
            </div>
        </div>
    );
}

export default withRouter(Header);
