import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import "./AuthForm.css"
import {Button} from "@material-ui/core";

const ERROR_FIELD_REQUIRED = 'Field is required';
const ERROR_EMAIL_INVALID = 'Email format is invalid';
const ERROR_PASSWORDS_DOES_NOT_MATCH = 'Passwords does not match';

function AuthForm({buttonLabel, withPasswordConfirm = false, onSubmit}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            onSubmit(email, password)
        }
    };

    const isFormValid = () => {
        let isEmailValid = validateEmail();
        let isPasswordValid = validatePassword();
        let isPasswordConfirmValid = validatePasswordConfirm();
        return isEmailValid && isPasswordValid && isPasswordConfirmValid;
    }

    const validateEmail = () => {
        if (!email) {
            setEmailErrorMessage(ERROR_FIELD_REQUIRED)
            return false;
        }
        if (!email.match('.+\\@.+')) {
            setEmailErrorMessage(ERROR_EMAIL_INVALID)
            return false;
        }
        return true;
    }

    const validatePassword = () => {
        if (!password) {
            setPasswordErrorMessage(ERROR_FIELD_REQUIRED)
            return false;
        }
        return true;
    }

    const validatePasswordConfirm = () => {
        if (withPasswordConfirm) {
            if (!passwordConfirm) {
                setPasswordConfirmErrorMessage(ERROR_FIELD_REQUIRED)
                return false;
            }
            if (passwordConfirm !== password) {
                setPasswordConfirmErrorMessage(ERROR_PASSWORDS_DOES_NOT_MATCH)
                return false;
            }
        }
        return true;
    }

    return (
        <form className="auth-form" onSubmit={submit}>
            <TextField id="email"
                       error={!!emailErrorMessage}
                       helperText={emailErrorMessage}
                       className="auth-form__field"
                       label="Email"
                       value={email}
                       onChange={e => {
                           setEmailErrorMessage(null);
                           setEmail(e.target.value)
                       }}/>
            <TextField id="password"
                       error={!!passwordErrorMessage}
                       helperText={passwordErrorMessage}
                       className="auth-form__field"
                       label="Password"
                       type="password"
                       value={password}
                       onChange={e => {
                           setPasswordErrorMessage(null);
                           setPasswordConfirmErrorMessage(null);
                           setPassword(e.target.value)
                       }}/>
            {withPasswordConfirm ?
                <TextField id="password-confirm"
                           error={!!passwordConfirmErrorMessage}
                           helperText={passwordConfirmErrorMessage}
                           className="auth-form__field"
                           label="Confirm Password"
                           type="password"
                           value={passwordConfirm}
                           onChange={e => {
                               setPasswordErrorMessage(null);
                               setPasswordConfirmErrorMessage(null);
                               setPasswordConfirm(e.target.value)
                           }}/>
                : null}
            <Button className="auth-form__submit-button" type="submit" aria-label={buttonLabel}
                    variant="outlined">{buttonLabel}</Button>
        </form>
    )
}

export default AuthForm;
