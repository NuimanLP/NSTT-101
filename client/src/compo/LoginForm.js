import React, { useState } from 'react';
import { Form, Button, Alert, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../CSS/LoginForm.css';
import NavigateBar from "./Navbar";
import '../CSS/Navbar.css'; 

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrMsg(null);
        console.log('Form submitted:', { username, password });

        try {

            console.log('Sending login request...');
            const response = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: username,
                password: password
            });

            console.log('Login response:', response);

            const token = response.data.jwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Fetching user details...');
            const userResponse = await axios.get('http://localhost:1337/api/users/me?populate=role');
            console.log('User response:', userResponse);

            console.log("User role:", userResponse.data.role.name);
            //Session Storage
            sessionStorage.setItem('jwt', token);
            sessionStorage.setItem('username', userResponse.data.username);
            sessionStorage.setItem('role', userResponse.data.role.name);


            if (userResponse.data.role.name === 'Admin') {
                navigate('/admin');
            } else if (userResponse.data.role.name === 'Login-User') {
                navigate('/profile');
            }
        } catch (error) {
            console.error(error);
            setErrMsg('Wrong username or password');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
        <NavigateBar/>
        <Container className="login-container">
            <Form onSubmit={handleSubmit} className="form-container">
                {errMsg && (
                    <Alert variant="danger">{errMsg}</Alert>
                )}
                <Form.Group controlId="formBasicUsername">
                    <Form.Label className="form-label">ชื่อผู้ใช้</Form.Label>
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="form-label">รหัสผ่าน</Form.Label>
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'เข้าสู่ระบบ'}
                    {isLoading && (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </Button>
                <Link to="/register" className="btn btn-link">สมัครสมาชิก</Link>
            </Form>
        </Container>
        </>
    );
};


export default LoginForm;
