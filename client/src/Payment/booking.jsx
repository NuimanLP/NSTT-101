import './booking.css';
import React, { useEffect, useState } from 'react';
import Checklogin from "../compo/Navbar";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Booking() {
    const [data, setData] = useState(null);
    const [img, setImg] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/tours/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchAPIImg = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/tours/${id}/?populate=Image`);
                setImg(response.data.data.attributes.Image.data);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchAPI();
        fetchAPIImg();
    }, [id]);

    return (
        <div>
            <Checklogin />
            <div className='book-body'>
                <div className='book-container' style={{ height: "5vw", width: "30vw", backgroundColor: "rgba(217, 217, 217, 0)", textAlign: "center" }}>
                    <label>ตรวจสอบข้อมูลการจอง</label>
                </div>

                <div className='book-container' style={{ height: "10vw", width: "30vw", marginTop: "0%", fontSize: '18px', }}>
                    <label>ข้อมูลติดต่อ</label>
                    <div className='kanit-medium' style={{ fontSize: "14px", marginTop: "24px" }}>

                        <div style={{ display: 'flex' }}>
                            <div>
                                <div><label>ชื่อ-นามสกุล</label></div>
                                <div><label>อีเมล</label></div>
                                <div><label>เบอร์โทร</label></div>
                            </div>
                            <div style={{ display: "list-item", listStyle: 'none', marginLeft: "15px" }}>
                                {/* Render user information here */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='book-container' style={{ height: "12vw", width: "30vw", marginTop: "3%", fontSize: '18px' }}>
                    <div>
                        <label>ทัวร์ที่จอง</label>
                        <div style={{ display: 'flex' }}>
                            <div>
                                {img && img.length > 0 && (
                                    <div style={{ height: "125px", width: "125px" }}>
                                        <img src={`http://localhost:1337${img[0].attributes.url}`} alt='' width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} />
                                    </div>
                                )}
                            </div>
                            <div style={{ display: "list-item", listStyle: 'none', marginLeft: "15px" }}>
                                {/* Render tour information here */}
                            </div>
                        </div>
                    </div>

                    <div className='box' style={{ marginTop: "6%" }}>
                        <a href="#" onClick={() => { navigate(-1) }} className='kanit-medium'>ย้อนกลับ</a>
                        <button onClick={() => { navigate(`/paidPayment/${id}`) }}>ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
