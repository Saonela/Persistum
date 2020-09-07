import React from 'react';
import {render} from "@testing-library/react";
import {fireEvent} from "@testing-library/dom";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import LandingView from "./LandingView";


it('should go to links', () => {
    const history = createMemoryHistory()
    history.push('/');
    const {getByText} = render(<Router history={history}><LandingView/></Router>)
    const registerButton = getByText('Get started');
    const loginButton = getByText('Login');
    fireEvent.click(registerButton);
    expect(history.location.pathname).toBe('/register');
    fireEvent.click(loginButton);
    expect(history.location.pathname).toBe('/login');
});
