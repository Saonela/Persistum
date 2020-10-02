import React from "react";
import './Navigation.css'
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import {ExitToApp, TrendingUp} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

const Navigation = ({activeRoute, setActiveRoute}) => (
    <div className="navigation">
        <Tooltip disableFocusListener title="Statistics" placement="bottom">
            <Link to="/statistics" onClick={() => setActiveRoute('/statistics')}>
                <IconButton className="navigation__button-statistics"
                            role="button"
                            aria-label="Statistics link"
                            color={activeRoute === '/statistics' ? 'primary' : 'default'}>
                    <TrendingUp/>
                </IconButton>
            </Link>
        </Tooltip>
        <Tooltip disableFocusListener title="Calendar" placement="bottom">
            <Link to="/calendar" onClick={() => setActiveRoute('/calendar')}>
                <IconButton className="navigation__button-calendar"
                            role="button"
                            aria-label="Calendar link"
                            color={activeRoute === '/calendar' ? 'primary' : 'default'}>
                    <DateRangeIcon/>
                </IconButton>
            </Link>
        </Tooltip>
        <Tooltip disableFocusListener title="Form" placement="bottom">
        <Link to="/form" onClick={() => setActiveRoute('/form')}>
            <IconButton className="navigation__button-form"
                        role="button"
                        aria-label="Form link"
                        color={activeRoute === '/form' ? 'primary' : 'default'}>
                <PlaylistAddCheckIcon/>
            </IconButton>
        </Link>
        </Tooltip>
        <Tooltip disableFocusListener title="Logout" placement="bottom">
            <Link to="/logout" onClick={() => setActiveRoute('')}>
                <IconButton className="navigation__button-form">
                    <ExitToApp/>
                </IconButton>
            </Link>
        </Tooltip>
    </div>
);

export default Navigation;
