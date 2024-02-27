import './interface.css'
import React, {useState} from "react";
import NavigateBar from "./Navbar"

function Interface(){
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')
    /*const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [seat, setSeat] = useState('')
*/
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleSurNameChange = (e) => {
        setSurName(e.target.value)
    }

    return(
        <div>
            <NavigateBar/>
            <div className='body'>
                <div className='container'>
                    <label className='plus-jakarta-sans-bold'>ข้อมูลผู้ติดต่อ</label>
                    <div className='input-box'>
                        <label>ชื่อ-นามสกุล</label>
                        <div className='name'>
                            <input className='input' placeholder='first name'></input>
                            <input className = 'input' placeholder='last name'></input>
                        </div>
                    </div>
                    <div className='input-box'>
                        <label>email</label>
                        <div className='email'><input className='input' placeholder='email'></input></div>
                    </div>
                    <div className='input-box'>
                        <label>เบอร์โทร</label>
                        <div className='email'><input className='input' placeholder='contract'></input></div>
                    </div>
                    <div className='seat'>
                        <label>จำนวนที่นั่ง</label>
                        <div style={{display:'flex'}}>
                            <button className='button'>-</button>
                            <input className='seat-input' placeholder='จำนวนที่นั่ง'></input>
                            <button className='button'>+</button>
                        </div>
                    </div>
                    <div className='box'>
                        <label>ย้อนกลับ</label>
                        <button></button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default Interface;