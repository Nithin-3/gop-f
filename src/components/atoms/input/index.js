import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";
import slashEye from "../../../assets/icons/hidden.png";
import eye from "../../../assets/icons/eye.svg";

const Input = ({ id, change, label, type, value, placeholder, ...rest }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className={classes.row}>
      {label ? (
        <>
          <div className={classes.col_25}>
            <label htmlFor={id}>{label}</label>
          </div>
        </>
      ) : (
        ""
      )}
      <div className={classes.col_75}>
        <input onChange={change} type={isPasswordShown ? "text" : type} placeholder={placeholder} value={value} id={id} {...rest}></input>
        {type === "password" && (
          <img onClick={() => setIsPasswordShown(!isPasswordShown)} className={classes.eye_icon} src={isPasswordShown ? slashEye : eye} alt="" />
        )}
      </div>
    </div>
  );
};

Input.prototype = {
  change: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  // value:PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default Input;
