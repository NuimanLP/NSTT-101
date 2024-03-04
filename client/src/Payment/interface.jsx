import './interface.css'
import React, {useState} from "react";
import NavigateBar from "./Navbar"
import Checklogin from "../compo/Navbar.js"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ResetScroll from '../compo/resetScroll.jsx';
import axios from 'axios';

function Interface(){
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')
    /*const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [seat, setSeat] = useState('')
*/
    const navigate = useNavigate()
    const {id} = useParams(null)
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleSurNameChange = (e) => {
        setSurName(e.target.value)
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
                            <input className='input' placeholder='first name'></input>
                            <input className = 'input' placeholder='last name'></input>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label className='kanit-medium'>email</label>
                        <div className='email'><input className='input' placeholder='email'></input></div>
                    </div>
                    <div className='input-box'>
                        <label className='kanit-medium'>เบอร์โทร</label>
                        <div className='email'><input className='input' placeholder='contract'></input></div>
                    </div>
                    <div className='seat'>
                        <label className='kanit-medium'>จำนวนที่นั่ง</label>
                        <div style={{display:'flex'}}>
                            <button className='button'>-</button>
                            <input className='seat-input' placeholder='จำนวนที่นั่ง'></input>
                            <button className='button'>+</button>
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