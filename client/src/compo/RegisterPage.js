import React, { useState } from 'react';
import { Button, Form, Container, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import NavigateBar from "./Navbar";
import '../CSS/Navbar.css'; 

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1337/api'
});

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setErrorMsg('');
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setErrorMsg('');
    };
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleGoback = () => {
        window.location.href = 'http://localhost:3000/';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }
        if (!password.match(/[!"#$%&'()*+,-./<=>?@[\]^_`{|}~]/)) {
            setErrorMsg('Password must contain at least one special character.');
            return;
        }
        if (password.length < 8) {
            setErrorMsg('Password must be at least 8 characters long.');
            return;
        }


        try {
            sessionStorage.removeItem('jwt');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('role');

            const response = await axiosInstance.post("/auth/local/register", {
                username: username,
                email: email,
                password: password,
            });
            console.log('Registration successful:', response.data);
            sessionStorage.setItem('username', username);
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMsg('Registration failed. Please try again.');
        }
    };





    return (
        <>
            <NavigateBar />
        <Container className="d-flex flex-column align-items-center justify-content-center login-container" style={{ marginTop: '50px' }}>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '320px' }}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>ชื่อผู้ใช้</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>อีเมลล์</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="อีเมลล์"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <InputGroup>
                        <FormControl
                            type={showPassword ? "text" : "password"}
                            placeholder="รหัสผ่าน"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility} className="p-0">
                            {showPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <FormControl
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <Button variant="outline-secondary" onClick={togglePasswordVisibility} className="p-0">
                            {showPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                    </InputGroup>
                </Form.Group>

                <p className="text-danger">{errorMsg}</p>
                <Button variant="primary" type="submit" className="w-100">
                    สมัคร
                </Button>
                <Button variant="secondary" className="w-100 mt-3" onClick={handleGoback}>
                    ย้อนกลับ
                </Button>
            </Form>
        </Container>
        </>
    );
};


export default RegisterPage;

