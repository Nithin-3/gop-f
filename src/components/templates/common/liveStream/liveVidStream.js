import React, { useState, useEffect, useContext } from 'react';
import VideoCall from './VideoCall';
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { generateAgoraToken } from '../../../../store/actions/agoraToken';
import { SocketContext } from '../../../../context/socketContext';
import { toast } from 'react-toastify';

const LiveVidStream = () => {
  const socket = useContext(SocketContext);
  const [inCall, setInCall] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currRole, setCurrRole] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [availDetails, setAvailDetails] = useState();
  const [teacherDetails, setTeacherDetails] = useState();
  const [sessionDetails, setSessionDetails] = useState();
  const [studentName, setStudentName] = useState();
  const [teacherName, setTeacherName] = useState();
  const [token, setToken] = useState();
  const [isTeacherLive, setIsTeacherLive] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    if (!location.state) {
      toast.error("Session information missing. Returning to dashboard.");
      const profile = JSON.parse(localStorage.getItem("profile"));
      const role = profile?.roleModel === "Teacher" ? "teacher" : "student";
      navigate(`/${role}/dashboard`);
      return;
    }

    const state = location.state;
    setCurrRole(state.role);
    setTeacherDetails(state.teacherDetails);
    setAvailDetails(state.availDetails);
    setCourseDetails(state.courseDetails);
    setSessionDetails(state.sessionDetails);
    setStudentName(state.studentName);

    // Handle teacher name dynamically
    if (state.teacherName) {
      setTeacherName(state.teacherName);
    } else if (state.teacherDetails) {
      const firstName = state.teacherDetails.firstName?.data || state.teacherDetails.firstName || "";
      const lastName = state.teacherDetails.lastName?.data || state.teacherDetails.lastName || "";
      setTeacherName(`${firstName} ${lastName}`.trim());
    }

    async function generateToken(role) {
      try {
        if (!state.sessionDetails?._id) return;

        const channelName = state.sessionDetails._id;
        const uid = role === "Student" ? state.sessionDetails.studentId : state.sessionDetails.teacherId;
        const agoraRole = role === "Student" ? "audience" : "publisher";

        const res = await dispatch(generateAgoraToken(channelName, agoraRole, uid));
        if (res?.success) {
          setToken(res.data.rtcToken);
        } else if (res?.rtcToken) {
          setToken(res.rtcToken);
        }
      } catch (error) {
        console.error("Token generation failed:", error);
      }
    }

    if (state.role) {
      generateToken(state.role);
    }
  }, [location, dispatch, navigate]);

  useEffect(() => {
    socket?.on("getIsTeacherLive", (data) => {
      setIsTeacherLive(data.isTeacherLive);
    });
    return () => socket?.off("getIsTeacherLive");
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sessionDetails) {
      const id = currRole === "Student" ? sessionDetails.studentId : sessionDetails.teacherId;
      socket?.emit("addUser", id);
    }
  }, [sessionDetails, currRole, socket]);

  const handleJoinCall = () => {
    if (sessionDetails?.meetingLink) {
      window.open(sessionDetails.meetingLink, "_blank");
    } else {
      setInCall(true);
    }

    if (currRole === "Teacher") {
      socket?.emit("sendTeacherIsLive", {
        senderId: sessionDetails?.teacherId,
        receiverId: sessionDetails?.studentId,
        isTeacherLive: true
      });
    }
  };

  if (!location.state) return null;

  const classTime = moment(availDetails?.from);
  const diff = classTime.diff(currentTime);
  const duration = moment.duration(diff);
  // Allow joining 2 minutes before class starts
  const canJoin = diff <= 120000;

  const formatCountdown = () => {
    if (diff <= 0) return "🟢 Live Now";
    const h = Math.floor(duration.asHours());
    const m = duration.minutes();
    const s = duration.seconds();
    return `⏳ ${h > 0 ? h + "h " : ""}${m}m ${s}s`;
  };

  return (
    <div className={styles.joinScreen} style={{ minHeight: "80vh", width: "100%", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", padding: "2rem" }}>
      {inCall ? (
        <VideoCall
          role={currRole}
          setInCall={setInCall}
          channel={sessionDetails?._id}
          uid={currRole === "Student" ? sessionDetails?.studentId : sessionDetails?.teacherId}
          token={token}
          courseDetails={courseDetails}
        />
      ) : (
        <div className={styles.cardSection}>
          <div style={{ maxWidth: "600px", width: "100%" }}>
            {currRole === "Student" && (
              <div className={styles.msgForStu} style={{ borderRadius: "12px", borderLeft: "6px solid #51addc", backgroundColor: "white" }}>
                {isTeacherLive ? (
                  <div style={{ color: "#2dce89", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ display: "flex", height: "12px", width: "12px", backgroundColor: "#2dce89", borderRadius: "50%", animation: "pulse 2s infinite" }}></span>
                    The teacher has started the session! You may join now.
                  </div>
                ) : (
                  <div style={{ color: "#8898aa" }}>
                    <i className="fas fa-clock"></i> Waiting for the teacher to start the class...
                  </div>
                )}
              </div>
            )}

            <div className={styles.joinCallWrapper} style={{ width: "100%", height: "auto", borderRadius: "20px", overflow: "hidden", backgroundColor: "white", padding: "0" }}>
              <div style={{ background: "#51addc", padding: "1.5rem", color: "white" }}>
                <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Class Entry Room</h2>
                <p style={{ margin: "5px 0 0 0", opacity: 0.8 }}>Ready to learn?</p>
              </div>

              <div style={{ padding: "2rem" }}>
                <div className={styles.detailsOfCall}>
                  <div className={styles.field} style={{ justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                    <div className={styles.fieldName}>Course</div>
                    <div className={styles.fieldValue} style={{ margin: 0, color: "#32325d" }}>{courseDetails?.title?.data || courseDetails?.title || "Class Session"}</div>
                  </div>
                  <div className={styles.field} style={{ justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "10px", marginTop: "15px" }}>
                    <div className={styles.fieldName}>{currRole === "Student" ? "Teacher" : "Student"}</div>
                    <div className={styles.fieldValue} style={{ margin: 0, color: "#32325d" }}>{currRole === "Student" ? teacherName : studentName}</div>
                  </div>
                  <div className={styles.field} style={{ justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "10px", marginTop: "15px" }}>
                    <div className={styles.fieldName}>Starts At</div>
                    <div className={styles.fieldValue} style={{ margin: 0, color: "#32325d" }}>{classTime.format("hh:mm A, dddd")}</div>
                  </div>
                  <div className={styles.field} style={{ justifyContent: "space-between", paddingBottom: "10px", marginTop: "15px" }}>
                    <div className={styles.fieldName}>Status</div>
                    <div className={styles.fieldValue} style={{ margin: 0, color: diff <= 0 ? "#2dce89" : "#f5365c", fontWeight: "800" }}>
                      {formatCountdown()}
                    </div>
                  </div>
                </div>

                {sessionDetails?.meetingLink && (
                  <div style={{
                    marginTop: "2rem",
                    color: "#5e72e4",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: "1rem",
                    backgroundColor: "#f6f9fc",
                    borderRadius: "10px",
                    border: "1px dashed #5e72e4"
                  }}>
                    <i className="fas fa-video"></i> This class is hosted on <strong>Google Meet</strong>
                  </div>
                )}

                <button
                  className={styles.joinBtn}
                  style={{
                    backgroundColor: canJoin ? "#51addc" : "#cbd5e0",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1.2rem",
                    padding: "1.2rem",
                    fontWeight: "bold",
                    cursor: canJoin ? "pointer" : "not-allowed",
                    width: "100%",
                    marginTop: "2rem",
                    boxShadow: canJoin ? "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)" : "none"
                  }}
                  disabled={!canJoin}
                  onClick={handleJoinCall}
                >
                  {canJoin ? (sessionDetails?.meetingLink ? "Join via Google Meet" : "Enter Classroom") : "Class Not Started Yet"}
                </button>

                {!canJoin && (
                  <p style={{ fontSize: "0.9rem", color: "#718096", marginTop: "1rem", fontStyle: "italic" }}>
                    You can enter the classroom 2 minutes before the start time.
                  </p>
                )}

                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #eee", textAlign: "center" }}>
                  <button
                    onClick={() => navigate(-1)}
                    style={{ background: "none", border: "none", color: "#8898aa", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
                @keyframes pulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 206, 137, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(45, 206, 137, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 206, 137, 0); }
                }
            `}</style>
    </div>
  );
};

export default LiveVidStream;
