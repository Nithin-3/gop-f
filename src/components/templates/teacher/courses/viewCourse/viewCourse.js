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
  const [imgUrl, setImgUrl] = useState("");
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
    setImgUrl(courseData.courseImage?.data || "");
    setPrograms(languages[courseData.language?.data]?.[courseData.course?.data] || []);
  }, [courseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "language" || name === "course") {
      setPrograms(languages[name === "language" ? value : formValues.language]?.[name === "course" ? value : formValues.course] || []);
      setFormValues((prev) => ({ ...prev, program: "" }));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length) {
      setFormValues((prev) => ({ ...prev, courseImage: e.target.files[0] }));
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const imageClick = () => {
    if (modalType === "Edit") courseImgInput.current.click();
  };

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
    } catch (err) {
      console.error(err);
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
            <img src={imgUrl} alt="coverImg" className={styles.coverImg} onClick={imageClick} />
            <input type="file" name="courseImage" ref={courseImgInput} style={{ display: "none" }} onChange={handleFileInput} />
            <div className={styles.courseDetails}>
              <div>
                <h4>Language:</h4>
                <select name="language" value={formValues.language} onChange={handleChange} disabled={modalType === "View"}>
                  {Object.keys(languages).map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <div>
                <h4>Course:</h4>
                <select name="course" value={formValues.course} onChange={handleChange} disabled={modalType === "View"}>
                  {["Academics", "Spoken Languages", "Test Preparation"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <h4>Program:</h4>
                <select name="program" value={formValues.program} onChange={handleChange} disabled={modalType === "View"}>
                  {programs.map((prog) => <option key={prog} value={prog}>{prog}</option>)}
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

          <input type="text" name="title" value={formValues.title} onChange={handleChange} disabled={modalType === "View"} className={styles.courseName} placeholder="Title" />
          <textarea name="description" value={formValues.description} onChange={handleChange} disabled={modalType === "View"} className={styles.courseDesc} placeholder="Description"></textarea>
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
