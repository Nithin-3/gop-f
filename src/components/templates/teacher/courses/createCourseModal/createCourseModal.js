import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCourse } from "../../../../../store/actions/course/index";
import styles from "./styles.module.css";
import { languages } from "../../../../../utils/constants";
var FormData = require("form-data");

const CreateCourseModal = ({ showModal, setModal, setApiCalled }) => {
  const dispatch = useDispatch();
  const fileInp = useRef();

  const [page, setPage] = useState(1);
  const [programs, setPrograms] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    courseImage: null,
    language: "English",
    course: "Academics",
    program: "",
    price: "",
    price1: "",
    price2: "",
    description: "",
  });

  const setProgramsInput = () => {
    if (formValues.language && formValues.course) {
      setPrograms(languages[formValues.language][formValues.course] || []);
    }
  };

  useEffect(() => {
    setProgramsInput();
  }, [formValues.language, formValues.course]);

  useEffect(() => {
    if (programs.length > 0 && !programs.includes(formValues.program)) {
      setFormValues((prev) => ({ ...prev, program: programs[0] }));
    }
  }, [programs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["price", "price1", "price2"].includes(name) && value <= 0) return;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    }
  };

  const handlePageChange = (nextPage) => {
    if (nextPage === 2) {
      if (!formValues.title) return toast.warn("Please add title");
      if (!formValues.language) return toast.warn("Please select language");
      if (!formValues.course) return toast.warn("Please select course");
      if (!formValues.program) return toast.warn("Please select program");
    }
    setPage(nextPage);
  };

  const handleSubmit = async () => {
    if (!formValues.price) return toast.warn("Please mention price");
    if (!formValues.description) return toast.warn("Please describe the course");
    if (!formValues.courseImage) return toast.warn("Please upload cover photo");
    if (!["image/png", "image/jpg", "image/jpeg"].includes(formValues.courseImage.type)) {
      return toast.warn("Image type not supported");
    }

    const form = new FormData();
    Object.entries(formValues).forEach(([key, value]) => form.append(key, value));

    document.getElementById("loader").style.display = "flex";
    const result = await dispatch(createCourse(form));
    setApiCalled(false);
    document.getElementById("loader").style.display = "none";
    console.log(result.msg)
    if (result?.msg === "Course Created Successfully") {
      toast.success("Course Created");
      setFormValues({
        title: "",
        courseImage: null,
        language: "English",
        course: "Academics",
        program: "",
        price: "",
        price1: "",
        price2: "",
        description: "",
      });
      setPage(1);
      setModal(false);
    } else if (result?.msg === "Admin Verification Pending") {
      toast.error("Admin Verification Pending");
    } else {
      toast.error("Failed to create course");
    }
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <i
          className={`${styles.closeBtn} fas fa-close`}
          onClick={() => setModal(false)}
        ></i>
        <h3 className={styles.heading}>Create Course</h3>

        {page === 1 && (
          <form className={styles.createCourseForm1}>
            <input
              type="text"
              placeholder="Course Title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
            />
            <select name="language" value={formValues.language} onChange={handleChange}>
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <select name="course" value={formValues.course} onChange={handleChange}>
              <option value="Academics">Academics</option>
              <option value="Spoken Languages">Spoken Languages</option>
              <option value="Test Preparation">Test Preparation</option>
            </select>
            <select name="program" value={formValues.program} onChange={handleChange}>
              {programs.map((program) => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </form>
        )}

        {page === 2 && (
          <form className={styles.createCourseForm2}>
            <input
              type="number"
              placeholder="1 Lesson Price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="5 Lesson Price"
              name="price1"
              value={formValues.price1}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="10 Lesson Price"
              name="price2"
              value={formValues.price2}
              onChange={handleChange}
            />
            <div className={styles.coverPhotoDiv} onClick={() => fileInp.current.click()}>
              {formValues.courseImage ? formValues.courseImage.name : "Upload Cover Photo"}
            </div>
            <input
              type="file"
              name="courseImage"
              ref={fileInp}
              className={styles.fileInp}
              onChange={handleFileInput}
            />
            <textarea
              placeholder="Course Description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </form>
        )}

        <div className={styles.footer}>
          {page === 1 && (
            <button className={styles.nextButton} onClick={() => handlePageChange(2)}>Next</button>
          )}
          {page === 2 && (
            <>
              <button className={styles.prevButton} onClick={() => setPage(1)}>Previous</button>
              <button className={styles.submitButton} onClick={handleSubmit}>
                Submit <i className="fas fa-check-circle"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
