import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
let FormData = require("form-data");

const SelfIntro = (props) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = React.useState({
    teacherProfilePic: "",
    videoURL: "",
    selfIntro: "",
  });
  const [imgUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    setFormValues({
      teacherProfilePic: props.myDetails ? props.myDetails.teacherProfilePic.data : "",
      // videoURL: props.myDetails ? props.myDetails.videoURL.data.replace("&", "?").replace("watch?v=", "embed/") : "",
      videoURL: props.myDetails ? props.myDetails.videoURL.data.replace("youtu.be", "www.youtube.com/embed") : "",
      selfIntro: props.myDetails ? props.myDetails.selfIntro.data : "",
    });
    setImageUrl(props.myDetails ? props.myDetails.teacherProfilePic.data : "");
  }, [props.myDetails]);

  const handleFileInput = (e) => {
    console.log(e);
    if (e.target.files.length > 0) {

      var fileName = e.target.files[0].name;
      var ext = fileName.split('.').pop();
      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        toast.success('Profile Pic Uploaded');
        setFormValues({ ...formValues, [e.target.name]: e.target.files[0] })

      }
      else {
        toast.error('Image Type not supported');
      }

    }
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async () => {
    // Validate Details
    if (formValues.videoURL === "" || formValues.selfIntro === "" || formValues.teacherProfilePic === "") {
      toast.warn("All Fields are mandatory.");
      return;
    }

    let form = new FormData();
    form.append("type", "selfIntro");
    form.append("teacherId", props.myDetails.id);
    form.append("teacherProfilePic", formValues.teacherProfilePic);
    form.append("videoURL", formValues.videoURL);
    form.append("selfIntro", formValues.selfIntro);

    try {
      // Show Loader
      document.getElementById("loader").style.display = "flex";
      const result = await dispatch(updateTeacherProfile(form));
      // Hide Loader
      document.getElementById("loader").style.display = "none";
      // console.log(result, "Result");
      if (result.status) {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error("Faild to update, please try again");
      }
    } catch (e) {
      console.log(e);
      toast.error("Faild to update, please try again");
    }
    props.setApiCalled(false);

  };
  console.log(formValues)
  return (
    <>
      <div className={styles.selfIntro}>
        {/* <h4 className={commonStyles.title}>Self Intro</h4> */}

        <div className={styles.profilePicContainer}>
          <p>Profile Photo*:</p>
          {imgUrl ?
            <img src={imgUrl} alt="teacher_img" style={{ width: '150px', height: '150px', borderRadius: '50%', border: '3px solid grey' }} />
            :
            <i class="fas fa-user-circle fa-9x" style={{ width: '150px', height: '150px', borderRadius: '50%' }}></i>
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
          {formValues.videoURL &&
            <iframe width="200" height="150" src={"https://www.youtube.com/embed/3sWhDGq4Sss"} style={{ borderRadius: '10px', margin: '0 auto', marginTop: '10px' }} >
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

export default SelfIntro;
