import React, { useState } from "react";
import classes from "./styles.module.css";
// import Button from "../../atoms/button";
// import RadioButton from "../../atoms/radioButton";
import Student from "../../../assets/icons/student_icon.svg";
import teacher from "../../../assets/icons/professor_icon.svg";
import arrowForward from "../../../assets/image/Vector-3.png";
// import { useHistory } from "react-router";
import { ROLE_STUDENT, ROLE_TEACHER } from "../../../utils/constants";

const RoleContainer = ({ popupSetter }) => {
  // const history = useHistory();

  // const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("");

  const clickHandler = () => {
    if (role === "") return;
    popupSetter(false);
    localStorage.setItem("userRole", JSON.stringify({ role: role }));
    // setIsChecked(true);
    setRole(role);

  };

  return (
    <form className={classes.Role_Container}>
      <div className={classes.roleWrapper}>
        <span
          onClick={() => setRole(ROLE_STUDENT)}
          className={role === ROLE_STUDENT ? `${classes.radio_container} ${classes.selectedRole}` : classes.radio_container}
        >
          {Student && <img className={classes.radio_img} src={Student} alt="Student" />}
          <h2>Student</h2>
        </span>

        <span
          onClick={() => setRole(ROLE_TEACHER)}
          className={role === ROLE_TEACHER ? `${classes.radio_container} ${classes.selectedRole}` : classes.radio_container}
        >
          {teacher && <img className={classes.radio_img} src={teacher} alt="Teacher" />}
          <h2>Teacher</h2>
        </span>
      </div>
      <div className={classes.popupBtn}>

        <button type="button" className={classes.continueBtn} onClick={() => clickHandler()}>
          Continue
          <img src={arrowForward} alt="errImg" />
        </button>

      </div>
    </form>
  );
};

export default RoleContainer;
