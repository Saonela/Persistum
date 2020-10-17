import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/header/Header';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import FormView from "./components/form-view/FormView";
import CalendarView from "./components/calendar-view/CalendarView";
import RouteAuthGuard from "./components/route-auth-guard/RouteAuthGuard";
import LoginView from "./components/login-view/LoginView";
import RegisterView from "./components/register-view/RegisterView";
import {useDispatch, useSelector} from "react-redux";
import Logout from "./components/logout/Logout";
import {fetchActivities} from "./redux/slices/activitiesSlice";
import {fetchLogEntries} from "./redux/slices/logEntriesSlice";
import AuthAPIService from "./services/api/authAPIService";
import {setUser} from "./redux/slices/userSlice";
import LandingView from "./components/landing-view/LandingView";
import withLoader from "./components/with-loader/WithLoader";
import {fetchSettings} from "./redux/slices/settingsSlice";
import StatisticsView from "./components/statistics-view/StatisticsView";
import LogCompletedView from "./components/log-completed-view/LogCompletedView";

const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-theme').trim();
const theme = createMuiTheme({
    palette: {
        primary: {
            main: themeColor
        }
    },
});

const appRoutes = ['/form', '/calendar', '/statistics', '/log-completed'];

function App({onLoadingStateChange}) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (appRoutes.includes(window.location.pathname)) {
            loadAppData();
        }
    }, []);

    const loadAppData = () => {
        setLoading(true);
        onLoadingStateChange(true)

        AuthAPIService.getCurrentUser().then((user) => {
            if (user) {
                dispatch(setUser({id: user.uid, email: user.email}));
                dispatch(fetchSettings());
                dispatch(fetchActivities());
                dispatch(fetchLogEntries());
            }
            setLoading(false);
            onLoadingStateChange(false);
        });
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <RouteAuthGuard isAuthenticated={!!user || loading}>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact>
                                    <LandingView onLoadingStateChange={onLoadingStateChange} onReturningUser={loadAppData}/>
                                </Route>
                                <Route path="/login" exact>
                                    <div className="app-theme-background">
                                        <LoginView/>
                                    </div>
                                </Route>
                                <Route path="/logout" exact>
                                    <Logout/>
                                </Route>
                                <Route path="/register" exact>
                                    <div className="app-theme-background">
                                        <RegisterView/>
                                    </div>
                                </Route>
                                <Route path="/form" exact>
                                    <Header/>
                                    <div className="inner-container scroll-container">
                                        <FormView/>
                                    </div>
                                </Route>
                                <Route path="/log-completed" exact>
                                    <Header/>
                                    <div className="inner-container scroll-container">
                                        <LogCompletedView/>
                                    </div>
                                </Route>
                                <Route path="/calendar" exact>
                                    <Header/>
                                    <div className="inner-container">
                                        <CalendarView/>
                                    </div>
                                </Route>
                                <Route path="/statistics" exact>
                                    <Header/>
                                    <div className="inner-container">
                                        <StatisticsView/>
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                    </RouteAuthGuard>
                </Router>
            </div>
         </MuiThemeProvider>
    );
}

export default withLoader(App);
