import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../../../../../store/actions/conversations";
import { useWindowDimensions } from "../../../../../utils/util";
import "./currTeachercard.css";

const CurrTeacherCard = ({ tinfo }) => {
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const otherOptions = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();



  const openMessage = async () => {
    const userProfile = JSON.parse(window.localStorage.getItem("profile"));

    const bodyObj = {
      senderId: userProfile?._id,
      receiverId: tinfo.userId,
    };

    try {
      const res = await dispatch(createConversation(bodyObj));
      setShowOtherOptions(false);

      navigate("/student/messages", {
        state: { cchat: res.status ? res : res.conv?.[0] },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const dropDownArr = [
    { text: "Message the teacher", onclick: openMessage },
    { text: "View lesson history" },
    { text: "Remove from this list" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (otherOptions.current && !otherOptions.current.contains(e.target)) {
        setShowOtherOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!tinfo) return null; // Safe guard against missing prop

  const CardContent = () => (
    <>
      {/* header */}
      <div className="header">
        <div className="pInfo">
          <div className="imgContainer">
            <img
              src={tinfo.teacherProfilePic?.data}
              alt="teacher profile"
              style={{ height: "80px", width: "80px", borderRadius: "50%" }}
            />
            <img
              src={`/flags/${tinfo.motherTongue?.data?.toLowerCase()}.png`}
              className="flag"
              alt="flag"
            />
          </div>

          <div className="pcontent">
            <div className="teachername">{tinfo.firstName?.data}</div>
            <div className="profession">{tinfo.teacherType?.data}</div>

            <div className="rating">
              <div className="stars" style={{ color: "gold" }}>
                <i className="fa-solid fa-star"></i>
                <span>4.9</span>
              </div>
              <div className="lessons">230 lessons</div>
            </div>
          </div>
        </div>

        {width < 992 && (
          <div className="moreOptions" ref={otherOptions}>
            <i
              className="moreOptionsIcon fas fa-ellipsis-h"
              onClick={() => setShowOtherOptions(true)}
            ></i>

            <ul className={`otherOptions ${showOtherOptions ? "showOptions" : ""}`}>
              {dropDownArr.map((item, index) => (
                <li key={index} onClick={() => item.onclick?.()}>
                  <div>{item.text}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* below portion */}
      <div className="belowPortion">
        <div className="selfIntro">{tinfo.selfIntro?.data}</div>

        <div className="languageSec">
          <div className="teaches">
            <div style={{ color: "gray" }}>TEACHES</div>
            <div style={{ display: "flex", gap: "0.2rem" }}>
              {tinfo.languageTeach?.map((item, index) => (
                <span key={index}>
                  {item.data}
                  {index + 1 < tinfo.languageTeach.length && ","}
                </span>
              ))}
            </div>
          </div>

          <div className="speaks">
            <div style={{ color: "gray" }}>ALSO SPEAKS</div>
            <div style={{ display: "flex", gap: "0.2rem" }}>
              {tinfo.languageSpeak?.map((item, index) => (
                <span key={index}>
                  {item.data}
                  {index + 1 < tinfo.languageSpeak.length && ","}
                </span>
              ))}
            </div>
          </div>

          <div className="rate">
            <div style={{ color: "gray" }}>HOURLY RATE</div>
            <div>INR 555.94</div>
          </div>
        </div>

        {width < 992 && (
          <div className="scheduleBtnContainer">
            <button className="scheduleBtn">Schedule a lesson</button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="cardContainer">
      <CardContent />

      {width >= 992 && (
        <div className="btnContainer">
          <button className="scheduleBtn">Schedule a lesson</button>

          <div className="moreOptions" ref={otherOptions}>
            <i
              className="moreOptionsIcon fas fa-ellipsis-h"
              onClick={() => setShowOtherOptions(true)}
            ></i>

            <ul className={`otherOptions ${showOtherOptions ? "showOptions" : ""}`}>
              {dropDownArr.map((item, index) => (
                <li key={index} onClick={() => item.onclick?.()}>
                  <div>{item.text}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrTeacherCard;
