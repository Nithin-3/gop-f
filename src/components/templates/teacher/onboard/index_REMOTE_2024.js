import SideNav from "./SideNav";
import React, { useEffect, useRef, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import ReactPlayer from "react-player";
import { get, isEmpty } from "lodash";
import FormButton from "../../../atoms/button";
import rightIcon from "../../../../assets/icons/TriangleArrow-White-Right.svg.png";
import checkMark from "../../../../assets/icons/check_circle_black_18dp.svg";
import leftIcon from "../../../../assets/icons/white_triangle_left.svg.png";
import girlIcon from "../../../../assets/icons/girl_icon.svg";
import boyIcon from "../../../../assets/icons/boy_icon.svg";
import teacherTypeImg from "../../../../assets/images/teacher_type.png";
import InputField from "../../../atoms/input";
import DatePicker from "../../../atoms/datepicker";
import CreatableSelect from "../../../atoms/creatableSelect";
import { getTeacherOnboardData } from "../../../../store/actions/teacherOnboard/teacherOnboardAction";
import { useDispatch, useSelector } from "react-redux";
import InfoForm from "./info";
import "./styles.css";
import "react-phone-number-input/style.css";
import { LANGUAGES } from "../../../../utils/constants";
import { toast } from "react-toastify";
import { formOnboardPayload } from "./utli";

const defaultFormValues = {
  title: "",
  institute: "",
  locations: "",
  description: "",
  from: "",
  to: "",
  certificate_data: undefined,
};

const defaultFormFields = [
  {
    key: "title",
    label: "Title",
    type: "Select",
  },
  {
    key: "institute",
    label: "Institute",
    type: "String",
  },
  {
    key: "locations",
    label: "Locations",
    type: "Select",
  },
  {
    key: "description",
    label: "Description",
    type: "String",
  },
  {
    key: "from",
    label: "Start (Year)",
    type: "Date",
  },
  {
    key: "to",
    label: "End (Year)",
    type: "Date",
  },
  {
    key: "certificate_data",
    label: "Upload Certificate",
    type: "file",
  },
];

function Onboard() {
  const [pageNumber, setPageNumber] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [teacherType, setTeacherType] = useState("");
  const [dob, setDob] = useState(new Date());
  const [addSpeakLng, setAddSpeakLng] = useState(true);
  const [addTeachLng, setAddTeachLng] = useState(true);
  const [languageSpeak, setLanguageSpeak] = useState([]);
  const [languageTeach, setLanguageTeach] = useState([]);
  const [fromCountry, setFromCountry] = useState("");
  const [fromState, setFromState] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [mobileNumber, setMobileNumber] = useState();
  const [videoURL, setVideoURL] = useState();
  const profilePicRef = useRef();
  const [selfIntro, setSelfIntro] = useState("");
  const [teacherProfilePic, setTeacherProfilePic] = useState();
  const [motherTongue, setMotherTongue] = useState("");
  const [educationFormValues, setEducationFormValues] = useState(defaultFormValues);
  const [educationFormData, setEducationFormData] = useState([]);
  const [teachingFormValues, setTeachingFormValues] = useState(defaultFormValues);
  const [teachingFormData, setTeachingFormData] = useState([]);
  const [certificateFormValues, setCertificateFormValues] = useState(defaultFormValues);
  const [certificateFormData, setCertificateFormData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [languageOption, setLanguageOption] = useState(LANGUAGES);
  const onBoardData = useSelector((state) => get(state, "teacherOnboardReducer", {}));
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth && state.auth.authData && state.auth.authData._id);

  const SUB_FORMS = {
    0: "What is your name?",
    1: "What is your gender?",
    2: "When were you born?",
    3: "What's your mobile number?",
    4: "What describes you best?",
    5: "What are your Language Skills?",
    6: "Where are you from?",
    7: "Introduce yourself in few words",
    8: "Upload your profile picture",
    9: "Self Intro Video",
    10: "Fill your education details",
    11: "Tell us your teaching experience",
    12: "Tell us your certificate courses",
  };
  const payload = {
    0: "firstlastname",
    1: "gender",
    2: "dob",
    3: "number",
    4: "type",
    5: "language",
    6: "from",
    7: "intro",
    8: "pic",
    9: "video",
    10: "education",
    11: "work",
    12: "courses",
  };

  useEffect(() => {
    if (!isEmpty(onBoardData)) {
      setFirstName(get(onBoardData, "firstName", ""));
      setLastName(get(onBoardData, "lastName", ""));
      setGender(get(onBoardData, "gender", ""));
      setTeacherType(get(onBoardData, "teacherType", ""));
      setDob(new Date(get(onBoardData, "dob", "")));
      setLanguageSpeak(get(onBoardData, "languageSpeak.body", []));
      setLanguageTeach(get(onBoardData, "languageTeaches.body", []));
      setFromCountry(get(onBoardData, "region.fromCountry", ""));
      setFromState(get(onBoardData, "region.fromState", ""));
      setCurrentCountry(get(onBoardData, "region.currentCountry", ""));
      setCurrentState(get(onBoardData, "region.currentState", ""));
      setMobileNumber(get(onBoardData, "mobileNumber", ""));
      setVideoURL(get(onBoardData, "videoURL", ""));
      setSelfIntro(get(onBoardData, "selfIntro", ""));
      setTeacherProfilePic(get(onBoardData, "teacherProfilePic", null));
      setMotherTongue(get(onBoardData, "motherTongue", ""));
      setLanguageOption(get(onBoardData, "languageSpeak.options", []));
    }
  }, [onBoardData]);

  useEffect(() => {
    if (pageNumber === 10) {
      //education
      setFormFields(get(onBoardData, "educationDetails.fields", defaultFormFields)); //fields
      setEducationFormData(get(onBoardData, "educationDetails.body", [])); //body
    }
    if (pageNumber === 11) {
      //work
      setFormFields(get(onBoardData, "workExperience.fields", defaultFormFields));
      setTeachingFormData(get(onBoardData, "workExperience.body", []));
    }
    if (pageNumber === 12) {
      //courses
      setFormFields(get(onBoardData, "certificateCourses.fields", defaultFormFields));
      setCertificateFormData(get(onBoardData, "certificateCourses.body", []));
    }
  }, [pageNumber]);


  const verifyFields = (pageNumber) => {
    return new Promise((resolve, reject) => {
      // return resolve()
      switch (pageNumber) {
        case 0:
          if (firstName === "" || lastName === "") {
            reject("Fields are required");
          } else {
            resolve();
          }
          break;
        case 1:
          if (gender === "") {
            reject("Please choose a gender");
          } else {
            resolve();
          }
          break;
        case 2:
          if (dob.getDate() === new Date().getDate()) {
            reject("Please choose your DOB");
          } else {
            resolve();
          }
          break;
        case 3:
          if (mobileNumber === undefined || mobileNumber.length <= 11) {
            reject("Please enter a valid contact");
          } else {
            resolve();
          }
          break;
        case 4:
          if (teacherType === "") {
            reject("Please choose one of the following");
          } else {
            resolve();
          }
          break;
        case 5:
          if (motherTongue === "") {
            reject("Please enter your mother tongue");
          } else if (languageSpeak.length === 0) {
            reject("Enter the languages you speak");
          } else if (languageTeach.length === 0) {
            reject("Enter the languages you teach");
          } else {
            resolve();
          }
          break;
        case 6:
          if (fromCountry === "" || fromState === "" || currentCountry === "" || currentState === "") {
            reject("Please fill the follwing fields");
          } else {
            resolve();
          }
          break;
        case 7:
          if (selfIntro === "") {
            reject("Please write a few words about yourself");
          } else {
            resolve();
          }
          break;
        case 8:
          if (!teacherProfilePic) {
            reject("Please upload a picture");
          } else {
            resolve();
          }
          break;
        case 9:
          if (!videoURL) {
            reject("Please share a video url");
          } else {
            resolve();
          }
          break;
        case 10:
          if (Object.values(educationFormValues).some((x) => x === "" || x === undefined)) {
            reject("Please fill the fields");
            console.log(educationFormValues);
          } else {
            resolve(educationFormValues);
          }
          break;
        case 11:
          if (Object.values(teachingFormValues).some((x) => x === "" || x === undefined)) {
            reject("Please fill the fields");
            // console.log(formValues)
          } else {
            resolve(teachingFormValues);
          }
          break;
        case 12:
          if (Object.values(certificateFormValues).some((x) => x === "" || x === undefined)) {
            reject("Please fill the fields");
            // console.log(formValues)
          } else {
            resolve();
          }
          break;

        default:
          resolve();
      }
    });
  };

  const onClickNext = () => {
    verifyFields(pageNumber)
      .then((result) => {
        toast(result);
        if (pageNumber === 10) {
          setEducationFormData([...educationFormData, educationFormValues]);
        }
        if (pageNumber === 11) {
          setTeachingFormData([...teachingFormData, teachingFormValues]);
        }
        if (pageNumber === 12) {
          setCertificateFormData([...certificateFormData, certificateFormValues]);
        }

        if (pageNumber !== 12) {
          setPageNumber(pageNumber + 1);
        }
      })
      .catch((e) => {
        toast(e);
      });
  };

  const handleSubmit = () => {
    //Update the final certificate data
    verifyFields(12)
      .then((result) => {
        setCertificateFormData([...certificateFormData, certificateFormValues]);
        submitData();
      })
  }

  const submitData = async () => {
    const data = {};
    const onBoardPayload = formOnboardPayload({ ...data, certificateFormData, firstName, lastName, gender, teacherType, dob, languageSpeak, languageTeach, fromCountry, currentCountry, fromState, currentState, mobileNumber, videoURL, selfIntro, teacherProfilePic, motherTongue, educationFormData, teachingFormData });
    const result = await dispatch(getTeacherOnboardData(onBoardPayload));

  }

  const onClickPrev = () => {
    if (pageNumber !== 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleLanguageChange = (val, ind, section) => {
    if (ind === null) {
      if (addSpeakLng && section === "languageSpeak") {
        setLanguageSpeak([...languageSpeak, val]);
        setAddSpeakLng(false);
      }
      if (addTeachLng && section === "languageTeach") {
        setLanguageTeach([...languageTeach, val]);
        setAddTeachLng(false);
      }
    } else {
      let tempArr;
      if (section === "languageSpeak") {
        tempArr = [...languageSpeak];
        tempArr.splice(ind, 1);
        tempArr = [...tempArr, val];
        setLanguageSpeak(tempArr);
      }
      if (section === "languageTeach") {
        tempArr = [...languageTeach];
        tempArr.splice(ind, 1);
        tempArr = [...tempArr, val];
        setLanguageTeach(tempArr);
      }
    }
  };

  const handleFileInput = (event) => {
    if (event.target.files.length > 0) {
      setTeacherProfilePic(event.target.files[0]);
    } else {
      setTeacherProfilePic({});
    }
  };

  const renderForm = () => {
    if (pageNumber === 0) {
      return (
        <div className="nameDiv">
          <InputField
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            type="text"
            value={firstName}
            placeholder="First Name"
            className="firstNameInput"
          />
          <InputField
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            type="text"
            value={lastName}
            placeholder="Last Name"
            className="firstNameInput"
          />
        </div>
      );
    }
    if (pageNumber === 1) {
      return (
        <div className="gender">
          <div className="genderImageView">
            <div className="genderImageViewDiv">
              <div>
                <img
                  src={boyIcon}
                  alt="boy_img"
                  className={`genderImgSt ${gender === "Male" ? "selectedImg" : ""}`}
                  onClick={() => {
                    setGender("Male");
                  }}
                  id={"male"}
                />
                <br></br>
                <div className="genderName">Male</div>
              </div>
              <div>
                <img
                  src={girlIcon}
                  alt="girl_img"
                  className={`genderImgSt ${gender === "Female" ? "selectedImg" : ""}`}
                  onClick={() => {
                    setGender("Female");
                  }}
                  id={"female"}
                />
                <br></br>
                <div className="genderName">Female</div>
              </div>
            </div>
          </div>
          <div className="othersGender">
            <FormButton
              className={`otherButton ${gender === "Other" ? "selectedImg" : ""}`}
              id={"other"}
              title="Others"
              onClick={() => {
                setGender("Other");
              }}
            />
          </div>
        </div>
      );
    }
    if (pageNumber === 2) {
      return (
        <DatePicker value={dob} maxDate={new Date()} onChange={(date) => setDob(date)} /> //ddd MMM DD YYYY
      );
    }
    if (pageNumber === 3) {
      return (
        <div className="mobileNum">
          <PhoneInput placeholder="Enter phone number" value={mobileNumber} onChange={setMobileNumber} />
        </div>
      );
    }
    if (pageNumber === 4) {
      return (
        <div className="gender">
          <div className="genderImageViewDiv">
            <div>
              <img
                src={teacherTypeImg}
                onClick={() => {
                  setTeacherType("Professional Teacher");
                }}
                id={"professionalTeacher"}
                alt="teacherType_img"
                className={`teacherTypeImg ${teacherType === "Professional Teacher" ? "selectedImg" : ""}`}
              />
              <br></br>
              <div className="genderName">Professional Teacher</div>
            </div>
            <div>
              <img
                src={teacherTypeImg}
                alt="teacherType_img"
                onClick={() => {
                  setTeacherType("Community Teacher");
                }}
                id={"communityTeacher"}
                className={`teacherTypeImg ${teacherType === "Community Teacher" ? "selectedImg" : ""}`}
              />
              <br></br>
              <div className="genderName">Community Teacher</div>
            </div>
          </div>
        </div>
      );
    }
    if (pageNumber === 5) {
      return (
        <div className="gender">
          <div>
            <InputField
              onChange={(e) => setMotherTongue(e.target.value)}
              type="text"
              value={motherTongue}
              placeholder="Mother Tongue"
              className="firstNameInput"
            />
          </div>
          <div className="genderImageViewDiv">
            <div style={{ alignSelf: "center" }}>
              <div className="languageDiv">
                {!isEmpty(languageSpeak) &&
                  languageSpeak.map((lang, ind) => (
                    <CreatableSelect
                      className="languageSelect"
                      onChange={(val) => handleLanguageChange(val, ind, "languageSpeak")}
                      value={lang}
                      classNamePrefix={"select"}
                      placeholder="Language you teach"
                      name="languageSpeak"
                      options={languageOption}
                    />
                  ))}
                {addSpeakLng && (
                  <CreatableSelect
                    className="languageSelect"
                    onChange={(val) => handleLanguageChange(val, null, "languageSpeak")}
                    classNamePrefix={"select"}
                    placeholder="Language you speak"
                    name="languageSpeak"
                    options={languageOption}
                  />
                )}
              </div>
              <br></br>
              <div className="genderName" style={{ color: "#FF1849", cursor: "pointer" }} onClick={() => setAddSpeakLng(true)}>
                + Add Language
              </div>
            </div>
            <div style={{ alignSelf: "center" }}>
              <div className="languageDiv">
                {!isEmpty(languageTeach) &&
                  languageTeach.map((lang, ind) => (
                    <CreatableSelect
                      className="languageSelect"
                      onChange={(val) => handleLanguageChange(val, ind, "languageTeach")}
                      classNamePrefix={"select"}
                      value={lang}
                      placeholder="Language you teach"
                      name="languageTeach"
                      options={languageOption}
                    />
                  ))}
                {addTeachLng && (
                  <CreatableSelect
                    className="languageSelect"
                    onChange={(val) => handleLanguageChange(val, null, "languageTeach")}
                    classNamePrefix={"select"}
                    placeholder="Language you teach"
                    name="languageTeach"
                    options={languageOption}
                  />
                )}
              </div>
              <br></br>
              <div className="genderName" style={{ color: "#FF1849", cursor: "pointer" }} onClick={() => setAddTeachLng(true)}>
                + Add Language
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (pageNumber === 6) {
      return (
        <div className="locationView">
          <div className="locationRow">
            <h4>From</h4>
            <div className="locationSelectView">
              <CountryDropdown
                classes="countryFrom"
                defaultOptionLabel="Choose Country"
                blankOptionLabel="Choose Country"
                value={fromCountry}
                onChange={(val) => setFromCountry(val)}
              />

              <RegionDropdown
                classes="countryFrom"
                country={fromCountry}
                value={fromState}
                blankOptionLabel="Choose State"
                defaultOptionLabel="Choose State"
                onChange={(val) => setFromState(val)}
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="locationRow">
            <h4>Living In</h4>
            <div className="locationSelectView">
              <CountryDropdown
                classes="countryFrom"
                defaultOptionLabel="Choose Country"
                blankOptionLabel="Choose Country"
                value={currentCountry}
                onChange={(val) => setCurrentCountry(val)}
              />
              <RegionDropdown
                classes="countryFrom"
                blankOptionLabel="Choose State"
                defaultOptionLabel="Choose State"
                country={currentCountry}
                value={currentState}
                onChange={(val) => setCurrentState(val)}
              />
            </div>
          </div>
        </div>
      );
    }
    if (pageNumber === 7) {
      return (
        <textarea
          onChange={(e) => setSelfIntro(e.target.value)}
          value={selfIntro}
          className="descriptionInput"
          placeholder="Start Typing Here..."
        />
      );
    }
    if (pageNumber === 8) {
      return (
        <div className="profilePicView">
          <button onClick={() => profilePicRef.current.click()} className="uploadPicPlaceholder">
            {teacherProfilePic ? <img className="uploadPicPlaceholder" src={URL.createObjectURL(teacherProfilePic)} alt="" /> : <h2>Upload your photo</h2>}
          </button>
          <input
            accept="image/*"
            onChange={handleFileInput}
            // value={profilePic}
            ref={profilePicRef}
            type="file"
            style={{ display: "none" }}
          />
        </div>
      );
    }
    if (pageNumber === 9) {
      return (
        <div className="videoDiv">
          <p style={{ width: "275px", textAlign: "center" }}>Record a Short Profile Video, Upload it to YouTube and Copy the Url here</p>
          <InputField
            onChange={(e) => setVideoURL(e.target.value)}
            type="url"
            value={videoURL}
            placeholder="https://youtube.com/watch?v=xxxxxxxxxxx"
            className="videoInput"
          />
          <ReactPlayer className="videoPlayer" url={videoURL} />
        </div>
      );
    }
    if (pageNumber === 10) {
      return (
        <InfoForm
          key="10"
          formValues={educationFormValues}
          fields={formFields}
          body={educationFormData}
          setBody={setEducationFormData}
          setFormValues={setEducationFormValues}
          newDetailLabel="+ New Education Detail"
        />
      );
    }
    if (pageNumber === 11) {
      return (
        <InfoForm
          key="11"
          formValues={teachingFormValues}
          fields={formFields}
          body={teachingFormData}
          setBody={setTeachingFormData}
          setFormValues={setTeachingFormValues}
          newDetailLabel="+ New Work Experience"
        />
      );
    }
    if (pageNumber === 12) {
      return (
        <InfoForm
          key="12"
          formValues={certificateFormValues}
          fields={formFields}
          body={certificateFormData}
          setBody={setCertificateFormData}
          setFormValues={setCertificateFormValues}
          newDetailLabel="+ New Certificate Course"
        />
      );
    }
  };
  return (
    <div className="container">
      <SideNav pageNumber={pageNumber} setPageNumber={setPageNumber} />
      {/* subFormIndex={} formIndex={} */}
      <div className="right">
        <div className="rightTop">
          <div className="formHeadlineView">
            <h1 className="formHeadline">{SUB_FORMS[pageNumber]}</h1>
            {pageNumber === 7 && <h6 style={{ paddingTop: "5px" }}>how you teach, what you teach and talking about your language</h6>}
          </div>
        </div>
        <div className="rightCenter">{renderForm()}</div>
        <div className="bottomSection">
          <div className={pageNumber === 0 ? "buttonFooterCenter" : "buttonFooter"}>
            {pageNumber === 0 ? (
              <></>
            ) : (
              <FormButton title="Previous" onClick={() => onClickPrev()} icon={{ position: "left", src: leftIcon }} theme={"primary-icon-left"} />
            )}
            {pageNumber === 12 ? (
              <></>
            ) : (
              <FormButton title="Next" onClick={() => onClickNext()} icon={{ position: "right", src: rightIcon }} theme={"primary-icon-right"} />
            )}
            {pageNumber === 12 && (
              // <FormButton title="Submit" onClick={onClickNext} icon={{ position: "right", src: checkMark }} theme={"success-icon-right"} />
              <button className="submitOnBoardForm" onClick={() => handleSubmit()}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboard;