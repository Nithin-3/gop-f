import React, { useState, useEffect, useContext } from 'react';
import styles from "./styles.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { SocketContext } from '../../../../context/socketContext';
import { toast } from 'react-toastify';

const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

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

  // Multi-user state
  const [remoteStreams, setRemoteStreams] = useState({}); // { userId: stream }
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const localVideoRef = React.useRef(null);
  const peers = React.useRef({}); // { userId: RTCPeerConnection }
  const localStreamRef = React.useRef(null);
  const candidateQueues = React.useRef({}); // { userId: [candidates] }

  const getMedia = React.useCallback(async () => {
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

    // Reuse existing active stream if available
    if (localStreamRef.current && localStreamRef.current.active) {
      return localStreamRef.current;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: true
      });
      setLocalStream(stream);
      localStreamRef.current = stream;
      return stream;
    } catch (err) {
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
  }, []);

  const createPeer = React.useCallback((targetId, stream) => {
    if (peers.current[targetId]) return peers.current[targetId];

    const peer = new RTCPeerConnection(iceServers);
    peers.current[targetId] = peer;

    stream.getTracks().forEach(track => peer.addTrack(track, stream));

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          to: targetId,
          from: currRole === "Teacher" ? sessionDetails.teacherId : sessionDetails.studentId,
          candidate: e.candidate
        });
      }
    };

    peer.ontrack = (e) => {
      setRemoteStreams(prev => ({
        ...prev,
        [targetId]: e.streams[0]
      }));
    };

    peer.onconnectionstatechange = () => {
      if (peer.connectionState === 'disconnected' || peer.connectionState === 'failed') {
        setRemoteStreams(prev => {
          const updated = { ...prev };
          delete updated[targetId];
          return updated;
        });
        if (peers.current[targetId]) {
          peers.current[targetId].close();
          delete peers.current[targetId];
        }
      }
    };

    return peer;
  }, [socket, currRole, sessionDetails]);

  const startCall = async () => {
    setIsConnecting(true);
    try {
      await getMedia();

      const roomId = sessionDetails.id;
      const userId = currRole === "Teacher" ? sessionDetails.teacherId : sessionDetails.studentId;

      socket.emit("join-class", { roomId, userId, role: currRole });
      if (currRole === "Teacher") {
        socket.emit("teacher-status-update", {
          teacherId: userId,
          isLive: true
        });
      }

      setInCall(true);
      setIsConnecting(false);
    } catch (err) {
      setIsConnecting(false);
    }
  };

  const muteAllStudents = () => {
    if (currRole !== "Teacher") return;
    socket.emit("mute-all-students", { roomId: sessionDetails.id });
    toast.info("All students muted");
  };

  const endCall = () => {
    const roomId = sessionDetails?.id;
    const userId = currRole === "Teacher" ? sessionDetails?.teacherId : sessionDetails?.studentId;

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    setLocalStream(null);

    Object.values(remoteStreams).forEach(stream => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    });

    Object.values(peers.current).forEach(peer => peer.close());
    peers.current = {};
    setRemoteStreams({});

    if (currRole === "Teacher") {
      socket?.emit("teacher-status-update", {
        teacherId: userId,
        isLive: false
      });
    }

    socket?.emit("leave-class", { roomId, userId });
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
    // Auto-start media for join preview
    getMedia().catch(() => { });
  }, [sessionDetails, currRole, socket, getMedia]);

  // Listen for teacher status (Needs to run before joining call)
  useEffect(() => {
    if (!socket || currRole !== "Student" || !sessionDetails?.teacherId) return;

    socket.emit("get-teacher-status", { teacherId: sessionDetails.teacherId });

    const handleStatus = ({ senderId, isTeacherLive }) => {
      if (senderId === sessionDetails.teacherId) {
        setIsTeacherLive(isTeacherLive);
      }
    };

    socket.on("getIsTeacherLive", handleStatus);
    return () => socket.off("getIsTeacherLive", handleStatus);
  }, [socket, currRole, sessionDetails]);

  useEffect(() => {
    localStreamRef.current = localStream;
  }, [localStream]);

  useEffect(() => {
    const cleanup = () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
        localStreamRef.current = null;
      }

      // Stop all remote tracks too
      setRemoteStreams(prev => {
        Object.values(prev).forEach(stream => {
          if (stream) stream.getTracks().forEach(track => track.stop());
        });
        return {};
      });

      Object.values(peers.current).forEach(peer => peer.close());
      peers.current = {};
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, inCall]);

  useEffect(() => {
    if (!socket || !inCall) return;

    socket.on("room-participants", async ({ participants }) => {
      if (currRole === "Teacher") {
        for (const part of participants) {
          if (part.role === "Student") {
            const userId = part.userId;
            const peer = createPeer(userId, localStreamRef.current);
            const offer = await peer.createOffer();
            await peer.setLocalDescription(offer);
            socket.emit("call-user", {
              to: userId,
              offer,
              from: sessionDetails.teacherId
            });
          }
        }
      }
    });

    socket.on("user-joined", async ({ userId, role }) => {
      if (currRole === "Teacher" && role === "Student") {
        // Teacher calls the new student
        const peer = createPeer(userId, localStreamRef.current);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.emit("call-user", {
          to: userId,
          offer,
          from: sessionDetails.teacherId
        });
      }
    });

    socket.on("call-made", async ({ offer, from }) => {
      const peer = createPeer(from, localStreamRef.current);
      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      const q = candidateQueues.current[from] || [];
      while (q.length) {
        await peer.addIceCandidate(new RTCIceCandidate(q.shift()));
      }

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit("make-answer", {
        to: from,
        answer,
        from: currRole === "Teacher" ? sessionDetails.teacherId : sessionDetails.studentId
      });
    });

    socket.on("answer-made", async ({ answer, from }) => {
      const peer = peers.current[from];
      if (peer) {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
        const q = candidateQueues.current[from] || [];
        while (q.length) {
          await peer.addIceCandidate(new RTCIceCandidate(q.shift()));
        }
      }
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      const peer = peers.current[from];
      if (peer && peer.remoteDescription) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        if (!candidateQueues.current[from]) candidateQueues.current[from] = [];
        candidateQueues.current[from].push(candidate);
      }
    });

    socket.on("force-mute", () => {
      if (currRole === "Student" && localStreamRef.current) {
        localStreamRef.current.getAudioTracks().forEach(t => t.enabled = false);
        setIsMuted(true);
        toast.info("Teacher has muted everyone");
      }
    });

    socket.on("user-left", ({ userId }) => {
      if (peers.current[userId]) {
        peers.current[userId].close();
        delete peers.current[userId];
      }
      setRemoteStreams(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    });



    return () => {
      socket.off("room-participants");
      socket.off("user-joined");
      socket.off("call-made");
      socket.off("answer-made");
      socket.off("ice-candidate");
      socket.off("force-mute");
      socket.off("user-left");
    };
  }, [socket, inCall, currRole, sessionDetails, createPeer]);

  if (!location.state) return null;

  const classTime = moment(availDetails?.from);
  const diff = classTime.diff(currentTime);
  const canJoin = diff <= 120000;

  if (inCall) {
    const remoteUserIds = Object.keys(remoteStreams);

    return (
      <div className={styles.VideoContainer}>
        {/* Main Stage */}
        <div className={styles.mainStage}>
          <div className={styles.videoWrapper}>
            {remoteUserIds.length > 0 ? (
              <div className={styles.videoGrid} data-count={remoteUserIds.length}>
                {remoteUserIds.map(uid => (
                  <div key={uid} className={styles.videoSlot}>
                    <video
                      autoPlay
                      playsInline
                      ref={el => { if (el) el.srcObject = remoteStreams[uid]; }}
                      className={styles.remoteVideo}
                    />
                    <div className={styles.participantName}>
                      {uid === sessionDetails.teacherId ? teacherName : "Student"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.previewPlaceholder}>
                <div className={styles.loader}></div>
                <p>{currRole === "Teacher" ? "Waiting for students to join..." : "Connecting to teacher..."}</p>
              </div>
            )}

            {/* Local PIP */}
            <div className={styles.localPIP}>
              <video
                ref={localVideoRef}
                className={styles.localVideo}
                autoPlay
                muted
                playsInline
                style={{ display: isVideoOff ? "none" : "block" }}
              />
              {isVideoOff && (
                <div className={styles.videoOffPlaceholder}>
                  <i className="fas fa-video-slash" style={{ fontSize: '24px', opacity: 0.5 }}></i>
                </div>
              )}
            </div>

            {isConnecting && (
              <div className={styles.connectingBadge}>
                <div className={styles.loader}></div>
                <span className={styles.connectionText}>Connecting...</span>
              </div>
            )}
          </div>
        </div>

        {/* Floating Controls Bar */}
        <div className={styles.controlBar}>
          <div className={styles.callInfo}>
            <div className={styles.timeText}>{currentTime.format("h:mm A")}</div>
            <div className={styles.divider}></div>
            <div className={styles.meetingName}>
              {courseDetails?.title?.data || courseDetails?.title || "Live Class"}
            </div>
          </div>

          <div className={styles.mainControls}>
            <button
              onClick={toggleMute}
              className={`${styles.iconBtn} ${isMuted ? styles.active : ''}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              <i className={`fas ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
            </button>
            <button
              onClick={toggleVideo}
              className={`${styles.iconBtn} ${isVideoOff ? styles.active : ''}`}
              title={isVideoOff ? "Turn on camera" : "Turn off camera"}
            >
              <i className={`fas ${isVideoOff ? "fa-video-slash" : "fa-video"}`}></i>
            </button>

            {currRole === "Teacher" && (
              <button
                onClick={muteAllStudents}
                className={styles.iconBtn}
                title="Mute All Students"
                style={{ background: '#5f6368' }}
              >
                <i className="fas fa-volume-mute"></i>
              </button>
            )}

            <button onClick={endCall} className={styles.endCallBtn} title="Leave call">
              <i className="fas fa-phone-alt" style={{ transform: 'rotate(135deg)' }}></i>
              <span>Leave Call</span>
            </button>
          </div>

          <div className={styles.secondaryControls}>
            <div className={styles.participantCount}>
              <i className="fas fa-users"></i>
              <span>{remoteUserIds.length + 1}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Preview / Join Screen UI
  return (
    <div className={styles.joinScreen}>
      <div className={styles.cardSection}>
        {/* Left Side: Preview */}
        <div className={styles.previewContainer}>
          <video
            ref={localVideoRef}
            className={styles.previewVideo}
            autoPlay
            muted
            playsInline
            style={{ display: localStream ? "block" : "none" }}
          />
          {!localStream && (
            <div className={styles.previewPlaceholder}>
              <i className="fas fa-user-circle" style={{ fontSize: "80px", marginBottom: "16px", opacity: 0.1 }}></i>
              <p>Camera is starting...</p>
            </div>
          )}

          <div className={styles.previewControls}>
            <button onClick={toggleMute} className={`${styles.iconBtn} ${isMuted ? styles.active : ''}`} style={{ background: 'rgba(60,64,67,0.9)' }}>
              <i className={`fas ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
            </button>
            <button onClick={toggleVideo} className={`${styles.iconBtn} ${isVideoOff ? styles.active : ''}`} style={{ background: 'rgba(60,64,67,0.9)' }}>
              <i className={`fas ${isVideoOff ? "fa-video-slash" : "fa-video"}`}></i>
            </button>
          </div>
        </div>

        {/* Right Side: Join Info */}
        <div className={styles.joinInfoSection}>
          <h1 className={styles.joinTitle}>Ready to join?</h1>
          <p className={styles.joinSubtitle}>
            {currRole === "Teacher" ? "Your student is waiting for you." : "Check your audio and video before entering."}
          </p>

          <div className={styles.detailsCard}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Course</span>
              <span className={styles.detailValue}>{courseDetails?.title?.data || courseDetails?.title || "Class Session"}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{currRole === "Student" ? "Teacher" : "Student"}</span>
              <span className={styles.detailValue}>{currRole === "Student" ? teacherName : studentName}</span>
            </div>

            {currRole === "Student" && (
              <div className={styles.statusRow}>
                {isTeacherLive ? (
                  <div className={styles.liveBadge}><span className={styles.liveDot}></span> Live</div>
                ) : (
                  <div className={styles.waitingBadge}><i className="fas fa-clock"></i> Waiting...</div>
                )}
              </div>
            )}
          </div>

          <div className={styles.joinActionGroup}>
            <button
              onClick={startCall}
              disabled={!canJoin || (currRole === "Student" && !isTeacherLive)}
              className={styles.joinBtn}
            >
              {currRole === "Teacher" ? "Start now" : "Join now"}
            </button>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVidStream;
