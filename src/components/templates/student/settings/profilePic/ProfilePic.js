import React from 'react';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
import { toast } from "react-toastify";
import professor from '../../../../../assets/icons/professor_icon.svg';
import { useDispatch } from 'react-redux';
import { updateStudentProfile } from '../../../../../store/actions/student';
let FormData = require("form-data")

function ProfilePic(props) {
  const [imgUrl, setImageUrl] = React.useState('');
  const [formValues, setFormValues] = React.useState({
    profilePic: professor,
  });
  const dispatch = useDispatch()

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {

      var fileName = e.target.files[0].name;
      var ext = fileName.split('.').pop();
      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        setFormValues({ ...formValues, [e.target.name]: e.target.files[0] })
        console.log(e.target.files[0]);
      }
      else {
        toast.error('Image Type not supported');
      }
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    if (formValues.profilePic === "") {
      toast.warn("All Fields are mandatory.");
      return;
    }

    let form = new FormData();
    form.append("type", "profilePic");
    form.append("studentId", props.myDetails.id);
    form.append("profilePic", formValues.profilePic);
    try {
      const res = await dispatch(updateStudentProfile(form))
      toast.success('Profile Pic Uploaded');
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(imgUrl)
  React.useEffect(() => {
    setFormValues({
      profilePic: props.myDetails ? props.myDetails?.profilePic?.data: "",
    });
    setImageUrl(props.myDetails.profilePic);
  }, [props.myDetails]);

  return (
    <>
      <div className={styles.title}>Profile Pic</div>
      <div className={styles.profilePicContainer}>
        <img src={imgUrl ? typeof imgUrl === "object" ? imgUrl.data : imgUrl : professor} alt='' />
        <button style={{cursor: "pointer"}}>
          Upload &nbsp; <i className='fas fa-upload'></i>
          <input
            type='file'
            name='profilePic'
            onChange={e => {
              handleFileInput(e);
            }}
          />
        </button>
      </div>
      <div>
        <div className={styles.guidelines}>
          <p>Guidelines</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div>
              <i style={{ color: 'green' }} class='fas fa-check-circle'></i>
            </div>
            <div>
              Make a strong first impression with a good profile picture
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div>
              <i style={{ color: 'green' }} class='fas fa-check-circle'></i>
            </div>
            <div>
              Make sure your picture is clear, professional, and personal
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <div>
              <i style={{ color: 'red' }} class='fas fa-times-circle'></i>
            </div>
            <div>Do not impersonate others</div>
          </div>
        </div>
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
    </>
  );
}

export default ProfilePic;
