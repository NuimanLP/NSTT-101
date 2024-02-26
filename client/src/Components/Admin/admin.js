import "./admin.css"
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
import ListTour from "../Table/tour"

function Admin() {
    const [a,seta] = useState("")
    const [tours,setTours] = useState([])
    const [tourlenght,setTourLenght] = useState(0)
    const [raw,setraw] = useState([])
    const selectDate = (e) => {
        seta(e.target.value)
    }

    const fecthtour = async() => {
        const response = await axios.get(`${axioss.prefix}${axioss.tour}?populate=*`)
        setraw(response.data.data)
        const map = response.data.data.map((entry)=>({
            Price: entry.attributes.Price,
            Id: entry.id,
            Star: entry.attributes.Star,
            Category: entry.attributes.Category,
            Meal: entry.attributes.MealAmount,
            CurrentSeat: entry.attributes.CurrentSeat,
            TotalSeat: entry.attributes.AvailableSeat,
            Tourplan: entry.attributes.EventDescription,
            DayCount: entry.attributes.TimeCount,
            TourDateStart: entry.attributes.TourDateStart,
            TourDateFinish: entry.attributes.TourDateFinish,
            TourAmount: entry.attributes.TourAmount,
            EventName: entry.attributes.EventName,
            image: entry.attributes.Image.data[0].attributes.formats.medium.url
        }))
        setTours(map)
        setTourLenght(response.data.data.length)
    }

    useEffect(()=>{
        fecthtour()
    },[])
    
    return(
        <div>
            <NavigateBar/>
            <div className="gap100"></div>
            <div className="body">
                <div className="row ">
                    <div className="element">

                        <div className="information plus-jakarta"><b>Dashboard</b></div>

                        <div className="overall">
                            <div className="overall-children">
                                <div className="overall-children-image">
                                <IoEarth size={160} />
                                </div>
                                <div className="overall-children-info plus-jakarta">
                                    <div className="quantity"><b>{tourlenght}</b></div>
                                    <div className="quantity-name">Total Tours</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <IoTicketSharp size={160}/>
                                </div>
                                <div className="overall-children-info plus-jakarta">
                                    <div className="quantity plus-jakarta"><b>0</b></div>
                                    <div className="quantity-name">Total Booking</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <FaUser size={140}/>
                                </div>
                                <div className="overall-children-info plus-jakarta">
                                    <div className="quantity plus-jakarta"><b>0</b></div>
                                    <div className="quantity-name">Total Users</div>
                                </div>
                            </div>

                        </div>
                        <div style={{display:"flex",justifyContent: "center"}}>
                            <img src={water} style={{ borderRadius: "15px", display: "flex", justifyContent: "center" }} width="1700" height="600" ></img>
                        </div>

                        <div className="entries">
                            <div className="entries-filter" style={{gap: "20px",display: "flex", flexDirection: "column"}}>
                                <div className="border-shadow" style={{backgroundColor: "white",height: "50px",width:"100%",display: "flex",justifyContent: "center",alignItems: "center",borderRadius: "10px"}}>
                                    <div className="kanit-thin" style={{fontSize: "27px",color: "gray"}}><b>กรองการค้นหา</b></div>
                                </div>

                                <div className="border-shadow" style={{backgroundColor: "white",width: "100%",height: "110px", borderRadius: "10px 10px 0px 0px",display: "flex",flexDirection: "column",gap: "15px"}}>
                                    <div style={{display: "flex",justifyContent: "space-between"}}>
                                        <div className="kanit-medium" style={{fontSize: "25px",paddingLeft: "20px",paddingTop: "20px"}}>ช่วงราคา</div>
                                        <div className="clear kanit-medium" onClick={()=>{console.log(raw)}}><u><b>ล้างค่า</b></u></div>
                                    </div>
                                    <input type="range"></input>
                                </div> 

                                <div style={{backgroundColor: "white",width:"100%",height:"150px",display:"flex",flexDirection: "column",paddingTop: "15px",gap:"15px"}}>
                                    <div className="kanit-medium" style={{fontSize: "25px",paddingLeft:"20px"}}>ประเภททัวร์</div>
                                    <div>
                                        <div style={{display: "flex",width: "100%",height: "40px"}}>
                                            <div style={{paddingLeft: "35px",paddingTop: "5px",display: "flex",alignItems: "center",width: "100%",gap:"10px"}}>
                                                <input className="check"type="checkbox"></input>
                                                <div className="plus-jakarta">One-day Trip</div>
                                            </div>
                                        </div>

                                        <div style={{display: "flex",width: "100%",height: "40px"}}>
                                            <div style={{paddingLeft: "35px",paddingTop: "5px",display: "flex",alignItems: "center",width: "100%",gap: "10px"}}>
                                                <input className="check"type="checkbox"></input>
                                                <div className="plus-jakarta">Multi-day Trip</div>
                                            </div>                             
                                        </div>
                                    </div>
                                </div>

                                <div style={{backgroundColor: "white",width:"100%",height:"150px",display:"flex",flexDirection: "column"}}>
                                    <div className="kanit-medium" style={{width: "100%",height: "40px",padding: "20px",fontSize: "25px"}}>ระบุวันที่</div>
                                    <div style={{width:"100%",paddingLeft:"15px"}}>
                                        <input className="kanit-semibold" type="date" onChange={selectDate} style={{height: "40px",borderRadius:"10px",width:"200px"}}></input>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="entries-list">
                                <div style={{height: "70px"}}></div>
                                <div className="border-shadow" style={{borderRadius: "10px",width: "100%",height: "1200px"}}>
                                    <ListTour data={tours}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default Admin;