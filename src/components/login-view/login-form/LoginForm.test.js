import React from "react";
import LoginForm from "./LoginForm";
import {fireEvent, render} from "@testing-library/react";
import {getByLabelText, getByRole, getByText} from "@testing-library/dom";

describe('LoginForm', () => {

    let container;
    let submitSpy;

    beforeEach(() => {
        submitSpy = jest.fn();
        const element = render(<LoginForm onSubmit={submitSpy}/>);
        container = element.container;
    });

    it('should submit username and password', () => {
        const emailField = getByLabelText(container, 'Email');
        const passwordField = getByLabelText(container, 'Password');
        const button = getByText(container, 'Login');
        fireEvent.change(emailField, {target: {value: 'John'}});
        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        fireEvent.click(button);
        expect(submitSpy).toHaveBeenCalledWith('John', 'abc123');
    });

});
