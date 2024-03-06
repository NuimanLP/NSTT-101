// /components/Tourid.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tourid.css';
import Highlight from './Highlight';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Checklogin from '../compo/Navigate';


function Tourid() {
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

  }
  
  const fetchAPIput = async () =>{
    const response = await axios.put('http://localhost:1337/api/tours/${id}/')

  }

  useEffect(() =>{
    fetchAPI()
    fetchAPIImg()
  }, [])

  return (
    <div className='Tourid'>
      <div style={{}}><Checklogin/></div>
      <div>
      <div className='photomenu' style={{marginTop:'150px',border: '0.01px solid #73AD21',marginBottom:'30px'}}>
        <div>
        { img && img.map (val =>(
          <div style={{ marginTop: '50px', marginLeft: '11.5%'}}>
            <div style={{ position: 'relative'}}>
              <div style={{position: 'absolute',width:'38.219rem',height:'25.479rem'}}><img src={`http://localhost:1337${img[1].attributes.url}`} alt='' width={'100%'} height={'100%'} style={{ objectFit: 'cover'}}/></div>
              <div style={{position: 'absolute',left:'619px',width:'18.364rem',height:'12.5rem'}} ><img src={`http://localhost:1337${img[2].attributes.url}`} alt='' width={'100%'} height={'100%'}/></div>
              <div style={{position: 'absolute',left:'619px',top:'208px',width:'18.364rem',height:'12.5rem'}} ><img src={`http://localhost:1337${img[3].attributes.url}`} alt='' width={'100%'} height={'100%'}/></div>
              <div style={{position: 'absolute',left:'919px',width:'18.364rem',height:'12.5rem'}} ><img src={`http://localhost:1337${img[4].attributes.url}`} alt='' width={'100%'} height={'100%'}/></div>
              <div className='namephoto' style={{position: 'absolute',left:'919px',top:'208px',width:'293.821px',height:'200px'}} ><img src={`http://localhost:1337${img[5].attributes.url}`} alt='' width={'293.821px'} height={'200px'}/></div>
              {data &&(
              <div key={data.id}>
                <div className='namephoto' style={{position: 'absolute',left:'818px',top:'161px'}}>{data.attributes.NamePhoto2}</div>
                <div className='namephoto' style={{position: 'absolute',left:'1098px',top:'161px'}}>{data.attributes.NamePhoto3}</div>
                <div className='namephoto' style={{position: 'absolute',left:'820px',top:'368px'}}>{data.attributes.NamePhoto4}</div>
                <div className='namephoto' style={{position: 'absolute',left:'1065px',top:'368px'}}>{data.attributes.NamePhoto5}</div>
              </div>
              )}
              
            </div>
          </div>
        ))}
        </div>
      <div style={{marginTop:'495px'}}>
        {data && (
          <div key={data.id} className='Textphotomenu' style={{marginLeft: '11.5%' }}>
            <h style={{ marginRight: '10x' }}>{data.attributes.EventName}<h style={{marginLeft:'10px'}}>{data.attributes.EventDescription}</h></h>
            <h>{data.attributes.TimeCount}</h>
            <h>{data.attributes.EventDesciption}</h>
          </div>
        )}
        </div>
      </div>
      </div>
      <Highlight id={id}/>
      <div style={{marginTop:'100px'}} className="Tour">
        {data && (
          <div key={data.id} className="position-relative" style={{ position: 'relative' }}>
            <div className='barmenu0' style={{ position: 'absolute', left: '192px' }}><img /></div>
            <div className='triangle-up' style={{ position: 'absolute', left: '210px' }}><img src='https://cdn-icons-png.flaticon.com/128/3916/3916882.png' alt='Marker' width='26px' height='26px' style={{ marginLeft: '50px', marginTop: '10px' }} /></div>
            <div className='barmenu' style={{ position: 'absolute', left: 0 }}>
              <div className='NameTour0' style={{ marginLeft: '37px', marginTop: '0px' }}><h>รหัส{data.attributes.Tourid}</h></div>
            </div>
            <div className='textbarmenu0' style={{ position: 'absolute', left: '320px', marginTop: '5px' }}>{data.attributes.Category}</div>
          </div>
        )}
        <div>
          {data && (
            <div key={data.id}>
              <h1 className='NameTour' style={{ marginTop: '50px', marginLeft: '30px' }}>{data.attributes.EventName}</h1>
              <h1 className='Text' style={{ marginTop: '25px', marginLeft: '30px' }}>
                <img src="https://cdn-icons-png.flaticon.com/128/7602/7602655.png" alt="Clock-nine" style={{ width: '28px', height: '28px', marginRight: '10px' }} /> {data.attributes.TimeCount}
              </h1>
              <h1 className='Text' style={{ marginTop: '20px', marginLeft: '30px' }}>
                <img src="https://cdn-icons-png.flaticon.com/128/7602/7602592.png" alt="Calendar-lines" style={{ width: '28px', height: '28px', marginRight: '10px' }} /> {data.attributes.TourDateStart} ถึง {data.attributes.TourDateFinish}
              </h1>
              <h1 className='Text' style={{ marginTop: '20px', marginLeft: '30px' }}>
                <img src="https://cdn-icons-png.flaticon.com/128/3914/3914149.png" alt="" style={{ width: '28px', height: '28px', marginRight: '10px' }} /> {data.attributes.EventDescription}
              </h1>
            </div>
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          {data && (
            <div key={data.id} className='price' style={{ marginBottom: '45px' }}>
              <p style={{ marginBottom: '10px' }}></p>
              <h4 className='textprice' style={{ marginLeft: '260px', }}>เริ่มต้น <h className='Text' style={{ fontSize: '35px', marginLeft: '10px' }}>{data.attributes.Price}</h></h4>
            </div>
          )}
        </div>
        <div>
          <button onClick={()=>{navigate("/login")}}className='bookbutton' style={{ marginLeft: '8px' }}>จองผ่านเว็บ</button>
        </div>
      </div>
    </div>
  );
}

export default Tourid;