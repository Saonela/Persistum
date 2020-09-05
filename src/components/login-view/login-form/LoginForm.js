import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import AuthAPIService from "../../../services/api/authAPIService";

function LoginForm({onLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login(e) {
        e.preventDefault();
        AuthAPIService.login(email, password).then(({user}) => {
            onLogin(user);
        }, (error) => {
            console.log('LOGIN ERROR', error);
        });
    }

    return (
        <form className="login-form" onSubmit={login}>
            <TextField id="email" className="login-form__email" label="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <TextField id="password" className="login-form__password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>

    )
}

export default LoginForm;
