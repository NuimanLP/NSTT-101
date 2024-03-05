import "./admin.css"
import { axioss } from "../axios"
import NavigateBar from "../../../compo/Navbar"
import water from "../../Source/water.png"
import { IoTicketSharp, IoEarth } from "react-icons/io5"
import { FaUser } from "react-icons/fa"
import {useState,useEffect} from "react"
import axios from "axios";
import ListTour from "../Table/tour"
import { Calendar } from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import Sidebar from "../../../compo/sidebar.js"
import config from "../../../config.js"

function Admin() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [booklenght,setBookLenght] = useState()
    const [userAmount,setUserAmount] = useState()
    const [formattedDate, setFormattedDate] = useState(); 
    const [data, setData] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [sliderValue, setSliderValue] = useState(10000);
    const [check, setCheck] = useState({
        oneDayTrip: true,
        multiDayTrip: true
    });
    const [tourlenght,setTourLenght] = useState(0)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchData = async () => {
        try {
            let response;

            if (formattedDate) {
                response = await axios.get(`http://localhost:1337/api/tours?filters[TourDateStart][$eq]=${formattedDate}`);
            } else {
                response = await axios.get("http://localhost:1337/api/tours");
            }

            setData(response.data.data.map(item => item.attributes));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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

    const filter = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/tours?populate=*&filters[$and][0][Price][$lte]=${
                sliderValue}&filters[$or][1][Category][$eq]=${check.oneDayTrip ? 'One-day Trip' : ''}&filters[$or][2][Category][$eq]=${
                    check.multiDayTrip ? 'Multi-day Trip' : ''}`);
            const responsebook = await axios.get(`${config.serverUrlPrefix}/bookings`)
            const responseUser = await axios.get(`${config.serverUrlPrefix}/users`)
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
                TourDateStart: element.attributes.TourDateInit,
                TourDateFinish: element.attributes.TourDateFinish,
                TourAmount: element.attributes.TourAmount,
                EventName: element.attributes.EventName,
                image: element.attributes.Image.data[0].attributes.url,
                Seatleft: element.attributes.AvailableSeat-element.attributes.CurrentSeat
            }));
    
            const filteredData = formattedDate
                ? map.filter(item => formatDate(new Date(item.TourDateStart)) === formattedDate)
                : map;
            setUserAmount(responseUser.data.length)
            setTourLenght(response.data.data.length)
            setBookLenght(responsebook.data.data.length)
            setData(filteredData);
    
            if (date === formattedDate) {
                console.log("yes");
            } else {
                console.log("no");
                console.log(date);
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCalendarChange = async (date) => {
        setDate(date);
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        setFormattedDate(formattedDate);
        await filter();
    };

    const search = (searchTerm) => {
        if (!searchTerm) {
            fetchData();  // Fetch all data if search term is empty
            return;
        }

        const filteredData = data.filter(item =>
            item.EventName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setData(filteredData);
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

    const clear = () => {
        setSearchTerm("")
        setSliderValue(10000)
        document.getElementById("name").value = ""
    }

    useEffect(() => {
        fetchData();
    }, [formattedDate]);

    useEffect(() => {
        sliders();
    }, [sliderValue]);

    useEffect(() => {
        if (searchTerm === '') {
            filter();
        } else {
            search(searchTerm);
        }
    }, [searchTerm, sliderValue, check, selectedDate, formattedDate]);
    useEffect(() => {
        filter()
    },[])
    return(
        <div style={{width:"100vw",height:"100vh"}}>
            <NavigateBar main="main"/>
            <Sidebar main="main"/>
            <div className="main" id="main" style={{marginLeft:"0px"}}>
                <div className="gap100"></div>
                <div className="body">
                    <div className="row ">
                        <div className="element">

                            <div className="information plus-jakarta"><b>Dashboard</b></div>

                            <div className="overall">
                                <div className="overall-children">
                                    <div className="overall-children-image">
                                        <IoEarth size={140} />
                                    </div>
                                    <div className="overall-children-info plus-jakarta">
                                        <div className="quantity"><b>{tourlenght}</b></div>
                                        <div className="quantity-name">Total Tours</div>
                                    </div>
                                </div>
                                <div className="overall-children">
                                    <div className="overall-children-image">
                                        <IoTicketSharp size={160} />
                                    </div>
                                    <div className="overall-children-info plus-jakarta">
                                        <div className="quantity plus-jakarta"><b>{booklenght}</b></div>
                                        <div className="quantity-name">Total Booking</div>
                                    </div>
                                </div>
                                <div className="overall-children">
                                    <div className="overall-children-image">
                                        <FaUser size={140} />
                                    </div>
                                    <div className="overall-children-info plus-jakarta">
                                        <div className="quantity plus-jakarta"><b>{userAmount}</b></div>
                                        <div className="quantity-name">Total Users</div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <img src={water} style={{ borderRadius: "15px", display: "flex", justifyContent: "center" }} width="1700" height="600" ></img>
                            </div>

                            <div className="entries">
                                <div className="entries-filter" style={{ gap: "20px", display: "flex", flexDirection: "column" }}>
                                <input className="border-shadow kanit-medium"
                                    placeholder="ค้นหาทัวร์..."
                                    onSearch={(value) => setSearchTerm(value)}
                                    style={{ fontSize: "20px", width: "88%", padding: "20px", borderRadius: "5px", border: "1px solid #ccc", height: "1%" }}
                                />
                                    <div className="border-shadow" style={{ backgroundColor: "white", width: "100%", height: "150px", borderRadius: "10px 10px 0px 0px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div className="kanit-medium" style={{ fontSize: "25px", paddingLeft: "25px", paddingTop: "20px" }}><b>ช่วงราคา</b></div>
                                            <div className="clear kanit-medium" onClick={() => { clear() }} style={{ fontSize: "20px", color: "#795695", paddingRight: "20px", paddingTop: "20px" }}><u><b>ล้างค่า</b></u></div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="10000"
                                                value={sliderValue}
                                                onChange={handleSliderChange}
                                                className="priceSlider"
                                                id="myRange"
                                            />
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingRight: "20px" }}>
                                            <div className="kanit-regular" style={{ fontSize: "20px" }}>ราคาสูงสุด</div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <input onChange={handleSliderChange} min="0" max="10000" className="kanit-medium" style={{ textAlign: "center", width: "100px", fontSize: "25px", height: "30px" }} type="number" value={sliderValue}></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ backgroundColor: "white", width: "100%", height: "170px", display: "flex", flexDirection: "column", paddingTop: "15px", gap: "15px" }}>
                                        <div className="kanit-medium" style={{ fontSize: "25px", paddingLeft: "20px" }}><b>ประเภททัวร์</b></div>
                                        <div>
                                            <div style={{ display: "flex", width: "100%", height: "40px" }}>
                                                <div style={{ paddingLeft: "35px", paddingTop: "5px", display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                                                    <input
                                                        id="onetourcheck"
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
                                                        id="multitourcheck"
                                                        className="check"
                                                        type="checkbox"
                                                        name="multiDayTrip"
                                                        checked={check.multiDayTrip}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <div>Multi-day Trip</div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div style={{ height: "400px", backgroundColor: "white", borderRadius: "10px" }}>
                                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                                            <div className="kanit-medium" style={{ paddingLeft: "25px", paddingTop: "20px", fontSize: "25px" }}><b>ระบุวันที่</b></div>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <Calendar onChange={handleCalendarChange} value={date} />
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
            
        </div>
       
    )
}

export default Admin;