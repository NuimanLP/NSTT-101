import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ListTour from "./details";
import Search from "antd/es/input/Search";
import Checklogin from "../../../compo/Navigate.js";
import { FaDirections, FaTrash } from "react-icons/fa";
import noimg from "../../Source/noimg.webp";
import "./Tour.css";

function Tour() {
  const [data, setData] = useState([]);
  const [raw, setRaw] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState(null);
  const imageref = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sliderValue, setSliderValue] = useState(9999);
  const [check, setCheck] = useState({
    oneDayTrip: true,
    multiDayTrip: true
  });
  const [tourFile, setTourFile] = useState(null);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleCreateTour = async () => {
    try {
      const tourResponse = await axios.post('http://localhost:1337/api/tours', {
        data: {
          "EventName": "------",
          "Price": 9999,
          "Category": "One-day Trip"
        }
      });

      const tourId = tourResponse.data.data.id;

      const uploadPromises = [];
      for (const file of tourFile) {
        const formData = new FormData();
        formData.append('ref', 'api::tour.tour');
        formData.append('field', 'Image');
        formData.append('refId', tourId);
        formData.append('files', file);

        const uploadPromise = axios.post('http://localhost:1337/api/upload', formData);
        uploadPromises.push(uploadPromise);
      }

      const uploadResponses = await Promise.all(uploadPromises);

      console.log("Tour created successfully with images:", uploadResponses);

    } catch (error) {
      console.error('Error creating tour:', error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(imageref.current.files);
    setTourFile(files);
  };

  const handleDeleteTour = async (tourId) => {
    try {
      const response = await axios.delete(`http://localhost:1337/api/tours/${tourId}`);
      console.log(response);
      filter(); // Refresh the tour list after deletion
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const filter = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/tours?populate=*&filters[$and][0][Price][$lte]=${sliderValue}&filters[$or][1][Category][$eq]=${check.oneDayTrip ? 'One-day Trip' : ''}&filters[$or][2][Category][$eq]=${check.multiDayTrip ? 'Multi-day Trip' : ''}`);
      setRaw(response);
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
        Free: element.attributes.free,
        EventCount: element.attributes.EventCount,
        ShoppingCount: element.attributes.ShoppingCount,
        Vehicle: element.attributes.Vehicle,
        image: element.attributes.Image?.data[0].attributes.url,
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
  }, [searchTerm, sliderValue, check]);

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

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    filter()
  }, []);

  return (
    <div>
      <Checklogin />
      <div className="gap100"></div>
      <div className="body">
        <div className="row">
          <div className="element">
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* Your image component */}
            </div>
            <div className="entries">
              <div className="entries-filter" style={{ gap: "20px", display: "flex", flexDirection: "column", border: '3px solid #73AD21' }}>
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
              <div className="entries-list" style={{ border: '3px solid #73AD21' }}>
                <div style={{ display: 'flex' }}>
                  <button onClick={() => handleCreateTour(image)} className="button" style={{ width: '160px', borderRadius: '0px' }}>
                    <span className="button__text" style={{ marginLeft: '15px' }}>Add</span>
                    <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                  </button>
                  <div>
                    <input type="file" ref={imageref} onChange={handleFileChange} multiple />
                  </div>
                </div>
                <div style={{ height: "70px" }}></div>
                <div className="border-shadow" style={{ borderRadius: "10px", width: "100%", height: "1200px" }}>
                  <div>
                    {/* Pass onDelete function to ListTour */}
                    <ListTour data={data} onDelete={handleDeleteTour} />
                  </div>
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
