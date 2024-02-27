import { Navbar,Row,Container,Col,Nav,NavDropdown } from "react-bootstrap"
import logo from "../Source/as.png"
import "./Navbar.css"
import { FaSquarePhone} from "react-icons/fa6";
import { FaUserCircle, FaFacebook, FaLine, FaHome } from "react-icons/fa";

function NavigateBar() {
    const tourID = '#003'
    return(
        <div className="navbar">
            <div className="contact">
                <div className="left">
                    <FaSquarePhone size={40} color="purple" />
                    <div className="white">xxx-xxxxxx</div>
                </div>
                <div className="right">
                    <div class="dropdown">
                        <FaUserCircle size={35} color="white    " />
                        <div class="dropdown-content">
                            <div className="kanit-medium">บัญชีของท่าน</div>
                            <a href="login">Login</a>
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

            <div className="header2">
                <div className="navPath"><b><FaHome/> Home / {tourID} / ข้อมูลติดต่อ</b></div>
            </div> 
        </div>
    )
}
export default NavigateBar