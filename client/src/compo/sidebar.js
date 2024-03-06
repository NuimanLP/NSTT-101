import "./sidebar.css"
import { RxCross2 } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { IoTicketSharp } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";

export default function Sidebar(props) {
    const navigate = useNavigate()

    function closeNav() {
        document.getElementById(`${props.main}`).style.marginLeft = "0px"
        document.getElementById(`${props.main}`).style.filter = 'blur(0px)'
        document.getElementById("mySidebar").style.width = "0px";
    }
    function isAdmin() {
        if (sessionStorage.getItem("role") === "Admin") {
            return (
                <div id="bookside" className="sidebar-element kanit-regular">
                    <IoTicketSharp style={{ color: "white" }} size={30} />
                    <a href="booking">Booking</a>
                </div>
            )
        }
    }
    function toHome()  {
        if (sessionStorage.getItem("role") === "Admin") {
            document.getElementById("toHome").href = "/admin"
        }else{
            document.getElementById("toHome").href = "/"
        }
    }
    useEffect(()=>{
        toHome()
    },[])
    return (
        <div id="mySidebar" className="sidebar">
            <div style={{backgroundColor:"#371f76"}}>
                <RxCross2 className="cross" style={{color:"white",width:"35px",height:"35px"}} onClick={()=>{closeNav()}}/>
            </div>
            <div>
                <div id="homeside" className="sidebar-element kanit-regular">
                    <AiFillHome style={{color:"white"}}size={30}/>
                    <a id="toHome" href="/">Home</a>
                </div>
                {isAdmin()}
            </div>
            <div className="Con" style={{height:"80%",display:"flex",justifyContent:"flex-end",flexDirection:"column",gap:"10px"}}>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"15px"}}>
                    <FaInstagram style={{color:"white",opacity: "0.8"}} size={35}/>
                    <div style={{color:"white",opacity: "0.8"}} className="kanit-medium">nakorn_tour</div>
                </div>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"15px"}}>
                    <FaFacebook style={{color:"white",opacity: "0.8"}} size={35}/>
                    <div style={{color:"white",opacity: "0.8"}} className="kanit-medium">Nakorn Si Tour Travel</div>
                </div>
                <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"15px"}}>
                    <FaLine style={{color:"white",opacity: "0.8"}} size={35}/>
                    <div style={{color:"white",opacity: "0.8"}} className="kanit-medium">Nakorn_Agent</div>
                </div>
            </div>
        </div>

    )
}