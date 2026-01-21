import React, { useEffect, useRef, useState } from "react";
import Select from "../../../../atoms/select";
import InputField from "../../../../atoms/input";
import "./index.css";
import CreatableSelect from "../../../../atoms/creatableSelect";
import { CountryDropdown } from "react-country-region-selector";
import Datetime from "react-datetime";
import checkMark from "../../../../../assets/icons/check_circle_black_18dp.svg";
import uploadImg from "../../../../../assets/icons/cloud_upload_white_24dp.svg";
import pencilImg from "../../../../../assets/icons/editing.png";
import "react-datetime/css/react-datetime.css";
import { isEmpty } from "lodash";
import moment from "moment";

const InfoForm = (props) => {
  const { formValues, fields, body, setFormValues, setBody } = props;

  const certificateRef = useRef(null);
  const [editTable, setEditTable] = useState(false);
  const [isAddDetails, setIsAddDetails] = useState(false);

  const handleChange = (val, key) => {
    setFormValues({ ...formValues, [key]: val });
  };

  const handleFileInput = (event, key) => {
    if (event.target.files?.length > 0) {
      handleChange(event.target.files[0], key);
    }
  };

  const handleTableEdit = (_, ind) => {
    setEditTable(true);
    setIsAddDetails(false);

    const temp = [...body];
    setFormValues(temp[ind]);
    temp.splice(ind, 1);
    setBody(temp);
  };



  /* ✅ React 18-safe replacement for setState callback */
  useEffect(() => {
    if (isAddDetails) {
      setBody((prev) => [...prev, formValues]);
      setIsAddDetails(false);
    }
  }, [isAddDetails]); // eslint-disable-line

  const renderFields = (item) => {
    if (item.type === "String") {
      return (
        <InputField
          key={item.key}
          onChange={(e) => handleChange(e.target.value, item.key)}
          value={formValues[item.key]}
          placeholder={item.label}
          className={`infoInput ${item.key}`}
        />
      );
    }

    if (item.type === "Date") {
      return (
        <Datetime
          key={item.key}
          dateFormat="YYYY"
          className={`infoInput ${item.type}`}
          value={formValues[item.key]}
          inputProps={{ placeholder: item.label }}
          timeFormat={false}
          closeOnSelect
          onChange={(date) =>
            handleChange(moment(date).format("YYYY"), item.key)
          }
        />
      );
    }

    if (item.type === "file") {
      return (
        <div key={item.key} className="certificateDiv">
          <button
            type="button"
            onClick={() => certificateRef.current?.click()}
            className="uploadCertificate"
            style={{ backgroundColor: formValues[item.key] ? "#5fd65b" : "" }}
          >
            {formValues[item.key] ? (
              <div className="uploadCertificateLabel">
                <h2>Certificate Uploaded</h2>
                <img src={checkMark} alt="uploaded" />
              </div>
            ) : (
              <div className="uploadCertificateLabel">
                <h2>Upload Certificate</h2>
                <img src={uploadImg} alt="upload" />
              </div>
            )}
          </button>

          <input
            ref={certificateRef}
            type="file"
            hidden
            onChange={(e) => handleFileInput(e, item.key)}
          />
        </div>
      );
    }

    if (item.type === "Select") {
      if (item.key === "title") {
        return (
          <CreatableSelect
            key={item.key}
            className="infoInputSelect"
            classNamePrefix="select"
            onChange={(val) => handleChange(val.value, item.key)}
            value={
              formValues[item.key]
                ? { value: formValues[item.key], label: formValues[item.key] }
                : null
            }
            placeholder={item.label}
            options={item.options}
          />
        );
      }

      if (item.key === "locations") {
        return (
          <CountryDropdown
            key={item.key}
            classes="infoInputSelectLocation"
            defaultOptionLabel={item.label}
            value={formValues[item.key]}
            onChange={(val) => handleChange(val, item.key)}
          />
        );
      }

      return (
        <Select
          key={item.key}
          className="infoInputSelect"
          onChange={(val) => handleChange(val.value, item.key)}
          value={
            formValues[item.key]
              ? { value: formValues[item.key], label: formValues[item.key] }
              : null
          }
          placeholder={item.label}
          options={item.options}
        />
      );
    }

    return null;
  };

  const renderTable = () => (
    <table className="table">
      <thead>
        <tr>
          {fields.map(
            (header) =>
              header.key !== "certificate_data" &&
              header.key !== "description" && (
                <th key={header.key}>{header.label}</th>
              )
          )}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {body.map((row, ind) => (
          <tr key={ind}>
            {fields.map(
              (col) =>
                col.key !== "certificate_data" &&
                col.key !== "description" && (
                  <td key={col.key}>{row[col.key]}</td>
                )
            )}
            <td>
              <img
                src={pencilImg}
                alt="edit"
                onClick={(e) => handleTableEdit(e, ind)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="infoContainer">
      {!isEmpty(body) && <div className="infoTableDiv">{renderTable()}</div>}
      {(editTable || isEmpty(body)) && (
        <div className="infoFormContainer">
          {fields.map((item) => renderFields(item))}
        </div>
      )}
    </div>
  );
};

export default InfoForm;
