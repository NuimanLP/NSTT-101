import "./payment.css"
import React, {useState, useEffect} from "react";
import NavigateBar from '../compo/Navbar.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ResetScroll from '../Payment/resetScroll.jsx';
import { API } from './axiosAPI.js';
import axios from 'axios';

function Payment(){
    const [userData, setUserData] = useState()
    const [seat, setSeat] = useState(1);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA5NjE4MDgyLCJleHAiOjE3MTIyMTAwODJ9.OV0X3Rj1VHprNu40IC8RmYDevoeapGTRTRAlotiu2NI'

    const navigate = useNavigate();
    const {id} = useParams(null);
    
    const fetchUser = async () => {
        try{
            const Data = await axios.get(`${API.prefix}${API.user}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setUserData(Data.data)
        }catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAdd = () => {
        if (seat === '') setSeat(0);
        setSeat(seat => seat+1);
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
    },[]);

    return(
        <div>
            <NavigateBar/>
            <ResetScroll/>
            <div className='payment-body'>
                <div className='container1'>
                <label>ข้อมูลผู้ติดต่อ</label>
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
                    <div className='seat'>
                        <label className='kanit-medium'>จำนวนที่นั่ง</label>
                        <div style={{display:'flex'}}>
                            <button className='button' onClick={handleRemove}>-</button>
                            <input 
                            className='seat-input' 
                            placeholder='จำนวนที่นั่ง' 
                            value={isNaN(seat) ? '' : seat} 
                            onChange={(e) => setSeat(parseInt(e.target.value))}>
                            </input>
                            <button className='button' onClick={handleAdd}>+</button>
                        </div>
                    </div>
                    <div className='box'>
                            <a href="#" onClick={()=>{navigate(-1)}} className='kanit-medium'>ย้อนกลับ</a>
                            <button onClick={handleClick}>ถัดไป</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Payment;