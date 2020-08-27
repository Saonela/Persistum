import React from "react";
import RegisterForm from "./RegisterForm";
import {fireEvent, render} from "@testing-library/react";
import {getByLabelText, getByRole, getByText} from "@testing-library/dom";

describe('RegisterForm', () => {

    let container;
    let submitSpy;

    beforeEach(() => {
        submitSpy = jest.fn();
        const element = render(<RegisterForm onSubmit={submitSpy}/>);
        container = element.container;
    });

    it('should submit username and passwords', () => {
        const emailField = getByLabelText(container, 'Email');
        const passwordField = getByLabelText(container, 'Password');
        const passwordConfirmField = getByLabelText(container, 'Confirm Password');
        const button = getByText(container, 'Register');
        fireEvent.change(emailField, {target: {value: 'John'}});
        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        fireEvent.change(passwordConfirmField, {target: {value: 'abc123'}});
        fireEvent.click(button);
        expect(submitSpy).toHaveBeenCalledWith('John', 'abc123');
    });

});
