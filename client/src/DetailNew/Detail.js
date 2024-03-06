// components/Detail
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tourid.css';

function Detail(props) {
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState(null);
  const [newPlan, setNewPlan] = useState(null);

  // Edit states
  const [editDay, setEditDay] = useState(null);
  const [editDescription, setEditDescription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchAPI = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/tours/${props.id}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  const fetchAPIPlan = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/tours/${props.id}?populate[Plans][populate]=Highlights`);
      setPlan(response.data.data.attributes.Plans.data);
    } catch (error) {
      console.error("Error fetching tour plans:", error);
    }
  };

  const handleCreatePlan = async () => {
    try {
      // Create a new plan
      const response = await axios.post('http://localhost:1337/api/plans', {
        data: {
          Day: "+",
          Description: "กดเพื่อแก้ไข",
          // ... other properties
        }
      });

      // Connect the newly created plan to the tour
      const updateTourResponse = await axios.put(`http://localhost:1337/api/tours/${props.id}`, {
        data: {
          Plans: {
            connect: [
              { id: response.data.data.id }
            ]
          }
        }
      });

      fetchAPIPlan();
    } catch (error) {
      console.error("Error creating plan:", error.response);
      console.log('Error details:', error.response.data);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      // Delete the plan
      const response = await axios.delete(`http://localhost:1337/api/plans/${planId}`);

      // Optionally, you can update the state to remove the deleted plan
      setPlan(plan.filter(val => val.id !== planId));
    } catch (error) {
      console.error("Error deleting plan:", error.response);
      console.log('Error details:', error.response.data);
    }
  };

  const handleEditPlan = async (planId) => {
    try {
      // Update the plan with edited values
      const response = await axios.put(`http://localhost:1337/api/plans/${planId}`, {
        data: {
          Day: editDay,
          Description: editDescription,
          // ... other properties
        }
      });

      // Reset edit states after successful update
      setIsEditing(false);
      setEditDay('');
      setEditDescription('');

      fetchAPIPlan();
    } catch (error) {
      console.error("Error editing plan:", error.response);
      console.log('Error details:', error.response.data);
    }
  };

  useEffect(() => {
    fetchAPI();
    fetchAPIPlan();
  }, []);

  return (
    <div>
      {data && (
        <div className='Detail' style={{ marginTop: '30px' }}>
          <div className='TextDetail' style={{ marginLeft: '40px' }}>รายละเอียดทัวร์</div>
          <div>
            <button className='Btn' style={{marginTop:'2%',marginBottom:'2%'}} onClick={handleCreatePlan}>
              <div className='sign'>+</div>
              <div className='text'>Create</div>
            </button>
          </div>
          {data && (
            <div key={data.id} className='TextDetail0' style={{ marginLeft: '40px' }}>
              {data.attributes.TimeCount}
            </div>
          )}
          {plan && plan.map(val => (
            <div className="position-relative" style={{}} key={val.id}>
              <div className='menuDetail' style={{ marginLeft: '40px', marginTop: '54px' }}>
                <div style={{ marginTop: '14.21px', marginLeft: '21px', display: 'flex' }}>
                  {val.attributes.Highlights.data.map(highlight => (<div className='DetailHighlihgt' style={{ marginRight: '12px' }}>{highlight.attributes.Name}</div>))}
                </div>
                <div className='dayhighlight' style={{ marginTop: '16.78px' }}>
                  {/* Editable Day */}
                  {isEditing && editDay !== val.attributes.Day ? (
                    <input
                      type="text"
                      value={editDay}
                      onChange={(e) => setEditDay(e.target.value)}
                    />
                  ) : (
                    <h className='' style={{ marginLeft: '26px' }} onClick={() => setIsEditing(true)}>วันที่ {val.attributes.Day}</h>
                  )}
                </div>
                <div className='phighlight' style={{ marginTop: '11.3px' }}>
                  {/* Editable Description */}
                  {isEditing && editDescription !== val.attributes.Description ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    <p style={{ marginLeft: '106px', marginRight: '100px' }} onClick={() => setIsEditing(true)}>{val.attributes.Description}</p>
                  )}
                </div>
                {isEditing && (
                  <div style={{marginTop:'5%',marginLeft:'88%'}}>
                    <button className='saveButton' onClick={() => handleEditPlan(val.id)}>
                      Save
                    </button>
                  </div>
                )}
                <div style={{marginTop:'5%',marginLeft:'88%'}}>
                  <button className='deleteButton' onClick={() => handleDeletePlan(val.id)}>
                    <img src='https://cdn-icons-png.flaticon.com/128/10741/10741845.png' alt='' width="30px"/>
                  </button>
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
