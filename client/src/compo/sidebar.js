import "./sidebar.css"
import { RxCross2 } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import { IoTicketSharp } from "react-icons/io5"
export default function Sidebar() {

      function closeNav() {
        document.getElementById("mySidebar").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px"
        document.getElementById("main").style.filter = 'blur(0px)'
      }

    return (
        <div id="mySidebar" className="sidebar">
            <div style={{backgroundColor:"#371f76"}}>
                <RxCross2 className="cross" style={{color:"white",width:"35px",height:"35px"}} onClick={()=>{closeNav()}}/>
            </div>
            <div>
                <div id="homeside" className="sidebar-element kanit-regular">
                    <AiFillHome style={{color:"white"}}size={30}/>
                    <a href="/">Home</a>
                </div>
                <div id="bookside" className="sidebar-element kanit-regular">
                    <IoTicketSharp style={{color:"white"}}size={30}/>
                    <a href="booking">Booking</a>
                </div>
            </div>
        </div>

    )
}