import "../Admin/admin.css"
import { axioss } from "../axios"
import NavigateBar from "../../../compo/Navbar"
import water from "../../Source/water.png"
import { IoTicketSharp, IoEarth } from "react-icons/io5"
import { FaUser } from "react-icons/fa"
import {useState,useEffect} from "react"
import axios from "axios";
import time from "../../Source/time.png"
import date from "../../Source/date.png"
import book from "../../Source/book.png"
import edit from "../../Source/edit.png"
import { IoMdStar } from "react-icons/io"
import rocket from "../../Source/rocket.png"
import { useNavigate } from "react-router-dom";
import { Table, Modal, Button ,Input,Select } from "antd";
import config from "../../../config"

function ListTour(props) {
    const navigate = useNavigate()
    function starUp(star) {
        if(star==1){
            return(
                <div>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" />
                    <IoMdStar id="star" className="star" />
                </div>
            )
        }else if(star==2){
            return (
                <div>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" />
                </div>  
            )
        }else{
            return (
                <div>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                </div>
            )
        }
    }
    function starDown(star) {
        if(star==4){
            return (
                <div>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" />
                </div>
            )
        }else{
            return(
                <div>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                    <IoMdStar id="star" className="star" style={{color:"yellow"}}/>
                </div>
            )
        }
    }
    function checkDate(start,end) {
        if (start == end){
            return (
                    <div>{new Date(start).toLocaleDateString('th-TH')}</div>   
            )
        }else{
            return(
                    <div>{new Date(start).toLocaleDateString('th-TH')} ถึง {new Date(end).toLocaleDateString('th-TH')}</div>
            )
        }
    }
    const [tour, setTour] = useState([]);
    const [editTourId, setEditTourId] = useState(null);
    const [eventName, setEventName] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const [tourplan, setTourplan] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [tourDateStart, setTourDateStart] = useState('');
    const [tourDateFinish, setTourDateFinish] = useState('');
    const [availableSeat, setAvailableSeat] = useState(0);
    const [star, setStar] = useState(0);
    const [mealAmount, setMealAmount] = useState(0);
    const [tourAmount,setTourAmount] = useState(0);
    const [free,setFree] = useState('');
    const [shoppingCount,setShoppingCount] = useState(0)
    const [eventCount,setEventCount] = useState(0);
    const [vehicle,setVehicle] = useState('');
  
  
    const handleDeleteTour = async (TourId) => {
      try {
        console.log("Deleting tour with ID:", TourId);
  
        const response = await axios.delete(`${config.serverUrlPrefix}/tours/${TourId}`);
        console.log("Delete response:", response);
  
        setTour((Tour) => Tour.filter((record) => record.id !== TourId));
      } catch (error) {
        console.error("Error deleting plan:", error.response);
        console.log("Error details:", error.response.data);
      }
    };
  
    const handleEditClick = (record) => {
      setEditTourId(record.Id);
      setEventName(record.EventName);
      setPrice(record.Price);
      setCategory(record.Category);
      setTourplan(record.Tourplan);
      setModalVisible(true);
      setTourDateStart(record.TourDateStart);
      setTourDateFinish(record.TourDateFinish);
      setAvailableSeat(record.AvailableSeat);
      setStar(record.Star);
      setMealAmount(record.Meal);
      setTourAmount(record.TourAmount);
      setFree(record.Free);
      setShoppingCount(record.ShoppingCount)
      setEventCount(record.EventCount)
      setVehicle(record.Vehicle)
    };
  
    const handleSaveEdit = async () => {
      try {
        const response = await axios.put(`${config.serverUrlPrefix}/tours/${editTourId}`, {
          data: {
            EventName: eventName,
            Price: price,
            Category: category,
            Tourplan: tourplan,
            TourDateStart: tourDateStart,
            TourDateFinish: tourDateFinish,
            AvailableSeat: availableSeat,
            Star: star,
            MealAmount: mealAmount,
            TourAmount: tourAmount,
            Free: free,
            ShoppingCount: shoppingCount,
            EventCount: eventCount,
            Vehicle: vehicle,
          },
        });
    
        setEditTourId(null);
        setEventName(null);
        setPrice(null);
        setCategory(null);
        setTourplan(null);
        setTourDateStart('');
        setTourDateFinish('');
        setModalVisible(false);
        setAvailableSeat(0);
        setStar(0);
        setMealAmount(0);
        setTourAmount(0);
        setFree('');
        setShoppingCount(0);
        setEventCount(0);
        setVehicle('')
      } catch (error) {
        console.error("Error updating tour:", error.response);
        console.log("Error details:", error.response.data);
      }
    };
  
    const columns = [
        {   
            render: (record) => {

                return( 
                    
                    <div style={{ backgroundColor: "white", width: "100%", height: "500px", borderRadius: "10px", display: "flex", flexDirection: "column" }}>
                    <div className="kanit-medium" style={{ fontSize: "25px", width: "100%", height: "10%", paddingTop: "25px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            
                    <button style={{ marginLeft: '750px' }} className="edit-button" onClick={() => handleEditClick(record)}>
                      <svg class="edit-svgIcon" viewBox="0 0 512 512">
                          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>        
                    <Modal
              title="Edit Tour"
              className="custom-modal"
              visible={modalVisible}
              onOk={handleSaveEdit}
              onCancel={() => setModalVisible(false)}
            >
              {/* Your input fields here */}
              <div className="input-container">
                <label>ชื่อทัวร์:</label>
                <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
              </div>
              <div className="input-container">
                <label>ราคา:</label>
                <Input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="input-container">
                <label>ประเภททัวร์:</label>
                <Select style={{ width: '100%' }} value={category} onChange={(value) => setCategory(value)}>
                  <Select.Option value="One-day Trip">One-day Trip</Select.Option>
                  <Select.Option value="Multi-day Trip">Multi-day Trip</Select.Option>
                </Select>
              </div>
                    <div>
                    <label >tourplans :</label>
                    <Input value={tourplan} onChange={(e) => setTourplan(e.target.value)} />
                    </div>
                    <div>
                    <label >Tour Start Date:</label>
                  <Input
                    type="date"
                    id="tourDateStart"
                    value={tourDateStart}
                    onChange={(e) => setTourDateStart(e.target.value)}
                  />
                    <label >Tour Date Finish:</label>
                  <Input
                    type="date"
                    id="tourDateFinish"
                    value={tourDateFinish}
                    onChange={(e) => setTourDateFinish(e.target.value)}
                  />
                    </div>
                    <div>
                    <label>จำนวนคน : </label>
                    <Input
                    type="number"
                    min="0"
                    value={availableSeat}
                    onChange={(e) => setAvailableSeat(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    </div>
                    <div>
                    <label>ดาว : </label>
                    <input
                    type="number"
                    min="0"
                    max="5"
                    value={star}
                    onChange={(e) => setStar(Math.min(5, Math.max(0, parseInt(e.target.value, 10))))}
                    />
                    </div>
                    <div>
                    <label>มื้ออาหาร :</label>
                    <Input
                    type="number"
                    min="0"
                    value={mealAmount}
                    onChange={(e) => setMealAmount(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    </div>
                    <div>
            
                    <label>สถานที่เที่ยว :</label>
                    <Input
                    type="number"
                    min="0"
                    value={tourAmount}
                    onChange={(e) => setTourAmount(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    </div>
                    <div>
                    <label>วันอิสระ :</label>
                    <select style={{ width: 200 }} value={free} onChange={(e) => setFree(e.target.value)}>
                      <option value="มี">มี</option>
                      <option value="ไม่มี">ไม่มี</option>
                    </select>
                    </div>
                    <div>
            
                    <label>ร้านShopping : </label>
                    <Input
                    type="number"
                    min="0"
                    value={shoppingCount}
                    onChange={(e) => setShoppingCount(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    </div>
                    <div>
            
                    <label>กิจกรรม : </label>
                    <Input
                    type="number"
                    min="0"
                    value={eventCount}
                    onChange={(e) => setEventCount(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    </div>
                    <div>
            
                    <label>ยานพาหนะ</label>
                    <select style={{ width: 200 }} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                      <option value="รถทัวร์">รถทัวร์</option>
                      <option value="เครื่องบิน">เครื่องบิน</option>
                    </select>
                    </div>
                  </Modal>
                    </div>
                                    <div id="top" style={{ width: "100%", height: "80%", display: "flex", flexDirection: "row" }}>
                                        <div id="tour-face" style={{gap: "10px", height: "100%", width: "40%", paddingLeft: "10px", paddingTop: "3px", display: "flex", flexDirection: "column" }}>
                                            <div id="tour-info" style={{ width: "95%", height: "15%", display: "flex", flexDirection: "row" }}>
                                                <div style={{ backgroundColor: "#371F77", width: "100%", height: "100%", borderRadius: "10px 0px 0px 3px", display: "flex" }}>
                                                    <div className="inika-regular" style={{ paddingLeft: "20px", alignItems: "center", height: "100%", width: "100%", display: "flex", fontSize: "19px", color: "white" }}>
                                                        <b>รหัส {String(record.Id).padStart(3, '0')}</b>
                                                    </div>
                                                    <div className="triangle-up"></div>
                                                </div>
                                                <div style={{ backgroundColor: "#D9D9D9", width: "100%", height: "100%", borderRadius: "0px 8px 5px 0px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                                                    <img src={rocket} style={{ width: "25px", height: "25px" }}></img>
                                                    <div className="inika-regular" style={{ fontSize: "18px" }}><b>{record.Category}</b></div>
                                                </div>
                                            </div>
                                            <img src={`${axioss.prefix}${record.image}`} style={{ marginTop:"20px",position:"relative",borderRadius: "10px", zIndex: "1", border: "2px solid black", width: "93%", height: "500px" }}></img>
                                        </div>
                                        <div id="tour-detail" style={{ height: "100%", width: "60%", display: "flex", flexDirection: "column" }}>
                                            <div className="kanit-medium" style={{ fontSize: "25px", width: "100%", height: "10%", paddingTop: "25px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <div style={{ paddingLeft: "10px" }}><b>{record.EventName}</b></div>
                                                {/* <div style={{ paddingRight: "10px" }}><img className="editbutton" style={{ height: "90%" }} src={edit}></img></div> */}
                                            </div>
                                            <div style={{ width: "100%", height: "90%" }}>
                                                <div style={{ width: "100%", height: "10%" }}></div>
                                                <div style={{ gap: "20px", width: "95%", height: "10%", display: "flex", alignItems: "center", paddingLeft: "25px" }}>
                                                    <img style={{ height: "60%" }} src={time}></img>
                                                    <div className="kanit-medium">{record.DayCount}</div>
                                                </div>
                                                <div style={{ gap: "20px", width: "95%", height: "10%", display: "flex", alignItems: "center", paddingLeft: "25px" }}>
                                                    <img style={{ height: "60%" }} src={date}></img>
                                                    <div className="kanit-medium">{checkDate(record.TourDateStart,record.TourDateFinish)}</div>
                                                </div>
                                                <div style={{ gap: "20px", width: "95%", height: "10%", display: "flex", alignItems: "center", paddingLeft: "25px" }}>
                                                    <img style={{ height: "60%" }} src={book}></img>
                                                    <div className="kanit-medium">{record.Tourplan}</div>
                                                </div>
                                                <div style={{ width: "100%", height: "5%" }}></div>
                                                <div style={{ width: "100%", height: "30%", display: "flex", flexDirection: "row" }}>
                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "15%", borderTop: "2px solid #D9D9D9", borderBottom: "2px solid #D9D9D9", borderRight: "2px solid #D9D9D9" }}>
                                                        <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>{record.TourAmount}</b></div>
                                                        <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>ที่เที่ยว</b></div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "25%", borderTop: "2px solid #D9D9D9", borderBottom: "2px solid #D9D9D9", borderRight: "2px solid #D9D9D9" }}>
                                                        <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>{record.Meal}</b></div>
                                                        <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>มื้ออาหาร</b></div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "25%", borderTop: "2px solid #D9D9D9", borderBottom: "2px solid #D9D9D9", borderRight: "2px solid #D9D9D9" }}>
                                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                {starUp(record.Star)}
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                                {starDown(record.Star)}
                                                            </div>
                                                        </div>
                                                        <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>ที่พัก</b></div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "25%", borderTop: "2px solid #D9D9D9", borderBottom: "2px solid #D9D9D9" }}>
                                                        <div className="kanit-medium"style={{ color: "rgba(0,0,0,0.5)" }}><b>{record.Seatleft}</b></div>
                                                        <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>จำนวนที่นั่ง</b></div>
                                                    </div>
                                                </div>
                                                <div className="kanit-medium" style={{ display: "flex", width: "90%", justifyContent: "flex-end", paddingTop: "10px", fontSize: "20px" }}>
                                                    ราคาเริ่มต้น {record.Price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            
                                    <div id="bottom" style={{ zIndex: "0", width: "95%", height: "15%", display: "flex", justifyContent: "flex-end" }}>
                                        <div style={{ width: "90%", height: "100%", backgroundColor: "#D9D9D9", borderRadius: "0px 8px 25px 25px", paddingRight: "60px", paddingTop: "20px", justifyContent: "flex-end", display: "flex" }}>
                                            <div onClick={()=>{navigate(`/tour/${record.Id}`,{id:record.Id})}}className="showdetail kanit-medium" style={{ backgroundColor: "#F36C60", height: "40px", width: "140px", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "20px" }}>
                                                ดูรายละเอียด
                                            </div>
                                            <div>
                                            <button className='deleteButton' onClick={() => handleDeleteTour(record.Id)}>
                                                <img src='https://cdn-icons-png.flaticon.com/128/10741/10741845.png' alt='' width="30px"/>
                                            </button>
                                            </div>
                                        </div>
                                    </div>
            
                                </div>
            
                )
            }


        }
        
    ]
    return (
        <Table pagination={{ pageSize: 2 }} dataSource={props.data} columns={columns} />
    )
}
export default ListTour;