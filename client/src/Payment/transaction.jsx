import "./payment.css"
import React, { useEffect, useState, useRef } from "react";
import NavigateBar from '../compo/Navbar.js';
import { MdOutlineUploadFile } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from './axiosAPI.js';
import img from "./Sources/Receipt.png"
import Sidebar from "../compo/sidebar.js";

function Transaction() {
    const [TourData, setTourData] = useState();
    const [cost, setCost] = useState(0); 
    const [total, setTotal] = useState(0);
    const [tourFile, setTourFile] = useState(null)
    const imageref = useRef(null);
    const navigate = useNavigate();
    const { id, seat } = useParams(null);

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
            <NavigateBar main="transaction"/>
            <Sidebar main="transaction"/>
            <div id="transaction" style={{backgroundColor:"rgba(217, 217, 217, 0.39)",height:"150vh",transition:"0.5s"}}>
                <div style={{ height: "200px" }}></div>
                <div className='payment-body'>
                    <div className='transaction-center' style={{paddingLeft:"20px"}}>
                        
                        <label style={{ fontSize: "20px", color: "#795695",marginTop:"20px"}} className="method-label kanit-medium">วิธีการชำระเงิน</label>
                        <img src={img}></img>
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
                                        <MdOutlineUploadFile size={27}/>
                                        <input style={{width:"100%",height:"110%"}}type="file" ref={imageref} onChange={handleFileChange} className='cost-button' placeholder="อัปโหลดสลิปหลักฐานการโอน"></input>
                                    </div>
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
