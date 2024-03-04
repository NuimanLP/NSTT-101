import "./Tour.css";
import water from "../../Source/water.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ListTour from "./details";
import Search from "antd/es/input/Search";
import Checklogin from "../../../compo/Navbar"

function Tour() {
    const [data, setData] = useState();
    const [raw, setRaw] = useState()
    // const [start, setstart] = useState(false);
    // const [end, setend] = useState(false);
    const [date, setDate] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [sliderValue, setSliderValue] = useState(9999);
    const [check, setCheck] = useState({
        oneDayTrip: true,
        multiDayTrip: true
    });

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    // const sliders = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:1337/api/tours?filters[Price][$lte]=${sliderValue}`);
    //         setData(response.data.data.attributes);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // const checks = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:1337/api/tours?filters[Category][$eq]=${check.oneDayTrip ? 'One-day Trip' : ''}${check.multiDayTrip ? 'Multi-day Trip' : ''}`);
    //         setData(response.data.data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    // useEffect(() => {
    //     sliders();
    // }, [sliderValue]);

    // const datetime = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:1337/api/tours?filters[TourDateStart][$gte]=${date}&filters[TourDateFinish][$lte]=${date}`);
    //         setData(response.data.data.attributes);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }

    // useEffect(() => {
    //     fetchAPI();
    // }, []);

    // const fetchAPI = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:1337/api/tours?populate=*");
    //         setRaw(response)  
    //         const map = response.data.data.map((element)=>({
    //             Price: element.attributes.Price,
    //             Id: element.id,
    //             Star: element.attributes.Star,
    //             Category: element.attributes.Category,
    //             Meal: element.attributes.MealAmount,
    //             CurrentSeat: element.attributes.CurrentSeat,
    //             TotalSeat: element.attributes.AvailableSeat,
    //             Tourplan: element.attributes.EventDescription,
    //             DayCount: element.attributes.TimeCount,
    //             TourDateStart: element.attributes.TourDateStart,
    //             TourDateFinish: element.attributes.TourDateFinish,
    //             TourAmount: element.attributes.TourAmount,
    //             EventName: element.attributes.EventName,
    //             image: element.attributes.Image.data[0].attributes.url
    //         }))
    //         setData(map)
    // ;

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    const filter = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/tours?populate=*&filters[$and][0][Price][$lte]=${sliderValue}&filters[$or][1][Category][$eq]=${check.oneDayTrip ? 'One-day Trip' : ''}&filters[$or][2][Category][$eq]=${check.multiDayTrip ? 'Multi-day Trip' : ''}`);
            setRaw(response)
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
                )
            })
            setData(map)
            

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        filter()
    }, [searchTerm, sliderValue, check])

    const search = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheck(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };
    const onChange = date => {
        setDate(date);
    };

    return (
        <div>
            <Checklogin />

            <div className="gap100"></div>
            <div className="body">
                <div className="row">
                    <div className="element">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img src={water} style={{ borderRadius: "15px", display: "flex", justifyContent: "center" }} width="1800" height="600" alt="water" />
                        </div>

                        <div className="entries">
                            <div className="entries-filter" style={{ gap: "20px", display: "flex", flexDirection: "column" }}>
                                <input type="text" placeholder="ค้นหาทัวร์..." onChange={search} style={{ width: "88%", padding: "20px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                <div className="border-shadow" style={{ backgroundColor: "white", width: "100%", height: "110px", borderRadius: "10px 10px 0px 0px", display: "flex", flexDirection: "column", gap: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ fontSize: "25px", paddingLeft: "10px", paddingTop: "20px" }}><b>ช่วงราคา</b></div>
                                        <div onClick={() => { console.log(raw) }} style={{ fontSize: "20px", color: "#795695", paddingRight: "20px", paddingTop: "20px" }}><u><b>ล้างค่า</b></u></div>
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
                                                onChange={onChange}
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

                            {/* {data && data
                                .filter(val => {
                                    return (
                                        (check.oneDayTrip && val.attributes.Category === 'One-day') ||
                                        (check.multiDayTrip && val.attributes.Category === 'Multi-day ') ||
                                        (!check.oneDayTrip && !check.multiDayTrip)
                                    ) && (
                                            searchTerm === "" ||
                                            val.attributes.EventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            val.attributes.EventDescription.toLowerCase().includes(searchTerm.toLowerCase())
                                        );
                                })
                                .map(val => (
                                    <div className="entries-list" key={val.id}>
                                        <div style={{ height: "70px" }}></div>
                                        <div>{val.attributes.EventName}</div>
                                        <div>{val.attributes.EventDescription}</div>
                                        <div>{val.attributes.TimeCount}</div>
                                        <div>{val.attributes.Price}</div>
                                        <div>{val.attributes.Category}</div>
                                        <div className="border-shadow" style={{ backgroundColor: "white", borderRadius: "10px", width: "100%", height: "1200px" }}></div>
                                    </div>
                                ))} */}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour;
