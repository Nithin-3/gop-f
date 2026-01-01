import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

const CourseCard = (props) => {
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const otherOptions = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (otherOptions.current && !otherOptions.current.contains(e.target)) {
        setShowOtherOptions(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  const { courseData, activeTab } = props;

  return (
    <div className={styles.courseCard}>
      <div className={styles.content}>
        <img
          className={styles.flag}
          src={courseData.courseImage.data}
          alt="course_img"
          style={{ borderRadius: "50%", border: "3px solid grey" }}
        />

        <div className={styles.courseName}>
          <h3>{courseData.title.data}</h3>
          <p className={styles.courseDescDesktop}>{courseData.description.data}</p>

          <div className={styles.courseStatusPhone}>
            {activeTab === "Courses" && (
              <>
                <h3>Status:</h3>
                <p>
                  {courseData.isVerified ? (
                    <>
                      Verified <i className="fa-solid fa-circle-check"></i>
                    </>
                  ) : (
                    <>Not Verified</>
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        <div className={styles.courseStatus}>
          {activeTab === "Courses" && (
            <>
              <h3>Status:</h3>
              <p>
                {courseData.isVerified ? (
                  <>
                    Verified
                    <i className="fa-solid fa-circle-check" style={{ marginLeft: "10px" }}></i>
                  </>
                ) : (
                  <>Not Verified</>
                )}
              </p>
            </>
          )}
        </div>

        <div className={styles.courseDescPhone}>
          <h3>Course Description:</h3>
          <p>{courseData.description.data}</p>
        </div>

        <div className={styles.moreOptions} ref={otherOptions}>
          <i
            className={`${styles.moreOptionsIcon} fas fa-ellipsis-h`}
            onClick={() => setShowOtherOptions(true)}
          ></i>
          <ul className={`${styles.otherOptions} ${showOtherOptions ? styles.showOptions : ""}`}>
            <li
              onClick={() => {
                props.setSelectedCourse(courseData);
                props.openViewCourse(true);
                props.setViewCourseType("View");
              }}
            >
              <span>View</span> <i className="fas fa-eye"></i>
            </li>
            <li
              onClick={() => {
                props.setSelectedCourse(courseData);
                props.openViewCourse(true);
                props.setViewCourseType("Edit");
              }}
            >
              <span>Edit</span> <i className="fas fa-pencil"></i>
            </li>
            <li
              onClick={() => {
                props.setSelectedCourse(courseData);
                props.setShowConfirmationModal(true);
              }}
            >
              <span>Delete</span> <i className="fas fa-trash"></i>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.menuBtns}>
        <button
          className={styles.btn}
          onClick={() => {
            props.setSelectedCourse(courseData);
            props.openViewCourse(true);
            props.setViewCourseType("View");
          }}
        >
          <div>View</div>
          <i className="fas fa-eye"></i>
        </button>

        <button
          className={styles.btn}
          onClick={() => {
            props.setSelectedCourse(courseData);
            props.openViewCourse(true);
            props.setViewCourseType("Edit");
          }}
        >
          <div>Edit</div>
          <i className="fas fa-pencil"></i>
        </button>

        <button
          className={styles.btn}
          onClick={() => {
            props.setSelectedCourse(courseData);
            props.setShowConfirmationModal(true);
          }}
        >
          <div>Delete</div>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
