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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/signup/`, {
            method: "POST",
            body: JSON.stringify({ username: username, email: email, password: password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(data);
            if (data.username)
                setUsernameError(data.username);
            if (data.email)
                setEmailError(data.email);
            return;
        };

        navigate('/login');
    }

    return (
        <div className="signup-container">
            <h1>Sign Up with Email</h1>
            <Paper elevation={5} sx={{ padding: '50px 70px' }}>
                <form onSubmit={handleSubmit} id="signup-form">
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
                            helperText={emailError} onChange={e => setEmail(e.target.value)} onFocus={e => setEmailError('')} sx={{ width: "200px" }}
                            inputProps={{ maxLength: 150 }}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <TextField required variant="standard" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    <Button color="secondary" variant="contained" type="submit" htmlFor="signup-form" className="signup-button" size="large">Sign Up</Button>
                </form>
            </Paper>
        </div>
    );
}

export default SignUp;