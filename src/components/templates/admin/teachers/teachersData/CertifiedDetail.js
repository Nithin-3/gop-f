import React from "react";
import styles from "./styles.module.css";

const CertifiedDetail = (props) => {

  function handleChange(e, index) {
    let newDetail = props.data;
    newDetail[index]['is_verified'] = e.target.checked

    props.setFormValues({ ...props.formValues, newDetail })
  }
  return (
    <>
      {props.data.map((element, i) => {
        return (
          <div className={styles.education} key={element._id}>
            <p> {i + 1}</p>
            <input type="checkbox" onClick={(e) => { handleChange(e, i) }} name="firstName" defaultChecked={element.is_verified} />
            <div>
              <span className={styles.detailHeading}>Title</span>
              <span>{element.title || element.workTitle || element.educationTitle || element.certificateTitle || "N/A"}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Institution</span>
              <span>{element.institution || element.workInstitution || element.educationInstitution || element.certificateInstitution || "N/A"}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Location</span>
              <span>{element.location || element.workLocation || element.educationLocation || element.certificateLocation || "N/A"}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Description</span>
              <span>{element.description || element.workDesc || element.educationDesc || element.certificateDesc || "N/A"}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Certificate</span>
              <a href={element.certificateFile || element.certificate || "#"} target="_blank" rel="noreferrer">File</a >
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CertifiedDetail;
