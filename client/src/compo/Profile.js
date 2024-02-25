import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import NavigateBar from "./Navbar";
import '../CSS/Navbar.css'; 

const Profile = () => {
    const [profile, setProfile] = useState({
        username: '', Fullname: '', email: '', PhoneNumber: '', EmergencyContact: ''
    });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editProfile, setEditProfile] = useState({ ...profile });

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
            setError('You must be logged in to update your profile.');
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
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Full Name:</strong> {profile.fullname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <Button variant="primary" onClick={() => setShowModal(true)}>Edit Profile</Button>
            <Button variant="secondary" className="w-100 mt-3" onClick={handleLogout}>Logout</Button>

            {/* Modal for editing profile */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={editProfile.username}
                                onChange={handleEditProfileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Fullname"
                                value={editProfile.Fullname}
                                onChange={handleEditProfileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="PhoneNumber"
                                value={editProfile.PhoneNumber}
                                onChange={handleEditProfileChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
};


export default Profile;