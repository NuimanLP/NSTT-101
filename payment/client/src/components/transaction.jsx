import './transaction.css'
import React, {useState} from "react";
import NavigateBar from "./Navbar"
import Qrcode from "../Source/Qrcode.png";
import { MdOutlineUploadFile } from "react-icons/md";

function Transaction(){

    return(
        <div>
            <NavigateBar/>
            <div className='body'>
                <div className='container'>
                
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
                    <form action="http://localhost:3000/paidPayment">
                            <a href='#'className='kanit-medium'>ย้อนกลับ</a>
                            <button type="submit">ถัดไป</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Transaction;