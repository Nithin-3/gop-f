import React from "react";
import classes from "./styles.module.css";

import google from "../../../assets/icons/google.svg";
import facebook from "../../../assets/icons/facebook.svg";
import linkedin from "../../../assets/icons/linkedin.svg";

const IconContainer = ({ role }) => {

  return (
    <div className={classes.iconContainer}>
      <img src={google} alt="Google" />
      <img src={facebook} alt="Facebook" />
      <img src={linkedin} alt="linkedIn" />
    </div>
  );
};

export default IconContainer;
