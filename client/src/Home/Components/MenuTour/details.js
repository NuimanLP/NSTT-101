import { Table } from "antd";
import "../admin.css";
import { axioss } from "../axios.js";
import NavigateBar from "../Navbar";
import water from "../../Source/water.png";
import { useState, useEffect } from "react";
import axios from "axios";
import time from "../../Source/time.png";
import date from "../../Source/date.png";
import book from "../../Source/book.png";
import edit from "../../Source/edit.png";
import { IoMdStar } from "react-icons/io";
import rocket from "../../Source/rocket.png";

function ListTour(props) {
  const columns = [
    {
      render: (record) => {
        return (
          <div
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "500px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              id="top"
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                id="tour-face"
                style={{
                  gap: "10px",
                  height: "100%",
                  width: "40%",
                  paddingLeft: "10px",
                  paddingTop: "3px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  id="tour-info"
                  style={{
                    width: "95%",
                    height: "15%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#371F77",
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px 0px 0px 3px",
                      display: "flex",
                    }}
                  >
                    <div
                      className="inika-regular"
                      style={{
                        paddingLeft: "20px",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        fontSize: "19px",
                        color: "white",
                      }}
                    >
                      <b>รหัส {String(record.Id).padStart(3, "0")}</b>
                    </div>
                    <div className="triangle-up"></div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#D9D9D9",
                      width: "100%",
                      height: "100%",
                      borderRadius: "0px 8px 5px 0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <img
                      src={rocket}
                      style={{ width: "25px", height: "25px" }}
                      alt="rocket"
                    ></img>
                    <div className="inika-regular" style={{ fontSize: "18px" }}>
                      <b>{record.Category}</b>
                    </div>
                  </div>
                </div>
                <img
                  src={`${axioss.prefix}${record.image}`}
                  style={{
                    marginTop: "20px",
                    position: "relative",
                    borderRadius: "10px",
                    zIndex: "1",
                    border: "2px solid black",
                    width: "93%",
                    height: "500px",
                  }}
                  alt="tour-image"
                ></img>
              </div>

              <div
                id="tour-detail"
                style={{ height: "100%", width: "60%", display: "flex", flexDirection: "column" }}
              >
                <div
                  className="kanit-medium"
                  style={{
                    fontSize: "25px",
                    width: "100%",
                    height: "10%",
                    paddingTop: "25px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ paddingLeft: "10px" }}>
                    <b>{record.EventName}</b>
                  </div>
                  {/* <div style={{ paddingRight: "10px" }}><img className="editbutton" style={{ height: "90%" }} src={edit}></img></div> */}
                </div>
                <div style={{ width: "100%", height: "90%" }}>
                  <div style={{ width: "100%", height: "10%" }}></div>
                  <div
                    style={{
                      gap: "20px",
                      width: "95%",
                      height: "10%",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "25px",
                    }}
                  >
                    <img style={{ height: "60%" }} src={time} alt="time"></img>
                    <div className="kanit-medium">{record.DayCount}</div>
                  </div>
                  <div
                    style={{
                      gap: "20px",
                      width: "95%",
                      height: "10%",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "25px",
                    }}
                  >
                    <img style={{ height: "60%" }} src={date} alt="date"></img>
                    <div className="kanit-medium">
                      {new Date(record.TourDateStart).toLocaleDateString('th-TH')}
                    </div>
                  </div>
                  <div
                    style={{
                      gap: "20px",
                      width: "95%",
                      height: "10%",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "25px",
                    }}
                  >
                    <img style={{ height: "60%" }} src={book} alt="book"></img>
                    <div className="kanit-medium">{record.Tourplan}</div>
                  </div>
                  <div style={{ width: "100%", height: "5%" }}></div>
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {/* Remaining code for seat, accommodation, and price */}
                  </div>
                  <div
                    className="kanit-medium"
                    style={{
                      display: "flex",
                      width: "90%",
                      justifyContent: "flex-end",
                      paddingTop: "10px",
                      fontSize: "20px",
                    }}
                  >
                    ราคาเริ่มต้น {record.Price}
                  </div>
                </div>
              </div>
            </div>

            <div
              id="bottom"
              style={{
                zIndex: "0",
                width: "95%",
                height: "15%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  backgroundColor: "#D9D9D9",
                  borderRadius: "0px 8px 25px 25px",
                  paddingRight: "60px",
                  paddingTop: "20px",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <div
                  className="showdetail kanit-medium"
                  style={{
                    backgroundColor: "#F36C60",
                    height: "40px",
                    width: "140px",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  ดูรายละเอียด
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  return <Table dataSource={props.data} columns={columns} />;
}

export default ListTour;
