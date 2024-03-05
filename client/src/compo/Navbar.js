
import logo from "../Admin/Source/as.png"
import "./Navbar.css"
import { FaSquarePhone} from "react-icons/fa6";
import { FaUserCircle, FaFacebook, FaLine } from "react-icons/fa";
import Hamburger from "../Admin/Source/Hamburger.png"
import { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css"

function NavigateBar() {

    const navigate = useNavigate()
    const logout = () => {
        navigate("/")
        sessionStorage.setItem("jwt","")
    }
    const checklogin = () => {
        if(sessionStorage.getItem("jwt")){
            return (
                <div class="dropdown">
                    <FaUserCircle className="pointer" size={35} color="white" />
                    <div class="dropdown-content">
                        <div className="kanit-medium">บัญชีของท่าน</div>
                        <div className="kanit-regular pointer">รายละเอียดบัญชี</div>
                        <div className="kanit-regular pointer" onClick={()=>{logout()}}>ออกจากระบบ</div>
                    </div>
                </div>
            )
        }else{

            return (
                <div style={{height:"100%",display:"flex",alignItems:"center"}}>
                    <a href="login" className="kanit-medium loginbutton" style={{color:"white"}}>เข้าสู่ระบบ</a>
                </div>
            )
        }
    }
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px"
        document.getElementById("main").style.filter = 'blur(3px)'
    }

    return(
        <div style={{width:"100%"}} className="NavBar">
            <div className="contact">
                <div className="left">
                    <img onClick={()=>{openNav()}} className="hamburger" src={Hamburger} style={{width:"40px",height:"40px"}}></img>
                </div>
                <div className="right">
                    {checklogin()}
                </div>
            </div>

            <div className="NavHeader">
                <div className="test"> 
                    <img src={logo} width="75" height="75">
                    </img>
                    <b className="webname inika-bold">
                        Nakorn Sri Tour Travel Agent
                    </b>
                    <img className="reverse" src={logo} width="75" height="75">
                    </img>
                </div>
            </div>
        </div>
    )
}
export default NavigateBar