import './transaction.css'
import React, {useState} from "react";
import NavigateBar from "./Navbar"
import Qrcode from "../Media/Qrcode.png";
import { MdOutlineUploadFile } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';

function Transaction(){

    const navigate = useNavigate()
    const {id} = useParams(null)

    return(
        <div>
            <NavigateBar/>
            <div className='body'>
                <div className='container0'>
                
                    <div>
                        <div style={{textAlign:'center'}}><label>วิธีการชำระเงิน</label></div>
                        <img src={Qrcode} width='60%' height='60%'/>
                        <div style={{display:'flex'}}>
                            <div className='cost-box'>
                                <div><label className='kanit-medium'>ราคารวม xxx</label></div>
                                <div><label className='kanit-medium'>จำนวนคน xxx</label></div>
                                <div><label className='kanit-medium-highlight'>ราคาสุทธิ xxx</label></div>
                            </div>
                            <div className='cost-box-2'>
                                <div><label className='kanit-medium' style={{float:'right'}}>เเจ้งการโอนเงิน</label></div>
                                <div>
                                    <button className='cost-button'> <MdOutlineUploadFile/> อัปโหลดสลิปหลักฐานการโอน</button>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <div className='box'>
                            <a href="#" onClick={()=>{navigate(-1)}} className='kanit-medium'>ย้อนกลับ</a>
                            <button onClick={()=>{navigate(`/booking/${id}`,{id:id})}}>ถัดไป</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Transaction;