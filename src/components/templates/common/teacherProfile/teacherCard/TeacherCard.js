import React from "react";
import Person from "../../../../../assets/icons/boy_icon.svg";
import English from "../../../../../assets/flags/english.png";
import Video from "../../../../../assets/video.mp4";
import { BookFreeTrialButton } from "../../commonUtils";
import { useNavigate } from "react-router-dom";

function TeacherCard(props) {
  const navigate = useNavigate();
  const { course, width, showFav } = props;

  const [fav, setFav] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(true);

  const showTeacherProfile = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
    navigate("/teacher-profile");
  };

  const showCalender = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
    // You can navigate to calendar if needed: navigate("/calendar")
  };

  return (
    <>
      {width >= 992 ? (
        <div
          style={{
            borderRadius: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#fefeff",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", flexGrow: "3" }}>
            <div
              style={{
                marginRight: "2vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div onClick={() => showTeacherProfile()}>
                <img
                  src={course && course.courseImage.data}
                  alt="course_img"
                  style={{
                    border: "3px solid grey",
                    objectFit: "cover",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                  }}
                />
                <img
                  src={English}
                  alt="language_img"
                  style={{
                    marginLeft: "-30px",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                  }}
                />
              </div>
              <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                {course.userId.onType.firstName.data +
                  " " +
                  course.userId.onType.lastName.data}
              </div>
              <div style={{ color: "#fe1848" }}>
                {course.userId.onType.teacherType.data}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <span key={index}>
                    <i className="fas fa-star"></i>
                  </span>
                ))}
                <div>&nbsp; (250)</div>
              </div>
            </div>

            <div
              style={{
                fontSize: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <p>
                Course Name
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    padding: "5px 15px",
                    width: "fit-content",
                    marginBottom: "10px",
                    borderRadius: "3px",
                    border: "1px solid lightblue",
                    marginLeft: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {course.title.data}
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span>
                  Teacher Since <br />
                  From <br />
                  Living in
                </span>
                <span style={{ fontWeight: "bold" }}>
                  : {new Date(course.userId.onType.createdAt).toDateString().slice(4)}{" "}
                  <br />:{" "}
                  {course.userId.onType.fromState.data},{" "}
                  {course.userId.onType.fromCountry.data}{" "}
                  <br />:{" "}
                  {course.userId.onType.currentState.data},{" "}
                  {course.userId.onType.currentCountry.data}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <span>
                  <div style={{ color: "#a4a4a5" }}>Teaches</div>
                  <div style={{ color: "#454544", fontSize: "18px" }}>
                    {course.language.data}
                  </div>
                </span>
                <span>
                  <div style={{ color: "#a4a4a5" }}>Speaks</div>
                  <div style={{ color: "#454544", fontSize: "18px" }}>French</div>
                </span>
              </div>
              <BookFreeTrialButton />
            </div>
          </div>

          <div style={{ flexGrow: "2" }}>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-evenly",
                gap: "30px",
              }}
            >
              <div
                onClick={() => setShowVideo(true)}
                style={{
                  cursor: "pointer",
                  borderBottom: showVideo ? "1px solid #fe1848" : "none",
                }}
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
              <iframe
                width="250"
                height="120"
                src={
                  "https://www.youtube.com/embed/" +
                  course.userId.onType.videoURL.data.split("?v=")[1]
                }
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginBottom: "20px",
            borderRadius: "10px",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fefeff",
            padding: "20px",
          }}
        >
          {showFav && (
            <div style={{ textAlign: "right" }}>
              {fav ? (
                <i className="fas fa-heart" onClick={() => setFav(false)}></i>
              ) : (
                <i className="far fa-heart" onClick={() => setFav(true)}></i>
              )}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                marginRight: "2vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div onClick={() => showTeacherProfile()} style={{ cursor: "pointer" }}>
                <img
                  src={course.courseImage.data}
                  alt="person_img"
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                  }}
                />
                <img
                  src={"/flags/" + course.language.data.toLowerCase() + ".png"}
                  alt="language_flag"
                  style={{
                    marginLeft: "-30px",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                  }}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                  <div
                    onClick={() => showTeacherProfile()}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      padding: "5px 15px",
                      width: "fit-content",
                      marginBottom: "10px",
                      borderRadius: "3px",
                      border: "1px solid lightblue",
                    }}
                  >
                    {course.title.data}
                  </div>
                  <div onClick={() => showTeacherProfile()} style={{ cursor: "pointer" }}>
                    {course.userId.onType.firstName.data + " " + course.userId.onType.lastName.data}{" "}
                    &nbsp;<i className="far fa-check-circle"></i>
                  </div>
                </div>
                <div style={{ color: "#fe1848" }}>{course.userId.onType.teacherType.data}</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <span key={index}>
                      <i className="fas fa-star"></i>
                    </span>
                  ))}
                  <div>&nbsp; (250)</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              fontSize: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <span>
                <div style={{ color: "#a4a4a5" }}>Teaches</div>
                <div style={{ color: "#454544", fontSize: "18px" }}>
                  {course.userId.onType.languageTeach[0].data}
                </div>
              </span>
              <span>
                <div style={{ color: "#a4a4a5" }}>Speaks</div>
                <div style={{ color: "#454544", fontSize: "18px" }}>
                  {course.userId.onType.languageSpeak[0].data}
                </div>
              </span>
            </div>
          </div>

          <div
            style={{
              margin: "15px 0",
              width: "100%",
              height: "2px",
              backgroundColor: "black",
            }}
          ></div>

          <div
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BookFreeTrialButton />
          </div>
        </div>
      )}
    </>
  );
}

export default TeacherCard;
