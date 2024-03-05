import { Table } from "antd";
import "../admin.css"
import { axioss } from "../axios"
import NavigateBar from "../Navbar"
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
import { useNavigate } from "react-router-dom"


function ListTour(props) {
    const [tour, setTour] = useState([]);
    const [editTourId, setEditTourId] = useState(null); // เพิ่ม state เพื่อเก็บ ID ของทัวร์ที่กำลังแก้ไข
    const [eventName, setEventName] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);
  
    const handleDeleteTour = async (TourId) => {
      try {
        console.log("Deleting tour with ID:", TourId);
  
        const response = await axios.delete(`http://localhost:1337/api/tours/${TourId}`);
        console.log("Delete response:", response);
  
        setTour((Tour) => Tour.filter((record) => record.id !== TourId));
      } catch (error) {
        console.error("Error deleting plan:", error.response);
        console.log("Error details:", error.response.data);
      }
    };
  
    const handleEditClick = (record) => {
      // เมื่อคลิกที่ปุ่มแก้ไข กำหนดค่า ID ของทัวร์ที่กำลังแก้ไขและค่าต่างๆให้ตรงกับข้อมูลปัจจุบัน
      setEditTourId(record.Id);
      setEventName(record.EventName);
      setPrice(record.Price);
      setCategory(record.Category);
    };
  
    const handleSaveEdit = async () => {
      try {
        // ทำการอัปเดตข้อมูลทัวร์
        const response = await axios.put(`http://localhost:1337/api/tours/${editTourId}`,{  
            data:{
                EventName: eventName,
                Price: price,
                Category: category,
            } 
        });

        // รีเซ็ตค่าทั้งหมดเป็นค่าเริ่มต้นหลังจากการอัปเดตสำเร็จ
        setEditTourId(null);
        setEventName(null);
        setPrice(null);
        setCategory(null);
  
        // ทำการดึงข้อมูลทัวร์ใหม่
        // Example: axios.get("http://localhost:1337/api/tours").then((response) => setTour(response.data));
      } catch (error) {
        console.error("Error updating tour:", error.response);
        console.log("Error details:", error.response.data);
      }
    };
    
    const navigate = useNavigate()
    const columns = [
        {   
            render: (record) => {

                return(
                    <div style={{ backgroundColor: "white", width: "100%", height: "500px", borderRadius: "10px", display: "flex", flexDirection: "column" }}>
                          <div className="kanit-medium" style={{ fontSize: "25px", width: "100%", height: "10%", paddingTop: "25px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          {editTourId === record.Id ? (
            <>
              <input value={eventName} onChange={(e) => setEventName(e.target.value)} />
              <input value={price} onChange={(e) => setPrice(e.target.value)} />
              <select style={{ width: 200 }} value={category} onChange={(value) => setCategory(value)}>
                    <option value="Day Trip">One-day Trip</option>
                    <option value="Multi-day Trip">Multi-day Trip</option>
                    {/* เพิ่มตัวเลือกเพิ่มเติมตามที่คุณต้องการ */}
                </select>
              <button  onClick={handleSaveEdit}>
                Save
              </button>
            </>
          ) : (
            <>
              <div style={{ paddingLeft: "10px" }}>
              </div>
              <div style={{ paddingRight: "10px" }}>
                <button  onClick={() => handleEditClick(record)}>
                  Edit
                </button>
              </div>
            </>
          )}
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
                                    <div style={{ paddingRight: "10px" }}><img className="editbutton" style={{ height: "90%" }} src={edit}></img></div>
                                </div>
                                <div style={{ width: "100%", height: "90%" }}>
                                    <div style={{ width: "100%", height: "10%" }}></div>
                                    <div style={{ gap: "20px", width: "95%", height: "10%", display: "flex", alignItems: "center", paddingLeft: "25px" }}>
                                        <img style={{ height: "60%" }} src={time}></img>
                                        <div className="kanit-medium">{record.DayCount}</div>
                                    </div>
                                    <div style={{ gap: "20px", width: "95%", height: "10%", display: "flex", alignItems: "center", paddingLeft: "25px" }}>
                                        <img style={{ height: "60%" }} src={date}></img>
                                        <div className="kanit-medium">day</div>
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
                                                    <IoMdStar className="star" />
                                                    <IoMdStar className="star" />
                                                    <IoMdStar className="star" />
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                    <IoMdStar className="star" />
                                                    <IoMdStar className="star" />
                                                </div>
                                            </div>
                                            <div className="kanit-medium" style={{ color: "rgba(0,0,0,0.5)" }}><b>ที่พัก</b></div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%", width: "25%", borderTop: "2px solid #D9D9D9", borderBottom: "2px solid #D9D9D9" }}>
                                            <div className="kanit-medium"style={{ color: "rgba(0,0,0,0.5)" }}><b>{record.CurrentSeat}/{record.TotalSeat}</b></div>
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
        <Table dataSource={props.data} columns={columns} />
    )
}
export default ListTour;