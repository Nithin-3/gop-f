import React from "react";
import CertificateForm from "./certificateForm";
import commonStyles from "../styles.module.css";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
let FormData = require("form-data");

const emptyObj = { title:"", location:"", institution:"", description:"", from:"", to:"", certificateFile:"" };

const Certifications = (props) => {
  const dispatch = useDispatch();
  const [educationDetails, setEducationDetails] = React.useState([emptyObj]);
  const [workExperience, setWorkExperience] = React.useState([emptyObj]);
  const [certificateCourses, setCertificateCourses] = React.useState([emptyObj]);

  const handleFormData = (type, name, i, e) => {
    let value = name === "from" || name === "to" || name === "location" ? e : name === "certificateFile" ? e.target.files[0] : e.target.value;
    if (type === "Education") { let d=[...educationDetails]; d[i][name]=value; setEducationDetails(d); }
    if (type === "Work") { let d=[...workExperience]; d[i][name]=value; setWorkExperience(d); }
    if (type === "Course") { let d=[...certificateCourses]; d[i][name]=value; setCertificateCourses(d); }
  };

  const addNewCertification = (type) => {
    if (type === "Education") setEducationDetails([...educationDetails, emptyObj]);
    if (type === "Work") setWorkExperience([...workExperience, emptyObj]);
    if (type === "Course") setCertificateCourses([...certificateCourses, emptyObj]);
  };

  const deleteDetail = (type, i) => {
    if (type === "Education") setEducationDetails(educationDetails.filter((_,x)=>x!==i));
    if (type === "Work") setWorkExperience(workExperience.filter((_,x)=>x!==i));
    if (type === "Course") setCertificateCourses(certificateCourses.filter((_,x)=>x!==i));
  };

  React.useEffect(() => {
    props.myDetails && setEducationDetails(props.myDetails.educationDetails);
    props.myDetails && setWorkExperience(props.myDetails.workExperience);
    props.myDetails && setCertificateCourses(props.myDetails.certificateCourses);
  }, [props.myDetails]);

  const validateFields = (details) => details.every(d => Object.values(d).every(v => v !== ""));
  const validateYears = (type, details) => details.every(d => { if (+d.from > +d.to) { toast.warn(`Invalid Start and End Year for ${type}`); return false; } return true; });
  const getFiles = (details) => details.map(d => d.certificateFile);

  const handleSubmit = async () => {
    if (!validateFields(educationDetails)) return toast.warn("All Fields are mandatory, please check Education fields.");
    if (!validateYears("Education", educationDetails)) return;
    if (!validateFields(workExperience)) return toast.warn("All Fields are mandatory, please check Work Experience fields.");
    if (!validateYears("Work Experience", workExperience)) return;
    if (!validateFields(certificateCourses)) return toast.warn("All Fields are mandatory, please check Courses fields.");
    if (!validateYears("Certificate Course", certificateCourses)) return;

    let form = new FormData();
    form.append("type","Certifications");
    form.append("teacherId", props.myDetails.id);
    form.append("educationDetails", JSON.stringify(educationDetails));
    form.append("workExperience", JSON.stringify(workExperience));
    form.append("certificateCourses", JSON.stringify(certificateCourses));
    getFiles(educationDetails).forEach(f=>form.append("educationDetailsFiles",f));
    getFiles(workExperience).forEach(f=>form.append("workExperienceFiles",f));
    getFiles(certificateCourses).forEach(f=>form.append("certificateCoursesFiles",f));

    try {
      document.getElementById("loader").style.display="flex";
      const res = await dispatch(updateTeacherProfile(form));
      document.getElementById("loader").style.display="none";
      res.status ? toast.success("Profile Updated Successfully") : toast.error("Faild to update, please try again");
    } catch {
      toast.error("Faild to update, please try again");
    }
    props.setApiCalled(false);
  };

  return (
    <>
      <div className={styles.certifications}>
        <div>
          <h3 className={styles.heading}>Education Details:</h3>
          {educationDetails.map((d,i)=><CertificateForm key={i} data={d} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Education" />)}
          <div className={styles.addNewDetailButtonContainer}>
            <button className={styles.addNewDetailButton} onClick={()=>addNewCertification("Education")}><i className="fas fa-plus"></i> Add New Detail</button>
          </div>
        </div>

        <div>
          <h3 className={styles.heading}>Work Experience:</h3>
          {workExperience.map((d,i)=><CertificateForm key={i} data={d} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Work" />)}
          <div className={styles.addNewDetailButtonContainer}>
            <button className={styles.addNewDetailButton} onClick={()=>addNewCertification("Work")}><i className="fas fa-plus"></i> Add New Detail</button>
          </div>
        </div>

        <div>
          <h3 className={styles.heading}>Certificate Courses:</h3>
          {certificateCourses.map((d,i)=><CertificateForm key={i} data={d} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Course" />)}
          <div className={styles.addNewDetailButtonContainer}>
            <button className={styles.addNewDetailButton} onClick={()=>addNewCertification("Course")}><i className="fas fa-plus"></i> Add New Detail</button>
          </div>
        </div>
      </div>

      <div className={commonStyles.submitButtonContainer}>
        <button className={commonStyles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Certifications;
