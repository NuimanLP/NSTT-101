import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, OverlayTrigger, Popover } from 'react-bootstrap';
import axios from 'axios';
import NavigateBar from "../../compo/Navbar.js";
import '../../compo/Navbar.css';
import '../CSS/Profile.css';
import { Receipt } from 'react-bootstrap-icons';
import config from '../../config.js';
const Profile = () => {
    const [profile, setProfile] = useState({
        username: '', Firstname: '', Lastname: '', email: '', PhoneNumber: ''
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
            case "อยู่ระหว่างการดำเดินการ":
                return 'gray';
            case 'เสร็จสมบูรณ์':
                return 'green';
            default:
                return 'black';
        }
    };
    //RenderPaymentText
    const renderPaymentStatus = (booking, bookingID) => {
        console.log('renderPaymentStatus bookingId:', bookingID);
        const status = capitalizeFirstLetter(booking.PaymentStatus);
        const statusStyle = {
            fontWeight: 'bold',
        };

        if (booking.PaymentStatus.toLowerCase() === 'เสร็จสมบูรณ์') {
            return (
                <OverlayTrigger trigger="click" placement="left" overlay={cancelPopover(bookingID)}>
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
    const cancelPopover = (bookingID) => {
        console.log('cancelPopover bookingId:', bookingID);
        return (
            <Popover id="popover-cancel-tour">
                <Popover.Header as="h3">ยกเลิกทัวร์</Popover.Header>
                <Popover.Body>
                    ท่านต้องการยกเลิกทัวร์?
                    <div className="d-flex justify-content-around mt-2">
                        <Button variant="danger" onClick={() => cancelBookingPayment(bookingID)}>Yes</Button>
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
                `${config.serverUrlPrefix}/bookings/${bookingsId}/update-payment-status`,
                { PaymentStatus: "ยกเลิก" },
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                }
            );
            if (response.status === 200) {
                alert("ยกเลิกทัวร์เรียบร้อยแล้ว!");
                fetchBookings();
            } else {
                alert("ไม่สามารถยกเลิกทัวร์ได้");
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            alert("เกิดข้อผิดพลาดขณะกำลังยกเลิกทัวร์");
        }
    };


    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        window.location.href = `${config.windowlocateHome}`;
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
                    Firstname: response.data.Firstname || '',
                    Lastname: response.data.Lastname || '',
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber || '',
                    gender: response.data.gender || '',
                    emergencyContact: response.data.emergencyContact || '',
                });
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setError('โหลดโปรไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้งในภายหลัง');
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
            setError('คุณต้องเข้าสู่ระบบเพื่อดูหน้านี้');
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
                    Firstname: response.data.Firstname || '',
                    Lastname: response.data.Lastname || '',
                    email: userData.email,
                    phoneNumber: userData.PhoneNumber || '',
                    gender: userData.Gender || '',
                    emergencyContact: userData.EmergencyContact || '',
                });
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setError('โหลดโปรไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้งในภายหลัง');
            });
    }, []);
    const handleEditProfileChange = (e) => {
        setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
    };
    // const handleFullnameChange = (e) => {
    //     const fullname = e.target.value;
    //     const [Firstname, Lastname = ''] = fullname.split(' ');
    //     setEditProfile({ ...editProfile, Firstname, Lastname });
    // };

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
            Firstname: editProfile.Firstname,
            Lastname: editProfile.Lastname,
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
                setError('โหลดโปรไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้งในภายหลัง');
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
                <h2 className="profile-title">โปรไฟล์</h2>
                <p className="profile-info"><strong>ชื่อผู้ใช้:</strong> {profile.username}</p>
                <p className="profile-info"><strong>ชื่อ:</strong> {profile.Firstname}</p>
                <p className="profile-info"><strong>นามสกุล:</strong> {profile.Lastname}</p>
                <p className="profile-info"><strong>อีเมลล์:</strong> {profile.email}</p>
                <p className="profile-info"><strong>เบอร์โทรศัพท์:</strong> {profile.phoneNumber}</p>
                <p className="profile-info"><strong>เพศ:</strong> {profile.gender}</p>

                <Button variant="primary" className="mobile-friendly-button" onClick={() => setShowModal(true)} style={{ fontSize: "18px", margin: '10px' }}>เเก้ไขโปรไฟล์</Button>
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
                                <Form.Label>ชื่อ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Firstname"
                                    value={editProfile.Firstname}
                                    onChange={handleEditProfileChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>นามสกุล</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Lastname"
                                    value={editProfile.Lastname}
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
                <h3 className="profile-title">การจองของฉัน</h3>
                <Table striped bordered hover size="sm" className="table-custom">                    <thead>
                    <tr>
                        <th>#</th>
                        <th>ชื่อทัวร์</th>
                        <th>วันที่ทำการจอง</th>
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
                                <td>{booking.TourDateInit} ถึง {booking.TourDateFinish}</td>
                                <td>{booking.Total_Price}   บาท</td>
                                <td>{booking.Amount} ท่าน</td>
                                <td style={{ color: getStatusColor(booking.PaymentStatus), fontWeight: 'bold' }}>
                                    {renderPaymentStatus(booking, booking.BookingID)}
                                </td>
                                <td>
                                    <Receipt onClick={() => handleReceiptClick(booking.Receipt.formats.small.url)} style={{ cursor: 'pointer' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="secondary" className="mobile-friendly-button" onClick={handleLogout} style={{ fontSize: "18px" }}>ออกจากระบบ</Button>
            </div>
        </>
    );
};


export default Profile;
