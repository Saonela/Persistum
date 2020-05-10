import React from 'react';
import './App.css';
import Header from './components/header/Header';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {Switch, Route, BrowserRouter as Router, withRouter} from "react-router-dom";
import FormView from "./components/form-view/FormView";
import CalendarView from "./components/calendar-view/CalendarView";

const theme = createMuiTheme({
    overrides: {}
});


function App() {

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Router>
                    <Header/>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact>
                                <FormView/>
                            </Route>
                            <Route path="/calendar" exact>
                                <CalendarView/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>

         </MuiThemeProvider>
    );
}

export default App;
