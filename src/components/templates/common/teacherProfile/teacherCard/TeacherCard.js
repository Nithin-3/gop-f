import React from "react";
import English from "../../../../../assets/flags/english.png";
import { BookFreeTrialButton } from "../../commonUtils";
import { useNavigate } from "react-router-dom";

function TeacherCard(props) {
  const navigate = useNavigate();
  const { course, width, showFav } = props;

  const [fav, setFav] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(true);

  if (!course || !course.userId) return null;
  const onType = course.userId.onType || {};

  const showTeacherProfile = () => {
    localStorage.setItem("chosenCourse", JSON.stringify(course));
    navigate("/teacher-profile");
  };

  const getYTVideoId = (url) => {
    if (typeof url !== "string") return "";
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    return "";
  };

  const videoId = getYTVideoId(onType.videoURL?.data);

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
              <div onClick={() => showTeacherProfile()} style={{ cursor: "pointer" }}>
                <img
                  src={course.courseImage?.data || onType.teacherProfilePic?.data}
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
              <div style={{ fontSize: "20px", fontWeight: "bold", textAlign: 'center' }}>
                {(onType.firstName?.data || onType.firstName || "") +
                  " " +
                  (onType.lastName?.data || onType.lastName || "")}
              </div>
              <div style={{ color: "#fe1848" }}>
                {onType.teacherType?.data || onType.teacherType}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <span key={index}>
                    <i className={index < (onType.avgRating || 0) ? "fas fa-star" : "far fa-star"}></i>
                  </span>
                ))}
                <div>&nbsp; ({onType.expertise?.ratings_teacher?.length || 0})</div>
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
                Course Name:
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
                  onClick={showTeacherProfile}
                >
                  {course.title?.data || course.title}
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
                  : {onType.createdAt ? new Date(onType.createdAt).toDateString().slice(4) : "N/A"}{" "}
                  <br />:{" "}
                  {onType.fromState?.data || onType.fromState || "N/A"},{" "}
                  {onType.fromCountry?.data || onType.fromCountry || "N/A"}{" "}
                  <br />:{" "}
                  {onType.currentState?.data || onType.currentState || "N/A"},{" "}
                  {onType.currentCountry?.data || onType.currentCountry || "N/A"}
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
                    {course.language?.data || course.language || "N/A"}
                  </div>
                </span>
                <span>
                  <div style={{ color: "#a4a4a5" }}>Speaks</div>
                  <div style={{ color: "#454544", fontSize: "18px" }}>
                    {onType.languageSpeak?.[0]?.data || onType.languageSpeak?.[0] || "N/A"}
                  </div>
                </span>
              </div>
              <BookFreeTrialButton course={course} />
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
              {videoId && (
                <iframe
                  width="250"
                  height="120"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Video"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginBottom: "20px",
            borderRadius: "10px",
            width: "100%",
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
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div onClick={() => showTeacherProfile()} style={{ cursor: "pointer", position: 'relative' }}>
                <img
                  src={course.courseImage?.data || onType.teacherProfilePic?.data}
                  alt="person_img"
                  style={{
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    objectFit: 'cover',
                    border: '2px solid #eee'
                  }}
                />
                {course.language?.data && (
                  <img
                    src={"/flags/" + course.language.data.toLowerCase() + ".png"}
                    alt="language_flag"
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                    }}
                  />
                )}
              </div>
              <div style={{ marginTop: "10px", textAlign: 'center' }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  <div
                    onClick={() => showTeacherProfile()}
                    style={{
                      cursor: "pointer",
                      padding: "5px 15px",
                      borderRadius: "3px",
                      border: "1px solid lightblue",
                      marginBottom: "5px"
                    }}
                  >
                    {course.title?.data || course.title}
                  </div>
                  <div onClick={() => showTeacherProfile()} style={{ cursor: "pointer" }}>
                    {(onType.firstName?.data || onType.firstName || "") + " " + (onType.lastName?.data || onType.lastName || "")}{" "}
                    &nbsp;<i className="far fa-check-circle" style={{ color: '#007bff' }}></i>
                  </div>
                </div>
                <div style={{ color: "#fe1848" }}>{onType.teacherType?.data || onType.teacherType}</div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <span key={index}>
                      <i className={index < (onType.avgRating || 0) ? "fas fa-star" : "far fa-star"} style={{ color: '#ffc107' }}></i>
                    </span>
                  ))}
                  <div>&nbsp; ({onType.expertise?.ratings_teacher?.length || 0})</div>
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
                  {onType.languageTeach?.[0]?.data || onType.languageTeach?.[0] || "N/A"}
                </div>
              </span>
              <span>
                <div style={{ color: "#a4a4a5" }}>Speaks</div>
                <div style={{ color: "#454544", fontSize: "18px" }}>
                  {onType.languageSpeak?.[0]?.data || onType.languageSpeak?.[0] || "N/A"}
                </div>
              </span>
            </div>
          </div>

          <div
            style={{
              margin: "15px 0",
              width: "100%",
              height: "1px",
              backgroundColor: "#eee",
            }}
          ></div>

          <div
            style={{
              marginTop: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BookFreeTrialButton course={course} />
          </div>
        </div>
      )}
    </>
  );
}


export default TeacherCard;
