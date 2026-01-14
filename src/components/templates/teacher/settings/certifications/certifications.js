import React from "react";
import CertificateForm from "./certificateForm";
import commonStyles from "../styles.module.css";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
const createEmptyDetail = () => ({ title: "", location: "", institution: "", description: "", from: "", to: "", certificateFile: "" });

const Certifications = (props) => {
  const dispatch = useDispatch();
  const [educationDetails, setEducationDetails] = React.useState([createEmptyDetail()]);
  const [workExperience, setWorkExperience] = React.useState([createEmptyDetail()]);
  const [certificateCourses, setCertificateCourses] = React.useState([createEmptyDetail()]);

  const handleFormData = (type, name, i, e) => {
    let value = name === "from" || name === "to" || name === "location" ? e : name === "certificateFile" ? e.target.files[0] : e.target.value;

    const updateDetails = (prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [name]: value };
      return updated;
    };

    if (type === "Education") setEducationDetails(updateDetails);
    if (type === "Work") setWorkExperience(updateDetails);
    if (type === "Course") setCertificateCourses(updateDetails);
  };

  const addNewCertification = (type) => {
    if (type === "Education") setEducationDetails(prev => [...prev, createEmptyDetail()]);
    if (type === "Work") setWorkExperience(prev => [...prev, createEmptyDetail()]);
    if (type === "Course") setCertificateCourses(prev => [...prev, createEmptyDetail()]);
  };

  const deleteDetail = (type, i) => {
    if (type === "Education") setEducationDetails(educationDetails.filter((_, x) => x !== i));
    if (type === "Work") setWorkExperience(workExperience.filter((_, x) => x !== i));
    if (type === "Course") setCertificateCourses(certificateCourses.filter((_, x) => x !== i));
  };

  React.useEffect(() => {
    if (props.myDetails) {
      if (props.myDetails.educationDetails?.length) setEducationDetails(props.myDetails.educationDetails);
      if (props.myDetails.workExperience?.length) setWorkExperience(props.myDetails.workExperience);
      if (props.myDetails.certificateCourses?.length) setCertificateCourses(props.myDetails.certificateCourses);
    }
  }, [props.myDetails]);

  const validateFields = (details) => details.every(d => Object.entries(d).every(([key, v]) => key === "certificateFile" ? true : v !== ""));
  const validateYears = (type, details) => details.every(d => { if (+d.from > +d.to) { toast.warn(`Invalid Start and End Year for ${type}`); return false; } return true; });
  const getFiles = (details) => details.map(d => d.certificateFile).filter(f => f instanceof File);

  const handleSubmit = async () => {
    if (!validateFields(educationDetails)) return toast.warn("All Fields are mandatory (except Certificate Upload), please check Education fields.");
    if (!validateYears("Education", educationDetails)) return;
    if (!validateFields(workExperience)) return toast.warn("All Fields are mandatory (except Certificate Upload), please check Work Experience fields.");
    if (!validateYears("Work Experience", workExperience)) return;
    if (!validateFields(certificateCourses)) return toast.warn("All Fields are mandatory (except Certificate Upload), please check Courses fields.");
    if (!validateYears("Certificate Course", certificateCourses)) return;

    let form = new FormData();
    form.append("type", "Certifications");
    form.append("teacherId", props.myDetails?.id);
    form.append("educationDetails", JSON.stringify(educationDetails));
    form.append("workExperience", JSON.stringify(workExperience));
    form.append("certificateCourses", JSON.stringify(certificateCourses));

    getFiles(educationDetails).forEach(f => form.append("educationDetailsFiles", f));
    getFiles(workExperience).forEach(f => form.append("workExperienceFiles", f));
    getFiles(certificateCourses).forEach(f => form.append("certificateCoursesFiles", f));

    try {
      if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";
      const res = await dispatch(updateTeacherProfile(form));
      if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";

      if (res?.status || res?.success) {
        toast.success("Certifications Updated Successfully");
      } else {
        toast.error(res?.message || "Failed to update, please try again");
      }
    } catch (e) {
      console.error("Certifications update failed:", e);
      if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
      toast.error("Failed to update, please try again");
    }
    if (props.setApiCalled) props.setApiCalled(false);
  };


  return (
    <>
      <div className={styles.certifications}>
        <div>
          <h3 className={styles.heading}>Education Details:</h3>
          {educationDetails.map((d, i) => <CertificateForm key={i} data={d} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Education" />)}
          <div className={styles.addNewDetailButtonContainer}>
            <button className={styles.addNewDetailButton} onClick={() => addNewCertification("Education")}><i className="fas fa-plus"></i> Add New Detail</button>
          </div>
        </div>

        <div>
          <h3 className={styles.heading}>Work Experience:</h3>
          {workExperience.map((d, i) => <CertificateForm key={i} data={d} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Work" />)}
          <div className={styles.addNewDetailButtonContainer}>
            <button className={styles.addNewDetailButton} onClick={() => addNewCertification("Work")}><i className="fas fa-plus"></i> Add New Detail</button>
          </div>
        </div>

        <div>
          <h3 className={styles.heading}>Certificate Courses:</h3>
          {certificateCourses.map((d, i) => <CertificateForm key={i} data={d} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Course" />)}
          <div className={styles.addNewDetailButtonContainer}>
            <button className={styles.addNewDetailButton} onClick={() => addNewCertification("Course")}><i className="fas fa-plus"></i> Add New Detail</button>
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
