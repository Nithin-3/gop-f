import React from "react";
import { useWindowDimensions } from "../../../../../../utils/util";
import styles from "./styles.module.css";
import TeacherRow from "./teacherRow";

const TeachersTable = (props) => {
  console.log(props)
  const { width } = useWindowDimensions()
  return (
    <>
      {width >= 578 ? <div className={styles.teachersTable}>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th className={styles.tableHeading}>
                <p>Status</p>
                <i className='fas fa-arrow-down'></i>
              </th>
              <th className={styles.tableHeading}>
                <p>{props.verificationType === "Teacher" ? "Name" : "Title"}</p>
                <i className='fas fa-arrow-down'></i>
              </th>
              <th className={styles.tableHeading}>
                <p>
                  {props.verificationType === "Teacher"
                    ? "Mother Tongue"
                    : "Teacher Name"}
                </p>
                <i className='fas fa-arrow-down'></i>
              </th>
              <th className={styles.tableHeading}>
                <p>
                  {props.verificationType === "Teacher"
                    ? "Intro Video"
                    : "Language"}
                </p>
                <i className='fas fa-arrow-down'></i>
              </th>
              <th className={styles.tableHeading}>
                <p>
                  {props.verificationType === "Teacher" ? "Contact" : "Price"}
                </p>
                <i className='fas fa-arrow-down'></i>
              </th>
              <th className={styles.tableHeading}>
                <p>
                  {props.verificationType === "Teacher"
                    ? "Country"
                    : "Created On"}
                </p>
                <i className='fas fa-arrow-down'></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* // Course  */}
            {props.verificationType === "Course"
              ? props.courses &&
              props.courses.map((course, i) => {
                return (
                  <TeacherRow
                    key={i}
                    verificationType={props.verificationType}
                    course={course}
                    setSelectedCourse={props.setSelectedCourse}
                    selectedCourse={props.selectedCourse}
                  />
                );
              })
              : ""}

            {props.verificationType === "Teacher"
              ? props.teachers &&
              props.teachers.map((teacher, i) => {
                return (
                  <TeacherRow
                    verificationType={props.verificationType}
                    teacher={teacher}
                    setSelectedTeacher={props.setSelectedTeacher}
                    selectedTeacher={props.selectedTeacher}
                    key={i}
                  />
                );
              })
              : ""}
          </tbody>
        </table>
        {props.teachers === null ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
            }}>
            No Teachers Found!
          </div>
        ) : (
          <></>
        )}
        {props.courses === null ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "bold",
            }}>
            No Courses Found!
          </div>
        ) : (
          <></>
        )}
      </div>
        :
        <div className={styles.teachersTable}>
          <table cellSpacing='0'>
            <thead>
              <tr>
                <th className={styles.tableHeading}>
                  <p>Status</p>
                  <i className='fas fa-arrow-down'></i>
                </th>
                <th className={styles.tableHeading}>
                  <p>{props.verificationType === "Teacher" ? "Name" : "Title"}</p>
                  <i className='fas fa-arrow-down'></i>
                </th>
                <th className={styles.tableHeading}>
                  <p>
                    {props.verificationType === "Teacher"
                      ? "Mother Tongue"
                      : "Teacher Name"}
                  </p>
                  <i className='fas fa-arrow-down'></i>
                </th>
                {/* <th className={styles.tableHeading}>
                  <p>
                    {props.verificationType === "Teacher"
                      ? "Intro Video"
                      : "Language"}
                  </p>
                  <i className='fas fa-arrow-down'></i>
                </th> */}
                {/* <th className={styles.tableHeading}>
                  <p>
                    {props.verificationType === "Teacher" ? "Contact" : "Price"}
                  </p>
                  <i className='fas fa-arrow-down'></i>
                </th> */}
                {/* <th className={styles.tableHeading}>
                  <p>
                    {props.verificationType === "Teacher"
                      ? "Country"
                      : "Created On"}
                  </p>
                  <i className='fas fa-arrow-down'></i>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {/* // Course  */}
              {props.verificationType === "Course"
                ? props.courses &&
                props.courses.map((course, i) => {
                  return (
                    <TeacherRow
                      key={i}
                      verificationType={props.verificationType}
                      course={course}
                      setSelectedCourse={props.setSelectedCourse}
                      selectedCourse={props.selectedCourse}
                    />
                  );
                })
                : ""}

              {props.verificationType === "Teacher"
                ? props.teachers &&
                props.teachers.map((teacher, i) => {
                  return (
                    <TeacherRow
                      verificationType={props.verificationType}
                      teacher={teacher}
                      setSelectedTeacher={props.setSelectedTeacher}
                      selectedTeacher={props.selectedTeacher}
                      key={i}
                    />
                  );
                })
                : ""}
            </tbody>
          </table>
          {props.teachers === null ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontWeight: "bold",
              }}>
              No Teachers Found!
            </div>
          ) : (
            <></>
          )}
          {props.courses === null ? (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontWeight: "bold",
              }}>
              No Courses Found!
            </div>
          ) : (
            <></>
          )}
        </div>}

    </>
  );
};

export default TeachersTable;
