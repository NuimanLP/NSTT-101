// /components/Tourid.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tourid.css'
import Highlight from './Highlight';


function Tourid() {

  const[data,setData] = useState(null)

  const fetchAPI = async () =>{
    const response = await axios.get("http://localhost:1337/api/tours");
    setData(response.data.data)
  }

  useEffect(() =>{
    fetchAPI()
  }, [])

  return (
  <div>
  <br></br>
  <div class='photomenu'>

  </div>
  <br></br>
  <Highlight/>
  <div class="Tour">
  {data && data.map(val => (
    <div className="position-relative" style={{ position: 'relative' }}>
      <div class='barmenu0'style={{ position: 'absolute', left: '192px' }}><img /></div>
      <div class='triangle-up' style={{ position: 'absolute', left:'210px' }}><img src='https://cdn-icons-png.flaticon.com/128/3916/3916882.png' alt='Marker' width='25px' height='25px' style={{marginLeft:'50px',marginTop:'10px'}}/></div>
      <div class='barmenu' style={{ position: 'absolute', left: 0 }}><div class='NameTour0' style={{marginLeft:'37px',marginTop:'0px'}}><h >รหัส{val.attributes.Tourid}</h></div></div>
    </div>
  ))}
    <div>
      {data && data.map(val => (
        <div key={val.id}>
          <h1 class='NameTour' style={{ marginTop: '50px', marginLeft: '30px' }}>{val.attributes.EventName}</h1>
          <h1 class='Text' style={{ marginTop: '25px',marginLeft: '30px' }}>
            <img src="https://cdn-icons-png.flaticon.com/128/7602/7602655.png" alt="Clock-nine" style={{ width: '28px', height: '28px',marginRight: '10px' }} /> {val.attributes.date}
          </h1>
          <h1 class='Text' style={{ marginTop: '20px',marginLeft: '30px' }}>
            <img src="https://cdn-icons-png.flaticon.com/128/7602/7602592.png" alt="Calendar-lines" style={{ width: '28px', height: '28px',marginRight: '10px' }} /> {val.attributes.timedate}
          </h1>
          <h1 class='Text' style={{ marginTop: '20px',marginLeft: '30px' }}> 
            <img src="https://cdn-icons-png.flaticon.com/128/3914/3914149.png" alt="" style={{ width: '28px', height: '28px',marginRight: '10px' }} /> {val.attributes.EventDesciption}
          </h1>
        </div>
      ))}
    </div>
    <div>
      {data && data.map(val => (
        <div key={val.id} class='price' style={{ marginBottom: '60px' }}>
          <p style={{marginBottom: '10px'}}></p>
          <h4 class='Text' style={{ marginLeft: '280px',}}>เริ่มต้น <h style={{fontSize: '35px' }}>{val.attributes.Price}</h></h4>
        </div>
      ))}
    </div>
    <div>
      <button class='button' style={{marginLeft:'8px'}}>จองผ่านเว็บ</button>
    </div>
  </div>
  </div>

  );
}

export default Tourid;
