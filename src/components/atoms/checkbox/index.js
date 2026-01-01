import React from "react";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";
const Checkbox = ({ id, label, value, change, redirectUrl, ...rest }) => {
  return (
    <div className={classes.check_row}>
      <div className={classes.check_col_25}>
        <input onChange={change} style={{width: '15px', height: '15px'}} type="checkbox" value={value} id={id} {...rest} />
      </div>
      <div className={classes.check_col_75}>{redirectUrl ? <Link target="_blank" to={redirectUrl}>{label}</Link> : <label htmlFor={id} style={{fontSize: '16px'}}>{label}</label>}</div>
    </div>
  );
};

export default Checkbox;
