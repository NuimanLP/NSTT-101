import "./payment.css"
import React, { useEffect, useState, useRef } from "react";
import NavigateBar from '../compo/Navbar.js';
import { MdOutlineUploadFile } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from './axiosAPI.js';

function Transaction() {
    const [TourData, setTourData] = useState();
    const [cost, setCost] = useState(0); 
    const [total, setTotal] = useState(0);
    const [tourFile, setTourFile] = useState(null)
    const imageref = useRef(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA5NjI5MjcwLCJleHAiOjE3MTIyMjEyNzB9.f3zAqgQ5HjfROxfHLbS8s64UI5nNN1xphuxCeAV1Mic';
    const navigate = useNavigate();
    const { id, seat } = useParams(null);

    const fetchTour = async () => {
        try {
            const Data = await axios.get(`${API.prefix}${API.tour}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const tourAttributes = Data.data.data.attributes;
            setTourData(tourAttributes);
            const tourCost = tourAttributes.Price;
            setCost(tourCost);
            setTotal(tourCost * seat);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddImage = async () => {
        try {

          const uploadPromises = [];
          for (const file of tourFile) {
            const formData = new FormData();
            formData.append('ref', 'api::tour.tour');
            formData.append('field', 'Image');
            formData.append('refId', id);
            formData.append('files', file);
    
            const uploadPromise = axios.post('http://localhost:1337/api/upload', formData);
            uploadPromises.push(uploadPromise);
          }
    
          const uploadResponses = await Promise.all(uploadPromises);
    
          console.log("Tour created successfully with images:", uploadResponses);
    
        } catch (error) {
          console.error('Error creating tour:', error);
        }
      };

      const handleFileChange = (e) => {
        const files = Array.from(imageref.current.files);
        setTourFile(files);
      };
      const handleClick = async () =>  {
        handleAddImage()
        navigate(`/bookingTour/${id}/${seat}/${total}`, { id: id }, { seat: seat }, { total: total });
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
            <NavigateBar />
            <div className='payment-body'>
                <div className='container0'>

                    <div>
                        <div style={{ textAlign: 'center' }}><label>วิธีการชำระเงิน</label></div>
                        <img src=''></img>
                        <div style={{ display: 'flex' }}>
                            <div className='cost-box'>
                                <div style={{ display: "flex" }}>
                                    <label className='kanit-medium'>ราคารวม</label>
                                    <label className='kanit-medium' style={{ marginLeft: "25%" }}>{cost}</label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label className='kanit-medium'>จำนวนคน</label>
                                    <label className='kanit-medium' style={{ marginLeft: "21%" }}>{seat}</label>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label className='kanit-medium-highlight' style={{ width: "120%" }}>ราคาสุทธิ</label>
                                    <label className='kanit-medium' style={{ marginLeft: "5%" }}>{cost * seat}</label>
                                </div>
                            </div>
                            <div className='cost-box-2'>
                                <div><label className='kanit-medium' style={{ float: 'right' }}>เเจ้งการโอนเงิน</label></div>
                                <div>
                                    <MdOutlineUploadFile />
                                    <input type="file" ref={imageref} onChange={handleFileChange} className='cost-button' placeholder="อัปโหลดสลิปหลักฐานการโอน"></input>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='box'>
                        <a href="#" onClick={() => { navigate(-1) }} className='kanit-medium'>ย้อนกลับ</a>
                        <button onClick={handleClick}>ถัดไป</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Transaction;
