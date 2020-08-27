import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

function RegisterForm({onSubmit}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form className="register-form" onSubmit={submit}>
            <TextField id="email" className="register-form__email" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <TextField id="password" className="register-form__password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <TextField id="password" className="register-form__password-confirm" label="Confirm Password" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm;
