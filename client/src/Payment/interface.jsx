import './interface.css'
import React, {useState} from "react";
import NavigateBar from "./Navbar"
import Checklogin from "../compo/Navigate.js"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ResetScroll from '../compo/resetScroll.jsx';
import axios from 'axios';

function Interface(){
    const [seat, setSeat] = useState(0)

    const navigate = useNavigate()
    const {id} = useParams(null)
    
    const handleSeatChange = (e) => {
        setSeat(e.target.value)
    }
    const handleAdd = () => {
        setSeat(seat => seat+1)
    }
    const handleRemove = () => {
        if (seat > 0) {
            setSeat(seat => seat-1)
        } 
    }

    const handleClick = (e) =>  {
        //axios.post()
        navigate(`/transaction/${id}`,{id:id})
    }

    return(
        <div>
            <Checklogin/>
            <ResetScroll/>
            <div className='body'>
                <div className='container0'>
                    <label>ข้อมูลผู้ติดต่อ</label>
                    <div className='input-box'>
                        <label className='kanit-medium'>ชื่อ-นามสกุล</label>
                        <div className='name'>
                            <label className='input'>test</label>
                            <label className='input'>test</label>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='kanit-medium'>email</label>
                        <div className='email'><label className='input'>test</label></div>
                    </div>
                    <div className='input-box'>
                        <label className='kanit-medium' >เบอร์โทร</label>
                        <div className='email'><label className='input'>test</label></div>
                    </div>
                    <div className='seat'>
                        <label className='kanit-medium'>จำนวนที่นั่ง</label>
                        <div style={{display:'flex'}}>
                            <button className='button' onClick={handleRemove}>-</button>
                            <input className='seat-input' placeholder='จำนวนที่นั่ง' onChange={handleSeatChange} value={seat}></input>
                            <button className='button' onClick={handleAdd}>+</button>
                        </div>
                    </div>
                    <div className='box'>
                            <a href="#" onClick={()=>{navigate(-1)}} className='kanit-medium'>ย้อนกลับ</a>
                            <button onClick={()=>{navigate(`/transaction/${id}`,{id:id})}}>ถัดไป</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Interface;