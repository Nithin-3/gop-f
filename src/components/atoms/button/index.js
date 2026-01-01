import React from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";

//To do:hoverable btn
const Button = (props) => {
  const { type, icon, title, theme, size, clicked, ...rest } = props;
  const classProps = [classes.button, classes[theme], classes[size]].join(" ");

  return (
    <button type={type} onClick={clicked} className={classProps} {...rest}>
      {icon && icon.position === "left" && (
        <img
          className={classes["icons"]}
          src={icon.src}
          position={icon.position}
          alt=""
        />
      )}
      {title}
      {icon &&
      icon.position === "right" &&
      classes[theme] === classes["success-icon-right"] ? (
        <img src={icon.src} alt="" className={classes["icons-right-success"]} />
      ) : icon &&
        icon.position === "right" &&
        classes[theme] === classes["primary-icon-right"] ? (
        <img src={icon.src} alt="" className={classes["icons"]} />
      ) : (
        ""
      )}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    src: PropTypes.string,
    position: PropTypes.oneOf(["right", "left"]),
  }),
  theme: PropTypes.oneOf([
    "primary",
    "primary-border",
    "primary-icon-left",
    "primary-icon-right",
    "secondary",
    "primary-outline-none",
    "success-icon-right",
  ]),
  type: PropTypes.string,
};

Button.defaultProps = {
  theme: "primary",
  size: "medium",
};

export default Button;
