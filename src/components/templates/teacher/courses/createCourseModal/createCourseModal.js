import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCourse } from "../../../../../store/actions/course/index";
import styles from "./styles.module.css";
import { languages } from "../../../../../utils/constants";
// Removed require("form-data") to use native browser FormData


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

    // Explicitly append fields to ensure correctness
    form.append("title", formValues.title);
    form.append("language", formValues.language);
    form.append("course", formValues.course);
    form.append("program", formValues.program);
    form.append("price", formValues.price);
    form.append("price1", formValues.price1 || 0);
    form.append("price2", formValues.price2 || 0);
    form.append("description", formValues.description);
    const profile = JSON.parse(localStorage.getItem("profile"));
    const teacherId = profile?._id || profile?.id;

    if (teacherId) {
      form.append("teacherId", teacherId);
    }

    // Append courseImage with filename to ensure proper handling by multipart/form-data
    if (formValues.courseImage && formValues.courseImage.name) {
      form.append("courseImage", formValues.courseImage, formValues.courseImage.name);
    } else {
      form.append("courseImage", formValues.courseImage);
    }


    try {
      document.getElementById("loader").style.display = "flex";
      const result = await dispatch(createCourse(form));
      document.getElementById("loader").style.display = "none";

      const successMsg = result?.msg || result?.message || (typeof result === "string" ? result : "");

      if (result?.status === 1 || successMsg === "Course Created Successfully") {
        toast.success("Course Created Successfully");
        setApiCalled(false);
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
      } else if (successMsg === "Admin Verification Pending") {
        toast.info("Course Submitted: Admin Verification Pending");
        setApiCalled(false);
        setModal(false);
      } else {
        toast.error(result?.message || result?.msg || (typeof result === "string" ? result : "Failed to create course"));
      }
    } catch (e) {
      console.error("Course creation failed:", e);
      document.getElementById("loader").style.display = "none";
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
