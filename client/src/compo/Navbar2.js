import { Navbar,Row,Container,Col,Nav,NavDropdown } from "react-bootstrap"
import logo from "../Home/Source//as.png"
import user from "../Home/Source//user.png"
import icon from "../Home/Source//icon.png"
import line from "../Home/Source/line.png"
import facebook from "../Home/Source//facebook.png"
import "./Navbar.css"
import gmail from "../Home/Source//gmail.png"
import Dropdown from 'react-bootstrap/Dropdown';
// import { FaSquarePhone} from "react-icons/fa6";
// import { FaUserCircle, FaFacebook, FaLine } from "react-icons/fa";

function NavigateBar() {
    return(
        <div className="navbar">
            <div className="contact">
                <div className="left">
                    <img src={icon} width="60" height="60"></img>
                    <div className="white">เข้าสู่ระบบ</div>
                </div>
                <div className="right">
                    <div class="dropdown">
                        <img src={line} width="55" height="55"></img>
                        <img src={facebook} width="60" height="60"></img>
                        <img src={gmail} width="60" height="60"></img>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="header">
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