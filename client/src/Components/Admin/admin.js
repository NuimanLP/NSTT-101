import "./admin.css"
import axios from 'axios'
import NavigateBar from "../Navbar";
import { IoTicketSharp, IoEarth } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

function Admin() {
    return(
        <div>
            <NavigateBar/>
            <div className="body">
                <div className="row">
                    <div className="element">

                        <div className="information"><b>Dashboard</b></div>
                        <div className="overall">
                            <div className="overall-children">
                                <div className="overall-children-image">
                                <IoEarth size={160} />
                                </div>
                                <div className="overall-children-info">
                                    <div className="quantity"><b>0</b></div>
                                    <div className="quantity-name">จำนวนทัวร์ทั้งหมด</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <IoTicketSharp size={160}/>
                                </div>
                                <div className="overall-children-info">
                                    <div className="quantity"><b>0</b></div>
                                    <div className="quantity-name">จำนวนการจองทัวร์ทั้งหมด</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <FaUser size={140}/>
                                </div>
                                <div className="overall-children-info">
                                    <div className="quantity"><b>0</b></div>
                                    <div className="quantity-name">จำนวนผู้ใช้ทั้งหมด</div>
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