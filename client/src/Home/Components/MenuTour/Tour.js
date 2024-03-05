import "./Tour.css";
import NavigateBar from "../../../compo/Navbar.js";
import water from "../../Source/water.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ListTour from "./details";
import { Input } from "antd";
import Sidebar from "../../../compo/sidebar.js";

function Tour() {
    const [data, setData] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");
    const [sliderValue, setSliderValue] = useState(9999);
    const [formattedDate, setFormattedDate] = useState(); 
    const [check, setCheck] = useState({
        oneDayTrip: true,
        multiDayTrip: true
    });

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const formattedDate = formatDate(selectedDate);
        console.log(formattedDate);
    }, [selectedDate]);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const sliders = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/tours?filters[Price][$lte]=${sliderValue}`);
            setData(response.data.data.map(item => item.attributes));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        sliders();
    }, [sliderValue]);

    const formatted = async () => {
        try {
            const formattedDate = formatDate(selectedDate);
            const response = await axios.get(`http://localhost:1337/api/tours?filters[TourDateStart][$eq]=${formattedDate}`);
            setData(response.data.data.map(item => item.attributes));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        formatted();
    }, [formattedDate]);

    const filter = async () => {
        try {
            // const formattedDate = formatDate(selectedDate);
            const response = await axios.get(`http://localhost:1337/api/tours?populate=*&filters[$and][0][Price][$lte]=${
                sliderValue}&filters[$or][1][Category][$eq]=${check.oneDayTrip ? 'One-day Trip' : ''}&filters[$or][2][Category][$eq]=${
                    check.multiDayTrip ? 'Multi-day Trip' : ''}`);
            
            const map = response.data.data.map((element) => ({
                Price: element.attributes.Price,
                Id: element.id,
                Star: element.attributes.Star,
                Category: element.attributes.Category,
                Meal: element.attributes.MealAmount,
                CurrentSeat: element.attributes.CurrentSeat,
                TotalSeat: element.attributes.AvailableSeat,
                Tourplan: element.attributes.EventDescription,
                DayCount: element.attributes.TimeCount,
                TourDateStart: element.attributes.TourDateStart,
                TourDateFinish: element.attributes.TourDateFinish,
                TourAmount: element.attributes.TourAmount,
                EventName: element.attributes.EventName,
                image: element.attributes.Image.data[0].attributes.url
            })).filter((element) => {
                return (
                    element.EventName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
            setData(map);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        filter();
    }, [searchTerm, sliderValue, check, selectedDate, formattedDate]);
    

    const handleCalendarChange = async (date) => {
        setDate(date);
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        setFormattedDate(formattedDate); // เพิ่มบรรทัดนี้
        await filter();
    };
    

    const searchHandler = (value) => {
        setSearchTerm(value);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheck(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleClearDate = async () => {
        setDate(new Date());
        setSelectedDate(new Date());
        await filter();
    };

    return (
        <div>
            <NavigateBar main="body" />
            <Sidebar main="body"/>
            <div className="gap100"></div>
            <div id="body" className="body" style={{transition:"0.5s"}}>
                <div className="row">
                    <div className="element">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img src={water} style={{ borderRadius: "15px", display: "flex", justifyContent: "center" }} width="1800" height="600" alt="water" />
                        </div>

                        <div className="entries">
                            <div className="entries-filter" style={{ gap: "20px", display: "flex", flexDirection: "column" }}>
                                <Input.Search placeholder="ค้นหาทัวร์..." onSearch={searchHandler} style={{ width: "88%", padding: "20px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                <div className="border-shadow" style={{ backgroundColor: "white", width: "100%", height: "110px", borderRadius: "10px 10px 0px 0px", display: "flex", flexDirection: "column", gap: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ fontSize: "25px", paddingLeft: "10px", paddingTop: "20px" }}><b>ช่วงราคา</b></div>
                                        <div onClick={handleClearDate} style={{ fontSize: "20px", color: "#795695", paddingRight: "20px", paddingTop: "20px", cursor: "pointer" }}><u><b>ล้างค่าวันที่</b></u></div>
                                    </div>
                                    <div className="slidecontainer">
                                        <input
                                            type="range"
                                            min="0"
                                            max="9999"
                                            value={sliderValue}
                                            onChange={handleSliderChange}
                                            className="slider"
                                            id="myRange"
                                        />
                                        {sliderValue}
                                    </div>
                                </div>

                                <div style={{ backgroundColor: "white", width: "100%", height: "170px", display: "flex", flexDirection: "column", paddingTop: "15px", gap: "15px" }}>
                                    <div style={{ fontSize: "25px", paddingLeft: "20px" }}><b>ประเภททัวร์</b></div>
                                    <div>
                                        <div style={{ display: "flex", width: "100%", height: "40px" }}>
                                            <div style={{ paddingLeft: "35px", paddingTop: "5px", display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                                                <input
                                                    className="check"
                                                    type="checkbox"
                                                    name="oneDayTrip"
                                                    checked={check.oneDayTrip}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <div>One-day Trip</div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", width: "100%", height: "40px" }}>
                                            <div style={{ paddingLeft: "35px", paddingTop: "5px", display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                                                <input
                                                    className="check"
                                                    type="checkbox"
                                                    name="multiDayTrip"
                                                    checked={check.multiDayTrip}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <div>Multi-day Trip</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                                            <Calendar
                                                onChange={handleCalendarChange}
                                                value={date}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="entries-list">
                                <div style={{ height: "70px" }}></div>
                                <div className="border-shadow" style={{ borderRadius: "10px", width: "100%", height: "1200px" }}>
                                    <ListTour data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour;
