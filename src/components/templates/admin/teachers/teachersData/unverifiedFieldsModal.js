import React from "react";
import styles from "./styles.module.css";

const UnverifiedFieldsModal = (props) => {

  React.useEffect(() => {
    let data = props.data;
    let array = [];
    //Course
    if (props.verificationType === "Course") {
      Object.entries(data).forEach(([key, value]) => {
        if (
          !value.is_verified &&
          (key === "title" ||
            key === "course" ||
            key === "courseImage" ||
            key === "description" ||
            key === "language" ||
            key === "price" ||
            key === "program")
        ) {
          array.push(key);
          // console.log(key, "K");
        }
      });
    }

    // Teacher
    if (props.verificationType === "Teacher") {
      console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        if (
          !value.is_verified &&
          (key === "dob" ||
            key === "firstName" ||
            key === "gender" ||
            key === "mobileNumber" ||
            key === "motherTongue" ||
            key === "selfIntro" ||
            key === "teacherType" ||
            key === "teacherProfilePic" ||
            key === "videoURL")
        ) {
          array.push(key);
        } else if (key === "region" && !value.fromCountry.is_verified) {
          array.push("fromCountry");
        } else if ((key === "languageSpeak" || key === "languageTeach") && !value[0].is_verified) {
          array.push(key);
        }else if((key === 'certificateCourses' || key === 'educationDetails' || key === 'workExperience')){
          value.forEach((detail)=>{
            if(!detail.is_verified){
              array.push(`${key} - ${detail.title}`)
            }
          })
        }
      });
    }
    // console.log(array);
    props.setUnverifiedFields(array);
  }, []);
  return (
    <>
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          <i
            className={styles.modalCloseBtn + " fas fa-close"}
            onClick={() => {
              props.setModal(false);
            }}
          ></i>
          <h3>Unverified Fields</h3>
          <ul>
            {props.unverifiedFields &&
              props.unverifiedFields.map((field, i) => {
                return <li key={"unverifiedField" + i}>{field}</li>;
              })}
          </ul>
          {props.unverifiedFields.length === 0 && <p>All fields verified</p>}
          <div className={styles.actions}>
            <button
              onClick={() => {
                props.handleSubmit();
                props.setModal(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnverifiedFieldsModal;
