import "./Booking.css"
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useState } from "react";
import { Table } from "antd"
import config from "../../config";

export default function BookingTable(props) {

    function showmodal(url) {
        if(url){
            document.getElementById("img").src = `${config.serverReceipt}${url}`
            document.getElementById("img").style.visibility = "visible"
            document.getElementById("none").style.visibility = "hidden"
        }else{
            document.getElementById("img").src = "none"
            document.getElementById("img").style.visibility = "hidden"
            document.getElementById("none").style.visibility = "visible"
        }
        document.getElementById("modal").style.display = "block"
    }

    function hidemodal() {
        document.getElementById("modal").style.display = "none"
    }
    function status(s) {
        if (s == "เสร็จสมบูรณ์"){
            return <div style={{color:"green"}}>เสร็จสมบูรณ์</div>
        }else if(s == "รอดำเนินการ"){
            return <div style={{color:"gray"}}>รอดำเนินการ</div>
        }else if(s == "ยกเลิก"){
            return <div style={{color:"red"}}>ยกเลิก</div>
        }
    }
    const summit = async(id) => {
        await axios.put(`${config.serverUrlPrefix}/bookings/${id}/Check`)
    }
    const col = 
[
    {
        title: "รหัสการจอง",
        dataIndex: "Id"
    },
    {
        title: "วันที่จอง",
        dataIndex: "BookingDate",
    },
    {
        title: "สถานะการชำระเงิน",
        render: (record) =>{
            return (
                <div>
                    {status(record.PaymentStatus)}
                </div>
            )
        }
    },
    {
        title: "จำนวนคน",
        dataIndex: "Amount"
    },
    {
        title: "ราคาทั้งหมด",
        dataIndex: "TotalPrice"
    },
    {
        title: "ใบเสร็จ",
        render: (record) => {
            return(
                <div>
                    <button onClick={()=>{showmodal(record.Receipt)}}>ดูใบเสร็จ</button>
                </div>
            )
        }
    },
    {
        title: "ตรวจสอบ",
        render: (record) => {
            return(
                <div>
                    <button onClick={()=>{summit(record.Id)}}>ยืนยันใบเสร็จ</button>
                </div>
            )
        }
    }
]
    return (
        <div>
            <div id="modal" className="modal2">
                <div class="modal2-content">
                    <RxCross2 size={30} id="close" className="close" onClick={()=>{hidemodal()}}/>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <img id="img" src="" style={{width:"30vw"}}></img>
                    </div>
                    <div id="none" style={{width:"100%",display:"flex",justifyContent:"center"}}>
                        ยังไม่มีหลักฐานการโอนเงิน
                    </div>
                </div>
            </div>
            <Table columns={col} dataSource={props.data}/>     
        </div>
    )
}