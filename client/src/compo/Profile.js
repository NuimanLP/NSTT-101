import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({ username: '', email: '', personalInfo: '' });
    const [error, setError] = useState('');

    const handleLogout = () => {
        sessionStorage.removeItem('jwt'); 
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        window.location.href = 'http://localhost:3000/';
    };

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');

        if (!jwt) {
            setError('You must be logged in to view this page.');
            return;
        }

        axios.get('http://localhost:1337/api/users/me', { 
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => {
                console.log(response.data);
                const userData = response.data;
                setProfile({
                    username: userData.username,
                    email: userData.email,
                    personalInfo: JSON.stringify(userData.personalInfo),
                });
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setError('Failed to load profile. Please try again later.');
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Personal Information:</strong> {profile.personalInfo}</p>
            <Button variant="secondary" className="w-100 mt-3" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Profile;
