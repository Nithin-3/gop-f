import React from "react";
import PropTypes from "prop-types";
import classes from "./styles.module.css";

const Text = (props) => {
  const { title, theme, color, weight, ...rest } = props;

  const classProps = [classes[theme], classes[color], classes[weight]].join(
    " "
  );

  return (
    <p className={classProps} {...rest}>
      {title}
    </p>
  );
};

Text.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([
    "heading1",
    "heading2",
    "heading3",
    "heading4",
    "heading5",
    "title1",
    "subtitle1",
    "body1",
    "body2",
    "small1",
    "heading1Nonbold",
  ]),
  color: PropTypes.oneOf(["white", "black", 'main']),
  weight: PropTypes.oneOf(["bold", "regular", "italic"]),
};

Text.defaultProps = {
  theme: "body",
  color: "black",
  weight: "regular",
};

export default Text;
