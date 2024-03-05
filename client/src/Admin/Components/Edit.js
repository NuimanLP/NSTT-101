import NavigateBar from "./Navbar.js"
import Sidebar from "./sidebar"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
export default function EditPage() {
    const id = useParams()
    useEffect(()=>{
        console.log(id)
    },[])
    return (
        <div>
            <NavigateBar/>
            <Sidebar/>
            <div id="main">
                Test
            </div>
        </div>
    )
}