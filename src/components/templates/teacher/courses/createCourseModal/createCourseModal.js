import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCourse } from "../../../../../store/actions/course/index";
import styles from "./styles.module.css";
import { languages } from "../../../../../utils/constants";
var FormData = require("form-data");

const CreateCourseModal = (props) => {
  const [page, setPage] = useState(1);
  const fileInp = useRef();
  const [formValues, setFormValues] = useState({
    courseImage: null,
    language: "English",
    course: "Academics",
  });

  const [programs, setPrograms] = useState([]);
  const dispatch = useDispatch();

  const setProgramsInput = () => {
    if (!(formValues.language && formValues.course)) return;
    setPrograms(languages[formValues.language][formValues.course]);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === 2) {
      if (!formValues.title) return toast.warn("Please add title");
      if (!formValues.language) return toast.warn("Please select language");
      if (!formValues.course) return toast.warn("Please select course");
      if (!formValues.program) return toast.warn("Please select program");
      setPage(pageNumber);
    }
  };

  const handleChange = (e) => {
    if (
      ["price", "price1", "price2"].includes(e.target.name) &&
      e.target.value <= 0
    ) {
      setFormValues({ ...formValues, [e.target.name]: "" });
      return;
    }
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    if (!formValues.price) return toast.warn("Please mention price");
    if (!formValues.description) return toast.warn("Please describe the course");
    if (!formValues.courseImage) return toast.warn("Please upload cover photo");
    if (
      !["image/png", "image/jpg", "image/jpeg"].includes(formValues.courseImage.type)
    ) {
      return toast.warn("Image Type is not supported");
    }

    const form = new FormData();
    form.append("title", formValues.title);
    form.append("language", formValues.language);
    form.append("course", formValues.course);
    form.append("program", formValues.program);
    form.append("price", formValues.price);
    form.append("price1", formValues.price1 || 0);
    form.append("price2", formValues.price2 || 0);
    form.append("description", formValues.description);
    form.append("courseImage", formValues.courseImage);

    document.getElementById("loader").style.display = "flex";
    const result = await dispatch(createCourse(form));
    props.setApiCalled(false);
    document.getElementById("loader").style.display = "none";

    if (result.msg === "Course Created Successfully") {
      toast.success("Course Created");
      setFormValues({
        courseImage: null,
        language: "English",
        course: "Academics",
      });
      setPage(1);
      props.setModal(false);
    } else if (result.msg === "Admin Verification Pending") {
      toast.error("Admin Verification Pending");
    } else {
      toast.error("Failed to create course");
    }
  };

  useEffect(() => {
    if (formValues.language && formValues.course) setProgramsInput();
  }, [formValues]);

  useEffect(() => {
    if (programs.length > 0) {
      setFormValues({ ...formValues, program: programs[0] });
    }
  }, [programs]);

  return props.showModal ? (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        {/* Header */}
        <i
          className={`${styles.closeBtn} fas fa-close`}
          onClick={() => props.setModal(false)}
        ></i>
        <h3 className={styles.heading}>Create Course</h3>

        {/* Body */}
        {page === 1 && (
          <form className={styles.createCourseForm1}>
            <input
              type="text"
              placeholder="Course Title"
              name="title"
              value={formValues.title || ""}
              onChange={handleChange}
            />
            <select name="language" value={formValues.language} onChange={handleChange}>
              <option value="" disabled>
                Select Language
              </option>
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <select name="course" value={formValues.course} onChange={handleChange}>
              <option value="" disabled>
                Select Course
              </option>
              <option value="Academics">Academics</option>
              <option value="Spoken Languages">Spoken Languages</option>
              <option value="Test Preparation">Test Preparation</option>
            </select>
            <select name="program" value={formValues.program} onChange={handleChange}>
              <option value="" disabled>
                Select Program
              </option>
              {programs.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
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
              value={formValues.price || ""}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="5 Lesson Price"
              name="price1"
              value={formValues.price1 || ""}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="10 Lesson Price"
              name="price2"
              value={formValues.price2 || ""}
              onChange={handleChange}
            />

            <div
              className={styles.coverPhotoDiv}
              onClick={() => fileInp.current.click()}
            >
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
              value={formValues.description || ""}
              onChange={handleChange}
            ></textarea>
          </form>
        )}

        {/* Footer */}
        {page === 1 && (
          <button className={styles.nextButton} onClick={() => handlePageChange(2)}>
            Next
          </button>
        )}

        {page === 2 && (
          <div className={styles.page2Footer}>
            <button className={styles.prevButton} onClick={() => setPage(1)}>
              Previous
            </button>
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit <i className="fas fa-check-circle"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default CreateCourseModal;
