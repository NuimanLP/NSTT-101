import "./payment.css"
import React from "react";
import NavigateBar from '../compo/Navbar.js';
function PaidPayment(){

    return(
        <div>
            <NavigateBar/>
            <div className='payment-body'>
                <div className='container'>
                
                    <div>
                        <div style={{textAlign:'center'}}><label>ชำระเงินเรียบร้อยเเล้ว</label></div>
                        <img src='' width='100%' height='100%'/>
                        <div style={{display:'flex'}}>
                            <div className='detail'>
                                <label className='kanit-medium'>วันเวลา ออกเดินทาง</label>
                            </div>
                        </div>
                        <div className='detail'><label>--------------------------------------------------</label></div>
                        <div className='detail2'>
                            <div className='detail'><label style={{color:'red'}}>**หมายเหตุ**</label></div>
                            <div className='detail'><label>ท่านสามารถยกเลิกขอคืนเงินได้ก่อนเวลาไปทัวร์ 10 วัน</label></div>
                        </div>
                        
                        
                    </div>
                    
                    <div className='box'>
                        <form action="http://localhost:3000/">
                            <button type="submit">กลับหน้าเเรก</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default PaidPayment;