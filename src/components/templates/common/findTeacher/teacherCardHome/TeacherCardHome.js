import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BookFreeTrialButton } from "../../commonUtils";

function TeacherCardHome({ course, width }) {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const showCalendar = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
  };

  const showTeacherProfile = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
    navigate("/teacher-profile");
  };

  if (width < 992) return null; // Only render for large screens

  const videoId = course.userId.onType.videoURL.data.split("?v=")[1];
  const languageFlag = `/flags/${course.language.data.toLowerCase()}.png`;

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      {/* Teacher Info Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          backgroundColor: "#fefeff",
          borderRadius: "10px 0 0 10px",
          borderRight: "1px solid #c3c2c2",
          padding: "1vw",
          width: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={showTeacherProfile}
            style={{ cursor: "pointer", width: "100px", height: "100px", position: "relative" }}
          >
            <img
              src={course.userId.onType.teacherProfilePic.data}
              alt="teacher"
              style={{
                border: "3px solid grey",
                objectFit: "cover",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
              }}
            />
            <img
              src={languageFlag}
              alt="language flag"
              style={{
                position: "absolute",
                bottom: 0,
                left: "-10px",
                width: "30px",
                height: "30px",
              }}
            />
          </div>
          <div style={{ marginTop: "10px", color: "#fe1848", textAlign: "center" }}>
            ${course.price.data} <br /> USD/hr
          </div>
        </div>

        {/* Teacher Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            <div
              onClick={showTeacherProfile}
              style={{
                cursor: "pointer",
                padding: "5px 15px",
                borderRadius: "3px",
                border: "1px solid lightblue",
                marginBottom: "10px",
              }}
            >
              {course.title.data}
            </div>
            <div onClick={showTeacherProfile} style={{ cursor: "pointer" }}>
              {course.userId.onType.firstName.data} {course.userId.onType.lastName.data}{" "}
              <i className="far fa-check-circle"></i>
            </div>
          </div>

          {/* Ratings */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <span key={index}>
                {index < course.userId.onType.avgRating ? (
                  <i className="fas fa-star" />
                ) : (
                  <i className="far fa-star" />
                )}
              </span>
            ))}
            &nbsp;({course.userId.onType.expertise.ratings_teacher.length})
          </div>

          {/* Teacher Type */}
          <div
            style={{
              color: "#7b7b7a",
              borderBottom: "1px solid #fe1848",
            }}
          >
            {course.userId.onType.teacherType.data}
          </div>

          {/* Languages */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            <div>
              <div style={{ color: "#a4a4a5" }}>Teaches</div>
              <div style={{ color: "#454544", fontSize: "18px" }}>
                {course.userId.onType.languageTeach[0].data}
                {course.userId.onType.languageTeach.length > 1 && (
                  <span style={{ fontSize: "14px" }}> +{course.userId.onType.languageTeach.length} more</span>
                )}
              </div>
            </div>
            <div>
              <div style={{ color: "#a4a4a5" }}>Also Speaks</div>
              <div style={{ color: "#454544", fontSize: "18px" }}>
                {course.userId.onType.languageSpeak[0].data}
                {course.userId.onType.languageSpeak.length > 1 && (
                  <span style={{ fontSize: "14px" }}> +{course.userId.onType.languageSpeak.length} more</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          onClick={showCalendar}
          style={{
            width: "170px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <i
            className={fav ? "fas fa-heart" : "far fa-heart"}
            onClick={() => setFav(!fav)}
            style={{ cursor: "pointer" }}
          ></i>
          <BookFreeTrialButton course={course} />
        </div>
      </div>

      {/* Video Section */}
      <div
        style={{
          backgroundColor: "#fefeff",
          borderRadius: "0 10px 10px 0",
          padding: "1vw",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <div
            onClick={() => setShowVideo(true)}
            style={{ cursor: "pointer", borderBottom: showVideo ? "1px solid #fe1848" : "none" }}
          >
            Video
          </div>
        </div>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "16vw",
            height: "150px",
          }}
        >
          {videoId && (
            <iframe
              width="250"
              height="120"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Teacher Video"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherCardHome;
