import "./payment.css";
import React, { useEffect, useState } from 'react';
import NavigateBar from '../compo/Navbar.js';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from './axiosAPI.js';
import config from "../config.js";

function Booking() {
    const [TourData, setTourData] = useState();
    const [userData, setUserData] = useState(); 
    const [img, setImg] = useState(null); 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA5NjU1NTE4LCJleHAiOjE3MTIyNDc1MTh9.nhxonYA2pOFTAsqQZAXvlix3Kte398RYIXimdpiQpgY';
    const navigate = useNavigate();
    const {id, total, seat} = useParams(null);

    const fetchTour  = async () => {
        try{
            const Data = await axios.get(`${API.prefix}${API.tour}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTourData(Data.data.data.attributes);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchUser = async () => {
        try{
            const Data = await axios.get(`${API.prefix}${API.user}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setUserData(Data.data);
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchAPIImg = async () =>{
        const response = await axios.get(`${config.serverUrlPrefix}/tours/${id}/?populate=Image`);
        setImg(response.data.data.attributes.Image.data)
    
      } 

    useEffect(() => {
        fetchTour();
        fetchUser();
        fetchAPIImg();
    }, []);

    const handleClick = async (e) =>  {
        try {
            await axios.post(`${API.prefix}/api/bookings`, {
                data:{
                    Amount: seat,
                    Total_Price: total
            }}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/successPaid");
        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    return (
        <div>
            <NavigateBar />
            <div className='payment-body'>
                <div className='book-container' style={{ height: "5vw", width: "30vw", backgroundColor: "rgba(217, 217, 217, 0)", textAlign: "center" }}>
                    <label>ตรวจสอบข้อมูลการจอง</label>
                </div>

                <div className='book-container' style={{ height: "10vw", width: "30vw", marginTop: "0%", fontSize: '18px', }}>
                    <label>ข้อมูลติดต่อ</label>
                    <div className='kanit-medium' style={{ fontSize: "14px", marginTop: "24px" }}>

                        <div style={{ display: 'flex' }}>
                            <div>
                                <div>
                                    <label>ชื่อ-นามสกุล</label>
                                    <label>{userData && userData.Firstname}</label>
                                    <label>{userData && userData.Lastname}</label>
                                </div>
                                <div>
                                    <label>อีเมล</label>
                                    <label>{userData && userData.email}</label>
                                </div>
                                <div>
                                    <label>เบอร์โทร</label>
                                    <label>{userData && userData.PhoneNumber}</label>
                                </div>
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
                        <div style={{display:"flex"}}>
                            {img && img.map((val, index) => (
                                <div key={index}>
                                    <img src={`${config.serverReceipt}${val.attributes.url}`} alt='' width={'30%'} height={'30%'} />
                                </div>
                            ))}
                            <div>
                                <div>{id}</div>
                                <div><label>{TourData && TourData.EventName}</label></div>
                                <label>{TourData && TourData.TourDateInit} ถึง {TourData && TourData.TourDateFinish}</label>
                            </div>
                        </div>
                    </div>
                    <div className='box' style={{ marginTop: "6%" }}>
                        <a href="#" onClick={()=>navigate(-1)} className='kanit-medium'>ย้อนกลับ</a>
                        <button onClick={handleClick}>ถัดไป</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
