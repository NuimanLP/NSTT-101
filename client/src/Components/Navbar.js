import { Navbar,Row,Container,Col,Nav,NavDropdown } from "react-bootstrap"
import logo from "../Source/as.png"
import user from "../Source/user.png"
import icon from "../Source/icon.png"
import line from "../Source/line.png"
import facebook from "../Source/facebook.png"
import "./Navbar.css"
import gmail from "../Source/gmail.png"
import Dropdown from 'react-bootstrap/Dropdown';
// import { FaSquarePhone} from "react-icons/fa6";
// import { FaUserCircle, FaFacebook, FaLine } from "react-icons/fa";

function NavigateBar() {
    return(
        <div className="navbar">
            <div className="contact">
                <div className="left">
                    <img src={icon} width="60" height="60"></img>
                    <button className="clear-button">เข้าสู่ระบบ</button>
                </div>
                <div className="right">
                    <div class="dropdown">
                        <img src={line} width="50" height="50"></img>
                        <img src={facebook} width="50" height="50"></img>
                        <img src={gmail} width="50" height="50"></img>
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