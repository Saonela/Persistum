import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

function LoginForm({onSubmit}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form className="login-form" onSubmit={submit}>
            <TextField id="email" className="login-form__email" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <TextField id="password" className="login-form__password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>

    )
}

export default LoginForm;
