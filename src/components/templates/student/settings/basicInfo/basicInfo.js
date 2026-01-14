import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";
import { updateStudentProfile } from "../../../../../store/actions/student";

const BasicInfo = ({ myDetails }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = React.useState({ firstName: "", lastName: "", gender: "", dob: "", fromCountry: "" });
  const [mobileNumber, setMobileNumber] = React.useState("");

  React.useEffect(() => {
    if (!myDetails) return;
    setFormValues({
      firstName: myDetails.firstName || "",
      lastName: myDetails.lastName || "",
      gender: myDetails.gender || "",
      dob: myDetails.dob ? new Date(myDetails.dob).toISOString().slice(0, 10) : "",
      fromCountry: myDetails.fromCountry || "",
    });
    setMobileNumber(myDetails.mobileNumber || "");
  }, [myDetails]);

  const validateFields = v => Object.values(v).every(x => x !== "");

  const handleSubmit = async () => {
    if (!validateFields(formValues)) return toast.warn("All fields are mandatory");
    if (!mobileNumber || mobileNumber.length < 10) return toast.warn("Enter valid mobile number");
    const form = new FormData();
    form.append("type", "BasicInfo");
    form.append("studentId", myDetails?.id);
    Object.entries(formValues).forEach(([k, v]) => form.append(k, v));
    form.append("mobileNumber", mobileNumber);
    try {
      document.getElementById("loader")?.style && (document.getElementById("loader").style.display = "flex");
      const res = await dispatch(updateStudentProfile(form));
      document.getElementById("loader")?.style && (document.getElementById("loader").style.display = "none");
      res?.status ? toast.success("Profile Updated Successfully") : toast.error("Update failed");
    } catch (e) {
      console.error("Profile Update failed:", e);
      toast.error("Update failed");
    }
  };

  return (
    <div className={styles.basicInfo}>
      <h4 className={commonStyles.title}>Basic Info</h4>
      <div className={commonStyles.formGroup}><label>First Name</label><input name="firstName" value={formValues.firstName} onChange={e => setFormValues({ ...formValues, firstName: e.target.value })} /></div>
      <div className={commonStyles.formGroup}><label>Last Name</label><input name="lastName" value={formValues.lastName} onChange={e => setFormValues({ ...formValues, lastName: e.target.value })} /></div>
      <div className={commonStyles.formGroup}><label>Gender</label><select value={formValues.gender} onChange={e => setFormValues({ ...formValues, gender: e.target.value })}><option value="">Select</option><option>Female</option><option>Male</option><option>Other</option></select></div>
      <div className={commonStyles.formGroup}><label>Date of Birth</label><input type="date" value={formValues.dob} onChange={e => setFormValues({ ...formValues, dob: e.target.value })} /></div>
      <div className={commonStyles.formGroup}><label>Mobile Number</label><PhoneInput value={mobileNumber} onChange={setMobileNumber} /></div>
      <div className={commonStyles.formGroup}><label>From Country</label><CountryDropdown value={formValues.fromCountry} onChange={v => setFormValues({ ...formValues, fromCountry: v })} /></div>
      <div className={commonStyles.submitButtonContainer}><button className={commonStyles.submitButton} onClick={handleSubmit}>Submit</button></div>
    </div>
  );
};

export default BasicInfo;
