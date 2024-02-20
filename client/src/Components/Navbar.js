import { Navbar,Row,Container,Col,Nav,NavDropdown } from "react-bootstrap"
import logo from "../Source/as.png"
import "./Navbar.css"
import call from "../Source/call.png"
import face from "../Source/face.png"
import gmail from "../Source/gmail.png"
import line from "../Source/line.png"
import usericon from "../Source/usericon.png"
import Dropdown from 'react-bootstrap/Dropdown';

function NavigateBar() {
    return(
        <div className="navbar">
            <div className="contact">
                <div className="left">
                    <img className="shadow" src={call} width="40" height="40"></img>
                    <div className="white">xxx-xxxxxx</div>
                </div>
                <div className="right">
                    <div class="dropdown">
                        <img className="shadow" src={usericon} width="65" height="40"></img>
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