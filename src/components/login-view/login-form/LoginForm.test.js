import React from "react";
import LoginForm from "./LoginForm";
import {fireEvent, render} from "@testing-library/react";
import {getByLabelText, getByText} from "@testing-library/dom";

jest.mock('../../../services/api/authAPIService', () => {
    return {
        login(email, pass) {
            return Promise.resolve({
                user: {
                    email: email
                }
            });
        }
    }
});

describe('LoginForm', () => {

    let container;
    let loginSpy;

    beforeEach(() => {
        loginSpy = jest.fn();
        const element = render(<LoginForm onLogin={loginSpy}/>);
        container = element.container;
    });

    it('should submit username and password', async () => {
        const emailField = getByLabelText(container, 'Email');
        const passwordField = getByLabelText(container, 'Password');
        const button = getByText(container, 'Login');
        fireEvent.change(emailField, {target: {value: 'John@mail'}});
        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        await fireEvent.click(button);
        expect(loginSpy).toHaveBeenCalledWith({email: 'John@mail'});
    });

});
