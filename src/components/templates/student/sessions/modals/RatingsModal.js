import React, { useState } from "react";
import modalStyles from "./styles.module.css";
import audioImg from "../../../../../assets/image/audio.png";
import videoImg from "../../../../../assets/image/video.png";
import teacherImg from "../../../../../assets/image/p1.png";
import ReactStars from "react-rating-stars-component";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRatings } from "../../../../../store/actions/teacher";
import { toast } from "react-toastify";

const RatingsModal = ({
  setRatingsModal,
  width,
  audioRating,
  videoRating,
  teacherRating,
  setAudioRating,
  setVideoRating,
  setTeacherRating,
  comments,
  setComments,
  setShowComments,
  showComments,
  setInCall,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const studentName = location.state?.studentName || "";
  const availDetails = location.state?.availDetails || "";

  const closeModal = () => {
    setRatingsModal(false);
    setInCall(false);
  };

  const submitRatings = async () => {
    const session = location.state?.sessionDetails;
    if (!session) return;

    if (audioRating === 0) setErrorMsg("Please select Audio call Rating");
    else if (videoRating === 0) setErrorMsg("Please select Video call Rating");
    else {
      setErrorMsg("");
      const res = await dispatch(
        updateRatings(
          audioRating,
          videoRating,
          teacherRating,
          comments,
          session._id,
          session.teacherId,
          session.studentId
        )
      );
      if (res.status === 200) {
        toast.success("Thank you for your feedback!");
        setInCall(false);
        setRatingsModal(false);
      } else {
        toast.error("Failed to submit ratings.");
        setInCall(false);
      }
    }
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        {/* Header */}
        <i className={`${modalStyles.closeBtn} fas fa-close`} onClick={closeModal}></i>
        <h3 className={modalStyles.modalHeading}>Rate Your Lesson</h3>
        {studentName && (
          <h6 style={{ textAlign: "center", color: "#fe1848" }}>
            {studentName} : {availDetails}
          </h6>
        )}

        {/* Ratings Section */}
        <div
          style={{
            marginTop: "20px",
            paddingBottom: 20,
            borderBottom: "1px solid #9e9e9e",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
            {/* Audio Rating */}
            <RatingCard
              img={audioImg}
              title="Audio Quality"
              description="Shared with Verbling to ensure quality"
              rating={audioRating}
              setRating={setAudioRating}
            />

            {/* Video Rating */}
            <RatingCard
              img={videoImg}
              title="Video Quality"
              description="Shared with Verbling to ensure quality"
              rating={videoRating}
              setRating={setVideoRating}
            />
          </div>

          {/* Teacher Rating */}
          <div style={{ textAlign: "center" }}>
            <img
              src={teacherImg}
              alt="teacher"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <h3>Teacher Rating</h3>
            <h5>Anonymous, Your name will not be shown. (Required)</h5>
            {audioRating > 3 && videoRating > 3 && (
              <ReactStars
                count={5}
                size={24}
                onChange={setTeacherRating}
                activeColor="#ffd700"
                color="#808080"
              />
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div
          style={{
            marginTop: "20px",
            paddingBottom: 20,
            borderBottom: "1px solid #9e9e9e",
            textAlign: "center",
          }}
        >
          {!showComments ? (
            <div onClick={() => setShowComments(true)} style={{ cursor: "pointer" }}>
              <h3 style={{ color: "#fe1848" }}>Leave a comment</h3>
            </div>
          ) : (
            <textarea
              name="comments"
              placeholder="Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ padding: "10px", width: "100%" }}
            />
          )}
          <h5>Public. Shared on teacher's profile with your name. (Optional)</h5>
        </div>

        {errorMsg && (
          <p style={{ textAlign: "center", color: "red", marginTop: 10, fontSize: 13 }}>
            {errorMsg}
          </p>
        )}

        {/* Submit Button */}
        <div
          onClick={submitRatings}
          style={{
            margin: "20px 0 0 auto",
            width: "fit-content",
            cursor: "pointer",
            backgroundColor: "#fe1848",
            color: "#fefeff",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

// Reusable card for Audio/Video ratings
const RatingCard = ({ img, title, description, rating, setRating }) => (
  <div style={{ textAlign: "center" }}>
    <img src={img} alt={title} style={{ width: 50, height: 50 }} />
    <h3>{title}</h3>
    <h5>{description}</h5>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactStars count={5} size={24} activeColor="#ffd700" value={rating} onChange={setRating} />
    </div>
  </div>
);

export default RatingsModal;
