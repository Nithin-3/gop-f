import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
const BasicInfo = (props) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = React.useState({ firstName: "", lastName: "", gender: "", dob: "" });
  const [mobileNumber, setMobileNumber] = React.useState("");

  React.useEffect(() => {
    if (props.myDetails) {
      let dobValue = "";
      try {
        if (props.myDetails.dob?.data) {
          dobValue = new Date(props.myDetails.dob.data).toISOString().substr(0, 10);
        }
      } catch (e) {
        console.error("Error parsing DOB:", e);
      }

      setFormValues({
        firstName: props.myDetails?.firstName?.data || "",
        lastName: props.myDetails?.lastName?.data || "",
        gender: props.myDetails?.gender?.data || "",
        dob: dobValue
      });
      setMobileNumber(props.myDetails?.mobileNumber?.data || "");
    }
  }, [props.myDetails]);

  const validateFields = (details) => Object.values(details).every(v => v !== "");

  const handleSubmit = async () => {
    if (!validateFields(formValues)) return toast.warn("All Fields are mandatory.");
    if (!mobileNumber || mobileNumber.length < 10) return toast.warn("Please enter a valid contact number.");

    // Using native browser FormData
    let form = new FormData();
    form.append("type", "BasicInfo");
    form.append("teacherId", props.myDetails?.id);
    form.append("firstName", formValues.firstName);
    form.append("lastName", formValues.lastName);
    form.append("gender", formValues.gender);
    form.append("dob", formValues.dob);
    form.append("mobileNumber", mobileNumber);

    try {
      if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";
      const res = await dispatch(updateTeacherProfile(form));
      if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";

      if (res?.status || res?.success) {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error(res?.message || "Failed to update, please try again");
      }
    } catch (e) {
      console.error("Profile update failed:", e);
      if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
      toast.error("Failed to update, please try again");
    }
    if (props.setApiCalled) props.setApiCalled(false);
  };


  return (
    <div className={styles.basicInfo}>
      <form>
        <div className={commonStyles.formGroup}><label>First Name</label><input name="firstName" value={formValues.firstName} onChange={e => setFormValues({ ...formValues, firstName: e.target.value })} /></div>
        <div className={commonStyles.formGroup}><label>Last Name</label><input name="lastName" value={formValues.lastName} onChange={e => setFormValues({ ...formValues, lastName: e.target.value })} /></div>
        <div className={commonStyles.formGroup}><label>Gender</label><select name="gender" value={formValues.gender} onChange={e => setFormValues({ ...formValues, gender: e.target.value })}><option value="Female">Female</option><option value="Male">Male</option><option value="Other">Other</option></select></div>
        <div className={commonStyles.formGroup}><label>Date of Birth</label><input type="date" name="dob" value={formValues.dob} onChange={e => setFormValues({ ...formValues, dob: e.target.value })} /></div>
        <div className={commonStyles.formGroup}><label>Mobile Number</label><PhoneInput value={mobileNumber} onChange={setMobileNumber} /></div>
      </form>
      <div className={commonStyles.submitButtonContainer}>
        <button className={commonStyles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default BasicInfo;
