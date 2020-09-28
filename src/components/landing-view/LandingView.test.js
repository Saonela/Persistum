import React from 'react';
import {render, screen} from "@testing-library/react";
import {fireEvent} from "@testing-library/dom";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import LandingView from "./LandingView";

let mockData = {user: null};

jest.mock('../../services/api/authAPIService', () => {
    return {
        getCurrentUser() {
            return Promise.resolve(mockData.user);
        }
    }
});

describe('LandingView', () => {

    beforeEach(() => {
        Object.assign(mockData, {user: null});
    });

    it('should go to login', () => {
        const history = createMemoryHistory()
        history.push('/');
        const {getByText} = render(<Router history={history}><LandingView/></Router>)
        const loginButton = getByText('Login');
        fireEvent.click(loginButton);
        expect(history.location.pathname).toBe('/login');
    });

    const setupMainButtonTest = () => {
        const onReturningUserSpy = jest.fn();
        const onLoadingStateChangeSpy = jest.fn();
        const history = createMemoryHistory()
        history.push('/');
        render(
            <Router history={history}>
                <LandingView onReturningUser={onReturningUserSpy}
                             onLoadingStateChange={onLoadingStateChangeSpy}/>
            </Router>
        );
        const mainButton = screen.getByText('Get started');
        return {history, onReturningUserSpy, onLoadingStateChangeSpy, mainButton};
    };

    it('should go to registration if not logged in', async () => {
        const {history, onReturningUserSpy, onLoadingStateChangeSpy, mainButton} = setupMainButtonTest();
        await fireEvent.click(mainButton);
        expect(onLoadingStateChangeSpy).toHaveBeenCalledWith(true);
        expect(onReturningUserSpy).not.toHaveBeenCalled();
        expect(history.location.pathname).toBe('/register');
        expect(onLoadingStateChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should go to form if logged in', async () => {
        Object.assign(mockData, {user: {email: 'test@test'}});
        const {history, onReturningUserSpy, onLoadingStateChangeSpy, mainButton} = setupMainButtonTest();
        await fireEvent.click(mainButton);
        expect(onLoadingStateChangeSpy).toHaveBeenCalledWith(true);
        expect(onReturningUserSpy).toHaveBeenCalled();
        expect(history.location.pathname).toBe('/form');
        expect(onLoadingStateChangeSpy).toHaveBeenCalledWith(false);
    });

    it('should match snapshot', () => {
        const history = createMemoryHistory()
        const {asFragment} = render(<Router history={history}><LandingView/></Router>);
        expect(asFragment()).toMatchSnapshot();
    });

});
