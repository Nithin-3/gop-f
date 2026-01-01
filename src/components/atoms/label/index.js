import React from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";
const Label = (props) => {
  const { img, labelFor, title, ...rest } = props;
  return (
    <label className={classes.label} htmlFor={labelFor} {...rest}>
      {title === "Upload Your Photo" && labelFor === "file-img" ? (
        <>
          <img
            src={img.src1}
            width="300"
            height="300"
            className={classes.imgFile}
            alt=""
          />
          <img
            src={img.src2}
            className={classes.cloudImg}
            width="130"
            height="130"
            alt=""
          ></img>
          <h3 className={classes.txt}>{title}</h3>
        </>
      ) : (
        <>
          <div className={classes.fup}>
            <img
              src={img.src1}
              width="40"
              height="40"
              className={classes.fupImg}
              alt=""
            />
            <h3 className={classes.docLabel}>{title}</h3>
          </div>
        </>
      )}
    </label>
  );
};

Label.propTypes = {
  img: PropTypes.shape({
    src1: PropTypes.string,
    src2: PropTypes.string,
  }),
  labelFor: PropTypes.oneOf(["file-img", "file-doc"]),
  title: PropTypes.oneOf(["Upload Your Photo", "Upload Certificate"]),
};

export default Label;
