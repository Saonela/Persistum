import React from 'react';
import {render} from "@testing-library/react";
import {fireEvent} from "@testing-library/dom";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import LandingView from "./LandingView";

const mockState = {};

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(() => {}),
    useSelector: jest.fn((callback) => {
        return callback(mockState)}),
}));

describe('LandingView', () => {

    beforeEach(() => {
        Object.assign(mockState, {user: null});
    });

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

    it('should change register link to app link if logged in', () => {
        Object.assign(mockState, {user: {email: 'test@test'}});
        const history = createMemoryHistory()
        history.push('/');
        const {getByText} = render(<Router history={history}><LandingView/></Router>)
        const registerButton = getByText('Get started');
        fireEvent.click(registerButton);
        expect(history.location.pathname).toBe('/form');
    });

    it('should match snapshot', () => {
        const history = createMemoryHistory()
        const {asFragment} = render(<Router history={history}><LandingView/></Router>);
        expect(asFragment()).toMatchSnapshot();
    });

});
