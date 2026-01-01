import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import CertifiedDetail from "./CertifiedDetail";
import { useDispatch } from "react-redux";
import { approveCourse } from "../../../../../store/actions/admin/course";
import { toast } from "react-toastify";
import UnverifiedFieldsModal from "./unverifiedFieldsModal";
import { approveTeacher } from "../../../../../store/actions/admin/dashboardAction";
import { deleteUsers } from "../../../../../store/actions/admin/dashboardAction";

const TeachersData = (props) => {
  console.log(props.selectedTeacher)
  const dispatch = useDispatch();

  // to handle Modal
  const [showTeacherData, setShowTeacherData] = useState(true);
  const aboutContainer = useRef(null);
  const certifiedDetail = useRef(null);
  // For teacher Certifications
  const [activeTab, setActiveTab] = useState("About");
  const [certificateTabData, setCertificatedTabData] = useState([]);

  // Data
  const [formValues, setFormValues] = useState();

  //unverified Data
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [unverifiedFields, setUnverifiedFields] = React.useState([]);

  React.useEffect(() => {
    if (props.verificationType === "Teacher") {
       console.log(props.selectedTeacher)
      setFormValues(props.selectedTeacher);
      console.log(formValues)
    } else {
      setFormValues(props.selectedCourse);
    }
  }, [props.selectedCourse, formValues, props.selectedTeacher, props.verificationType]);

  function handleModal(e) {
    if (window.matchMedia("(min-width:992px)").matches) {
      setShowTeacherData(true);
    }
  }

  function handleDetails(tab) {
    setActiveTab(tab);
    if (tab === "About") {
      aboutContainer.current.style.display = "flex";
      certifiedDetail.current.style.display = "none";
    } else {
      certifiedDetail.current.style.display = "block";
      aboutContainer.current.style.display = "none";
    }
    if (tab === "educationDetails") {
      setCertificatedTabData(formValues.educationDetails);
    }
    if (tab === "workExperience") {
      setCertificatedTabData(formValues.workExperience);
    }
    if (tab === "certificateCourses") {
      setCertificatedTabData(formValues.certificateCourses);
    }
  }
  window.addEventListener("resize", handleModal);

  function handleChange(e) {
    console.log(e.target.defaultChecked)
    let newForm = formValues;
    // if (e.target.name === "fromCountry") {
    //   newForm["region"][e.target.name]["is_verified"] = e.target.defaultChecked;
    // } else
    if (e.target.name === "languageTeach" || e.target.name === "languageSpeak") {
      newForm[e.target.name][0]["is_verified"] = e.target.checked;
   } else {
      newForm[e.target.name]["is_verified"] = e.target.checked;
    }

    setFormValues(newForm);
   
  }

  async function handleSubmit() {
    let body = {};
    if (props.verificationType === "Course") {
      body.courseId = formValues.id;
      body.courseData = formValues;
    }
    if (props.verificationType === "Teacher") {
      body.teacherId = formValues.id;
      body.teacherData = formValues;
      body.unverifiedFields = unverifiedFields;
    }
    console.log(body, "Body");
    try {
      let result;
      // Course API Call
      if (props.verificationType === "Course") {
        // Show Loader
        document.getElementById("loader").style.display = "flex";
        result = await dispatch(approveCourse(body));
        // Hide Loader
        document.getElementById("loader").style.display = "none";

        // fetch data again
        props.setCourseApiCalled(false);
      }

      // Teacher API call
      if (props.verificationType === "Teacher") {
        // Show Loader
        document.getElementById("loader").style.display = "flex";
        result = await dispatch(approveTeacher(body));
        // Hide Loader
        document.getElementById("loader").style.display = "none";

        // fetch data again
        props.setTeacherApiCalled(false);
      }
      if (result.message === "Course Updated Successfully" || result.message === "Status Updated Successfully") {
        toast.success(`${props.verificationType} Verified Successfully`);
      } else {
        toast.error(`Failed to approve ${props.verificationType}`);
      }
    } catch (e) {
      toast.error(`Failed to approve ${props.verificationType}`);
    }
  }

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  const deleteUser = async (id) => {
    const uid = { id: id };
    await dispatch(deleteUsers(uid));
    props.refresh();
  }
  return (
    <>
      {formValues && showTeacherData && (
        <div className={styles.teachersData}>
          <button
            className={styles.closeBtn}
            onClick={() => {
              props.setShowPopUp(false)
              if (window.matchMedia("(max-width:992px)").matches) {
                setShowTeacherData(false);
              }
            }}
          >
            <i className="fas fa-close"></i>
          </button>

          {/* ---------------Body------------ */}
          <div className={props.verificationType === "Teacher" ? styles.teacherProfile : styles.courseImg}>

            {props.verificationType === "Teacher" ? (
              <>
              {console.log(formValues.approvalStatus === "verified" && formValues.teacherProfilePic.is_verified)}
                <input type="checkbox" onClick={handleChange} name="teacherProfilePic" defaultChecked={formValues.teacherProfilePic.is_verified} />
                <img src={formValues.teacherProfilePic.data} alt="" style={{ borderRadius: "50%", border: "3px solid grey" }} />
                &nbsp;
                &nbsp;
                <button title="Delete User" style={{ cursor: "pointer" }} type="button" onClick={() => deleteUser(formValues.userId._id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </>
            ) : (
              //Course
              <>
                <input type="checkbox" onClick={handleChange} name="courseImage" defaultChecked={formValues.courseImage.is_verified} />

                <img src={formValues.courseImage.data} style={{ objectFit: 'contain' }} alt="course_img" />
              </>
            )}
          </div>

          <div className={styles.basicDetails}>
            {props.verificationType === "Teacher" ? (
              // ---------------Teacher----------------
              <>
                <div>
                  <input type="checkbox" onChange={handleChange} name="firstName" defaultChecked={formValues.firstName.is_verified} />
                  <span className={styles.detailHeading}>Name</span>
                  <span>{formValues.firstName.data}</span>
                </div>
                <div>
                  <input type="checkbox" onClick={handleChange} name="teacherType" defaultChecked={formValues.teacherType.is_verified} />
                  <span className={styles.detailHeading}>Teacher Type</span>
                  <span>{formValues.teacherType.data}</span>
                </div>
                <div>
                  <input type="checkbox" onClick={handleChange} name="videoURL" defaultChecked={formValues.videoURL.is_verified} />
                  <span className={styles.detailHeading}>Intro Video</span>
                  <span>
                    <a href={formValues.videoURL.data} target="_blank" rel="noreferrer noopener">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </span>
                </div>
                <div>
                  <input type="checkbox" onClick={handleChange} name="mobileNumber" defaultChecked={formValues.mobileNumber.is_verified} />
                  <span className={styles.detailHeading}>Phone</span>
                  <span>{formValues.mobileNumber.data}</span>
                </div>
                <div>
                  <input type="checkbox" onClick={handleChange} name="motherTongue" defaultChecked={formValues.motherTongue.is_verified} />
                  <span className={styles.detailHeading}>Mother Tongue</span>
                  <span>{formValues.motherTongue.data}</span>
                </div>
              </>
            ) : (
              // ----------------Course--------------
              <>
                <div>
                  <input type="checkbox" onClick={handleChange} name="title" defaultChecked={formValues.title.is_verified} />
                  <span className={styles.detailHeading}>Title</span>
                  <span>{formValues.title.data}</span>
                </div>

                <div>
                  <input type="checkbox" onClick={handleChange} name="price" defaultChecked={formValues.price.is_verified} />
                  <span className={styles.detailHeading}>Price</span>
                  <span>${formValues.price.data}</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.otherDetailsContainer}>
            {props.verificationType === "Teacher" ? (
              // --------------Teacher-------------------------
              <>
                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="gender" defaultChecked={formValues.gender.is_verified} />
                  <span className={styles.otherDetailsHeading}>Gender:</span>
                  <span>{formValues.gender.data}</span>
                </div>
                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="dob" defaultChecked={formValues.dob.is_verified} />
                  <span className={styles.otherDetailsHeading}>Date of Birth:</span>
                  <span>{new Date(formValues.dob.data).toDateString().slice(3)}</span>
                </div>
                <div className={styles.otherDetails}>
                  <span className={styles.otherDetailsHeading + " " + styles.otherDetailsHeadingAge}>Age:</span>
                  <span>{getAge(formValues.dob.data)}</span>
                </div>
                <div className={styles.otherDetails}>
                  
                  <input type="checkbox" onClick={handleChange} name="fromCountry" defaultChecked={formValues.fromCountry.is_verified} />
                  <span className={styles.otherDetailsHeading}>From Country:</span>
                  <span>{formValues.fromCountry.data}</span>
                </div>
                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="languageTeach" defaultChecked={formValues.languageTeach[0].is_verified} />
                  <span className={styles.otherDetailsHeading}>Teaches:</span>
                  {formValues.languageTeach.length > 1 ?
                    (<span>{formValues.languageTeach.map(u => u.data).join(', ')}</span>)
                    :
                    (<span>{formValues.languageTeach[0].data}</span>)
                  }
                </div>

                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="languageSpeak" defaultChecked={formValues.languageSpeak[0].is_verified} />
                  <span className={styles.otherDetailsHeading}>Also Speaks:</span>
                  {formValues.languageSpeak.length > 1 ?
                    (<span>{formValues.languageSpeak.map(u => u.data).join(', ')}</span>)
                    :
                    (<span>{formValues.languageSpeak[0].data}</span>)
                  }
                </div>
              </>
            ) : (
              // ---------------Course--------------------
              <>
                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="language" defaultChecked={formValues.language.is_verified} />
                  <span className={styles.otherDetailsHeading}>Language:</span>
                  <span>{formValues.language.data}</span>
                </div>
                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="course" defaultChecked={formValues.course.is_verified} />
                  <span className={styles.otherDetailsHeading}>Course:</span>
                  <span>{formValues.course.data}</span>
                </div>
                <div className={styles.otherDetails}>
                  <input type="checkbox" onClick={handleChange} name="program" defaultChecked={formValues.program.is_verified} />
                  <span className={styles.otherDetailsHeading}>Program:</span>
                  <span>{formValues.program.data}</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.certificatedDetailsContainer}>
            {props.verificationType === "Teacher" ? (
              <>
                <div className={styles.certificatedDetailsTabs}>
                  <button
                    className={activeTab === "About" ? styles.active : ""}
                    onClick={() => {
                      handleDetails("About");
                    }}
                  >
                    About
                  </button>
                  <button
                    className={activeTab === "educationDetails" ? styles.active : ""}
                    onClick={() => {
                      handleDetails("educationDetails");
                    }}
                  >
                    Education{" "}
                  </button>
                  <button
                    className={activeTab === "workExperience" ? styles.active : ""}
                    onClick={() => {
                      handleDetails("workExperience");
                    }}
                  >
                    Work
                  </button>
                  <button
                    className={activeTab === "certificateCourses" ? styles.active : ""}
                    onClick={() => {
                      handleDetails("certificateCourses");
                    }}
                  >
                    Certificate
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.certificatedDetailsTabs}>
                  <button>Description</button>
                </div>
              </>
            )}

            <div className={styles.certificatedDetails}>
              {props.verificationType === "Teacher" ? (
                <>
                  <div className={styles.about} ref={aboutContainer}>
                    <input type="checkbox" onClick={handleChange} name="selfIntro" defaultChecked={formValues.selfIntro.is_verified} />
                    <p>{formValues.selfIntro.data}</p>
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
                </>
              ) : (
                <div className={styles.about} ref={aboutContainer}>
                  <input type="checkbox" onClick={handleChange} name="description" defaultChecked={formValues.description.is_verified} />
                  <p>{formValues.description.data}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              onClick={() => {
                setShowUnverifiedModal(true);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}

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
