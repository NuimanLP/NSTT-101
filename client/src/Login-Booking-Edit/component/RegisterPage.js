import React, { useState } from 'react';
import { Button, Form, Container, InputGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import NavigateBar from "../../compo/Navbar.js";
import '../../compo/Navbar.css';
import '../CSS/Register.css';
import config from '../../config.js';
import Sidebar from '../../compo/sidebar.js';

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
        window.location.href = `${config.windowlocateHome}/login`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMsg('รหัสผ่านไม่ตรงกัน');
            return;
        }
        else if (!password.match(/[!"#$%&'()*+,-./<=>?@[\]^_`{|}~]/)) {
            setErrorMsg('รหัสผ่านต้องประกอบด้วยอักขระพิเศษอย่างน้อย 1 ตัว');
            return;
        }
        else if (password.length < 8) {
            setErrorMsg('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว');
            return;
        }


        try {
            sessionStorage.removeItem('jwt');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('role');

            const response = await axios.post(`${config.serverUrlPrefix}/auth/local/register`, {
                username: username,
                email: email,
                password: password,
            });
            // console.log('Registration successful:', response.data);
            sessionStorage.setItem('username', username);
            handleGoback();
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMsg('สมัครสมาชิกไม่สำเร็จ');
        }
    };



    return (
        <>
            <Sidebar main="register"/>
            <NavigateBar main="register"/>
            <Container id="register" className="d-flex flex-column align-items-center justify-content-center" style={{height:"100vh"}}>
                <div style={{height:"10vh"}}>
                </div>
                <h2>เข้าสู่ระบบ</h2>
                <Form onSubmit={handleSubmit} className="w-100 register-border" style={{ maxWidth: '320px' }}>
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
                        <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                placeholder="ยืนยันรหัสผ่าน"
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

