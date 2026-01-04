import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { LANGUAGES } from "../../../../../utils/constants";
import { useDispatch } from "react-redux";
import { updateTeacherProfile } from "../../../../../store/actions/teacher";
import { toast } from "react-toastify";
let FormData = require("form-data");

const LanguageSkills = (props) => {
  const dispatch = useDispatch();
  const languageSpeakRef = React.useRef();
  const languageTeachRef = React.useRef();
  const [formValues, setFormValues] = React.useState({ teacherType: "", motherTongue: "", fromCountry: "", fromState: "", currentCountry: "", currentState: "" });
  const [languageSpeak, setLanguageSpeak] = React.useState([]);
  const [languageTeach, setLanguageTeach] = React.useState([]);

  function addLanguage(value, type) {
    if (type === "Speak") {
      if (languageSpeak.includes(languageSpeakRef.current.value) || languageSpeakRef.current.value === "") return;
      setLanguageSpeak([...languageSpeak, languageSpeakRef.current.value]);
    }
    if (type === "Teach") {
      if (languageTeach.includes(languageTeachRef.current.value) || languageTeachRef.current.value === "") return;
      setLanguageTeach([...languageTeach, languageTeachRef.current.value]);
    }
  }

  const deleteLanguage = (type, indexToremove) => {
    if (type === "Speak") setLanguageSpeak(languageSpeak.filter((_, index) => index !== indexToremove));
    if (type === "Teach") setLanguageTeach(languageTeach.filter((_, index) => index !== indexToremove));
  };

  React.useEffect(() => {
    setFormValues({
      teacherType: props.myDetails ? props.myDetails.teacherType.data : "",
      motherTongue: props.myDetails ? props.myDetails.motherTongue.data : "",
      fromCountry: props.myDetails ? props.myDetails.fromCountry.data : "",
      fromState: props.myDetails ? props.myDetails.fromState.data : "",
      currentCountry: props.myDetails ? props.myDetails.currentCountry.data : "",
      currentState: props.myDetails ? props.myDetails.currentState.data : "",
    });

    let speakTemp = [];
    props.myDetails && props.myDetails.languageSpeak.forEach(l => { if (!speakTemp.includes(l.data)) speakTemp.push(l.data); });
    setLanguageSpeak(speakTemp);

    let teachTemp = [];
    props.myDetails && props.myDetails.languageTeach.forEach(l => { if (!teachTemp.includes(l.data)) teachTemp.push(l.data); });
    setLanguageTeach(teachTemp);
  }, [props.myDetails]);

  const validateFields = (details) => Object.values(details).every(v => v !== "");

  const handleSubmit = async () => {
    if (!validateFields(formValues)) return toast.warn("All Fields are mandatory.");
    if (!languageSpeak.length || !languageTeach.length) return toast.warn("Please add languages");
    let form = new FormData();
    form.append("type", "languageSkill");
    form.append("teacherId", props.myDetails.id);
    form.append("teacherType", formValues.teacherType);
    form.append("motherTongue", formValues.motherTongue);
    form.append("fromCountry", formValues.fromCountry);
    form.append("fromState", formValues.fromState);
    form.append("currentCountry", formValues.currentCountry);
    form.append("currentState", formValues.currentState);
    form.append("languageSpeak", JSON.stringify(languageSpeak));
    form.append("languageTeach", JSON.stringify(languageTeach));
    try {
      document.getElementById("loader").style.display = "flex";
      const result = await dispatch(updateTeacherProfile(form));
      document.getElementById("loader").style.display = "none";
      result.status ? toast.success("Profile Updated Successfully") : toast.error("Faild to update, please try again");
    } catch (e) {
      toast.error("Faild to update, please try again");
    }
    props.setApiCalled(false);
  };

  return (
    <div className={styles.languageSkills}>
      <form>
        <div className={commonStyles.formGroup}>
          <label>Teacher Type*:</label>
          <select name="teacherType" value={formValues.teacherType} onChange={e => setFormValues({ ...formValues, [e.target.name]: e.target.value })}>
            <option value="Professional Teacher">Professional Teacher</option>
            <option value="Community Teacher">Community Teacher</option>
          </select>
        </div>

        <div className={commonStyles.formGroup}>
          <label>Mother Tongue*:</label>
          <input type="text" name="motherTongue" value={formValues.motherTongue} onChange={e => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
        </div>

        <h4 className={styles.sectionHeading}>Language Skills:</h4>

        <div className={commonStyles.formGroup}>
          <label>Language Speak*:</label>
          <div className={styles.languageInput}>
            <select ref={languageSpeakRef} onChange={e => addLanguage(e.target.value, "Speak")}>
              {LANGUAGES.map(l => <option value={l.value}>{l.value}</option>)}
            </select>
          </div>
          <div className={styles.selectedLanguagesContainer}>
            {languageSpeak.map((l, i) => (
              <div className={styles.languageChip}>
                <p>{l}</p>
                <i className="fas fa-close" onClick={() => deleteLanguage("Speak", i)}></i>
              </div>
            ))}
          </div>
        </div>

        <div className={commonStyles.formGroup}>
          <label>Language Teach*:</label>
          <div className={styles.languageInput}>
            <select ref={languageTeachRef} onChange={e => addLanguage(e.target.value, "Teach")}>
              {LANGUAGES.map(l => <option value={l.value}>{l.value}</option>)}
            </select>
          </div>
          <div className={styles.selectedLanguagesContainer}>
            {languageTeach.map((l, i) => (
              <div className={styles.languageChip}>
                <p>{l}</p>
                <i className="fas fa-close" onClick={() => deleteLanguage("Teach", i)}></i>
              </div>
            ))}
          </div>
        </div>

        <h4 className={styles.sectionHeading}>Place:</h4>

        <div className={commonStyles.formGroup}>
          <label>From Country*:</label>
          <CountryDropdown value={formValues.fromCountry} onChange={val => setFormValues({ ...formValues, fromCountry: val })} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>From State*:</label>
          <RegionDropdown country={formValues.fromCountry} value={formValues.fromState} onChange={val => setFormValues({ ...formValues, fromState: val })} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>Current Country*:</label>
          <CountryDropdown value={formValues.currentCountry} onChange={val => setFormValues({ ...formValues, currentCountry: val })} />
        </div>

        <div className={commonStyles.formGroup}>
          <label>Current State*:</label>
          <RegionDropdown country={formValues.currentCountry} value={formValues.currentState} onChange={val => setFormValues({ ...formValues, currentState: val })} />
        </div>
      </form>

      <div className={commonStyles.submitButtonContainer}>
        <button className={commonStyles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default LanguageSkills;
