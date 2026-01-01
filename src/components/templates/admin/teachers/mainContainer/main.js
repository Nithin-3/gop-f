import React from "react";
import styles from "./styles.module.css";
import TopBar from "./topBar/topBar";
import TeachersTable from "./teachersTable/teachersTable";

const Main = (props) => {
  return (
    <>
      <main className={styles.mainSection}>
        <TopBar verificationType={props.verificationType} searchInput={props.searchInput} setSearchInput={props.setSearchInput} />
        <TeachersTable
          verificationType={props.verificationType}
          // Course
          courses={props.courses}
          setSelectedCourse={props.setSelectedCourse}
          selectedCourse={props.selectedCourse}
          //Teacher
          setSelectedTeacher={props.setSelectedTeacher}
          teachers={props.teachers}
          selectedTeacher={props.selectedTeacher}
        />
      </main>
    </>
  );
};

export default Main;
