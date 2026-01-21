import React, { useEffect } from 'react';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import { useDispatch } from 'react-redux';
import { updateStudentProfile } from "../../../../../store/actions/student/index"
function Password(props) {

    const dispatch = useDispatch()
    const [formValues, setFormValues] = React.useState({
        type: "",
        userid: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateStudentProfile(formValues))

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        let userProfile = JSON.parse(window.localStorage.getItem("profile"));
        setFormValues({ type: "password", userid: userProfile._id })
    }, [])

    return (
        <div className={styles.changePassword}>
            <div>
                <div className={commonStyles.title}>Change Password</div>
                <form onSubmit={handleSubmit}>
                    <div className={commonStyles.formGroup}>
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

                    <div className={commonStyles.submitButtonContainer}>
                        <button type="submit"
                            className={commonStyles.submitButton}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Password;
