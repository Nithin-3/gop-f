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
import teacherType from "../../../../assets/images/teacher_type.png";
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
import maskImg from "../../../../assets/image/Mask Group 1.png";
import page1 from "../../../../assets/image/Page-1.png";

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
  const [typeOfTeacher, setTypeOfTeacher] = useState("");
  const [dob, setDob] = useState(new Date());
  const [addSpeakLng, setAddSpeakLng] = useState(true);
  const [addTeachLng, setAddTeachLng] = useState(true);
  const [languageSpeak, setLanguageSpeak] = useState([]);
  const [languageTeach, setLanguageTeach] = useState([]);
  const [countryFrom, setCountryFrom] = useState("");
  const [regionFrom, setRegionFrom] = useState("");
  const [countryLive, setCountryLive] = useState("");
  const [regionLive, setRegionLive] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [videoLink, setVideoLink] = useState();
  const profilePicRef = useRef();
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [motherLanguage, setMotherLanguage] = useState("");
  const [educationFormValues, setEducationFormValues] =
    useState(defaultFormValues);
  const [educationFormData, setEducationFormData] = useState([]);
  const [teachingFormValues, setTeachingFormValues] =
    useState(defaultFormValues);
  const [teachingFormData, setTeachingFormData] = useState([]);
  const [certificateFormValues, setCertificateFormValues] =
    useState(defaultFormValues);
  const [certificateFormData, setCertificateFormData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [languageOption, setLanguageOption] = useState(LANGUAGES);
  const onBoardData = useSelector((state) =>
    get(state, "teacherOnboardReducer", {})
  );
  const dispatch = useDispatch();
  const userId = useSelector(
    (state) => state.auth && state.auth.authData && state.auth.authData._id
  );

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
      setTypeOfTeacher(get(onBoardData, "teacherType", ""));
      setDob(new Date(get(onBoardData, "dob", "")));
      setLanguageSpeak(get(onBoardData, "languageSpeak.body", []));
      setLanguageTeach(get(onBoardData, "languageTeaches.body", []));
      setCountryFrom(get(onBoardData, "region.fromCountry", ""));
      setRegionFrom(get(onBoardData, "region.fromState", ""));
      setCountryLive(get(onBoardData, "region.currentCountry", ""));
      setRegionLive(get(onBoardData, "region.currentState", ""));
      setPhoneNumber(get(onBoardData, "mobileNumber", ""));
      setVideoLink(get(onBoardData, "videoURL", ""));
      setDescription(get(onBoardData, "selfIntro", ""));
      setProfilePic(get(onBoardData, "teacherProfilePic", null));
      setMotherLanguage(get(onBoardData, "motherTongue", ""));
      setLanguageOption(get(onBoardData, "languageSpeak.options", []));
    }
  }, [onBoardData]);

  useEffect(() => {
    if (pageNumber === 10) {
      //education
      setFormFields(
        get(onBoardData, "educationDetails.fields", defaultFormFields)
      ); //fields
      setEducationFormData(get(onBoardData, "educationDetails.body", [])); //body
    }
    if (pageNumber === 11) {
      //work
      setFormFields(
        get(onBoardData, "workExperience.fields", defaultFormFields)
      );
      setTeachingFormData(get(onBoardData, "workExperience.body", []));
    }
    if (pageNumber === 12) {
      //courses
      setFormFields(
        get(onBoardData, "certificateCourses.fields", defaultFormFields)
      );
      setCertificateFormData(get(onBoardData, "certificateCourses.body", []));
    }
  }, [pageNumber]);

  // const dispatchCall = (pageNum)=> {
  //   let updatedData;
  //   if(pageNum===0){
  //     updatedData={firstName:firstName,lastName:lastName}
  //   }
  //   if(pageNum===1){
  //     updatedData={gender:gender}
  //   }
  //   if(pageNum===2){
  //     updatedData={dob:dob}
  //   }
  //   if(pageNum===3){
  //     updatedData={mobileNumber:phoneNumber}
  //   }
  //   if(pageNum===4){
  //     updatedData={teacherType:typeOfTeacher}
  //   }
  //   if(pageNum===5){
  //     updatedData={languageSpeak:languageSpeak,languageTeaches:languageTeach, motherLanguage}
  //   }
  //   if(pageNum===6){
  //     updatedData={region:{fromCountry:countryFrom,fromState:regionFrom,currentCountry:countryLive,currentState:regionLive}}
  //   }
  //   if(pageNum===7){
  //     updatedData={selfIntro:description}
  //   }
  //   if(pageNum===8){
  //     updatedData={teacherProfilePic:profilePic}
  //   }
  //   if(pageNum===9){
  //     updatedData={videoURL:videoLink}
  //   }
  //   if(pageNum===10 || pageNum===11 || pageNum===12){
  //     updatedData=formData
  //   }
  //   dispatch(getTeacherOnboardData({ screenName: payload[pageNum], body:updatedData }))
  // }//need to add updated data in payload

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
          if (phoneNumber === undefined || phoneNumber.length <= 11) {
            reject("Please enter a valid contact");
          } else {
            resolve();
          }
          break;
        case 4:
          if (typeOfTeacher === "") {
            reject("Please choose one of the following");
          } else {
            resolve();
          }
          break;
        case 5:
          if (motherLanguage === "") {
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
          if (
            countryFrom === "" ||
            regionFrom === "" ||
            countryLive === "" ||
            regionLive === ""
          ) {
            reject("Please fill the follwing fields");
          } else {
            resolve();
          }
          break;
        case 7:
          if (description === "") {
            reject("Please write a few words about yourself");
          } else {
            resolve();
          }
          break;
        case 8:
          if (!profilePic) {
            reject("Please upload a picture");
          } else {
            resolve();
          }
          break;
        case 9:
          if (!videoLink) {
            reject("Please share a video url");
          } else {
            resolve();
          }
          break;
        case 10:
          if (
            Object.values(educationFormValues).some(
              (x) => x === "" || x === undefined
            )
          ) {
            reject("Please fill the fields");
            console.log(educationFormValues);
          } else {
            resolve(educationFormValues);
          }
          break;
        case 11:
          if (
            Object.values(teachingFormValues).some(
              (x) => x === "" || x === undefined
            )
          ) {
            reject("Please fill the fields");
            // console.log(formValues)
          } else {
            resolve(teachingFormValues);
          }
          break;
        case 12:
          if (
            Object.values(certificateFormValues).some(
              (x) => x === "" || x === undefined
            )
          ) {
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
          setCertificateFormData([
            ...certificateFormData,
            certificateFormValues,
          ]);
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
    const onBoardPayload = formOnboardPayload({
      ...certificateFormData,
      firstName,
      lastName,
      gender,
      typeOfTeacher,
      dob,
      languageSpeak,
      languageTeach,
      countryFrom,
      countryLive,
      regionFrom,
      regionLive,
      phoneNumber,
      videoLink,
      description,
      profilePic,
      motherLanguage,
      educationFormData,
      teachingFormData,
    });
    console.log(onBoardPayload);
  };

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
      setProfilePic(event.target.files[0]);
    } else {
      setProfilePic({});
    }
  };

  const renderForm = () => {
    if (pageNumber === 0) {
      return (
        <div className="nameDiv">
          <InputField
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            value={firstName}
            placeholder="First Name"
            className="firstNameInput"
          />
          <InputField
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
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
              <div className="genderImg">
                <img
                  src={boyIcon}
                  alt="boy_img"
                  className={`genderImgSt ${
                    gender === "Male" ? "selectedImg" : ""
                  }`}
                  onClick={() => {
                    setGender("Male");
                  }}
                  id={"male"}
                />
                <br></br>
                <div className="genderName">Male</div>
              </div>
              <div className="genderImg">
                <img
                  src={girlIcon}
                  alt="girl_img"
                  className={`genderImgSt ${
                    gender === "Female" ? "selectedImg" : ""
                  }`}
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
              className={`otherButton ${
                gender === "Other" ? "selectedImg" : ""
              }`}
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
        <DatePicker
          className=""
          value={dob}
          maxDate={new Date()}
          onChange={(date) => setDob(date)}
        /> //ddd MMM DD YYYY
      );
    }
    if (pageNumber === 3) {
      return (
        <div className="mobileNum">
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
      );
    }
    if (pageNumber === 4) {
      return (
        <div className="gender">
          <div className="genderImageViewDiv">
            <div className="teacherImg">
              <div>
                <img
                  src={teacherType}
                  onClick={() => {
                    setTypeOfTeacher("Professional Teacher");
                  }}
                  id={"professionalTeacher"}
                  alt="teacherType_img"
                  className={`teacherTypeImg ${
                    typeOfTeacher === "Professional Teacher"
                      ? "selectedImg"
                      : ""
                  }`}
                />
              </div>

              <div className="genderName mt-1">Professional Teacher</div>
            </div>
            <div className="teacherImg">
              <div>
                <img
                  src={teacherType}
                  alt="teacherType_img"
                  onClick={() => {
                    setTypeOfTeacher("Community Teacher");
                  }}
                  id={"communityTeacher"}
                  className={`teacherTypeImg ${
                    typeOfTeacher === "Community Teacher" ? "selectedImg" : ""
                  }`}
                />
              </div>
              <div className="genderName mt-1">Community Teacher</div>
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
              onChange={(e) => setMotherLanguage(e.target.value)}
              type="text"
              value={motherLanguage}
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
                      onChange={(val) =>
                        handleLanguageChange(val, ind, "languageSpeak")
                      }
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
                    onChange={(val) =>
                      handleLanguageChange(val, null, "languageSpeak")
                    }
                    classNamePrefix={"select"}
                    placeholder="Language you speak"
                    name="languageSpeak"
                    options={languageOption}
                  />
                )}
              </div>
              <br></br>
              <div
                className="genderName"
                style={{
                  color: "#FF1849",
                  cursor: "pointer",
                  textAlign: "right",
                }}
                onClick={() => setAddSpeakLng(true)}
              >
                + Add Language
              </div>
            </div>
            <div style={{ alignSelf: "center" }}>
              <div className="languageDiv">
                {!isEmpty(languageTeach) &&
                  languageTeach.map((lang, ind) => (
                    <CreatableSelect
                      className="languageSelect"
                      onChange={(val) =>
                        handleLanguageChange(val, ind, "languageTeach")
                      }
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
                    onChange={(val) =>
                      handleLanguageChange(val, null, "languageTeach")
                    }
                    classNamePrefix={"select"}
                    placeholder="Language you teach"
                    name="languageTeach"
                    options={languageOption}
                  />
                )}
              </div>
              <br></br>
              <div
                className="genderName"
                style={{
                  color: "#FF1849",
                  cursor: "pointer",
                  textAlign: "right",
                }}
                onClick={() => setAddTeachLng(true)}
              >
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
                className="py-2"
                classes="countryFrom"
                defaultOptionLabel="Choose Country"
                blankOptionLabel="Choose Country"
                value={countryFrom}
                onChange={(val) => setCountryFrom(val)}
              />

              <RegionDropdown
                classes="countryFrom"
                country={countryFrom}
                value={regionFrom}
                blankOptionLabel="Choose State"
                defaultOptionLabel="Choose State"
                onChange={(val) => setRegionFrom(val)}
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
                value={countryLive}
                onChange={(val) => setCountryLive(val)}
              />

              <RegionDropdown
                classes="countryFrom"
                blankOptionLabel="Choose State"
                defaultOptionLabel="Choose State"
                country={countryLive}
                value={regionLive}
                onChange={(val) => setRegionLive(val)}
              />
            </div>
          </div>
        </div>
      );
    }
    if (pageNumber === 7) {
      return (
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="descriptionInput"
          placeholder="Start Typing Here..."
        />
      );
    }
    if (pageNumber === 8) {
      return (
        <div className="profilePicView">
          <button
            onClick={() => profilePicRef.current.click()}
            className="uploadPicPlaceholder"
          >
            {profilePic ? (
              <img
                className="uploadPicPlaceholder"
                src={URL.createObjectURL(profilePic)}
                alt=""
              />
            ) : (
              <div>
                <img src={page1} alt="" width="30%" />
                <h4 className="fw-bold">Upload your photo</h4>
              </div>
            )}
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
          <p style={{ width: "275px", textAlign: "center", margin: "0px" }}>
            Record a Short Profile Video, Upload it to YouTube and Copy the Url
            here
          </p>
          <InputField
            onChange={(e) => setVideoLink(e.target.value)}
            type="url"
            value={videoLink}
            placeholder="https://youtube.com/watch?v=xxxxxxxxxxx"
            className="videoInput"
          />
          <ReactPlayer className="videoPlayer" url={videoLink} />
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
            {pageNumber === 7 && (
              <h6 style={{ paddingTop: "5px" }}>
                how you teach, what you teach and talking about your language
              </h6>
            )}
          </div>
        </div>
        <div className="rightCenter">{renderForm()}</div>
        <div className="bottomSection">
          <div
            className={pageNumber === 0 ? "buttonFooterCenter" : "buttonFooter"}
          >
            {pageNumber === 0 ? (
              <></>
            ) : (
              <FormButton
                title="Previous"
                onClick={() => onClickPrev()}
                icon={{ position: "left", src: leftIcon }}
                theme={"primary-icon-left"}
              />
            )}
            {pageNumber === 12 ? (
              <></>
            ) : (
              <FormButton
                title="Next"
                onClick={() => onClickNext()}
                icon={{ position: "right", src: rightIcon }}
                theme={"primary-icon-right"}
              />
            )}
            {pageNumber === 12 && (
              // <FormButton title="Submit" onClick={onClickNext} icon={{ position: "right", src: checkMark }} theme={"success-icon-right"} />
              <button
                className="submitOnBoardForm"
                onClick={() => handleSubmit()}
              >
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
