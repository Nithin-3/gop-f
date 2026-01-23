import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import LokkingForCourses from "../../../../assets/images/business_team_looking_for_new_people.jpg";

import TeacherCardHome from "./teacherCardHome/TeacherCardHome";
import TeacherCard from "../teacherProfile/teacherCard/TeacherCard";
import Filters from "./filterTeacher/Filters";
import Select from "./filterTeacher/select/Select";

import { useWindowDimensions } from "../../../../utils/util";
import { langOptions } from "./filterTeacher/filterUtils";
import { DEFAULT_FILTERS } from "../../../../utils/constants";

import Navigation from "../../../../landing/components/Nav";
import Flag from "../../../../assets/icons/flag_icon.svg";

function FindTeacher() {

  const location = useLocation();
  const { width } = useWindowDimensions();

  const [showFilter, setShowFilter] = useState(false);
  const [focus, setFocus] = useState(false);
  const [coursesArr, setCoursesArr] = useState([]);
  const [lang, setLang] = useState(location.state?.lang || "Language");

  const [flagSrc, setFlagSrc] = useState(Flag);
  const resetRef = useRef();

  // Save default filters to localStorage if not already present
  React.useEffect(() => {
    if (!localStorage.getItem("allFilters")) {
      localStorage.setItem("allFilters", JSON.stringify(DEFAULT_FILTERS));
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#e5e4e4",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      <Navigation />

      {/* Filters Section */}
      <div
        style={{
          padding: "0 0 20px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "10px 0 0 0",
            width: width >= 992 ? "90vw" : "100vw",
            backgroundColor: "#fefeff",
            padding: "20px 10px",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "space-around",
            gap: width >= 992 ? "unset" : "10px",
            flexWrap: "wrap",
          }}
        >
          {width >= 992 ? (
            <Filters
              focus={focus}
              setFocus={setFocus}
              width={width}
              courseArr={coursesArr}
              setCoursesArr={setCoursesArr}
              lang={lang}
              setLang={setLang}
              resetRef={resetRef}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100vw",
                }}
              >
                <Select
                  name="lang"
                  options={langOptions}
                  value={lang}
                  setValue={setLang}
                  focus={focus}
                  setFocus={setFocus}
                  width={width}
                  flagSrc={flagSrc}
                  setFlagSrc={setFlagSrc}
                />
                <div
                  style={{
                    cursor: "pointer",
                    padding: "10px 20px",
                    textAlign: "center",
                    backgroundColor: "#fefeff",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgb(0 0 0 / 0.1)",
                  }}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  Filters
                </div>
              </div>

              <div
                style={{
                  display: showFilter ? "flex" : "none",
                  padding: "20px 0",
                  width: "90vw",
                  borderRadius: "10px",
                  marginTop: "15px",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #007bff",
                }}
              >
                <Filters
                  focus={focus}
                  setFocus={setFocus}
                  width={width}
                  courseArr={coursesArr}
                  setCoursesArr={setCoursesArr}
                  lang={lang}
                  setLang={setLang}
                />
              </div>
            </div>
          )}
        </div>

        {/* Courses Section */}
        <div
          style={{
            opacity: focus ? 0.2 : 1,
            width: width >= 992 ? "55vw" : "90vw",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {coursesArr?.length > 0 ? (
            coursesArr.map((item, index) =>
              width >= 992 ? (
                <TeacherCardHome key={index} course={item} width={width} />
              ) : (
                <TeacherCard key={index} course={item} width={width} showFav />
              )
            )
          ) : (
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <img
                src={LokkingForCourses}
                alt="no_course_found_img"
                style={{ width: width >= 992 ? "40vw" : "80vw" }}
              />
              <div style={{ color: "grey", fontSize: "25px" }}>
                Oops.. We are still looking for the perfect teacher/course for
                you. Please come back soon.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindTeacher;
