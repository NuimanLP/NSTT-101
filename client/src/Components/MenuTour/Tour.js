import "./Tour.css";
import NavigateBar from "../Navbar";
import water from "../../Source/water.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Tour() {
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sliderValue, setSliderValue] = useState(9999);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const sliders = async () => {
        try {
            const response = await axios.get(`http://localhost:1337/api/tours?filters[Price][$lte]=${sliderValue}`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        sliders();
    }, [sliderValue]);

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:1337/api/tours");
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    const search = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <NavigateBar />
            <div className="gap100"></div>
            <div className="body">
                <div className="row">
                    <div className="element">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img src={water} style={{ borderRadius: "15px", display: "flex", justifyContent: "center" }} width="1800" height="600" alt="water" />
                        </div>

                        <div className="entries">
                            <div className="entries-filter" style={{ gap: "20px", display: "flex", flexDirection: "column" }}>
                                <input type="text" placeholder="ค้นหาทัวร์..." onChange={search} style={{ width: "200px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
                                <div className="border-shadow" style={{ backgroundColor: "white", width: "100%", height: "110px", borderRadius: "10px 10px 0px 0px", display: "flex", flexDirection: "column", gap: "15px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ fontSize: "25px", paddingLeft: "20px", paddingTop: "20px" }}><b>ช่วงราคา</b></div>
                                        <div style={{ fontSize: "20px", color: "#795695", paddingRight: "20px", paddingTop: "20px" }}><u><b>ล้างค่า</b></u></div>
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
                                                <input className="check" type="checkbox"></input>
                                                <div>One-day Trip</div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", width: "100%", height: "40px" }}>
                                            <div style={{ paddingLeft: "35px", paddingTop: "5px", display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                                                <input className="check" type="checkbox"></input>
                                                <div>Multi-days Trip</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {data && data
                                .filter(val => {
                                    return searchTerm === "" ||
                                        val.attributes.EventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        val.attributes.EventDescription.toLowerCase().includes(searchTerm.toLowerCase());
                                })
                                .map(val => (
                                    <div className="entries-list" key={val.id}>
                                        <div style={{ height: "70px" }}></div>
                                        <div>{val.attributes.EventName}</div>
                                        <div>{val.attributes.EventDescription}</div>
                                        <div>{val.attributes.TimeCount}</div>
                                        <div>{val.attributes.Price}</div>
                                        <div className="border-shadow" style={{ backgroundColor: "white", borderRadius: "10px", width: "100%", height: "1200px" }}></div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour;
