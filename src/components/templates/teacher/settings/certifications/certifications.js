import React from "react";
import CertificateForm from "./certificateForm";
import commonStyles from "../styles.module.css";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
let FormData = require("form-data");

const Certifications = (props) => {
  const dispatch = useDispatch();
  const [educationDetails, setEducationDetails] = React.useState([
    {
      title: "",
      location: "",
      institution: "",
      description: "",
      from: "",
      to: "",
      certificateFile: "",
    },
  ]);
  const [workExperience, setWorkExperience] = React.useState([
    {
      title: "",
      location: "",
      institution: "",
      description: "",
      from: "",
      to: "",
      certificateFile: "",
    },
  ]);
  const [certificateCourses, setCertificateCourses] = React.useState([
    {
      title: "",
      location: "",
      institution: "",
      description: "",
      from: "",
      to: "",
      certificateFile: "",
    },
  ]);
  // const [educationDetailsFiles, setEducationDetailsFiles] = React.useState([]);
  // const [workExperienceFiles, setWorkExperienceFiles] = React.useState([]);
  // const [certificateCoursesFiles, setCertificateCoursesFiles] = React.useState([]);

  const handleFormData = (type, name, i, e) => {
    let value;
    // console.log(e);
    if (name === "from" || name === "to" || name === "location") {
      value = e;
    } else if (name === "certificateFile") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    if (type === "Education") {
      let newEducationDetails = [...educationDetails];
      newEducationDetails[i][name] = value;
      setEducationDetails(newEducationDetails);
    } else if (type === "Work") {
      let newWorkExperience = [...workExperience];
      newWorkExperience[i][name] = value;
      setWorkExperience(newWorkExperience);
    } else if (type === "Course") {
      let newCertificateCourse = [...certificateCourses];
      newCertificateCourse[i][name] = value;
      setCertificateCourses(newCertificateCourse);
    }
    // console.log(educationDetails, "E");
    // console.log(workExperience, "W");
    // console.log(certificateCourses, "C");
  };

  const addNewCertification = (type) => {
    if (type === "Education") {
      setEducationDetails([
        ...educationDetails,
        {
          title: "",
          location: "",
          institution: "",
          description: "",
          from: "",
          to: "",
          certificateFile: "",
        },
      ]);
    } else if (type === "Work") {
      setWorkExperience([
        ...workExperience,
        {
          title: "",
          location: "",
          institution: "",
          description: "",
          from: "",
          to: "",
          certificateFile: "",
        },
      ]);
    } else if (type === "Course") {
      setCertificateCourses([
        ...certificateCourses,
        {
          title: "",
          location: "",
          institution: "",
          description: "",
          from: "",
          to: "",
          certificateFile: "",
        },
      ]);
    }
  };

  const deleteDetail = (type, i) => {
    if (type === "Education") {
      let temp = [...educationDetails];
      if (temp.length > 0) temp.splice(i, 1);
      setEducationDetails(temp);
    } else if (type === "Work") {
      let temp = [...workExperience];
      if (temp.length > 0) temp.splice(i, 1);
      setWorkExperience(temp);
    } else if (type === "Course") {
      let temp = [...certificateCourses];
      if (temp.length > 0) temp.splice(i, 1);
      setCertificateCourses(temp);
    }
  };

  React.useEffect(() => {
    props.myDetails && setEducationDetails(props.myDetails.educationDetails);
    props.myDetails && setWorkExperience(props.myDetails.workExperience);
    props.myDetails && setCertificateCourses(props.myDetails.certificateCourses);
  }, [props.myDetails]);

  const validateFields = (type, details) => {
    let allDetailsFilled = true;
    details.forEach((detail) => {
      // let from;
      Object.entries(detail).forEach(([key, value]) => {
        if (value === "") {
          allDetailsFilled = false;
        }
        // if (key === "from") {
        //   from = parseInt(value);
        // }
        // if (key === "to" && from > parseInt(value)) {
        //   allDetailsFilled = false;
        //   toast.warn("Invalid Start and End Year");
        // }

        // console.log(key, value, "S");
      });
    });

    return allDetailsFilled;
  };

  const validateYears = (type,details) => {
    let fieldsVerified = true;
    details.forEach((detail) => {
      let from;
      Object.entries(detail).forEach(([key, value]) => {
        if (key === "from") {
          from = parseInt(value);
        }
        if (key === "to" && from > parseInt(value)) {
          fieldsVerified = false;
          toast.warn(`Invalid Start and End Year for ${type}`);
        }
      });
    });
    return fieldsVerified;
  };

  const getFiles = (details) => {
    let files = [];

    details.forEach((detail) => {
      Object.entries(detail).forEach(([key, value]) => {
        if (key === "certificateFile") {
          files.push(value);
        }
      });
    });

    return files;
  };

  // const filterData = (data)

  const handleSubmit = async () => {
    // Validate Education Details
    if (!validateFields("Education", educationDetails)) {
      toast.warn("All Fields are mandatory, please check Education fields.");
      return;
    }
    if (!validateYears("Education Details",educationDetails)) {
      return;
    }

    // Validate work Experience Details
    if (!validateFields("Work", workExperience)) {
      toast.warn("All Fields are mandatory, please check Work Experience fields.");
      return;
    }
    if (!validateYears("Work Experience",workExperience)) {
      return;
    }

    // Validate certificate Courses Details
    if (!validateFields("Course", certificateCourses)) {
      toast.warn("All Fields are mandatory, please check Courses fields.");
      return;
    }
    if (!validateYears("Certificate Course",certificateCourses)) {
      return;
    }

    var form = new FormData();
    const educationDetailsFiles = getFiles(educationDetails);
    const workExperienceFiles = getFiles(workExperience);
    const certificateCoursesFiles = getFiles(certificateCourses);

    form.append("type", "Certifications");
    form.append("teacherId", props.myDetails.id);
    form.append("educationDetails", JSON.stringify(educationDetails));
    form.append("workExperience", JSON.stringify(workExperience));
    form.append("certificateCourses", JSON.stringify(certificateCourses));

    educationDetailsFiles.forEach((file) => {
      form.append("educationDetailsFiles", file);
    });

    workExperienceFiles.forEach((file) => {
      form.append("workExperienceFiles", file);
    });
    certificateCoursesFiles.forEach((file) => {
      form.append("certificateCoursesFiles", file);
    });

    // for (var pair of form.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    try {
      // Show Loader
      document.getElementById("loader").style.display = "flex";
      const result = await dispatch(updateTeacherProfile(form));
      // Hide Loader
      document.getElementById("loader").style.display = "none";
      // console.log(result, "Result");
      if (result.status) {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error("Faild to update, please try again");
      }
    } catch (e) {
      console.log(e);
      toast.error("Faild to update, please try again");
    }
    props.setApiCalled(false);

  };

  return (
    <>
      <div className={styles.certifications}>
        <div>
          <h3 className={styles.heading}>Education Details:</h3>
          {educationDetails.map((education, i) => {
            return <CertificateForm data={education} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Education" />;
          })}

          <div className={styles.addNewDetailButtonContainer}>
            <button
              className={styles.addNewDetailButton}
              onClick={() => {
                addNewCertification("Education");
              }}
            >
              <i className="fas fa-plus"></i> Add New Detail
            </button>
          </div>
        </div>
        <div>
          <h3 className={styles.heading}>Work Experience:</h3>
          {workExperience.map((work, i) => {
            return <CertificateForm data={work} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Work" />;
          })}

          <div className={styles.addNewDetailButtonContainer}>
            <button
              className={styles.addNewDetailButton}
              onClick={() => {
                addNewCertification("Work");
              }}
            >
              <i className="fas fa-plus"></i> Add New Detail
            </button>
          </div>
        </div>
        <div>
          <h3 className={styles.heading}>Certificate Courses:</h3>
          {certificateCourses.map((course, i) => {
            return <CertificateForm data={course} index={i} handleFormData={handleFormData} deleteDetail={deleteDetail} type="Course" />;
          })}

          <div className={styles.addNewDetailButtonContainer}>
            <button
              className={styles.addNewDetailButton}
              onClick={() => {
                addNewCertification("Course");
              }}
            >
              <i className="fas fa-plus"></i> Add New Detail
            </button>
          </div>
        </div>
      </div>
      <div className={commonStyles.submitButtonContainer}>
        <button className={commonStyles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Certifications;
