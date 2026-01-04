import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { toast } from "react-toastify";
import professor from "../../../../../assets/icons/professor_icon.svg";
import { useDispatch } from "react-redux";
import { updateStudentProfile } from "../../../../../store/actions/student";

const ProfilePic = ({ myDetails }) => {
  const dispatch = useDispatch();
  const [preview, setPreview] = React.useState(professor);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    if (myDetails?.profilePic) setPreview(myDetails.profilePic);
  }, [myDetails]);

  const handleFileInput = e => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const ext = selected.name.split(".").pop().toLowerCase();
    if (!["png", "jpg", "jpeg"].includes(ext)) {
      toast.error("Image type not supported");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.warn("Please upload an image");
      return;
    }
    const form = new FormData();
    form.append("type", "profilePic");
    form.append("studentId", myDetails.id);
    form.append("profilePic", file);
    try {
      const res = await dispatch(updateStudentProfile(form));
      res?.status ? toast.success("Profile Pic Uploaded") : toast.error("Upload failed");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <>
      <div className={styles.title}>Profile Pic</div>
      <div className={styles.profilePicContainer}>
        <img src={preview} alt="profile" />
        <button style={{ cursor: "pointer" }}>
          Upload &nbsp;<i className="fas fa-upload"></i>
          <input type="file" accept="image/*" onChange={handleFileInput} />
        </button>
      </div>

      <div className={styles.guidelines}>
        <p>Guidelines</p>
        <div><i className="fas fa-check-circle" style={{ color: "green" }} /> Make a strong first impression</div>
        <div><i className="fas fa-check-circle" style={{ color: "green" }} /> Use a clear and professional photo</div>
        <div><i className="fas fa-times-circle" style={{ color: "red" }} /> Do not impersonate others</div>
      </div>

      <div className={commonStyles.submitButtonContainer}>
        <button className={commonStyles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default ProfilePic;
