import NavigateBar from "./Navbar.js"
import NavigateBar2 from "./Navbar2.js"
import useState from "react"

export default function Checklogin() {

    const check= () => {
        if (sessionStorage.getItem("jwt") == ""){
            return <NavigateBar2/>
        }else{
            return <NavigateBar/>
        }
    }
    return  (
        <div>
            {check()}
        </div>
    )
}