import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1337/api/register', {
                email: email,
                password: password
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMsg('Registration failed. Please try again.');
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center login-container">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '320px' }}>
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
                    <Form.Text className="text-muted">
                        <Button variant="link" onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide" : "Show"} Password
                        </Button>
                    </Form.Text>
                </Form.Group>

                {errorMsg && <p className="text-danger">{errorMsg}</p>}

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
