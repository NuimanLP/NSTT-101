import './interface.css'; // Importing CSS file
import React, { useState } from "react";
import NavigateBar from "./Navbar"; // Assuming Navbar component is correctly imported
import { Form, Col, Row, Button } from 'react-bootstrap';

function Interface() {
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [seat, setSeat] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSurNameChange = (e) => {
        setSurName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleSeatChange = (e) => {
        setSeat(e.target.value);
    };

    return (
        <div>
            <NavigateBar />
            <div className="interface-container">
                <Form>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>ชื่อ</Form.Label>
                            <Form.Control type="text" value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>นามสกุล</Form.Label>
                            <Form.Control type="text" value={surName} onChange={handleSurNameChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>อีเมล</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                            <Form.Control type="tel" value={contact} onChange={handleContactChange} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>ที่นั่ง</Form.Label>
                            <Form.Control as="select" value={seat} onChange={handleSeatChange}>
                                <option value="">เลือกที่นั่ง</option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="A3">A3</option>
                                {/* Add more options as needed */}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default Interface;
