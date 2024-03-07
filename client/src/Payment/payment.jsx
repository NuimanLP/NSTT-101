import "./payment.css"
import React, {useState, useEffect} from "react";
import NavigateBar from '../compo/Navbar.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ResetScroll from '../Payment/resetScroll.jsx';
import { API } from './axiosAPI.js';
import axios from 'axios';
import Sidebar from "../compo/sidebar.js";
import config from "../config.js";
function Payment(){
    const [userData, setUserData] = useState()
    const [seat, setSeat] = useState(1);
    const navigate = useNavigate();
    const {id} = useParams(null);
    const [max,setMax] = useState()

    const fetchUser = async () => {
        try{
            const Data = await axios.get(`${API.prefix}${API.user}`);
            setUserData(Data.data)
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchBooking = async() => {
        const response = await axios.get(`${config.serverUrlPrefix}/tours/${id}`)
        setMax(response.data.data.attributes.AvailableSeat - response.data.data.attributes.CurrentSeat)
    }
    const handleAdd = () => {
        if (seat === '') setSeat(0);
        if(seat < max){
            setSeat(seat => seat+1)
        }
    }
    const handleRemove = () => {
        if (seat === '') setSeat(0);
        if (seat>1) setSeat(seat => seat-1);
    }

    const handleClick = (e) =>  {
        //axios.post()
        navigate(`/transaction/${id}/${seat}`,{id:id,seat:seat})
    }
    useEffect(() => {
        fetchUser()
        fetchBooking()
    },[]);

    return(
        <div style={{backgroundColor:"rgba(217, 217, 217, 0.39)"}}>
            <NavigateBar main="payment-body"/>
            <Sidebar main="payment-body"/>
            <ResetScroll/>
            <div style={{height:"80px"}}></div>
            <div id="payment-body" className='payment-body'>
                <div className="payment-center">
                    <div className="booker-head kanit-medium">ข้อมูลติดต่อ</div>
                    <div className="booker-detail">
                        <div className='input-box'>
                            <label className='kanit-medium'>ชื่อ-นามสกุล</label>
                            <div className='name'>
                                <label className='input'>{userData && userData.Firstname}</label>
                                <label className='input'>{userData && userData.Lastname}</label>
                            </div>
                        </div>
                        <div className='input-box'>
                            <label className='kanit-medium'>email</label>
                            <div className='email'><label className='input'>{userData && userData.email}</label></div>
                        </div>
                        <div className='input-box'>
                            <label className='kanit-medium'>เบอร์โทร</label>
                            <div className='email'><label className='input'>{userData && userData.PhoneNumber}</label></div>
                        </div>
                        <div className='seat' style={{display:"flex",gap:"20px",flexDirection:"column"}}>
                            <label className='kanit-medium'>จำนวนที่นั่ง</label>
                            <div style={{ display: 'flex' }}>
                                <button className='editSeatButton kanit-medium' onClick={handleRemove}>-</button>
                                <input
                                    type="number"
                                    max={max}
                                    min={1}
                                    className='seat-input'
                                    placeholder='จำนวนที่นั่ง'
                                    value={isNaN(seat) ? '' : seat}
                                    onChange={(e) => setSeat(parseInt(e.target.value))}
                                >
                                </input>
                                <button className='editSeatButton kanit-medium' onClick={handleAdd}>+</button>
                            </div>
                        </div>
                        <div style={{height:"100px"}}></div>
                        <div className='box-bottom'>
                            <a href="#" style={{color:"rgba(0, 0, 0, 0.75)"}} onClick={() => { navigate(-1) }} className='kanit-medium'>&lt; ย้อนกลับ</a>
                            <button className="next-button kanit-medium" onClick={handleClick}>ถัดไป</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Payment;
