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
import page1 from "../../../../assets/image/Page-1.png";
import TopNav from "./TopNav/TopNav";
import { useLocation, useNavigate } from "react-router-dom";

const defaultFormValues = { title: "", institute: "", locations: "", description: "", from: "", to: "", certificate_data: undefined };
const defaultFormFields = [{ key: "title", label: "Title", type: "String" }, { key: "institute", label: "Institute", type: "String" }, { key: "locations", label: "Locations", type: "Select" }, { key: "description", label: "Description", type: "String" }, { key: "from", label: "Start (Year)", type: "Date" }, { key: "to", label: "End (Year)", type: "Date" }, { key: "certificate_data", label: "Upload Certificate", type: "file" }];

const Onboard = () => {
  const history = useNavigate();
  const location = useLocation();
  const initTeacherInfo = JSON.parse(localStorage.getItem("teacherInfo")) || location.state?.result?._doc || {};
  localStorage.setItem("teacherInfo", JSON.stringify(initTeacherInfo));
  const name = initTeacherInfo.fullName?.split(" ") || ["", ""];
  const [pageNumber, setPageNumber] = useState(0);
  const [firstName, setFirstName] = useState(name[0]);
  const [lastName, setLastName] = useState(name[1] ? name[1] : "");
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
  const [mobileNumber, setMobileNumber] = useState("+91");
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
  const SUB_FORMS = { 0: "What is your name?", 1: "What is your gender?", 2: "When were you born?", 3: "What's your mobile number?", 4: "What describes you best?", 5: "What are your Language Skills?", 6: "Where are you from?", 7: "Introduce yourself in few words", 8: "Upload your profile picture", 9: "Self Intro Video", 10: "Fill your education details", 11: "Tell us your teaching experience", 12: "Tell us your certificate courses" };

  useEffect(() => {
    let profile = JSON.parse(window.localStorage.getItem("profile"));
    if (profile.isOnBoarding) history("/teacher/dashboard");
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
  }, [onBoardData, history]);

  useEffect(() => {
    if (pageNumber === 10) { setFormFields(get(onBoardData, "educationDetails.fields", defaultFormFields)); setEducationFormData(get(onBoardData, "educationDetails.body", [])); }
    if (pageNumber === 11) { setFormFields(get(onBoardData, "workExperience.fields", defaultFormFields)); setTeachingFormData(get(onBoardData, "workExperience.body", [])); }
    if (pageNumber === 12) { setFormFields(get(onBoardData, "certificateCourses.fields", defaultFormFields)); setCertificateFormData(get(onBoardData, "certificateCourses.body", [])); }
  }, [pageNumber, onBoardData]);

  const calculateAge = (birthday) => { const ageDifMs = Date.now() - birthday.getTime(); const ageDate = new Date(ageDifMs); return Math.abs(ageDate.getUTCFullYear() - 1970); };
  const isAlpha = (ch) => /^[a-zA-Z]*$/.test(ch);

  const verifyFields = (pageNumber) => new Promise((resolve, reject) => {
    switch (pageNumber) {
      case 0: if (firstName === "" || lastName === "") reject("Fields are required"); else if (firstName.split(" ").length > 1 || lastName.split(" ").length > 1) reject("Invalid Name"); else if (!isAlpha(firstName) || !isAlpha(lastName)) reject("Please enter valid name"); else resolve(); break;
      case 1: if (gender === "") reject("Please choose a gender"); else resolve(); break;
      case 2: if (dob.getDate() === new Date().getDate()) reject("Please choose your DOB"); else if (calculateAge(dob) < 18) reject("Your age must be 18 years or older"); else resolve(); break;
      case 3: if (!mobileNumber || !(mobileNumber.length >= 12 && mobileNumber.length <= 15)) reject("Please enter 10 digits!"); else resolve(); break;
      case 4: if (teacherType === "") reject("Please choose one"); else resolve(); break;
      case 5: if (motherTongue === "" || !isAlpha(motherTongue) || languageSpeak.length === 0 || languageTeach.length === 0) reject("Enter languages and mother tongue"); else resolve(); break;
      case 6: if (!fromCountry || !fromState || !currentCountry || !currentState) reject("Please fill the fields"); else resolve(); break;
      case 7: if (!selfIntro) reject("Please write about yourself"); else resolve(); break;
      case 8: if (!teacherProfilePic || !["image/jpeg","image/png","image/jpg"].includes(teacherProfilePic.type)) reject("Image Type not supported"); else resolve(); break;
      case 9: const ytRegex=/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/; let vimeoRegex=/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i; if (!videoURL || (!videoURL.match(ytRegex) && !videoURL.match(vimeoRegex))) reject("Please share a Youtube or Vimeo url"); else resolve(); break;
      default: resolve();
    }
  });

  const onClickNext = () => { verifyFields(pageNumber).then(() => { if (pageNumber !== 12) setPageNumber(pageNumber + 1); }).catch(e => toast(e)); };
  const onClickPrev = () => { if (pageNumber !== 0) setPageNumber(pageNumber - 1); };

  const handleLanguageChange = (val, ind, section) => {
    if (ind === null) { if (addSpeakLng && section==="languageSpeak") { setLanguageSpeak([...languageSpeak,val]); setAddSpeakLng(false); } if (addTeachLng && section==="languageTeach") { setLanguageTeach([...languageTeach,val]); setAddTeachLng(false); } } else { let tempArr; if(section==="languageSpeak"){tempArr=[...languageSpeak]; tempArr.splice(ind,1); tempArr=[...tempArr,val]; setLanguageSpeak(tempArr);} if(section==="languageTeach"){tempArr=[...languageTeach]; tempArr.splice(ind,1); tempArr=[...tempArr,val]; setLanguageTeach(tempArr);}}
  };

  const handleFileInput = (event) => { if(event.target.files.length>0) setTeacherProfilePic(event.target.files[0]); else setTeacherProfilePic({}); };

  const renderForm = () => { if(pageNumber===0)return <div className="nameDiv"><InputField id="firstName" onChange={(e)=>setFirstName(e.target.value)} type="text" value={firstName} placeholder="First Name" className="firstNameInput"/><InputField id="lastName" onChange={(e)=>setLastName(e.target.value)} type="text" value={lastName} placeholder="Last Name" className="firstNameInput"/></div>; if(pageNumber===1)return <div className="gender"><div className="genderImageView"><div className="genderImageViewDiv"><div className={"genderImg "+(gender==="Male"?"selectedImg":"")} onClick={()=>setGender("Male")}><img src={boyIcon} alt="boy_img" className="genderImgSt"/><br/><div className="genderName">Male</div></div><div className={"genderImg "+(gender==="Female"?"selectedImg":"")} onClick={()=>setGender("Female")}><img src={girlIcon} alt="girl_img" className="genderImgSt"/><br/><div className="genderName">Female</div></div></div></div><div className="othersGender"><FormButton className={`otherButton ${gender==="Other"?"selectedImg":""}`} title="Others" onClick={()=>setGender("Other")}/></div></div>; if(pageNumber===2)return <div className="calenderDiv"><DatePicker value={dob} maxDate={new Date()} onChange={(date)=>setDob(date)}/></div>; if(pageNumber===3)return <div className="mobileNum"><PhoneInput placeholder="Enter phone number" onChange={setMobileNumber} value={mobileNumber} countryCallingCodeEditable international/></div>; if(pageNumber===4)return <div className="gender"><div className="genderImageViewDiv"><div className={"teacherImg "+(teacherType==="Professional Teacher"?"selectedImg":"")} onClick={()=>setTeacherType("Professional Teacher")}><div style={{width:'300px',height:'24.5vw',maxHeight:'250px'}}><img src={teacherTypeImg} id="professionalTeacher" alt="teacherType_img" className="teacherTypeImg"/></div><div className="genderName">Professional Teacher</div></div><div className={"teacherImg "+(teacherType==="Community Teacher"?"selectedImg":"")} onClick={()=>setTeacherType("Community Teacher")}><div style={{width:'300px',height:'24.5vw',maxHeight:'250px'}}><img src={teacherTypeImg} id="communityTeacher" alt="teacherType_img" className="teacherTypeImg"/></div><div className="genderName mt-1">Community Teacher</div></div></div></div>; if(pageNumber===5)return <div className="gender"><div style={{marginBottom:"4%"}}><InputField onChange={(e)=>setMotherTongue(e.target.value)} type="text" value={motherTongue} placeholder="Mother Tongue" className="firstNameInput"/></div><div className="genderImageViewDiv"><div style={{alignSelf:"center"}}>{!isEmpty(languageSpeak)&&languageSpeak.map((lang,ind)=><CreatableSelect key={ind} className="languageSelect" onChange={(val)=>handleLanguageChange(val,ind,"languageSpeak")} value={lang} classNamePrefix="select" placeholder="Language you teach" options={languageOption}/>) }{addSpeakLng&&<CreatableSelect className="languageSelect" onChange={(val)=>handleLanguageChange(val,null,"languageSpeak")} classNamePrefix="select" placeholder="Language you speak" options={languageOption}/>}<div className="genderName" style={{color:"#FF1849",cursor:"pointer",textAlign:"right"}} onClick={()=>setAddSpeakLng(true)}>+ Add Language</div></div><div style={{alignSelf:"center"}}>{!isEmpty(languageTeach)&&languageTeach.map((lang,ind)=><CreatableSelect key={ind} className="languageSelect" onChange={(val)=>handleLanguageChange(val,ind,"languageTeach")} value={lang} classNamePrefix="select" placeholder="Language you teach" options={languageOption}/>) }{addTeachLng&&<CreatableSelect className="languageSelect" onChange={(val)=>handleLanguageChange(val,null,"languageTeach")} classNamePrefix="select" placeholder="Language you teach" options={languageOption}/>}<div className="genderName" style={{color:"#FF1849",cursor:"pointer",textAlign:"right"}} onClick={()=>setAddTeachLng(true)}>+ Add Language</div></div></div></div>; if(pageNumber===6)return <div className="locationView"><div className="locationRow"><h4 style={{marginBottom:"2%"}}>From</h4><div className="locationSelectView"><CountryDropdown className="py-2" classes="countryFrom" defaultOptionLabel="Choose Country" blankOptionLabel="Choose Country" value={fromCountry} onChange={(val)=>setFromCountry(val)}/><RegionDropdown classes="countryFrom" country={fromCountry} value={fromState} blankOptionLabel="Choose State" defaultOptionLabel="Choose State" onChange={(val)=>setFromState(val)}/></div></div><div className="locationRow"><h4 style={{marginBottom:"2%"}}>Living In</h4><div className="locationSelectView"><CountryDropdown classes="countryFrom" defaultOptionLabel="Choose Country" blankOptionLabel="Choose Country" value={currentCountry} onChange={(val)=>setCurrentCountry(val)}/><RegionDropdown classes="countryFrom" blankOptionLabel="Choose State" defaultOptionLabel="Choose State" country={currentCountry} value={currentState} onChange={(val)=>setCurrentState(val)}/></div></div></div>; if(pageNumber===7)return <textarea rows={7} onChange={(e)=>setSelfIntro(e.target.value)} value={selfIntro} className="descriptionInput" placeholder="Start Typing Here..."/>; if(pageNumber===8)return <div className="profilePicView"><button onClick={()=>profilePicRef.current.click()} className="uploadPicPlaceholder">{teacherProfilePic?<img className="uploadPicPlaceholder" src={URL.createObjectURL(teacherProfilePic)} alt="user_img" style={{border:'3px solid grey'}}/>:<div><img src={page1} alt="cloud_icon" width="30%"/><h4 style={{fontWeight:"bold",fontSize:"20px"}}>Upload your photo</h4></div>}</button><input accept="image/*" onChange={handleFileInput} ref={profilePicRef} type="file" style={{display:"none"}}/></div>; if(pageNumber===9)return <div className="videoDiv"><p style={{width:"275px",textAlign:"center",margin:"5% 0"}}>Record a Short Profile Video, Upload it to YouTube and Copy the Url here</p><InputField onChange={(e)=>setVideoURL(e.target.value)} type="url" value={videoURL} placeholder="https://youtube.com/watch?v=xxxxxxxxxxx" className="videoInput"/><ReactPlayer className="videoPlayer" url={videoURL}/></div>; if(pageNumber===10)return <InfoForm key="10" formValues={educationFormValues} fields={formFields} body={educationFormData} setBody={setEducationFormData} setFormValues={setEducationFormValues}/>; if(pageNumber===11)return <InfoForm key="11" formValues={teachingFormValues} fields={formFields} body={teachingFormData} setBody={setTeachingFormData} setFormValues={setTeachingFormValues}/>; if(pageNumber===12)return <InfoForm key="12" formValues={certificateFormValues} fields={formFields} body={certificateFormData} setBody={setCertificateFormData} setFormValues={setCertificateFormValues}/>;
  };

  const handleSubmit = async () => {
    document.getElementById("loader").style.display="flex";
    const data = new FormData();
    const educationFiles = educationFormValues.certificate_data; delete educationFormValues.certificate_data;
    const workExperienceFiles = teachingFormValues.certificate_data; delete teachingFormValues.certificate_data;
    const certificateFile = certificateFormValues.certificate_data; delete certificateFormValues.certificate_data;
    data.append("firstName", firstName); data.append("lastName", lastName); data.append("gender", gender); data.append("teacherType", teacherType); data.append("dob", dob); data.append("languageSpeak", JSON.stringify(languageSpeak)); data.append("languageTeach", JSON.stringify(languageTeach)); data.append("fromCountry", fromCountry); data.append("currentCountry", currentCountry); data.append("fromState", fromState); data.append("currentState", currentState); data.append("mobileNumber", mobileNumber); data.append("videoURL", videoURL); data.append("selfIntro", selfIntro); data.append("teacherProfilePic", teacherProfilePic); data.append("motherTongue", motherTongue); data.append("educationDetails", JSON.stringify([educationFormValues])); data.append("workExperience", JSON.stringify([teachingFormValues])); data.append("certificateCourses", JSON.stringify([certificateFormValues])); data.append("educationFiles", educationFiles); data.append("workExperienceFiles", workExperienceFiles); data.append("certificateFiles", certificateFile);
    const result = await dispatch(getTeacherOnboardData(data));
    if(result&&result.msg==="Teacher Onboard process completed."){toast.success("Onboarding Completed");let profile=JSON.parse(window.localStorage.getItem("profile"));profile.isOnBoarding=true;window.localStorage.setItem("profile",JSON.stringify(profile));history("/teacher/dashboard");document.getElementById("loader").style.display="none";}
    else if(result&&result.msg==="Teacher Onboard process already completed."){toast.error("You have already onBoarded");document.getElementById("loader").style.display="none";}
    else{toast.error("Failed to OnBoard, please try again later");document.getElementById("loader").style.display="none";}
  };

  return (<div className="container"><SideNav pageNumber={pageNumber} setPageNumber={setPageNumber}/><div className="right-container"><TopNav pageNumber={pageNumber} setPageNumber={setPageNumber}/><div className="right"><div className="rightTop"><div className="formHeadlineView"><h1 className="formHeadline">{SUB_FORMS[pageNumber]}</h1>{pageNumber===7&&<p style={{fontWeight:'100',fontSize:'18px',paddingTop:"5px"}} className="formText">how you teach, what you teach and talking about your language</p>}</div></div><div className="rightCenter">{renderForm()}</div><div className="bottomSection"><div className={pageNumber===0?"buttonFooterCenter":"buttonFooter"}>{pageNumber!==0&&<FormButton title="Previous" onClick={onClickPrev} icon={{position:"left",src:leftIcon}} theme="primary-icon-left"/>}{pageNumber!==12&&<FormButton title="Next" onClick={onClickNext} icon={{position:"right",src:rightIcon}} theme="primary-icon-right"/ >}{pageNumber===12&&<button className="submitOnBoardForm" onClick={handleSubmit}>Submit</button>}</div></div></div></div></div>);
};

export default Onboard;
