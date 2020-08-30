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
import {fetchActivities} from "./redux/activitiesSlice";
import {fetchLogEntries} from "./redux/logEntriesSlice";
const theme = createMuiTheme({
    overrides: {}
});

function App() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchActivities());
        dispatch(fetchLogEntries());
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <RouteAuthGuard isAuthenticated={!!user}>
                        <Header/>
                        <div style={{zIndex: 5, position: 'absolute', left: '50%'}}>USER:{JSON.stringify(user)}</div>
                        <div className="container">
                            <Switch>
                                <Route path="/login" exact>
                                    <LoginView/>
                                </Route>
                                <Route path="/register" exact>
                                    <RegisterView/>
                                </Route>
                                <Route path="/logout" exact>
                                    <Logout/>
                                </Route>
                                <Route path="/form" exact>
                                    <FormView/>
                                </Route>
                                <Route path="/calendar" exact>
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
