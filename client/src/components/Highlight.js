import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tourid.css'

function Highlight() {
    const[data,setData] = useState(null)

    const fetchAPI = async () =>{
      const response = await axios.get("http://localhost:1337/api/tours");
      setData(response.data.data)
    }
  
    useEffect(() =>{
      fetchAPI()
    }, [])

  return (
    <div class="position-relative" style={{ border: '3px solid #73AD21' }}>
    <div class='highlighttour' >
    <div style={{marginBottom: '20px'}}></div>
      <h4 class='namehightlight' style={{marginBottom: '47px',marginLeft: '50px'}}>ไฮไลท์ทัวร์</h4>
      <div className="position-relative" style={{ display: 'flex' }}>
        <div class='hightlight' style={{marginLeft:'50px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}}> <img src='https://cdn-icons-png.flaticon.com/128/3916/3916882.png' alt='Marker' width='48px' height='48px'/></div>
          <div class='texthigthlight' style={{marginTop: '10px',marginLeft: '18px'}}>Multi-day</div>
        </div>
        <div class='hightlight' style={{marginLeft:'70px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}} ><img src='https://cdn-icons-png.flaticon.com/128/6349/6349916.png' alt='Restaurant' width='48px' height='48px'/></div>
          <div class='texthigthlight' style={{marginTop: '10px',marginLeft: '18px'}}>7 มื้ออาหาร</div>
        </div>
        <div class='hightlight' style={{marginLeft:'70px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}} ><img src='https://cdn-icons-png.flaticon.com/128/5073/5073927.png' alt='Bed' width='48px' height='48px'/></div>
          <div class='texthigthlight' style={{marginTop: '1px',marginLeft: '18px'}}>คะแนนที่พัก</div>
          <div></div>
        </div>
        <div class='hightlight' style={{marginLeft:'70px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}} ><img src='https://cdn-icons-png.flaticon.com/128/6955/6955575.png' alt='Car-side' width='48px' height='48px'/></div>
          <div class='texthigthlight'style={{marginTop: '10px',marginLeft: '34px'}}>รถทั่วร์</div>
        </div>
       </div>
       <div class="position-relative" style={{display: 'flex',marginTop:'52px'}}>
        <div class='hightlight0' style={{marginLeft: '41px' }}>
          <div style={{marginTop:'-5px'}}>
            <img src='https://cdn-icons-png.flaticon.com/128/9239/9239972.png' alt='Sign Hanging' width={'34px'} height={'34px'} style={{marginLeft: '16px'}}/> <h class='textmenuhightlight'style={{marginLeft:'15px'}}><h class='texthigthlight0'>4</h> สถานที่เที่ยว</h>
          </div>
        </div>
        <div class='hightlight0' style={{marginLeft: '100px'}}>
          <div style={{marginTop:'-5px'}}>
            <img src='https://cdn-icons-png.flaticon.com/128/6627/6627769.png' alt='Pennant' width={'34px'} height={'34px'} style={{marginLeft: '16px'}}/> <h class='textmenuhightlight' style={{marginLeft:'15px'}}><h class='texthigthlight0'>6</h> กิจกรรม</h>
          </div>
        </div>
       </div>
       <div class="position-relative" style={{display: 'flex',marginTop:'60px'}}>
        <div class='hightlight0' style={{marginLeft: '41px',}}>
          <div style={{marginTop:'-5px'}} >
            <img src='https://cdn-icons-png.flaticon.com/128/3916/3916639.png' alt='Shopping-bag' width={'34px'} height={'34px'} style={{marginLeft: '16px'}}/><h class='textmenuhightlight' style={{marginLeft:'15px',marginTop:'7px'}}><h class='texthigthlight0'>3</h> ร้านช้อปปิ้ง</h>
          </div>
        </div>
        <div class='hightlight0' style={{marginLeft: '100px'}}>
          <div style={{marginTop:'0px'}}>
            <img src='https://cdn-icons-png.flaticon.com/128/9844/9844181.png' alt='Person Simple' width={'34px'} height={'34px'} style={{marginLeft: '12px'}}/><h class='textmenuhightlight' style={{marginLeft:'15px',marginTop:'7px'}}><h class='texthigthlight0'>ไม่มี</h> วันอิสระ</h>
          </div>
        </div>
       </div>
       
    </div>
    <div class='Detail' style={{marginTop: '30px',border: '3px solid #73AD21'}}>
      <div class='TextDetail' style={{marginLeft: '40px',marginTop: '30px'}}>รายละเอียดทัวร์</div>
      <div class='TextDetail0'style={{marginLeft: '40px',marginTop: '25px'}}>เดินทาง 3 วัน 2 คืน</div>
      <div class="position-relative"style={{border: '3px solid #73AD21'}}>
      <div class='menuDetail' style={{marginLeft:'40px',marginTop:'54px'}}></div>
      <div class='menuDetail' style={{marginLeft:'40px',marginTop:'54px'}}></div>
      </div>
    </div>
  </div>
  )
}

export default Highlight