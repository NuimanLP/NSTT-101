import { Navbar,Row,Container,Col,Nav,NavDropdown } from "react-bootstrap"
import logo from "../Media/as.png"
import "../CSS/Navbar.css"
import gmail from "../Media/Email.png"
import Dropdown from 'react-bootstrap/Dropdown';
import { FaSquarePhone} from "react-icons/fa6";
import { FaUserCircle, FaFacebook, FaLine } from "react-icons/fa";

function NavigateBar() {
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
                    <b className="webname">
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