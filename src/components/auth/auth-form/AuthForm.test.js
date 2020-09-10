import React from "react";
import {fireEvent, render} from "@testing-library/react";
import AuthForm from "./AuthForm";


describe('AuthForm', () => {

    let submitSpy;

    beforeEach(() => {
        submitSpy = jest.fn();
    });

    it('should render login form', async () => {
        const {getByLabelText, getByRole, queryByLabelText} = render(<AuthForm buttonLabel={'Login'} onSubmit={submitSpy}/>);
        const emailField = getByLabelText('Email');
        const passwordField = getByLabelText( 'Password');
        const button = getByRole('button', {name: 'Login'});
        fireEvent.change(emailField, {target: {value: 'John@mail'}});
        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        await fireEvent.click(button);
        expect(submitSpy).toHaveBeenCalledWith('John@mail', 'abc123');
        expect(queryByLabelText('Confirm Password')).toBeFalsy();
    });

    it('should render register form', () => {
        const {getByLabelText, getByRole} = render(<AuthForm buttonLabel={'Register'} withPasswordConfirm={true} onSubmit={submitSpy}/>);
        const emailField = getByLabelText('Email');
        const passwordField = getByLabelText('Password');
        const passwordConfirmField = getByLabelText('Confirm Password');
        const button = getByRole('button', {name: 'Register'});
        fireEvent.change(emailField, {target: {value: 'John@mail'}});
        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        fireEvent.change(passwordConfirmField, {target: {value: 'abc123'}});
        fireEvent.click(button);
        expect(submitSpy).toHaveBeenCalledWith('John@mail', 'abc123');
    });

    it('should display empty field error message', () => {
        const {getAllByText, getByRole} = render(<AuthForm buttonLabel={'Submit'} withPasswordConfirm={true} onSubmit={submitSpy}/>);
        const button = getByRole('button', {name: 'Submit'});
        button.click();
        expect(getAllByText('Field is required').length).toBe(3);
    });

    it('should display invalid email error message', () => {
        const {getByLabelText, getByText, getByRole, queryByText} = render(<AuthForm buttonLabel={'Submit'} withPasswordConfirm={true} onSubmit={submitSpy}/>);
        const emailField = getByLabelText('Email');
        fireEvent.change(emailField, {target: {value: 'John'}});

        const button = getByRole('button', {name: 'Submit'});
        button.click();
        getByText('Email format is invalid');

        fireEvent.change(emailField, {target: {value: 'John@mail'}});
        expect(queryByText('Email format is invalid')).toBeFalsy();
        button.click();
        expect(queryByText('Email format is invalid')).toBeFalsy();
    });

    it('should display passwords dont match error message', () => {
        const {getByText, getByRole, getByLabelText, queryByText} = render(<AuthForm buttonLabel={'Submit'} withPasswordConfirm={true} onSubmit={submitSpy}/>);
        const button = getByRole('button', {name: 'Submit'});
        const passwordField = getByLabelText('Password');
        const passwordConfirmField = getByLabelText('Confirm Password');
        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        fireEvent.change(passwordConfirmField, {target: {value: 'abc'}});
        button.click();
        getByText('Passwords does not match');

        fireEvent.change(passwordField, {target: {value: 'abc123'}});
        fireEvent.change(passwordConfirmField, {target: {value: 'abc123'}});
        expect(queryByText('Passwords does not match')).toBeFalsy();
        button.click();
        expect(queryByText('Passwords does not match')).toBeFalsy();
    });

    it('should display general error message', () => {
        const {getByText} = render(<AuthForm buttonLabel={'Submit'} generalErrorMessage={'Auth failed'} onSubmit={submitSpy}/>);
        getByText('Auth failed');
    });
});
