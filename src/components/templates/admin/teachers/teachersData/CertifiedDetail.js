import React from "react";
import styles from "./styles.module.css";

const CertifiedDetail = (props) => {
  
function handleChange(e,index){
  let newDetail = props.data;
  newDetail[index]['is_verified'] = e.target.checked
  
  props.setFormValues({...props.formValues,newDetail})
}
  return (
    <>
      {props.data.map((element, i) => {
        return (
          <div className={styles.education} key={element._id}>
            <p> {i+1}</p>
            <input type="checkbox" onClick={(e)=>{handleChange(e,i)}} name="firstName" defaultChecked={element.is_verified} />
            <div>
              <span className={styles.detailHeading}>Title</span>
              <span>{element.title}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Institution</span>
              <span>{element.institution}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Location</span>
              <span>{element.location}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Description</span>
              <span>{element.description}</span>
            </div>
            <div>
              <span className={styles.detailHeading}>Certificate</span>
              <a href={element.certificateFile} target="_blank" rel="noopennor noreferrer">File</a >
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CertifiedDetail;
