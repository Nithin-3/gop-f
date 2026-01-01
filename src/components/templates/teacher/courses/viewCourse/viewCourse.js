import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";
import { updateCourse } from "../../../../../store/actions/course";
import { languages } from "../../../../../utils/constants";
var FormData = require("form-data");

const ViewCourse = ({ courseData, modalType, setModal, activeTab, setApiCalled }) => {
  const dispatch = useDispatch();
  const courseImgInput = useRef();
  const [imgUrl, setImageUrl] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    courseImage: "",
    course: "",
    language: "",
    program: "",
    price: "",
    price1: "",
    price2: "",
    description: "",
  });
  const [programs, setPrograms] = useState([]);

  const setProgramsInput = () => {
    if (!formValues.language || !formValues.course) return;
    const progs = languages[formValues.language][formValues.course];
    setPrograms(progs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "course" || name === "language") {
      setProgramsInput();
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageClick = () => {
    if (modalType === "Edit") courseImgInput.current.click();
  };

  useEffect(() => {
    if (!courseData) return;
    setFormValues({
      title: courseData.title?.data || "",
      courseImage: courseData.courseImage?.data || "",
      course: courseData.course?.data || "",
      language: courseData.language?.data || "",
      program: courseData.program?.data || "",
      price: courseData.price?.data || "",
      price1: courseData.price1?.data || "",
      price2: courseData.price2?.data || "",
      description: courseData.description?.data || "",
    });
    setImageUrl(courseData.courseImage?.data || "");
    setPrograms(languages[courseData.language?.data]?.[courseData.course?.data] || []);
  }, [courseData]);

  const handleSubmit = async () => {
    const { title, course, language, program, price, description, courseImage, price1, price2 } = formValues;
    if (!title || !course || !language || !program || !price || !description || !courseImage) {
      return toast.warn("Please fill all required fields and upload image");
    }

    try {
      setApiCalled(false);
      const form = new FormData();
      form.append("id", courseData.id);
      form.append("title", title);
      form.append("language", language);
      form.append("course", course);
      form.append("program", program);
      form.append("price", price);
      form.append("price1", price1 || 0);
      form.append("price2", price2 || 0);
      form.append("description", description);
      form.append("courseImage", courseImage);

      document.getElementById("loader").style.display = "flex";
      const result = await dispatch(updateCourse(form));
      document.getElementById("loader").style.display = "none";

      if (result.status === 1) {
        toast.success("Course Edited Successfully");
        setModal(false);
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3 className={styles.heading}>
          {activeTab}
          <i className={`${styles.closeBtn} fas fa-close`} onClick={() => setModal(false)}></i>
        </h3>
        <form>
          <div className={styles.course}>
            <img src={imgUrl} className={styles.coverImg} alt="coverImg" onClick={imageClick} />
            <input
              type="file"
              name="courseImage"
              className={styles.courseImgInput}
              ref={courseImgInput}
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
            <div className={styles.courseDetails}>
              <div>
                <h4>Language:</h4>
                <select name="language" onChange={handleChange} disabled={modalType === "View"}>
                  {Object.keys(languages).map((lang) => (
                    <option key={lang} value={lang} selected={formValues.language === lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h4>Course:</h4>
                <select name="course" onChange={handleChange} disabled={modalType === "View"}>
                  <option value="Academics" selected={formValues.course === "Academics"}>Academics</option>
                  <option value="Spoken Languages" selected={formValues.course === "Spoken Languages"}>Spoken Languages</option>
                  <option value="Test Preparation" selected={formValues.course === "Test Preparation"}>Test Preparation</option>
                </select>
              </div>
              <div>
                <h4>Program:</h4>
                <select name="program" onChange={handleChange} disabled={modalType === "View"}>
                  {programs.map((prog) => (
                    <option key={prog} value={prog} selected={formValues.program === prog}>{prog}</option>
                  ))}
                </select>
              </div>
              {activeTab === "Courses" && (
                <>
                  <div>
                    <h4>Price ($):</h4>
                    <input type="number" name="price" value={formValues.price} onChange={handleChange} disabled={modalType === "View"} />
                  </div>
                  <div>
                    <h4>Price1 ($):</h4>
                    <input type="number" name="price1" value={formValues.price1} onChange={handleChange} disabled={modalType === "View"} />
                  </div>
                  <div>
                    <h4>Price2 ($):</h4>
                    <input type="number" name="price2" value={formValues.price2} onChange={handleChange} disabled={modalType === "View"} />
                  </div>
                </>
              )}
            </div>
          </div>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            disabled={modalType === "View"}
            className={styles.courseName}
            placeholder="Title"
            style={{ padding: "10px", width: "100%", textAlign: "center" }}
          />
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            disabled={modalType === "View"}
            className={styles.courseDesc}
            placeholder="Description"
            style={{ padding: "10px", width: "100%" }}
          ></textarea>
        </form>
        {modalType === "Edit" && (
          <div className={styles.submitButtonContainer}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourse;
