import SideNav from "./SideNav";
import React, { useEffect, useRef, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import ReactPlayer from "react-player";
import { get, isEmpty } from "lodash";
import FormButton from "../../../atoms/button";
import rightIcon from "../../../../assets/icons/TriangleArrow-White-Right.svg.png";
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

function Onboard() {
  const dispatch = useDispatch();

  const [pageNumber, setPageNumber] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [teacherType, setTeacherType] = useState("");
  const [dob, setDob] = useState(new Date());
  const [languageSpeak, setLanguageSpeak] = useState([]);
  const [languageTeach, setLanguageTeach] = useState([]);
  const [motherTongue, setMotherTongue] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [fromState, setFromState] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const [teacherProfilePic, setTeacherProfilePic] = useState(null);

  const profilePicRef = useRef();

  const [educationFormValues, setEducationFormValues] = useState(defaultFormValues);
  const [educationFormData, setEducationFormData] = useState([]);
  const [teachingFormValues, setTeachingFormValues] = useState(defaultFormValues);
  const [teachingFormData, setTeachingFormData] = useState([]);
  const [certificateFormValues, setCertificateFormValues] = useState(defaultFormValues);
  const [certificateFormData, setCertificateFormData] = useState([]);

  const onBoardData = useSelector((state) =>
    get(state, "teacherOnboardReducer", {})
  );

  useEffect(() => {
    if (!isEmpty(onBoardData)) {
      setFirstName(onBoardData.firstName || "");
      setLastName(onBoardData.lastName || "");
      setGender(onBoardData.gender || "");
      setTeacherType(onBoardData.teacherType || "");
      setDob(new Date(onBoardData.dob || ""));
      setLanguageSpeak(onBoardData.languageSpeak?.body || []);
      setLanguageTeach(onBoardData.languageTeaches?.body || []);
      setMotherTongue(onBoardData.motherTongue || "");
      setFromCountry(onBoardData.region?.fromCountry || "");
      setFromState(onBoardData.region?.fromState || "");
      setCurrentCountry(onBoardData.region?.currentCountry || "");
      setCurrentState(onBoardData.region?.currentState || "");
      setMobileNumber(onBoardData.mobileNumber || "");
      setVideoURL(onBoardData.videoURL || "");
      setSelfIntro(onBoardData.selfIntro || "");
      setTeacherProfilePic(onBoardData.teacherProfilePic || null);
    }
  }, [onBoardData]);

  const handleSubmit = async () => {
    const payload = formOnboardPayload({
      firstName,
      lastName,
      gender,
      teacherType,
      dob,
      languageSpeak,
      languageTeach,
      motherTongue,
      fromCountry,
      fromState,
      currentCountry,
      currentState,
      mobileNumber,
      videoURL,
      selfIntro,
      teacherProfilePic,
      educationFormData,
      teachingFormData,
      certificateFormData,
    });

    await dispatch(getTeacherOnboardData(payload));
    toast.success("Onboarding submitted successfully");
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length) {
      setTeacherProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="container">
      <SideNav pageNumber={pageNumber} setPageNumber={setPageNumber} />

      <div className="right">
        <div className="rightCenter">
          {pageNumber === 8 && (
            <div className="profilePicView">
              <button
                onClick={() => profilePicRef.current.click()}
                className="uploadPicPlaceholder"
              >
                {teacherProfilePic ? (
                  <img
                    src={URL.createObjectURL(teacherProfilePic)}
                    alt="profile"
                  />
                ) : (
                  <img src={page1} alt="upload" />
                )}
              </button>
              <input
                type="file"
                ref={profilePicRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileInput}
              />
            </div>
          )}
        </div>

        {pageNumber === 12 && (
          <button className="submitOnBoardForm" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Onboard;
