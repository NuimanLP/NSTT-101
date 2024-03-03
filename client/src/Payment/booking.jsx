import './booking.css'
import React, { useEffect, useState } from 'react';
import Checklogin from "../compo/Navigate.js"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Booking(){
    const[data,setData] = useState(null);
  const[img,setImg] = useState(null);
  const navigate = useNavigate()
  const {id} = useParams(null)

  const fetchAPI = async () =>{
    const response = await axios.get(`http://localhost:1337/api/tours/${id}`);
    setData(response.data.data)
  } 

  const fetchAPIImg = async () =>{
    const response = await axios.get(`http://localhost:1337/api/tours/${id}/?populate=Image`);
    setImg(response.data.data.attributes.Image.data)
    console.log(data)

  } 

  useEffect(() =>{
    fetchAPI()
    fetchAPIImg()
  }, [])
    return(
        <div>
            <Checklogin/>
            <div className='book-body'>
                <div className='book-container' style={{height: "5vw",width: "30vw", backgroundColor:"rgba(217, 217, 217, 0)", textAlign:"center"}}>
                    <label>ตรวจสอบข้อมูลการจอง</label>
                </div>
                
                <div className='book-container' style={{height: "10vw",width: "30vw", marginTop:"0%",fontSize: '18px', }}>
                    <label>ข้อมูลติดต่อ</label>
                    <div className='kanit-medium' style={{fontSize:"14px", marginTop:"24px"}}>
                       
                        <div style={{display:'flex'}}>
                            <div>
                                <div><label>ชื่อ-นามสกุล</label></div>
                                <div><label>อีเมล</label></div>
                                <div><label>เบอร์โทร</label></div>
                            </div>
                            <div style={{display:"list-item", listStyle:'none', marginLeft:"15px"}}>
                                <div><label>1</label></div>
                                <div><label>1</label></div>
                                <div><label>1</label></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='book-container' style={{height: "12vw",width: "30vw", marginTop:"3%",fontSize: '18px'}}>
                    <div>
                        <label>ทัวร์ที่จอง</label>
                        <div style={{display:'flex'}}>
                        { img && img.map (val =>(
          <div>
              <img src={`http://localhost:1337${img[0].attributes.url}`} width='125px' height='125px'></img>
          </div>
        ))}
                            <div style={{display:"list-item", listStyle:'none', marginLeft:"15px"}}>
                                <div><label>1</label></div>
                                <div><label>1</label></div>
                                <div><label>1</label></div>
                            </div>
                        </div>
                    </div>

                    <div className='box' style={{marginTop:"6%"}}>
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
export default Booking;