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
  const [formValues, setFormValues] = React.useState({
    teacherType: "",
    motherTongue: "",
    fromCountry: "",
    fromState: "",
    currentCountry: "",
    currentState: "",
  });
  const [languageSpeak, setLanguageSpeak] = React.useState([]);
  const [languageTeach, setLanguageTeach] = React.useState([]);

  function addLanguage(value, type) {
    console.log(value);
    if (type === "Speak") {
      if (languageSpeak.includes(languageSpeakRef.current.value) || languageSpeakRef.current.value === "") {
        return;
      }
      setLanguageSpeak([...languageSpeak, languageSpeakRef.current.value]);
    }
    if (type === "Teach") {
      if (languageTeach.includes(languageTeachRef.current.value) || languageTeachRef.current.value === "") {
        return;
      }
      setLanguageTeach([...languageTeach, languageTeachRef.current.value]);
    }
  }

  const deleteLanguage = (type, indexToremove) => {
    if (type === "Speak") {
      setLanguageSpeak(languageSpeak.filter((_, index) => index !== indexToremove));
    }
    if (type === "Teach") {
      setLanguageTeach(languageTeach.filter((_, index) => index !== indexToremove));
    }
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
    props.myDetails &&
      props.myDetails.languageSpeak.forEach((language) => {
        if (!speakTemp.includes(language.data)) {
          speakTemp.push(language.data);
        }
      });
    setLanguageSpeak(speakTemp);

    let teachTemp = [];
    props.myDetails &&
      props.myDetails.languageTeach.forEach((language) => {
        if (!teachTemp.includes(language.data)) {
          teachTemp.push(language.data);
        }
      });
    setLanguageTeach(teachTemp);
  }, [props.myDetails]);

  const validateFields = (details) => {
    let allDetailsFilled = true;

    Object.entries(details).forEach(([key, value]) => {
      if (value === "") {
        allDetailsFilled = false;
      }
    });

    return allDetailsFilled;
  };

  const handleSubmit = async () => {
    // Validate Details
    if (!validateFields(formValues)) {
      toast.warn("All Fields are mandatory.");
      return;
    }

    if (languageSpeak.length === 0 || languageTeach.length === 0) {
      toast.warn("Please add languages");
      return;
    }
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
    // for (var value of form.values()) {
    //   console.log(value);
    // }
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
  return (
    <>
      <div className={styles.languageSkills}>
        {/* <h4 className={commonStyles.title}>Language Skills</h4> */}
        <form>
          <div className={commonStyles.formGroup}>
            <label>Teacher Type*:</label>
            <select
              name="teacherType"
              value={formValues.teacherType}
              onChange={(e) => {
                setFormValues({ ...formValues, [e.target.name]: e.target.value });
              }}
            >
              <option value="Professional Teacher">Professional Teacher</option>
              <option value="Community Teacher">Community Teacher</option>
            </select>
          </div>

          <div className={commonStyles.formGroup}>
            <label>Mother Tongue*:</label>
            <input
              type="text"
              name="motherTongue"
              value={formValues.motherTongue}
              onChange={(e) => {
                setFormValues({ ...formValues, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <h4 className={styles.sectionHeading}>Language Skills:</h4>



          <div className={commonStyles.formGroup}>
            <label>Language Speak*:</label>
            <div className={styles.languageInput}>
              <select name="languageSpeak" ref={languageSpeakRef} onChange={(e) => { addLanguage(e.target.value, "Speak") }}>
                {LANGUAGES.map((language) => {
                  return <option value={language.value}>{language.value}</option>;
                })}
              </select>
              {/* <button
                type="button"
                onClick={() => {
                  addLanguage("Speak");
                }}
              >
                <i className="fas fa-plus"></i>
              </button> */}
            </div>
            <div className={styles.selectedLanguagesContainer}>
              {languageSpeak.map((language, i) => {
                return (
                  <div className={styles.languageChip}>
                    <p>{language}</p>{" "}
                    <i
                      className="fas fa-close"
                      onClick={() => {
                        deleteLanguage("Speak", i);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={commonStyles.formGroup}>
            <label>Language Teach*:</label>
            <div className={styles.languageInput}>
              <select name="languageTeach" ref={languageTeachRef} onChange={(e) => { addLanguage(e.target.value, "Teach") }}>
                {LANGUAGES.map((language) => {
                  return <option value={language.value}>{language.value}</option>;
                })}
              </select>
              {/* <button
                type="button"
                onClick={() => {
                  addLanguage("Teach");
                }}
              >
                <i className="fas fa-plus"></i>
              </button> */}
            </div>
            <div className={styles.selectedLanguagesContainer}>
              {languageTeach.map((language, i) => {
                return (
                  <div className={styles.languageChip}>
                    <p>{language}</p>{" "}
                    <i
                      className="fas fa-close"
                      onClick={() => {
                        deleteLanguage("Teach", i);
                      }}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -----------PLACE---------------- */}
          <h4 className={styles.sectionHeading}>Place:</h4>

          {/* <h5 className={styles.sectionSubHeading}>From</h5> */}
          <div className={commonStyles.formGroup}>
            <label>From Country*:</label>
            <CountryDropdown
              classes="countryFrom"
              defaultOptionLabel="Choose Country"
              blankOptionLabel="Choose Country"
              value={formValues.fromCountry}
              onChange={(val) => setFormValues({ ...formValues, fromCountry: val })}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>From State*:</label>
            <RegionDropdown
              classes="countryFrom"
              blankOptionLabel="Choose State"
              defaultOptionLabel="Choose State"
              country={formValues.fromCountry}
              value={formValues.fromState}
              onChange={(val) => setFormValues({ ...formValues, fromState: val })}
            />
          </div>

          <div className={commonStyles.formGroup}>
            <label>Current Country (Living in)*:</label>
            <CountryDropdown
              classes="countryFrom"
              defaultOptionLabel="Choose Country"
              blankOptionLabel="Choose Country"
              value={formValues.currentCountry}
              onChange={(val) => setFormValues({ ...formValues, currentCountry: val })}
            />
          </div>
          <div className={commonStyles.formGroup}>
            <label>Current State (Living in)*:</label>
            <RegionDropdown
              classes="countryFrom"
              blankOptionLabel="Choose State"
              defaultOptionLabel="Choose State"
              country={formValues.currentCountry}
              value={formValues.currentState}
              onChange={(val) => setFormValues({ ...formValues, currentState: val })}
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
export default LanguageSkills;
