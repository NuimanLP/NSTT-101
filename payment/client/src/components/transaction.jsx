import './transaction.css'
import React, {useState} from "react";
import NavigateBar from "./Navbar"

function Transaction(){

    return(
        <div>
            <NavigateBar/>
            <div className='body'>
                <div className='container'>
                    
                    <div className='box'>
                        <a href='http://localhost:3000/'className='kanit-medium'>ย้อนกลับ</a>
                        <button>ถัดไป</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Transaction;