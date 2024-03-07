import "./payment.css"
import React, { useEffect, useState, useRef } from "react";
import NavigateBar from '../compo/Navbar.js';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from './axiosAPI.js';
import img from "./Sources/Receipt.png"
import Sidebar from "../compo/sidebar.js";
import config from "../config.js";

function Transaction() {
    const [TourData, setTourData] = useState();
    const [cost, setCost] = useState(0); 
    const [total, setTotal] = useState(0);
    const [tourFile, setTourFile] = useState(null)
    const [image, setImage] = useState(null);
    const imageref = useRef(null);
      const navigate = useNavigate();
    const { id, seat, newDate } = useParams(); // เพิ่ม newDate ในรายการรับพารามิเตอร์
    const [tour,setTour] = useState(null);

    const fetchTour = async () => {
        try {
            const Data = await axios.get(`${API.prefix}${API.tour}/${id}`);
            const tourAttributes = Data.data.data.attributes;
            setTourData(tourAttributes);
            const tourCost = tourAttributes.Price;
            setCost(tourCost);
            setTotal(tourCost * seat);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleCreateTour = async () => {
        try {
            const tourResponse = await axios.post(`${config.serverUrlPrefix}/bookings`, {
                data: {
                    "BookingDate": newDate,
                    "Amount": 1
                }
            });
            console.log("Booking URL:", `${config.serverUrlPrefix}/bookings`); // ตรวจสอบ URL ที่ใช้ส่งคำขอ
            const bookingId = tourResponse.data.data.id;
    
            const uploadPromises = [];
            for (const file of tourFile) {
                const formData = new FormData();
                formData.append('ref', 'api::booking.booking');
                formData.append('field', 'Image');
                formData.append('refId', bookingId);
                formData.append('files', file);
    
                const uploadResponse = axios.post(`${config.serverUrlPrefix}/upload`, formData);
                uploadPromises.push(uploadResponse); // แก้เป็น uploadResponse แทน uploadPromise
            }
    
            await Promise.all(uploadPromises);
            console.log("Tour created successfully with images");
    
        } catch (error) {
            console.error('Error creating tour:', error);
        }
    };
    


    const handleFileChange = (e) => {
        const files = Array.from(imageref.current.files);
        setTourFile(files);
      };
    

    const handleClick = async () =>  {
        await handleCreateTour(); // เรียกใช้ handleCreateTour() ในการสร้างทัวร์
        navigate(`/bookingTour/${id}/${seat}/${total}`); // ลบพารามิเตอร์ที่ไม่จำเป็นออกไป
    }

    useEffect(() => {
        fetchTour();
    }, []);

    // Render only when cost is not undefined
    if (typeof cost === 'undefined') {
        return null; // or loading indicator
    }

    return (
        <div>
            <NavigateBar main="transaction"/>
            <Sidebar main="transaction"/>
            <div id="transaction" style={{backgroundColor:"rgba(217, 217, 217, 0.39)",height:"150vh",transition:"0.5s"}}>
                <div style={{ height: "200px" }}></div>
                <div className='payment-body'>
                    <div className='transaction-center' style={{paddingLeft:"20px"}}>
                        
                        <label style={{ fontSize: "20px", color: "#795695",marginTop:"20px"}} className="method-label kanit-medium">วิธีการชำระเงิน</label>
                        <img src={img} alt="Receipt"></img>
                        <div style={{ display: 'flex', width: "100%" }}>
                            <div className='cost-box' style={{ width: "50%",paddingTop:"30px" }}>
                                <div style={{ display: "flex" }}>
                                    <label className='kanit-medium'>ราคารวม</label>
                                    <label className='kanit-medium' style={{ marginLeft: "10%" }}>{cost}</label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label className='kanit-medium'>จำนวนคน</label>
                                    <label className='kanit-medium' style={{ marginLeft: "10%" }}>{seat}</label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label className='kanit-medium' style={{ fontSize: "25px",color:"rgba(255, 69, 0, 1)" }}>ราคาสุทธิ</label>
                                    <label className='kanit-medium' style={{ marginLeft: "10%", fontSize: "25px",color:"rgba(255, 69, 0, 1)" }}>{cost * seat}</label>
                                </div>
                            </div>
                            <div className='cost-box-2' style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "flex-end",paddingTop:"30px",gap:"20px" }}>
                                <label className='kanit-medium' style={{ float: 'right' }}>เเจ้งการโอนเงิน</label>
                                <div style={{width:"100%"}}>
                                    <div style={{ display: "flex",justifyContent:"center",borderRadius:"10px",backgroundColor:"rgba(0, 0, 0, 0.05)",boxShadow:"2px 2px #888888"}}>
                                        {/* <MdOutlineUploadFile size={27}/> */}
                                        <input 
    style={{ width: "100%", height: "110%" }} 
    type="file" 
    ref={imageref} 
    onChange={handleFileChange} 
    className='cost-button' 
    placeholder="อัปโหลดสลิปหลักฐานการโอน"
    accept="image/*" 
/>


                                    </div>
                                        <button onClick={() => handleCreateTour(image)} className="button" style={{ width: '160px', borderRadius: '0px' }}>
                                            <span className="button__text" style={{ marginLeft: '15px' }}>Add</span>
                                        </button>
                                </div>
                            </div>
                        </div>

                        <div className='box-bottom'>
                            <a href="#" style={{color:"rgba(0, 0, 0, 0.75)"}} onClick={() => { navigate(-1) }} className='kanit-medium'>ย้อนกลับ</a>
                            <button className="next-button kanit-medium" onClick={handleClick}>ถัดไป</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction;
