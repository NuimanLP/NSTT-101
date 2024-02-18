import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api'
});

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleGoback = () => {
        window.location.href = 'http://localhost:3000/';
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            sessionStorage.removeItem('jwt');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('role');
            const response = await axiosInstance.post("/auth/local/register", {
                username: username,
                email: email,
                password: password,
            });
            const roleset = await axiosInstance.put("/users-permissions/roles", {
                username: username,
                role: "authenticate-User",
            });
            console.log('Registration successful:', response.data);
            console.log('Role set:', roleset.data);
            sessionStorage.setItem('username', username);
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMsg('Registration failed. Please try again.');
        }
    };


    return (
        <Container className="d-flex flex-column align-items-center justify-content-center login-container" style={{ marginTop: '50px' }}>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '320px' }}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <Button variant="link" onClick={togglePasswordVisibility} className="p-0 mb-3">
                        {showPassword ? "Hide" : "Show"} Password
                    </Button>
                </Form.Group>

                {errorMsg && <p className="text-danger">{errorMsg}</p>}

                <Button variant="primary" type="submit" className="w-100">
                    Register
                </Button>
                <Button variant="secondary" className="w-100 mt-3" onClick={handleGoback}>
                    Back
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
