import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { CountryDropdown } from "react-country-region-selector";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const CertificateForm = (props) => {
  const [showFile, setShowFile] = React.useState();

  React.useEffect(() => {
    if (typeof props.data.certificateFile === "string") setShowFile(props.data.certificateFile);
  }, [props.data]);

  return (
    <div className={styles.certificateForm}>
      <h5>
        {props.index + 1}
        <i className="fas fa-trash" onClick={() => props.deleteDetail(props.type, props.index)}></i>
      </h5>

      <form>
        <div className={commonStyles.formGroup}>
          <label>Title*:</label>
          <input type="text" value={props.data.title} onChange={e => props.handleFormData(props.type, "title", props.index, e)} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>Location*:</label>
          <CountryDropdown value={props.data.location} onChange={e => props.handleFormData(props.type, "location", props.index, e)} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>Start (Year)*:</label>
          <Datetime dateFormat="YYYY" timeFormat={false} closeOnSelect value={props.data.from} onChange={d => props.handleFormData(props.type, "from", props.index, moment(d).format("YYYY"))} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>End (Year)*:</label>
          <Datetime dateFormat="YYYY" timeFormat={false} closeOnSelect value={props.data.to} onChange={d => props.handleFormData(props.type, "to", props.index, moment(d).format("YYYY"))} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>Description:*:</label>
          <textarea value={props.data.description} onChange={e => props.handleFormData(props.type, "description", props.index, e)} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>Institution:*:</label>
          <input type="text" value={props.data.institution} onChange={e => props.handleFormData(props.type, "institution", props.index, e)} />
        </div>

        <div className={styles.uploadCerti}>
          {showFile && <a className={styles.viewFile} href={showFile} target="_blank" rel="noreferrer">Download Certi</a>}
          <button type="button">
            {props.data.certificateFile && typeof props.data.certificateFile !== "string" ? props.data.certificateFile.name : <>Upload <i className="fas fa-upload"></i></>}
            <input type="file" onChange={e => props.handleFormData(props.type, "certificateFile", props.index, e)} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateForm;
