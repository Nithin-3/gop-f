import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { CountryDropdown } from "react-country-region-selector";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
// import { string } from "yup";

const CertificateForm = (props) => {
  const [showFile, setShowFile] = React.useState();

  React.useEffect(() => {
    if (typeof props.data.certificateFile === "string") {
      setShowFile(props.data.certificateFile);
    }
    console.log(typeof props.data.certificateFile);
  }, [props.data, showFile]);

  return (
    <>
      <div className={styles.certificateForm}>
        <h5>
          {props.index + 1}{" "}
          <i
            className="fas fa-trash"
            onClick={() => {
              props.deleteDetail(props.type, props.index);
            }}
          ></i>
        </h5>
        <form>
          <div className={commonStyles.formGroup}>
            <label>Title*:</label>
            <input
              type="text"
              name="title"
              value={props.data.title}
              onChange={(e) => {
                props.handleFormData(props.type, "title", props.index, e);
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Location*:</label>
            <CountryDropdown
              classes="countryFrom"
              defaultOptionLabel="Choose Country"
              blankOptionLabel="Choose Country"
              value={props.data.location}
              onChange={(e) => {
                props.handleFormData(props.type, "location", props.index, e);
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Start (Year)*:</label>
            <Datetime
              dateFormat="YYYY"
              //   value={formValues[item.key]}
              //   inputProps={{ placeholder: '', value:  }}
              timeFormat={false}
              closeOnSelect={true}
              //   onChange={(date) =>
              //     handleChange(moment(date).format("YYYY"), item.key)
              //   }
              value={props.data.from}
              onChange={(date) => {
                props.handleFormData(props.type, "from", props.index, moment(date).format("YYYY"));
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>End (Year)*:</label>
            <Datetime
              dateFormat="YYYY"
              //   value={formValues[item.key]}
              //   inputProps={{ placeholder: '', value:  }}
              timeFormat={false}
              closeOnSelect={true}
              //   onChange={(date) =>
              //     handleChange(moment(date).format("YYYY"), item.key)
              //   }
              value={props.data.to}
              onChange={(date) => {
                props.handleFormData(props.type, "to", props.index, moment(date).format("YYYY"));
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Description:*:</label>
            <textarea
              placeholder="Description"
              value={props.data.description}
              onChange={(e) => {
                props.handleFormData(props.type, "description", props.index, e);
              }}
            ></textarea>
          </div>
          <div className={commonStyles.formGroup}>
            <label>Institution:*:</label>
            <input
              type="text"
              name="institution"
              value={props.data.institution}
              onChange={(e) => {
                props.handleFormData(props.type, "institution", props.index, e);
              }}
            />
          </div>

          <div className={styles.uploadCerti}>
            {showFile && (
              <a className={styles.viewFile} href={showFile} target="_blank">
                Download Certi
              </a>
            )}
            <button>
              {props.data.certificateFile !== "" ? (
                typeof props.data.certificateFile === "string" ? (
                  <>
                    Upload
                    <i className="fas fa-upload"></i>
                  </>
                ) : (
                  props.data.certificateFile && props.data.certificateFile.name
                )
              ) : (
                <>
                  Upload
                  <i className="fas fa-upload"></i>
                </>
              )}
              <input
                type="file"
                name="certificateFile"
                onChange={(e) => {
                  props.handleFormData(props.type, "certificateFile", props.index, e);
                }}
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CertificateForm;
