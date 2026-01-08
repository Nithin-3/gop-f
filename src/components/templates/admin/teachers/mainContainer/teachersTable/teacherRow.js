import React from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

const TeacherRow = (props) => {
  function handleCopyIconData(e, data) {
    e.preventDefault();
    navigator.clipboard
      .writeText(data)
      .then(() => toast.success("Copied to Clipboard!"))
      .catch(() => toast.warn("Unable to copy."));
  }

  const isTeacher = props.verificationType === "Teacher";
  return (
    <tr
      key={"teacher-" + props.key}
      className={
        (isTeacher
          ? props.selectedTeacher?.id === props.teacher?.id
          : props.selectedCourse?.id === props.course?.id)
          ? styles.selectedRow
          : ""
      }
      onClick={() => {
        isTeacher
          ? props.setSelectedTeacher?.(props.teacher)
          : props.setSelectedCourse?.(props.course);
      }}
    >
      {/* Status */}
      <td className={styles.col1}>
        <i
          className={
            "fas fa-circle " +
            (isTeacher
              ? props.teacher?.approvalStatus === "verified"
                ? styles.verified
                : ""
              : props.course?.isVerified
              ? styles.verified
              : "")
          }
        ></i>
      </td>

      {/* Name / Title */}
      <td className={styles.col2}>
        {isTeacher ? (
          <>
            <img
              src={props.teacher?.teacherProfilePic?.data || ""}
              alt=""
              style={{ borderRadius: "50%", border: "3px solid grey" }}
            />
            <p>{props.teacher?.firstName?.data || "N/A"}</p>
          </>
        ) : (
          <>{props.course?.title?.data || "N/A"}</>
        )}
      </td>

      {/* Mother Tongue / Teacher Name */}
      <td className={styles.col3}>
        {isTeacher
          ? props.teacher?.motherTongue?.data || "N/A"
          : props.course?.userId?.fullName || "N/A"}
      </td>

      {/* Video / Language */}
      <td className={styles.col4}>
        {isTeacher ? (
          <a
            href={props.teacher?.videoURL?.data || "#"}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
        ) : (
          <>{props.course?.language?.data || "N/A"}</>
        )}
      </td>

      {/* Email / Price */}
      <td className={styles.col5}>
        {isTeacher ? (
          <>
            <a
              href={"mailto:" + (props.teacher?.userId?.email || "")}
              title={props.teacher?.userId?.email || ""}
              onClick={(e) =>
                handleCopyIconData(e, props.teacher?.userId?.email || "")
              }
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href={"tel:" + (props.teacher?.mobileNumber?.data || "")}
              title={props.teacher?.mobileNumber?.data || ""}
              onClick={(e) =>
                handleCopyIconData(e, props.teacher?.mobileNumber?.data || "")
              }
            >
              <i className="fas fa-phone"></i>
            </a>
          </>
        ) : (
          <>$ {props.course?.price?.data || "0"}</>
        )}
      </td>

      {/* Country / Date */}
      <td className={styles.col6}>
        {isTeacher
          ? props.teacher?.fromCountry?.data || "N/A"
          : props.course?.createdAt
          ? new Date(props.course.createdAt).toDateString()
          : "N/A"}
      </td>
    </tr>
  );
};

export default TeacherRow;
