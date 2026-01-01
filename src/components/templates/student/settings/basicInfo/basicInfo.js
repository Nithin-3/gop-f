import React from 'react';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';
// import DatePicker from "../../../../atoms/datepicker";
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { updateStudentProfile } from '../../../../../store/actions/student';
let FormData = require('form-data');

const BasicInfo = props => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    fromCountry: '',
    mobileNumber: '',
  });
  const [mobileNumber, setMobileNumber] = React.useState('');

  React.useEffect(() => {
    setFormValues({
      firstName: props.myDetails.firstName ? props.myDetails.firstName : '',
      lastName: props.myDetails.lastName ? props.myDetails.lastName : '',
      gender: props.myDetails.gender ? props.myDetails.gender : '',
      dob: props.myDetails.dob
        ? new Date(props.myDetails.dob).toISOString().substr(0, 10)
        : '',
      // mobileNumber: props.myDetails ? props.myDetails.mobileNumber.data : "",
    });
    setMobileNumber(
      props.myDetails.mobileNumber ? props.myDetails.mobileNumber : ''
    );
  }, [props.myDetails]);

  const validateFields = details => {
    console.log(details);
    let allDetailsFilled = true;

    Object.entries(details).forEach(([key, value]) => {
      if (value === '') {
        allDetailsFilled = false;
      }
    });

    return allDetailsFilled;
  };

  const handleSubmit = async () => {
    // Validate Details
    if (!validateFields(formValues)) {
      toast.warn('All Fields are mandatory.');
      return;
    }
    if (mobileNumber.length < 12) {
      toast.warn('Please enter a valid contact, with country code');
      return;
    }

    let form = new FormData();
    form.append('type', 'BasicInfo');
    form.append('teacherId', props.myDetails.id);
    form.append('firstName', formValues.firstName);
    form.append('lastName', formValues.lastName);
    form.append('gender', formValues.gender);
    form.append('dob', formValues.dob);
    form.append('mobileNumber', mobileNumber);
    form.append('fromCountry', formValues.fromCountry);

    try {
      // Show Loader
      document.getElementById('loader').style.display = 'flex';
      const result = await dispatch(updateStudentProfile(form));
      // Hide Loader
      document.getElementById('loader').style.display = 'none';
      // console.log(result, "Result");
      if (result.status) {
        toast.success('Profile Updated Successfully');
      } else {
        toast.error('Faild to update, please try again');
      }
    } catch (e) {
      console.log(e);
      toast.error('Faild to update, please try again');
    }
  };

  return (
    <>
      <div className={styles.basicInfo}>
        <h4 className={commonStyles.title}>Basic Info</h4>
        <form>
          <div className={commonStyles.formGroup}>
            <label>First Name</label>
            <input
              type='text'
              name='firstName'
              value={formValues.firstName}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={formValues.lastName}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Gender</label>
            <select
              value={formValues.gender}
              name='gender'
              onChange={e => {
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
              }}
            >
              <option value="">Select Gender</option>
              <option value='Female'>Female</option>
              <option value='Male'>Male</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className={commonStyles.formGroup}>
            <label>Date of Birth</label>
            <input
              type='date'
              name='dob'
              value={formValues.dob}
              onChange={e => {
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Mobile Number</label>
            <PhoneInput value={mobileNumber} onChange={setMobileNumber} />
          </div>
          <div className={commonStyles.formGroup}>
            <label>From Country*:</label>
            <CountryDropdown
              classes='countryFrom'
              defaultOptionLabel='Choose Country'
              blankOptionLabel='Choose Country'
              value={formValues.fromCountry}
              onChange={val =>
                setFormValues({ ...formValues, fromCountry: val })
              }
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
export default BasicInfo;
