import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        if (username.length < 3) {
            setUsernameError('Username must be between 3-30 characters');
            hasError = true;
        }
        // eslint-disable-next-line
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Email is invalid');
            hasError = true;
        }
        // eslint-disable-next-line
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be minimum 8 characters and contain 1 uppercase letter, 1 lowercase letter and 1 number');
            hasError = true;
        }
        if (hasError) return;

        const response = await fetch(`http://localhost:5000/signup/`, {
            method: "POST",
            body: JSON.stringify({ username: username, email: email, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) {
            if (data.username)
                setUsernameError(data.username);
            if (data.email)
                setEmailError(data.email);
        } else {
            console.log('rerouting to login');
            navigate('/login');
        }
    }

    return (
        <div className="signup-container">
            <h1>Sign Up with Email</h1>
            <Paper elevation={5} sx={{ padding: '50px 70px' }}>
                <form onSubmit={e => handleSubmit(e)} id="signup-form">
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <TextField required variant="standard" error={usernameError !== ""} id="username-field"
                            helperText={usernameError}
                            onChange={e => setUsername(e.target.value)} onFocus={() => setUsernameError('')}
                            sx={{ width: "200px" }}
                            inputProps={{ maxLength: 30 }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <TextField required variant="standard" error={emailError !== ""}
                            helperText={emailError} onChange={e => setEmail(e.target.value)} onFocus={() => setEmailError('')} sx={{ width: "200px" }}
                            inputProps={{ maxLength: 150 }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <TextField required variant="standard" type="password" error={passwordError !== ""} helperText={passwordError}
                            onFocus={() => setPasswordError('')} 
                            onChange={e => setPassword(e.target.value)} inputProps={{ maxLength: 50 }} sx={{ width: "200px" }} />
                    </FormControl>
                    <Button color="secondary" variant="contained" type="submit" htmlFor="signup-form" className="signup-button" size="large">Sign Up</Button>
                </form>
            </Paper>
        </div>
    );
}

export default SignUp;