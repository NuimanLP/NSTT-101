import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import NavigateBar from "./Navbar";
import '../CSS/Navbar.css'; 
import '../CSS/Profile.css';
const Profile = () => {
    const [profile, setProfile] = useState({
        username: '', Fullname: '', email: '', PhoneNumber: '', EmergencyContact: ''
    });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editProfile, setEditProfile] = useState({ ...profile });
    const [errorMsg, setErrorMsg] = useState('');


    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        window.location.href = '/';
    };
    useEffect(() => {
        fetchUserProfile();
    }, []);
    const fetchUserProfile = () => {
        const jwt = sessionStorage.getItem('jwt');
        axios.get('http://localhost:1337/api/users/me', {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => {
                setProfile({
                    id: response.data.id,
                    username: response.data.username,
                    fullname: response.data.fullname || '',
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber || '',
                    gender: response.data.gender || '',
                    emergencyContact: response.data.emergencyContact || '',
                });
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setError('Failed to load profile. Please try again later.');
            });
    };


    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (!jwt) {
            setError('You must be logged in to view this page.');
            return;
        }
        axios.get('http://localhost:1337/api/users/me', {
            headers: { Authorization: `Bearer ${jwt}` },
        })
            .then(response => {
                const userData = response.data;
                setProfile({
                    id: userData.id,
                    username: userData.username,
                    fullname: userData.Fullname || '',
                    email: userData.email,
                    phoneNumber: userData.PhoneNumber || '',
                    gender: userData.Gender || '',
                    emergencyContact: userData.EmergencyContact || '',
                });
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setError('Failed to load profile. Please try again later.');
            });
    }, []);
    const handleEditProfileChange = (e) => {
        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    };
    const handleSaveChanges = () => {
        const jwt = sessionStorage.getItem('jwt');
        if (!jwt) {
            setError('คุณต้องเข้าสู่ระบบเพื่อดูหน้านี้');
            return;
        }
        if (editProfile.username === '') {
            setErrorMsg('กรุณากรอกชื่อผู้ใช้');
            return;
        }

        const payload = {
            username: editProfile.username,
            Fullname: editProfile.Fullname,
            PhoneNumber: editProfile.PhoneNumber,
            Gender: editProfile.Gender
        };

        axios.put(`http://localhost:1337/api/users/${profile.id}`, payload, {
            headers: { Authorization: `Bearer ${jwt}` },
        })
            .then(response => {
                console.log('Profile updated successfully:', response.data);
                setProfile(prev => ({ ...prev, ...response.data }));
                fetchUserProfile();
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error updating user profile:', error.response?.data || error);
                setError('Failed to update profile. Please try again later.');
            });
    };



    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <> <NavigateBar/>
        <div>
            <h2>โปรไฟล์</h2>
            <p><strong>ชื่อผู้ใช้:</strong> {profile.username}</p>
            <p><strong>ชื่อ-นามสกุล:</strong> {profile.fullname}</p>
            <p><strong>อีเมลล์:</strong> {profile.email}</p>
            <p><strong>เบอร์โทรศัพท์:</strong> {profile.phoneNumber}</p>
            <p><strong>เพศ:</strong> {profile.gender}</p>
            <Button variant="primary" onClick={() => setShowModal(true)}>เเก้ไขโปรไฟล์</Button>
            <Button variant="secondary" className="w-100 mt-3" onClick={handleLogout}>ออกจากระบบ</Button>

            {/* Modal for editing profile */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>เเก้ไขโปรไฟล์</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ชื่อผู้ใช้ <span className="required-asterisk">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={editProfile.username}
                                onChange={handleEditProfileChange}
                            />
                             <p className="text-danger">{errorMsg}</p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>ชื่อ-นามสกุล</Form.Label>
                            <Form.Control
                                type="text"
                                name="Fullname"
                                value={editProfile.Fullname}
                                onChange={handleEditProfileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>เบอร์โทรศัพท์</Form.Label>
                            <Form.Control
                                type="text"
                                name="PhoneNumber"
                                value={editProfile.PhoneNumber}
                                onChange={handleEditProfileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>เพศ</Form.Label>
                            <Form.Control
                                type="text"
                                name="Gender"
                                value={editProfile.Gender}
                                onChange={handleEditProfileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>ปิดหน้าต่าง</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>บันทึกการเปลี่ยนเเปลง</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
};


export default Profile;