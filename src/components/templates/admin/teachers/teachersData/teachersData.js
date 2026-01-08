import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import CertifiedDetail from "./CertifiedDetail";
import { useDispatch } from "react-redux";
import { approveCourse } from "../../../../../store/actions/admin/course";
import { toast } from "react-toastify";
import UnverifiedFieldsModal from "./unverifiedFieldsModal";
import { approveTeacher, deleteUsers } from "../../../../../store/actions/admin/dashboardAction";

const TeachersData = (props) => {
  const dispatch = useDispatch();
  const [showTeacherData, setShowTeacherData] = useState(true);
  const aboutContainer = useRef(null);
  const certifiedDetail = useRef(null);

  const [activeTab, setActiveTab] = useState("About");
  const [certificateTabData, setCertificatedTabData] = useState([]);
  const [formValues, setFormValues] = useState(null);
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [unverifiedFields, setUnverifiedFields] = useState([]);

  // Set formValues safely
  useEffect(() => {
    if (props.verificationType === "Teacher" && props.selectedTeacher) {
      setFormValues({ ...props.selectedTeacher });
    } else if (props.verificationType === "Course" && props.selectedCourse) {
      setFormValues({ ...props.selectedCourse });
    }
  }, [props.selectedTeacher, props.selectedCourse, props.verificationType]);

  const handleModal = () => {
    if (window.matchMedia("(min-width:992px)").matches) {
      setShowTeacherData(true);
    }
  };
  window.addEventListener("resize", handleModal);

  const handleDetails = (tab) => {
    setActiveTab(tab);
    if (!aboutContainer.current || !certifiedDetail.current) return;

    if (tab === "About") {
      aboutContainer.current.style.display = "flex";
      certifiedDetail.current.style.display = "none";
    } else {
      aboutContainer.current.style.display = "none";
      certifiedDetail.current.style.display = "block";
    }

    if (formValues) {
      if (tab === "educationDetails") setCertificatedTabData(formValues.educationDetails || []);
      if (tab === "workExperience") setCertificatedTabData(formValues.workExperience || []);
      if (tab === "certificateCourses") setCertificatedTabData(formValues.certificateCourses || []);
    }
  };

  const handleChange = (e) => {
    if (!formValues) return;

    const { name, checked } = e.target;

    // Deep clone to avoid mutating state directly
    const newForm = JSON.parse(JSON.stringify(formValues));

    if (name === "languageTeach" || name === "languageSpeak") {
      if (Array.isArray(newForm[name]) && newForm[name][0]) {
        newForm[name][0].is_verified = checked;
      }
    } else if (newForm[name]) {
      newForm[name].is_verified = checked;
    }

    setFormValues(newForm);
  };

  const handleSubmit = async () => {
    if (!formValues) return;
    const body = {};

    if (props.verificationType === "Course") {
      body.courseId = formValues.id;
      body.courseData = formValues;
    } else if (props.verificationType === "Teacher") {
      body.teacherId = formValues.id;
      body.teacherData = formValues;
      body.unverifiedFields = unverifiedFields;
    }

    try {
      document.getElementById("loader").style.display = "flex";
      let result;
      if (props.verificationType === "Course") {
        result = await dispatch(approveCourse(body));
        props.setCourseApiCalled?.(false);
      } else {
        result = await dispatch(approveTeacher(body));
        props.setTeacherApiCalled?.(false);
      }
      document.getElementById("loader").style.display = "none";

      if (result?.message === "Course Updated Successfully" || result?.message === "Status Updated Successfully") {
        toast.success(`${props.verificationType} Verified Successfully`);
      } else {
        toast.error(`Failed to approve ${props.verificationType}`);
      }
    } catch {
      document.getElementById("loader").style.display = "none";
      toast.error(`Failed to approve ${props.verificationType}`);
    }
  };

  const getAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const deleteUser = async (id) => {
    await dispatch(deleteUsers({ id }));
    props.refresh?.();
  };

  if (!formValues || !showTeacherData) return null;

  return (
    <>
      <div className={styles.teachersData}>
        <button
          className={styles.closeBtn}
          onClick={() => {
            props.setShowPopUp?.(false);
            if (window.matchMedia("(max-width:992px)").matches) setShowTeacherData(false);
          }}
        >
          <i className="fas fa-close"></i>
        </button>

        <div className={props.verificationType === "Teacher" ? styles.teacherProfile : styles.courseImg}>
          {props.verificationType === "Teacher" ? (
            <>
              <input
                type="checkbox"
                onClick={handleChange}
                name="teacherProfilePic"
                defaultChecked={formValues?.teacherProfilePic?.is_verified}
              />
              <img
                src={formValues?.teacherProfilePic?.data || ""}
                alt=""
                style={{ borderRadius: "50%", border: "3px solid grey" }}
              />
              &nbsp;&nbsp;
              <button type="button" onClick={() => deleteUser(formValues?.userId?._id)}>
                <i className="fa fa-trash"></i>
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                onClick={handleChange}
                name="courseImage"
                defaultChecked={formValues?.courseImage?.is_verified}
              />
              <img src={formValues?.courseImage?.data || ""} style={{ objectFit: "contain" }} alt="course_img" />
            </>
          )}
        </div>

        {/* --- Basic Details --- */}
        <div className={styles.basicDetails}>
          {props.verificationType === "Teacher" ? (
            <>
              <div>
                <input type="checkbox" onChange={handleChange} name="firstName" defaultChecked={formValues?.firstName?.is_verified} />
                <span className={styles.detailHeading}>Name</span>
                <span>{formValues?.firstName?.data || "N/A"}</span>
              </div>
              {/* Other teacher fields... */}
            </>
          ) : (
            <>
              <div>
                <input type="checkbox" onClick={handleChange} name="title" defaultChecked={formValues?.title?.is_verified} />
                <span className={styles.detailHeading}>Title</span>
                <span>{formValues?.title?.data || "N/A"}</span>
              </div>
            </>
          )}
        </div>

        {/* --- Other Details, Certifications, etc. remain same --- */}

{/* --- Other Details --- */}
<div className={styles.otherDetailsContainer}>
  {props.verificationType === "Teacher" ? (
    <>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="gender" defaultChecked={formValues?.gender?.is_verified} />
        <span className={styles.otherDetailsHeading}>Gender:</span>
        <span>{formValues?.gender?.data || "N/A"}</span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="dob" defaultChecked={formValues?.dob?.is_verified} />
        <span className={styles.otherDetailsHeading}>Date of Birth:</span>
        <span>{formValues?.dob?.data ? new Date(formValues.dob.data).toDateString().slice(3) : "N/A"}</span>
      </div>
      <div>
        <span className={styles.otherDetailsHeading + " " + styles.otherDetailsHeadingAge}>Age:</span>
        <span>{getAge(formValues?.dob?.data)}</span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="fromCountry" defaultChecked={formValues?.fromCountry?.is_verified} />
        <span className={styles.otherDetailsHeading}>From Country:</span>
        <span>{formValues?.fromCountry?.data || "N/A"}</span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="languageTeach" defaultChecked={formValues?.languageTeach?.[0]?.is_verified} />
        <span className={styles.otherDetailsHeading}>Teaches:</span>
        <span>
          {formValues?.languageTeach?.length
            ? formValues.languageTeach.map(u => u.data).join(", ")
            : "N/A"}
        </span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="languageSpeak" defaultChecked={formValues?.languageSpeak?.[0]?.is_verified} />
        <span className={styles.otherDetailsHeading}>Also Speaks:</span>
        <span>
          {formValues?.languageSpeak?.length
            ? formValues.languageSpeak.map(u => u.data).join(", ")
            : "N/A"}
        </span>
      </div>
    </>
  ) : (
    <>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="language" defaultChecked={formValues?.language?.is_verified} />
        <span className={styles.otherDetailsHeading}>Language:</span>
        <span>{formValues?.language?.data || "N/A"}</span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="course" defaultChecked={formValues?.course?.is_verified} />
        <span className={styles.otherDetailsHeading}>Course:</span>
        <span>{formValues?.course?.data || "N/A"}</span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="program" defaultChecked={formValues?.program?.is_verified} />
        <span className={styles.otherDetailsHeading}>Program:</span>
        <span>{formValues?.program?.data || "N/A"}</span>
      </div>
      <div className={styles.otherDetails}>
        <input type="checkbox" onClick={handleChange} name="price" defaultChecked={formValues?.price?.is_verified} />
        <span className={styles.otherDetailsHeading}>Price:</span>
        <span>${formValues?.price?.data || 0}</span>
      </div>
    </>
  )}
</div>

{/* --- Certifications / Tabs --- */}
<div className={styles.certificatedDetailsContainer}>
  {props.verificationType === "Teacher" ? (
    <>
      <div className={styles.certificatedDetailsTabs}>
        <button className={activeTab === "About" ? styles.active : ""} onClick={() => handleDetails("About")}>About</button>
        <button className={activeTab === "educationDetails" ? styles.active : ""} onClick={() => handleDetails("educationDetails")}>Education</button>
        <button className={activeTab === "workExperience" ? styles.active : ""} onClick={() => handleDetails("workExperience")}>Work</button>
        <button className={activeTab === "certificateCourses" ? styles.active : ""} onClick={() => handleDetails("certificateCourses")}>Certificate</button>
      </div>
      <div className={styles.certificatedDetails}>
        <div className={styles.about} ref={aboutContainer}>
          <input type="checkbox" onClick={handleChange} name="selfIntro" defaultChecked={formValues?.selfIntro?.is_verified} />
          <p>{formValues?.selfIntro?.data || "N/A"}</p>
        </div>
        <div className={styles.educations} ref={certifiedDetail}>
          <CertifiedDetail
            data={certificateTabData}
            onChange={handleChange}
            formValues={formValues}
            setFormValues={setFormValues}
            activeTab={activeTab}
          />
        </div>
      </div>
    </>
  ) : (
    <div className={styles.about} ref={aboutContainer}>
      <input type="checkbox" onClick={handleChange} name="description" defaultChecked={formValues?.description?.is_verified} />
      <p>{formValues?.description?.data || "N/A"}</p>
    </div>
  )}
</div>

        <div className={styles.actions}>
          <button onClick={() => setShowUnverifiedModal(true)}>Save</button>
        </div>
      </div>

      {showUnverifiedModal && (
        <UnverifiedFieldsModal
          setModal={setShowUnverifiedModal}
          data={formValues}
          handleSubmit={handleSubmit}
          verificationType={props.verificationType}
          unverifiedFields={unverifiedFields}
          setUnverifiedFields={setUnverifiedFields}
        />
      )}
    </>
  );
};

export default TeachersData;
