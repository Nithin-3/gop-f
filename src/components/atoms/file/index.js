import React from "react";
import PropTypes from "prop-types";
const File = (props) => {
  const { fileFormat, id, ...rest } = props;
  return <input type="file" accept={fileFormat} id={id} hidden {...rest} />;
};

File.propTypes = {
  fileFormat: PropTypes.oneOf([
    "image/*",
    ".txt, text/plain, .doc, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]),
  id: PropTypes.oneOf(["file-img", "file-doc"]),
};

export default File;
