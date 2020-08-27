import React, {useEffect, useState} from "react";
import './Navigation.css'
import {Link, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import {ExitToApp} from "@material-ui/icons";

function Navigation({history}) {

    const [activeRoute, setActiveRoute] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setRoute(history.location.pathname);
        const unsubsribe = history.listen((location) => {
            setRoute(location.pathname);
        });
        return () => {
            unsubsribe();
        };
    });

    const setRoute = (route) => {
        setActiveRoute(route);
        setLoggedIn(route === '/form' || route === '/calendar');
    }

    return (
        <div className="navigation">
            actove: {activeRoute}
            <Link to="/calendar" onClick={() => setRoute('/calendar')}>
                <IconButton className="navigation__button-calendar"
                            role="button"
                            aria-label="Calendar link"
                            color={activeRoute === '/calendar' ? 'primary' : 'default'}>
                    <DateRangeIcon/>
                </IconButton>
            </Link>
            <Link to="/form" onClick={() => setRoute('/form')}>
                <IconButton className="navigation__button-form"
                            role="button"
                            aria-label="Form link"
                            color={activeRoute === '/form' ? 'primary' : 'default'}>
                    <PlaylistAddCheckIcon/>
                </IconButton>
            </Link>
            {loggedIn ?
                <Link to="/logout" onClick={() => setRoute('')}>
                    <IconButton className="navigation__button-form">
                        <ExitToApp/>
                    </IconButton>
                </Link> : null}
        </div>
    );
}

export default withRouter(Navigation);
