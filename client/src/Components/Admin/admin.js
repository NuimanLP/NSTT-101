import "./admin.css"
import NavigateBar from "../Navbar";
import earth from "../../Source/earth.png"
import ticket from "../../Source/ticket2.png"
import user from "../../Source/user.png"

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
                                    <img src={earth} width="160" height="160"></img>
                                </div>
                                <div className="overall-children-info">
                                    <div className="quantity"><b>0</b></div>
                                    <div className="quantity-name">จำนวนทัวร์ทั้งหมด</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <img src={ticket} width="160" height="160"></img>
                                </div>
                                <div className="overall-children-info">
                                    <div className="quantity"><b>0</b></div>
                                    <div className="quantity-name">จำนวนการจองทัวร์ทั้งหมด</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <img src={user} width="160" height="160"></img>
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