import React, { useState } from "react";
import "./TopNav.css";
import { isEmpty } from "lodash";
import logo from "../../../../../assets/image/logo.svg";
import { NavLink } from "react-router-dom";

const TopNav = ({ pageNumber, setPageNumber }) => {
  const nav_list = [
    { item: "Basic Info", path: "basicinfo", div: [0, 1, 2, 3] },
    { item: "Teacher Type", path: "teachertype", div: [4] },
    { item: "Language Skills", path: "languageskills", div: [5, 6] },
    { item: "Intro Video", path: "introvideo", div: [7, 8, 9] },
    { item: "Resume", path: "resume", div: [10, 11, 12] },
  ];
  const [expand, setExpand] = useState(false);
  const handlePageChange = (page) => {
    if (page) {
      const section = nav_list.filter((obj) => obj.item === page);
      console.log(section);
      if (!isEmpty(section[0])) {
        setPageNumber(section[0].div[0]);
      }
    }
  };
  return (
    <div className="topnav-container">
      <div className="topnav">
        <div className="topnav-header">
          <div className="grid-item" style={{ justifySelf: "start" }}>
            <i
              className={`${expand ? "close" : "fa fa-bars bar-icon"}`}
              onClick={() => setExpand(true)}
            ></i>
            <i
              className={`${expand ? "fa fa-close bar-icon" : "close"}`}
              onClick={() => setExpand(false)}
            ></i>
          </div>
          <NavLink to="/">
            <figure className="top-logo" style={{ justifySelf: "center" }}>
              <img src={logo} alt="NeuroLingua Logo" width="100%" />
            </figure>
          </NavLink>
          <div className="top-circle" style={{ justifySelf: "end" }}>
            <h2 className="circle-text">{`${Math.round(
              pageNumber * 8.33333333333
            )}%`}</h2>{" "}
            {/* need to update this based on data filled by user */}
          </div>
        </div>
      </div>
      <div className={`${expand ? "topnav-items" : "close"}`}>
        {nav_list.map((navi, index) => {
          return (
            <div key={index} className="">
              <div
                className={`${navi.div.includes(pageNumber)
                    ? "topnav-selected"
                    : "topnav-item"
                  } subSectionNav`} /*onClick={() => handlePageChange(navi.item)}*/
              >
                {" "}
                {navi.item}{" "}
              </div>
              {/* <div className="stepperDots">
              {navi.div.map((num, ind) => {
                return (
                  <div
                    key={ind}
                    className={`MuiMobileStepper-dot  ${
                      pageNumber === num ? `MuiMobileStepper-dotActive` : null
                    }`}
                  ></div>
                );
              })}
            </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopNav;
