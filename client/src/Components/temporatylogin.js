import { axioss } from "./axios"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export function LoginForm() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const test = () => {
        console.log(axioss)
    }

    const Typing = (e) => {
        if(e.target.id == "username"){
            setUsername(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }

    const Login = async() => {
        try {
            const response = await axios.post(`${axioss.prefixLogin}${axioss.login}`,{
                identifier: username,
                password: password
            })
            localStorage.setItem("jwt",response.data.jwt)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
            navigate("/")
        } catch (error) {
            
        }
    }

    return (
        <div>
            <div style={{display: "flex",justifyContent: "center",height: "100vh",width: "100vw",alignItems:"center"}}>
                <div style={{backgroundColor: "rgba(0,0,0,0.2)",height: "50%",width: "40%",display: "flex",flexDirection: "column",gap:"20px",borderRadius:"10px",boxShadow:"5px 5px 0px 0px rgba(0,0,0,0.3)"}}>
                    <div style={{width: "100%",height: "50px",display: "flex",justifyContent: "center",paddingTop: "15px",fontSize: "25px"}}><b>Login</b></div>
                    <div style={{display:"flex",flexDirection: "column",width: "100%",height: "100px",gap:"10px"}}>
                       <div style={{width:"100%",height:"50%",display:"flex",flexDirection: "column",alignItems:"center",gap:"10px"}}>
                            <div style={{justifyContent:"center",display:"flex"}}>Username</div>
                            <input id="username" type="username" onChange={Typing} style={{width:"75%"}}></input>
                       </div>
                       <div style={{width:"100%",height:"50%",display:"flex",flexDirection: "column",alignItems:"center",gap:"10px"}}>
                            <div style={{justifyContent:"center",display:"flex"}}>Password</div>
                            <input id="password" type="password" onChange={Typing} style={{width:"75%"}}></input>
                       </div>
                    </div>
                    <div style={{height:"5px"}}></div>
                    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <button onClick={()=> {Login()}}style={{width:"75%",height:"35px",borderRadius:"5px"}}>Sign-in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}