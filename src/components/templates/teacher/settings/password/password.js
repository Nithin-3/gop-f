import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { toast } from "react-toastify";
import { changePassword } from "../../../../../store/actions/main/authAction";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = React.useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleSubmit = async () => {
        if (formValues.oldPassword === "" || formValues.newPassword === "" || formValues.confirmNewPassword === "") {
            return toast.warn("All fields are required");
        } else if (formValues.newPassword.length < 8) {
            return toast.warn("Atleast 8 letters required");
        } else if (formValues.newPassword !== formValues.confirmNewPassword) {
            return toast.warn("New password and confirm password dont match");
        }

        let body = {
            oldPassword: formValues.oldPassword,
            newPassword: formValues.newPassword,
            confirmNewPassword: formValues.confirmNewPassword,
        };

        try {
            // Show Loader
            document.getElementById("loader").style.display = "flex";
            const result = await dispatch(changePassword(body));
            // Hide Loader
            document.getElementById("loader").style.display = "none";
            if (result.status) {
                toast.success("Password Updated Successfully");
                setFormValues({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
            } else {
                toast.error(result && result.message);
            }
        } catch (e) {
            console.error(e);
            toast.error("Faild to update, please try again");
        }
    };
    return (
        <>
            <div className={styles.changePassword}>
                {/* <h4 className={commonStyles.t itle}>Change Password</h4> */}
                <form>
                    <div className={commonStyles.formGroup + " " + styles.oldPasswordGroup}>
                        <label>Old Password*:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={formValues.oldPassword}
                            onChange={(e) => {
                                setFormValues({ ...formValues, [e.target.name]: e.target.value });
                            }}
                        />
                    </div>
                    <div className={commonStyles.formGroup}>
                        <label>New Password*:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formValues.newPassword}
                            onChange={(e) => {
                                setFormValues({ ...formValues, [e.target.name]: e.target.value });
                            }}
                        />
                    </div>
                    <div className={commonStyles.formGroup}>
                        <label>Confirm New Password*:</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={formValues.confirmNewPassword}
                            onChange={(e) => {
                                setFormValues({ ...formValues, [e.target.name]: e.target.value });
                            }}
                        />
                    </div>
                </form>
                <div className={commonStyles.submitButtonContainer}>
                    <button
                        className={commonStyles.submitButton}
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
