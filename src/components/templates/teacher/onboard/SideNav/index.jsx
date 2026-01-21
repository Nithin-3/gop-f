import React from "react";
import "./index.css";
import { isEmpty } from "lodash";
import logo from "../../../../../assets/image/logo.svg";
import { NavLink } from "react-router-dom";

function SideNav({ pageNumber, setPageNumber, dispatchCall }) {
  const nav_list = [
    { item: "Basic Info", path: "basicinfo", div: [0, 1, 2, 3] },
    { item: "Teacher Type", path: "teachertype", div: [4] },
    { item: "Language Skills", path: "languageskills", div: [5, 6] },
    { item: "Intro Video", path: "introvideo", div: [7, 8, 9] },
    { item: "Resume", path: "resume", div: [10, 11, 12] },
  ];



  return (
    <div className="sidenavContainer">
      <div className="sidenav">
        <NavLink to="/">
          <figure className="logo">
            <img src={logo} alt="NeuroLingua Logo" width="100%" />
          </figure>
        </NavLink>
        <div className="circle">
          <h2>{`${Math.round(pageNumber * 8.33333333333)}%`}</h2> {/* need to update this based on data filled by user */}
        </div>
        {nav_list.map((navi, index) => {
          return (
            <div key={index} className="nav-item">
              <div className={`${navi.div.includes(pageNumber) ? "selected" : ""} subSectionNav`} /*onClick={() => handlePageChange(navi.item)}*/>
                {" "}
                {navi.item}{" "}
              </div>
              <div className="stepperDots">
                {navi.div.map((num, ind) => {
                  return <div key={ind} className={`MuiMobileStepper-dot  ${pageNumber === num ? `MuiMobileStepper-dotActive` : null}`}></div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
