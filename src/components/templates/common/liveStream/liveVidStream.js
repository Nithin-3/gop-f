import React, { useState, useEffect, useContext } from 'react';
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { SocketContext } from '../../../../context/socketContext';
import { toast } from 'react-toastify';

const LiveVidStream = () => {
  const socket = useContext(SocketContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [currRole, setCurrRole] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [availDetails, setAvailDetails] = useState();
  const [sessionDetails, setSessionDetails] = useState();
  const [studentName, setStudentName] = useState();
  const [teacherName, setTeacherName] = useState();
  const [isTeacherLive, setIsTeacherLive] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment());

  // WebRTC States
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const localVideoRef = React.useRef();
  const remoteVideoRef = React.useRef();
  const peerRef = React.useRef();

  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
      // Note: For production and mobile data usage, you MUST add TURN servers here.
      // High-reliability production examples (replace with your real credentials):
      /*
      {
        urls: "turn:your-turn-server.com:3478",
        username: "your-username",
        credential: "your-password"
      }
      */
    ],
  };

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
    setAvailDetails(state.availDetails);
    setCourseDetails(state.courseDetails);
    setSessionDetails(state.sessionDetails);
    setStudentName(state.studentName);

    if (state.teacherName) {
      setTeacherName(state.teacherName);
    } else if (state.teacherDetails) {
      const firstName = state.teacherDetails.firstName?.data || state.teacherDetails.firstName || "";
      const lastName = state.teacherDetails.lastName?.data || state.teacherDetails.lastName || "";
      setTeacherName(`${firstName} ${lastName}`.trim());
    }
  }, [location, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(moment()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sessionDetails) {
      const id = currRole === "Student" ? sessionDetails.studentId : sessionDetails.teacherId;
      socket?.emit("addUser", id);
    }
  }, [sessionDetails, currRole, socket]);

  const localStreamRef = React.useRef(null);
  const remoteStreamRef = React.useRef(new MediaStream());
  const candidateQueue = React.useRef([]);

  // 1. COMPREHENSIVE CLEANUP (Fixes Active Camera/Mic on Exit)
  useEffect(() => {
    const cleanup = () => {
      console.log("Performing WebRTC cleanup...");

      // Stop local tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log(`Stopped local track: ${track.kind}`);
        });
        localStreamRef.current = null;
      }

      // Stop remote tracks
      if (remoteStreamRef.current) {
        remoteStreamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log(`Stopped remote track: ${track.kind}`);
        });
      }

      // Close Peer Connection
      if (peerRef.current) {
        peerRef.current.close();
        peerRef.current = null;
      }

      // Notify backend if teacher stops being live
      const profile = JSON.parse(localStorage.getItem("profile"));
      if (profile?.roleModel === "Teacher" && sessionDetails) {
        socket?.emit("sendTeacherIsLive", {
          senderId: sessionDetails.teacherId,
          receiverId: sessionDetails.studentId,
          isTeacherLive: false
        });
      }
    };

    // Handle Tab Close / Refresh
    window.addEventListener('beforeunload', cleanup);

    return () => {
      // Handle Navigation Away (React Unmount)
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, [socket, sessionDetails]);

  // Sync ref with localStream state
  useEffect(() => {
    localStreamRef.current = localStream;
  }, [localStream]);

  // 2. SIGNALING IMPROVEMENTS (Fixes Remote Stream Rendering)
  useEffect(() => {
    if (!socket) return;

    socket.on("getIsTeacherLive", (data) => {
      setIsTeacherLive(data.isTeacherLive);
    });

    socket.on("call-made", async ({ offer }) => {
      if (currRole !== "Teacher") return;
      setIsConnecting(true);

      const peer = createPeer();
      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      // Process queued candidates that arrived before the peer was ready
      while (candidateQueue.current.length) {
        const cand = candidateQueue.current.shift();
        await peer.addIceCandidate(new RTCIceCandidate(cand));
      }

      const stream = await getMedia();
      stream.getTracks().forEach(track => peer.addTrack(track, stream));

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.emit("make-answer", {
        to: sessionDetails.studentId,
        answer
      });
      setIsConnecting(false);
      setInCall(true);
    });

    socket.on("answer-made", async ({ answer }) => {
      if (currRole !== "Student" || !peerRef.current) return;
      try {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));

        // Process queued candidates
        while (candidateQueue.current.length) {
          const cand = candidateQueue.current.shift();
          await peerRef.current.addIceCandidate(new RTCIceCandidate(cand));
        }

        setIsConnecting(false);
        setInCall(true);
      } catch (err) {
        console.error("Error setting remote description:", err);
      }
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      const peer = peerRef.current;
      if (peer && peer.remoteDescription) {
        try {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) { console.error("Error adding ice candidate", e); }
      } else {
        // Queue candidates if remoteDescription is not yet set
        candidateQueue.current.push(candidate);
      }
    });

    return () => {
      socket.off("getIsTeacherLive");
      socket.off("call-made");
      socket.off("answer-made");
      socket.off("ice-candidate");
    };
  }, [socket, currRole, sessionDetails]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, inCall]);

  useEffect(() => {
    if (inCall && remoteVideoRef.current && remoteStream) {
      console.log("Attaching remote stream to video element:", remoteStream.id);
      remoteVideoRef.current.srcObject = remoteStream;

      // Explicitly call play to handle some mobile/browser policies
      remoteVideoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
    }
  }, [inCall, remoteStream]);

  const getMedia = async () => {
    // 1. Check if mediaDevices is supported (only works on HTTPS or localhost)
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isSecure = window.location.protocol === 'https:';

      let errorMsg = "Your browser does not support video calls.";
      if (!isSecure) {
        errorMsg = "Video calls require a secure (HTTPS) connection. Please check your URL.";
      } else if (isMobile) {
        errorMsg = "Please use a modern browser like Chrome or Safari on your mobile device.";
      }

      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      // 2. Request media with standard constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user" // Prefer front camera on mobile
        },
        audio: true
      });
      setLocalStream(stream);
      localStreamRef.current = stream; // Update ref immediately for cleanup safety
      return stream;
    } catch (err) {
      // 3. Handle specific error types for better UX
      console.error("getUserMedia Error:", err);

      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        toast.error("Camera/Mic permission denied. Please enable them in your browser settings.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        toast.error("No camera or microphone detected on your device.");
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        toast.error("Your camera or microphone is already in use by another app.");
      } else {
        toast.error("Could not initialize video call. Please refresh and try again.");
      }
      throw err;
    }
  };

  const createPeer = () => {
    const peer = new RTCPeerConnection(iceServers);
    peerRef.current = peer;

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          to: currRole === "Teacher" ? sessionDetails.studentId : sessionDetails.teacherId,
          candidate: e.candidate
        });
      }
    };

    peer.ontrack = (e) => {
      console.log("Remote track received:", e.track.kind, e.streams);

      const stream = e.streams[0] || new MediaStream([e.track]);

      // Update persistent ref and state
      remoteStreamRef.current = stream;
      setRemoteStream(stream);
    };

    return peer;
  };

  const startCall = async () => {
    setIsConnecting(true);
    const stream = await getMedia();
    const peer = createPeer();

    stream.getTracks().forEach(track => peer.addTrack(track, stream));

    if (currRole === "Student") {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit("call-user", {
        to: sessionDetails.teacherId,
        offer
      });
    } else {
      // Teacher just notifies they are live and waits
      socket.emit("sendTeacherIsLive", {
        senderId: sessionDetails.teacherId,
        receiverId: sessionDetails.studentId,
        isTeacherLive: true
      });
      setInCall(true); // Teacher UI shows up immediately
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    console.log("Ending call and stopping tracks...");

    // 1. Stop all local tracks immediately
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
        console.log(`Stopped local track: ${track.kind}`);
      });
    }

    // 2. Stop all remote tracks
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log(`Stopped remote track: ${track.kind}`);
      });
    }

    // 3. Close peer connection
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // 4. Notify backend if teacher
    if (currRole === "Teacher" && sessionDetails) {
      socket?.emit("sendTeacherIsLive", {
        senderId: sessionDetails.teacherId,
        receiverId: sessionDetails.studentId,
        isTeacherLive: false
      });
    }

    navigate(-1);
  };

  const toggleMute = () => {
    if (localStream && localStream.getAudioTracks().length > 0) {
      localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream && localStream.getVideoTracks().length > 0) {
      localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled;
      setIsVideoOff(!isVideoOff);
    }
  };

  if (!location.state) return null;

  const classTime = moment(availDetails?.from);
  const diff = classTime.diff(currentTime);
  const canJoin = diff <= 120000;

  if (inCall) {
    return (
      <div className={styles.videoContainer} style={{ background: "#202124", height: "100vh", position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {remoteStream ? (
            <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <div style={{ color: "white", textAlign: "center" }}>
              <div className={styles.loader}></div>
              <p>{currRole === "Teacher" ? "Waiting for student to join..." : "Connecting to teacher..."}</p>
            </div>
          )}

          <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "240px", borderRadius: "12px", overflow: "hidden", border: "2px solid #51addc", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}>
            <video ref={localVideoRef} autoPlay muted playsInline style={{ width: "100%", display: isVideoOff ? "none" : "block" }} />
            {isVideoOff && <div style={{ background: "#3c4043", height: "135px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>Camera Off</div>}
          </div>

          {isConnecting && (
            <div style={{ position: "absolute", top: "20px", left: "20px", background: "rgba(0,0,0,0.6)", color: "white", padding: "8px 15px", borderRadius: "20px", fontSize: "0.8rem" }}>
              Connecting...
            </div>
          )}
        </div>

        <div style={{ background: "#202124", padding: "20px", display: "flex", justifyContent: "center", gap: "20px", alignItems: "center" }}>
          <button onClick={toggleMute} style={{ background: isMuted ? "#ea4335" : "#3c4043", border: "none", color: "white", padding: "15px", borderRadius: "50%", cursor: "pointer", width: "56px", height: "56px" }}>
            <i className={`fas ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
          </button>
          <button onClick={toggleVideo} style={{ background: isVideoOff ? "#ea4335" : "#3c4043", border: "none", color: "white", padding: "15px", borderRadius: "50%", cursor: "pointer", width: "56px", height: "56px" }}>
            <i className={`fas ${isVideoOff ? "fa-video-slash" : "fa-video"}`}></i>
          </button>
          <button onClick={endCall} style={{ background: "#ea4335", border: "none", color: "white", padding: "15px", borderRadius: "30px", cursor: "pointer", width: "120px", height: "56px", fontWeight: "bold" }}>
            Leave Call
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.joinScreen} style={{ minHeight: "80vh", width: "100%", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", padding: "2rem" }}>
      <div className={styles.cardSection}>
        <div style={{ maxWidth: "600px", width: "100%" }}>
          {currRole === "Student" && (
            <div className={styles.msgForStu} style={{ borderRadius: "12px", borderLeft: "6px solid #51addc", backgroundColor: "white", padding: "15px", marginBottom: "20px" }}>
              {isTeacherLive ? (
                <div style={{ color: "#2dce89", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className={styles.liveDot}></span>
                  The teacher is live! You can join the call now.
                </div>
              ) : (
                <div style={{ color: "#8898aa" }}>
                  <i className="fas fa-clock"></i> Waiting for the teacher to start the class...
                </div>
              )}
            </div>
          )}

          <div className={styles.joinCallWrapper} style={{ borderRadius: "20px", overflow: "hidden", backgroundColor: "white", boxShadow: "0 15px 35px rgba(50,50,93,0.1)" }}>
            <div style={{ background: "#51addc", padding: "1.5rem", color: "white" }}>
              <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Live Classroom</h2>
              <p style={{ margin: "5px 0 0 0", opacity: 0.8 }}>Secure WebRTC Video Session</p>
            </div>

            <div style={{ padding: "2rem" }}>
              <div className={styles.detailsOfCall}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "12px" }}>
                  <span style={{ color: "#8898aa", fontWeight: "600" }}>Course</span>
                  <span style={{ color: "#32325d", fontWeight: "bold" }}>{courseDetails?.title?.data || courseDetails?.title || "Class Session"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "12px", marginTop: "15px" }}>
                  <span style={{ color: "#8898aa", fontWeight: "600" }}>{currRole === "Student" ? "Teacher" : "Student"}</span>
                  <span style={{ color: "#32325d", fontWeight: "bold" }}>{currRole === "Student" ? teacherName : studentName}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                  <span style={{ color: "#8898aa", fontWeight: "600" }}>Starting</span>
                  <span style={{ color: "#51addc", fontWeight: "bold" }}>{classTime.format("hh:mm A, dddd")}</span>
                </div>
              </div>

              <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#f6f9fc", borderRadius: "15px", textAlign: "center" }}>
                <i className="fas fa-shield-alt" style={{ color: "#2dce89", fontSize: "1.2rem", marginBottom: "10px" }}></i>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#525f7f" }}>This call is end-to-end encrypted and hosted within the application.</p>
              </div>

              <button
                onClick={startCall}
                disabled={!canJoin || (currRole === "Student" && !isTeacherLive)}
                style={{
                  width: "100%",
                  marginTop: "2rem",
                  padding: "1.2rem",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: (canJoin && (currRole === "Teacher" || isTeacherLive)) ? "#51addc" : "#cbd5e0",
                  color: "white",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: (canJoin && (currRole === "Teacher" || isTeacherLive)) ? "pointer" : "not-allowed",
                  transition: "all 0.2s"
                }}
              >
                {currRole === "Teacher" ? (canJoin ? "Start Class" : "Too Early to Start") : (isTeacherLive ? "Join Class" : "Teacher Offline")}
              </button>

              <button onClick={() => navigate(-1)} style={{ width: "100%", marginTop: "1rem", background: "none", border: "none", color: "#8898aa", cursor: "pointer", fontSize: "0.9rem" }}>
                Cancel and Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .liveDot { display: inline-block; height: 10px; width: 10px; background: #2dce89; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 206, 137, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(45, 206, 137, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 206, 137, 0); }
        }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #51addc; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 15px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LiveVidStream;
