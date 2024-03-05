// /components/highlight
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tourid.css'
import Detail from './Detail';

function Highlight(props) {

  const[data,setData] = useState(null)
  const[hightlight,setHightlight] = useState(null)

  const fetchAPI = async () =>{
    const response = await axios.get(`http://localhost:1337/api/tours/${props.id}`);
    setData(response.data.data)
  }

  useEffect(() =>{
    fetchAPI()
  }, [])

  return (
    <div className="position-relative" style={{}}>
    <div className='highlighttour' >
    <div style={{marginBottom: '20px'}}></div>
      <h4 className='namehightlight' style={{marginBottom: '47px',marginLeft: '50px'}}>ไฮไลท์ทัวร์</h4>
      <div  style={{ display: 'flex' }}>
        <div className='hightlight' style={{marginLeft:'50px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}}> <img src='https://cdn-icons-png.flaticon.com/128/3916/3916882.png' alt='Marker' width='48px' height='48px'/></div>
          <div className='texthigthlight' style={{marginTop: '10px',marginLeft: '18px'}}>Multi-day</div>
        </div>
        <div className='hightlight' style={{marginLeft:'70px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}} ><img src='https://cdn-icons-png.flaticon.com/128/6349/6349916.png' alt='Restaurant' width='48px' height='48px'/></div>
          <div className='texthigthlight' style={{marginTop: '10px',marginLeft: '18px'}}>7 มื้ออาหาร</div>
        </div>
        <div className='hightlight' style={{marginLeft:'70px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}} ><img src='https://cdn-icons-png.flaticon.com/128/5073/5073927.png' alt='Bed' width='48px' height='48px'/></div>
          <div className='texthigthlight' style={{marginTop: '1px',marginLeft: '18px'}}>คะแนนที่พัก</div>
          <div></div>
        </div>
        <div className='hightlight' style={{marginLeft:'70px'}}>
          <div style={{marginTop: '9px',marginLeft: '40px'}} ><img src='https://cdn-icons-png.flaticon.com/128/6955/6955575.png' alt='Car-side' width='48px' height='48px'/></div>
          <div className='texthigthlight'style={{marginTop: '10px',marginLeft: '34px'}}>รถทั่วร์</div>
        </div>
       </div>
       <div className="position-relative" style={{display: 'flex',marginTop:'52px'}}>
        <div className='hightlight0' style={{marginLeft: '41px' }}>
          <div style={{marginTop:'-5px'}}>
            <img src='https://cdn-icons-png.flaticon.com/128/9239/9239972.png' alt='Sign Hanging' width={'34px'} height={'34px'} style={{marginLeft: '16px'}}/> <h className='textmenuhightlight'style={{marginLeft:'15px'}}><h className='texthigthlight0'>4</h> สถานที่เที่ยว</h>
          </div>
        </div>
        <div className='hightlight0' style={{marginLeft: '100px'}}>
          <div style={{marginTop:'-5px'}}>
            <img src='https://cdn-icons-png.flaticon.com/128/6627/6627769.png' alt='Pennant' width={'34px'} height={'34px'} style={{marginLeft: '16px'}}/> <h className='textmenuhightlight' style={{marginLeft:'15px'}}><h className='texthigthlight0'>6</h> กิจกรรม</h>
          </div>
        </div>
       </div>
       <div className="position-relative" style={{display: 'flex',marginTop:'60px'}}>
        <div className='hightlight0' style={{marginLeft: '41px',}}>
          <div style={{marginTop:'-5px'}} >
            <img src='https://cdn-icons-png.flaticon.com/128/3916/3916639.png' alt='Shopping-bag' width={'34px'} height={'34px'} style={{marginLeft: '16px'}}/><h className='textmenuhightlight' style={{marginLeft:'15px',marginTop:'7px'}}><h className='texthigthlight0'>3</h> ร้านช้อปปิ้ง</h>
          </div>
        </div>
        <div className='hightlight0' style={{marginLeft: '100px'}}>
          <div style={{marginTop:'0px'}}>
            <img src='https://cdn-icons-png.flaticon.com/128/9844/9844181.png' alt='Person Simple' width={'34px'} height={'34px'} style={{marginLeft: '12px'}}/><h className='textmenuhightlight' style={{marginLeft:'15px',marginTop:'7px'}}><h className='texthigthlight0'>ไม่มี</h> วันอิสระ</h>
          </div>
        </div>
       </div>
       
    </div>
    <Detail id={props.id}/>
  </div>
  )
}

export default Highlight