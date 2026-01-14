import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
const SelfIntro = (props) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = React.useState({
        teacherProfilePic: "",
        videoURL: "",
        selfIntro: "",
    });
    const [imgUrl, setImageUrl] = React.useState("");

    React.useEffect(() => {
        if (props.myDetails) {
            setFormValues({
                teacherProfilePic: props.myDetails.teacherProfilePic?.data || "",
                videoURL: props.myDetails.videoURL?.data || "",
                selfIntro: props.myDetails.selfIntro?.data || "",
            });
            setImageUrl(props.myDetails.teacherProfilePic?.data || "");
        }
    }, [props.myDetails]);

    const handleFileInput = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const ext = file.name.split('.').pop().toLowerCase();
            if (["png", "jpg", "jpeg"].includes(ext)) {
                toast.success('Profile Pic Selected');
                setFormValues(prev => ({ ...prev, [e.target.name]: file }));
                setImageUrl(URL.createObjectURL(file));
            } else {
                toast.error('Image Type not supported');
            }
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return "";
        let videoId = "";
        if (url.includes("v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("embed/")) {
            videoId = url.split("embed/")[1].split("?")[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    };

    const handleSubmit = async () => {
        if (formValues.videoURL === "" || formValues.selfIntro === "" || formValues.teacherProfilePic === "") {
            return toast.warn("All Fields are mandatory.");
        }

        // Using native browser FormData
        let form = new FormData();
        form.append("type", "selfIntro");
        form.append("teacherId", props.myDetails?.id);
        form.append("teacherProfilePic", formValues.teacherProfilePic);
        form.append("videoURL", formValues.videoURL);
        form.append("selfIntro", formValues.selfIntro);

        try {
            if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";
            const result = await dispatch(updateTeacherProfile(form));
            if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";

            if (result?.status || result?.success) {
                toast.success("Profile Updated Successfully");
            } else {
                toast.error(result?.message || "Failed to update, please try again");
            }
        } catch (e) {
            console.error("Self intro update failed:", e);
            if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
            toast.error("Failed to update, please try again");
        }
        if (props.setApiCalled) props.setApiCalled(false);
    };

    return (
        <>
            <div className={styles.selfIntro}>
                {/* <h4 className={commonStyles.title}>Self Intro</h4> */}

                <div className={styles.profilePicContainer}>
                    <p>Profile Photo*:</p>
                    {imgUrl ?
                        <img src={imgUrl} alt="teacher_img" style={{ width: '150px', height: '150px', borderRadius: '50%', border: '3px solid grey' }} />
                        :
                        <i className="fas fa-user-circle fa-9x" style={{ width: '150px', height: '150px', borderRadius: '50%' }}></i>

                    }
                    <button>
                        Upload <i className="fas fa-upload"></i>
                        <input
                            type="file"
                            name="teacherProfilePic"
                            onChange={(e) => {
                                handleFileInput(e);
                            }}
                        />
                    </button>
                </div>

                <div className={commonStyles.formGroup}>
                    <p>Intro video link*:</p>
                    <input
                        type="text"
                        name="videoURL"
                        placeholder="https://www.youtube.com/watch?_____"
                        value={formValues.videoURL}
                        onChange={(e) => {
                            setFormValues({ ...formValues, [e.target.name]: e.target.value });
                        }}
                    />
                    {getEmbedUrl(formValues.videoURL) &&
                        <iframe title="Self Introduction Video" width="200" height="150" src={getEmbedUrl(formValues.videoURL)} style={{ borderRadius: '10px', margin: '0 auto', marginTop: '10px' }} >
                        </iframe>
                    }
                </div>
                <div className={commonStyles.formGroup}>
                    <p>Introduce yourself*:</p>
                    <textarea
                        placeholder="Write a few words about you..."
                        value={formValues.selfIntro}
                        name="selfIntro"
                        onChange={(e) => {
                            setFormValues({ ...formValues, [e.target.name]: e.target.value });
                        }}
                        rows='5'
                    ></textarea>
                </div>

                <div className={commonStyles.submitButtonContainer}>
                    <button
                        className={commonStyles.submitButton}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};


export default SelfIntro;
