import React, { useEffect, useState } from "react";
import Main from "../teachers/mainContainer/main";
import ShowData from "../teachers/teachersData/teachersData";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { getCourses } from "../../../../store/actions/admin/course";
import { useWindowDimensions } from "../../../../utils/util";

const AdminCourses = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseApiCalled, setCourseApiCalled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Show popup when a course is selected (only for mobile view)
  useEffect(() => {
    if (selectedCourse && width < 992) {
      setShowPopup(true);
    }
  }, [selectedCourse, width]);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      setCourseApiCalled(true);
      try {
        // Show Loader
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "flex";

        const result = await dispatch(getCourses(searchInput));

        // Hide Loader
        if (loader) loader.style.display = "none";

        if (result?.status === 200) {
          setAllCourses(result?.data?.data || []);
          if (!selectedCourse) {
            setSelectedCourse(result?.data?.data?.[0] || null);
          }
        } else {
          setAllCourses([]);
          setSelectedCourse(null);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchCourses();
  }, [dispatch, searchInput]);

  return (
    <div className={styles.coursesDashboard}>
      <Main
        verificationType="Course"
        courses={allCourses}
        setSelectedCourse={setSelectedCourse}
        selectedCourse={selectedCourse}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {width >= 992 ? (
        selectedCourse && (
          <ShowData
            selectedCourse={selectedCourse}
            verificationType="Course"
            setCourseApiCalled={setCourseApiCalled}
          />
        )
      ) : (
        showPopup && selectedCourse && (
          <ShowData
            selectedCourse={selectedCourse}
            verificationType="Course"
            setCourseApiCalled={setCourseApiCalled}
            setShowPopUp={setShowPopup}
          />
        )
      )}
    </div>
  );
};

export default AdminCourses;
