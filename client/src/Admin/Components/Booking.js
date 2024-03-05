import NavigateBar from "../../compo/Navbar.js"
import Sidebar from "../../compo/sidebar.js"
import "./Admin/admin.css"
import { useEffect,useState } from "react"
import axios from "axios"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "./Booking.css"
import "./Admin/admin.css"
import BookingTable from "./BookingTable.js"
import { GrFormRefresh } from "react-icons/gr";

export default function BookingPage() {
    const [id,setId] = useState()
    const [index,setIndex] = useState(0)
    const [tourLength,setTourLength] = useState(0)
    const [booking,setBooking] = useState([])
    const [current,setCurrent] = useState([])
    const [showid,setShowId] = useState(0)
    const [name,setname] = useState()

    const fetchtourid = async() => {
        const response = await axios.get("http://localhost:1337/api/tours/listAllBooking")
        setId(response.data.map((element)=>({
            Id: element.id,
        })))
        setTourLength(response.data.length)
        setBooking(response.data.map((element)=>({
            Bookings: element.bookings
        })))
        setCurrent(booking[index]?.Bookings?.map((element)=>({
            Id: element.id,
            Amount: element.Amount,
            BookingDate: element.BookingDate,
            PaymentStatus: element.PaymentStatus,
            TotalPrice: element.Total_Price,
            Receipt: element.Receipt?.url
        })))
    }
    const increaseIndex = () => {
        if (index < tourLength-1){
            setIndex(index=>index+1)
        }
    }
    const decreaseIndex = () => {
        if (index > 0) {
            setIndex(index=>index-1)
        }
    }

    const refresh = () => {
        setCurrent(booking[index]?.Bookings?.map((element)=>({
            Id: element.id,
            Amount: element.Amount,
            BookingDate: element.BookingDate,
            PaymentStatus: element.PaymentStatus,
            TotalPrice: element.Total_Price,
            Receipt: element.Receipt?.url
        })))
        console.log(current)
    }

    useEffect(()=>{
        fetchtourid()
    },[])

    useEffect(()=>{
        refresh()
        if(index){
            setShowId(id[index].Id)
        }else if(index === 0){
            setShowId(1)
        }
    },[index])

    return (
        <div>
            <NavigateBar/>
            <Sidebar/>
            <div className="gap100"></div>
            <div id="main" className="body" style={{justifyContent:"",flexDirection:"column",alignItems:"center",gap:"20px"}}>
                <div className="kanit-medium" style={{marginTop:"20px",width:"85%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div style={{fontSize:"30px",color:"#795695"}}>
                        การจองทั้งหมด
                    </div>
                </div>
                <div style={{backgroundColor:"white",width:"85%",height:"100vh",borderRadius:"10px"}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                        <div style={{height:"90px",width:"30%",backgroundColor:"white",display:"flex",flexDirection:"row"}}>
                            <div style={{height:"100%",width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <IoIosArrowBack onClick={()=>{decreaseIndex()}}className="arrow" size={30}/>
                            </div>
                            <div style={{height:"100%",width:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <div onClick={()=>{console.log(index)}}className="kanit-medium">ทัวร์หมายเลข {showid}</div>
                            </div>
                            <div style={{height:"100%",width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <IoIosArrowForward onClick={()=>{increaseIndex()}}className="arrow" size={30}/>
                            </div>
                        </div>
                        <div style={{height:"100%",width:"70%",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingTop:"20px",paddingRight:"20px"}}>
                            <GrFormRefresh className="refresh" onClick={()=>{fetchtourid()}}size={30}/>
                        </div>
                    </div>
                    <div style={{width:"100%",height:"85%"}}>
                        <BookingTable data={current}/>
                    </div>
                </div>

            </div>
        </div>
    )
}