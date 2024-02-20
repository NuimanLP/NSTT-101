import "./admin.css"
import NavigateBar from "../Navbar";
import earth from "../../Source/earth.png"
import ticket from "../../Source/ticket2.png"
import user from "../../Source/user.png"
import water from "../../Source/water.png"

function Admin() {
    return(
        <div>
            <NavigateBar/>
            <div className="gap100"></div>
            <div className="body">
                <div className="row ">
                    <div className="element">

                        <div className="information plus-jakarta"><b>Dashboard</b></div>

                        <div className="overall">
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <img src={earth} width="160" height="160"></img>
                                </div>
                                <div className="overall-children-info plus-jakarta">
                                    <div className="quantity"><b>0</b></div>
                                    <div className="quantity-name">Total Tours</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <img src={ticket} width="160" height="160"></img>
                                </div>
                                <div className="overall-children-info plus-jakarta">
                                    <div className="quantity plus-jakarta"><b>0</b></div>
                                    <div className="quantity-name">Total Booking</div>
                                </div>
                            </div>
                            <div className="overall-children">
                                <div className="overall-children-image">
                                    <img src={user} width="160" height="160"></img>
                                </div>
                                <div className="overall-children-info plus-jakarta">
                                    <div className="quantity plus-jakarta"><b>0</b></div>
                                    <div className="quantity-name">Total Users</div>
                                </div>
                            </div>

                        </div>
                        <div style={{display:"flex",justifyContent: "center"}}>
                            <img src={water} style={{ borderRadius: "15px", display: "flex", justifyContent: "center" }} width="1700" height="600" ></img>
                        </div>

                        <div className="entries">
                            <div className="entries-filter" style={{gap: "20px",display: "flex", flexDirection: "column"}}>
                                <div className="border-shadow" style={{backgroundColor: "white",height: "50px",width:"100%",display: "flex",justifyContent: "center",alignItems: "center",borderRadius: "10px"}}>
                                    <div style={{fontSize: "27px",color: "gray"}}><b>กรองการค้นหา</b></div>
                                </div>
                                <div className="border-shadow" style={{backgroundColor: "white",width: "100%",height: "110px", borderRadius: "10px 10px 0px 0px",display: "flex",flexDirection: "column",gap: "15px"}}>
                                    <div style={{display: "flex",justifyContent: "space-between"}}>
                                        <div style={{fontSize: "25px",paddingLeft: "20px",paddingTop: "20px"}}><b>ช่วงราคา</b></div>
                                        <div style={{fontSize: "20px",color: "#795695",paddingRight: "20px",paddingTop: "20px"}}><u><b>ล้างค่า</b></u></div>
                                    </div>
                                    <input type="range"></input>
                                </div> 

                                <div style={{backgroundColor: "white",width:"100%",height:"170px",display:"flex",flexDirection: "column",paddingTop: "15px",gap:"15px"}}>
                                    <div style={{fontSize: "25px",paddingLeft:"20px"}}><b>ประเภททัวร์</b></div>
                                    <div>
                                        <div style={{display: "flex",width: "100%",height: "40px"}}>
                                            <div style={{paddingLeft: "35px",paddingTop: "5px",display: "flex",alignItems: "center",width: "100%",gap:"10px"}}>
                                                <input className="check"type="checkbox"></input>
                                                <div>One-day Trip</div>
                                            </div>
                                        </div>

                                        <div style={{display: "flex",width: "100%",height: "40px"}}>
                                            <div style={{paddingLeft: "35px",paddingTop: "5px",display: "flex",alignItems: "center",width: "100%",gap: "10px"}}>
                                                <input className="check"type="checkbox"></input>
                                                <div>Multi-days Trip</div>
                                            </div>                             
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="entries-list">
                                <div style={{height: "70px"}}></div>
                                <div className="border-shadow" style={{backgroundColor: "white",borderRadius: "10px",width: "100%",height: "1200px"}}></div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
       
    )
}

export default Admin;