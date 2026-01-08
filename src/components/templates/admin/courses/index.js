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
  const [searchInput, setSearchInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Open popup on mobile when course selected
  useEffect(() => {
    if (selectedCourse && width < 992) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [selectedCourse, width]);

  // Fetch courses (debounced search)
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await dispatch(getCourses(searchInput));

        if (result?.status === 200) {
          const courses = result?.data?.data || [];
          setAllCourses(courses);

          if (!selectedCourse && courses.length) {
            setSelectedCourse(courses[0]);
          }
        } else {
          setAllCourses([]);
          setSelectedCourse(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce search

    return () => clearTimeout(timeout);
  }, [dispatch, searchInput, selectedCourse]);

  return (
    <div className={styles.coursesDashboard}>
      {loading && <div className={styles.loader}>Loading...</div>}

      <Main
        verificationType="Course"
        courses={allCourses}
        setSelectedCourse={setSelectedCourse}
        selectedCourse={selectedCourse}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {width >= 992 && selectedCourse && (
        <ShowData
          selectedCourse={selectedCourse}
          verificationType="Course"
        />
      )}

      {width < 992 && showPopup && selectedCourse && (
        <ShowData
          selectedCourse={selectedCourse}
          verificationType="Course"
          setShowPopUp={setShowPopup}
        />
      )}
    </div>
  );
};

export default AdminCourses;
