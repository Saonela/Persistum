import React, {useEffect} from 'react';
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

const themeColor = '#4973d3'
const theme = createMuiTheme({
    palette: {
        primary: {
            main: themeColor
        },
        // secondary: {
        //     main: green[500],
        // },
    },
});

function App() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        AuthAPIService.getCurrentUser().then((user) => {
            if (user) {
                dispatch(setUser({id: user.uid, email: user.email}));
                dispatch(fetchActivities());
                dispatch(fetchLogEntries());
            } else {
                // ... redirect ?
            }
        });
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <RouteAuthGuard isAuthenticated={!!user}>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact>
                                    <LandingView/>
                                </Route>
                                <Route path="/login" exact>
                                    <div className="app-theme-background">
                                        <LoginView/>
                                    </div>
                                </Route>
                                <Route path="/register" exact>
                                    <div className="app-theme-background">
                                        <RegisterView/>
                                    </div>
                                </Route>
                                <Route path="/logout" exact>
                                    <Logout/>
                                </Route>
                                <Route path="/form" exact>
                                    <Header/>
                                    <FormView/>
                                </Route>
                                <Route path="/calendar" exact>
                                    <Header/>
                                    <CalendarView/>
                                </Route>
                            </Switch>
                        </div>
                    </RouteAuthGuard>
                </Router>
            </div>
         </MuiThemeProvider>
    );
}

export default App;
