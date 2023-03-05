import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import './Login.css';

const Login = (props) => {
    const navigate = useNavigate();
    const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${url}/login`, {
            method: "POST",
            body: JSON.stringify({identifier: identifier, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            console.log(data.message);
            setError(data.message);
            return;
        }
        localStorage.setItem('jwt_token', data.token);
        props.login();
        navigate('/');
    }

    return (
        <div className="login-container"> 
            <h1>Login with Username/Email</h1>
            <Paper elevation={5} sx={{padding: '50px 70px'}}>
                <form onSubmit={e => handleSubmit(e)} id="login-form">
                    <FormControl>
                        <FormLabel>Username/Email</FormLabel>
                        <TextField required variant="standard" error={error !== ''} helperText={error} onChange={e => setIdentifier(e.target.value)} onFocus={() => setError('')} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <TextField required variant="standard" type="password" error={error !== ''} helperText={error} onChange={e => setPassword(e.target.value)} onFocus={() => setError('')} />
                    </FormControl>
                    <Button color="secondary" variant="contained" type="submit" htmlFor="login-form" className="login-button" size="large">Login</Button>
                </form>
            </Paper>
        </div>
    );
}

export default Login;