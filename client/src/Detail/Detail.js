// components/Detail
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tourid.css';

function Detail(props) {
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState(null);

  const fetchAPI = async () => {
    const response = await axios.get(`http://localhost:1337/api/tours/${props.id}`);
    setData(response.data.data);
  };

  const fetchAPIPlan = async () => {
    const response = await axios.get(`http://localhost:1337/api/tours/${props.id}?populate[Plans][populate]=Highlights`);
    setPlan(response.data.data.attributes.Plans.data);
  };


  useEffect(() => {
    fetchAPI();
    fetchAPIPlan();
  }, []);

  return (
    <div>
      {data && (
        <div className='Detail' style={{marginTop:'30px'}}>
          <div className='TextDetail' style={{ marginLeft: '40px' }}>รายละเอียดทัวร์</div>
          {data && (
            <div key={data.id} className='TextDetail0' style={{ marginLeft: '40px' }}>
              {data.attributes.TimeCount}
            </div>
          )}
          {plan && plan.map(val => (
            <div className="position-relative" style={{ }} key={val.id}>
              <div className='menuDetail' style={{ marginLeft: '40px', marginTop: '54px' }}>
                <div style={{ marginTop: '14.21px', marginLeft: '21px', display: 'flex' }}>
                  {val.attributes.Highlights.data.map(highlight => (<div className='DetailHighlihgt' style={{marginRight:'12px'}}>{highlight.attributes.Name}</div>))}
                </div>
                <div className='dayhighlight' style={{ marginTop: '16.78px' }}>   
                  <h className='' style={{ marginLeft: '26px' }}><h>วันที่</h>{val.attributes.Day}</h>
                </div>
                <div className='phighlight' style={{ marginTop: '11.3px' }}>
                  <p style={{ marginLeft: '106px', marginRight: '100px' }}>{val.attributes.Description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
