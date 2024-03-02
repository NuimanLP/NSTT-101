import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form, Table, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import NavigateBar from "./Navbar";
import '../CSS/Navbar.css';
import '../CSS/Profile.css';
import { Receipt } from 'react-bootstrap-icons';
import config from '../../config';
const Profile = () => {
    const [profile, setProfile] = useState({
        username: '', Fullname: '', email: '', PhoneNumber: ''
    });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editProfile, setEditProfile] = useState({ ...profile });
    const [errorMsg, setErrorMsg] = useState('');
    const [bookings, setBookings] = useState([]);
    const jwt = sessionStorage.getItem('jwt');
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [selectedReceiptUrl, setSelectedReceiptUrl] = useState('');


    //ShowReceiptModal
    const handleReceiptClick = (receiptUrl) => {
        const absoluteReceiptUrl = `${config.serverReceipt}${receiptUrl}`;
        setSelectedReceiptUrl(absoluteReceiptUrl);
        setShowReceiptModal(true);
    };

    //PaymentStatusColor
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const getStatusColor = (status) => {

        switch (status) {
            case 'ยกเลิก':
                return 'red';
            case 'รอดำเนินการ':
                return 'gray';
            case 'เสร็จสมบูรณ์':
                return 'green';
            default:
                return 'black';
        }
    };
    //RenderPaymentText
    const renderPaymentStatus = (booking) => {
        console.log('renderPaymentStatus bookingId:', booking.id);
        const status = capitalizeFirstLetter(booking.PaymentStatus);
        const statusStyle = {
            fontWeight: 'bold',
        };

        if (booking.PaymentStatus.toLowerCase() === 'เสร็จสมบูรณ์') {
            return (
                <OverlayTrigger trigger="click" placement="left" overlay={cancelPopover(booking.id)}>
                    <Button variant="success" style={{ ...statusStyle, cursor: 'pointer' }}>
                        {status}
                    </Button>
                </OverlayTrigger>
            );
        } else {
            return (
                <span style={{ ...statusStyle, color: getStatusColor(booking.PaymentStatus) }}>
                    {status}
                </span>
            );
        }
    };
    //Cancel PopOver
    const cancelPopover = (bookingId) => {
        console.log('cancelPopover bookingId:', bookingId);
        return (
            <Popover id="popover-cancel-tour">
                <Popover.Header as="h3">ยกเลิกทัวร์</Popover.Header>
                <Popover.Body>
                    ท่านต้องการยกเลิกทัวร์?
                    <div className="d-flex justify-content-around mt-2">
                        <Button variant="danger" onClick={() => cancelBookingPayment(bookingId)}>Yes</Button>
                    </div>
                </Popover.Body>
            </Popover>
        )
    };
    //CanclePayment
    const cancelBookingPayment = async (bookingsId) => {
        try {
            console.log(`Cancelling booking payment for ID: ${bookingsId}`);
            const response = await axios.put(
                `${config.serverUrlPrefix}/bookings/${bookingsId}/update-status`,
                { PaymentStatus: "รอดำเนินการ" },
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                }
            );
            if (response.status === 200) {
                alert("Payment status updated successfully!");
                fetchBookings();
            } else {
                alert("Failed to update payment status.");
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            alert("An error occurred while updating the payment status.");
        }
    };
    

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        window.location.href = '/';
    };
    useEffect(() => {
        fetchUserProfile();
        fetchBookings();
    }, []);
    const fetchUserProfile = () => {
        const jwt = sessionStorage.getItem('jwt');
        axios.get(`${config.serverUrlPrefix}/users/me`, {
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

    const fetchBookings = async () => {
        try {
            await axios.get(`${config.serverUrlPrefix}/bookings/user/findUserBookings`, {
                headers: { Authorization: `Bearer ${jwt}` },
            })
                .then(response => {
                    const userbookedTours = response.data;
                    setBookings(userbookedTours);
                    console.log(userbookedTours);
                })
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };



    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (!jwt) {
            setError('You must be logged in to view this page.');
            return;
        }
        axios.get(`${config.serverUrlPrefix}/users/me`, {
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

        axios.put(`${config.serverUrlPrefix}/users/${profile.id}`, payload, {
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
        <>
            <Modal show={showReceiptModal} onHide={() => setShowReceiptModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>ใบเสร็จ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedReceiptUrl} alt="Receipt" style={{ width: '100%' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReceiptModal(false)}>ปิด</Button>
                </Modal.Footer>
            </Modal>
            <NavigateBar />
            <div>
                <h2>โปรไฟล์</h2>
                <p><strong>ชื่อผู้ใช้:</strong> {profile.username}</p>
                <p><strong>ชื่อ-นามสกุล:</strong> {profile.fullname}</p>
                <p><strong>อีเมลล์:</strong> {profile.email}</p>
                <p><strong>เบอร์โทรศัพท์:</strong> {profile.phoneNumber}</p>
                <p><strong>เพศ:</strong> {profile.gender}</p>
                <Button variant="primary" onClick={() => setShowModal(true)}>เเก้ไขโปรไฟล์</Button>
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
                <p></p>
                <h3>การจองของฉัน</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อทัวร์</th>
                            <th>วันที่ทำรายการการจอง</th>
                            <th>รายละเอียดทัวร์</th>
                            <th>วันที่ไป</th>
                            <th>ราคาทั้งหมด</th>
                            <th>จำนวนคน</th>
                            <th>สถานะการชำระเงิน</th>
                            <th>ใบเสร็จ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{booking.EventName}</td>
                                <td>{booking.BookingDate}</td>
                                <td>{booking.EventDetail}</td>
                                <td>{booking.InitDates} ถึง {booking.DeadlineDates}</td>
                                <td>{booking.Total_Price}   บาท</td>
                                <td>{booking.Amount} ท่าน</td>
                                <td style={{ color: getStatusColor(booking.PaymentStatus), fontWeight: 'bold' }}>
                                    {renderPaymentStatus(booking)}
                                </td>
                                <td>
                                    <Receipt onClick={() => handleReceiptClick(booking.Receipt.formats.small.url)} style={{ cursor: 'pointer' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Button variant="secondary" className="w-100 mt-3" onClick={handleLogout}>ออกจากระบบ</Button>

                </Table>
            </div>
        </>
    );
};


export default Profile;
