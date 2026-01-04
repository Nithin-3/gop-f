import React from "react";
import styles from "./styles.module.css";

const TeacherRow = ({
  selectedCourse,
  selectedTeacher,
  course,
  teacher,
  verificationType,
  setSelectedCourse,
  setSelectedTeacher,
}) => {
  const isSelected =
    (verificationType === "Course" && selectedCourse?.id === course.id) ||
    (verificationType === "Teacher" && selectedTeacher?.id === teacher.id);

  const handleClick = () => {
    verificationType === "Course" ? setSelectedCourse(course) : setSelectedTeacher(teacher);
  };

  return (
    <tr className={isSelected ? styles.selectedRow : ""} onClick={handleClick}>
      <td className={styles.col1}>
        <i
          className={
            "fas fa-circle " +
            (verificationType === "Teacher"
              ? teacher.approvalStatus === "verified" && styles.verified
              : course.isVerified && styles.verified)
          }
        ></i>
      </td>

      <td className={styles.col2}>
        {verificationType === "Teacher" ? (
          <>
            <img src={teacher.teacherProfilePic.data} alt={teacher.firstName.data} />
            <p>{teacher.firstName.data}</p>
          </>
        ) : (
          course.title.data
        )}
      </td>

      <td className={styles.col3}>
        {verificationType === "Teacher" ? teacher.motherTongue.data : course.userId.fullName}
      </td>

      <td className={styles.col4}>
        {verificationType === "Teacher" ? (
          <a href={teacher.videoURL.data} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        ) : (
          course.language.data
        )}
      </td>

      <td className={styles.col5}>
        {verificationType === "Teacher" ? (
          <>
            <a href={`mailto:${teacher.userId.email}`}>
              <i className="fas fa-envelope"></i>
            </a>
            <a href={`tel:${teacher.mobileNumber.data}`}>
              <i className="fas fa-phone"></i>
            </a>
          </>
        ) : (
          `$ ${course.price.data}`
        )}
      </td>

      <td className={styles.col6}>
        {verificationType === "Teacher" ? teacher.region.fromCountry.data : new Date().toDateString()}
      </td>
    </tr>
  );
};

export default TeacherRow;
