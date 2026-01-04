import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

const CourseCard = ({
  courseData,
  activeTab,
  setSelectedCourse,
  openViewCourse,
  setViewCourseType,
  setShowConfirmationModal,
}) => {
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const otherOptionsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (otherOptionsRef.current && !otherOptionsRef.current.contains(e.target)) {
        setShowOtherOptions(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (type) => {
    setSelectedCourse(courseData);
    if (type === "View" || type === "Edit") {
      openViewCourse(true);
      setViewCourseType(type);
    } else if (type === "Delete") {
      setShowConfirmationModal(true);
    }
    setShowOtherOptions(false);
  };

  const isVerified = courseData.isVerified;

  return (
    <div className={styles.courseCard}>
      <div className={styles.content}>
        {/* Course Image */}
        <img
          className={styles.flag}
          src={courseData.courseImage.data}
          alt="course_img"
          style={{ borderRadius: "50%", border: "3px solid grey" }}
        />

        {/* Course Details */}
        <div className={styles.courseName}>
          <h3>{courseData.title.data}</h3>
          <p className={styles.courseDescDesktop}>{courseData.description.data}</p>

          {activeTab === "Courses" && (
            <div className={styles.courseStatusPhone}>
              <h3>Status:</h3>
              <p>
                {isVerified ? (
                  <>
                    Verified <i className="fa-solid fa-circle-check"></i>
                  </>
                ) : (
                  <>Not Verified</>
                )}
              </p>
            </div>
          )}
        </div>

        {activeTab === "Courses" && (
          <div className={styles.courseStatus}>
            <h3>Status:</h3>
            <p>
              {isVerified ? (
                <>
                  Verified <i className="fa-solid fa-circle-check" style={{ marginLeft: "10px" }}></i>
                </>
              ) : (
                <>Not Verified</>
              )}
            </p>
          </div>
        )}

        <div className={styles.courseDescPhone}>
          <h3>Course Description:</h3>
          <p>{courseData.description.data}</p>
        </div>

        {/* More Options Dropdown */}
        <div className={styles.moreOptions} ref={otherOptionsRef}>
          <i
            className={`${styles.moreOptionsIcon} fas fa-ellipsis-h`}
            onClick={() => setShowOtherOptions((prev) => !prev)}
          ></i>
          <ul className={`${styles.otherOptions} ${showOtherOptions ? styles.showOptions : ""}`}>
            {["View", "Edit", "Delete"].map((action) => (
              <li key={action} onClick={() => handleAction(action)}>
                <span>{action}</span>{" "}
                <i
                  className={
                    action === "View"
                      ? "fas fa-eye"
                      : action === "Edit"
                      ? "fas fa-pencil"
                      : "fas fa-trash"
                  }
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buttons for Desktop */}
      <div className={styles.menuBtns}>
        {["View", "Edit", "Delete"].map((action) => (
          <button key={action} className={styles.btn} onClick={() => handleAction(action)}>
            <div>{action}</div>
            <i
              className={
                action === "View"
                  ? "fas fa-eye"
                  : action === "Edit"
                  ? "fas fa-pencil"
                  : "fas fa-trash"
              }
            ></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
