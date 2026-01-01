import React,{useState,createContext} from 'react'
import style from "./rightbar.module.css"
import avtar from "../../Avtar.png"
import { HashLink } from 'react-router-hash-link';
import ProfileImg from './profileDetails/profileImg/ProfileImg';
import ProfileData1 from './profileDetails/profileData1/ProfileData1';
import ProfileData2 from './profileDetails/profileData2/ProfileData2';
import ProfileData3 from './profileDetails/profileData3/ProfileData3';
import { useSelector } from "react-redux"
export const teacherContext=createContext()
export default function RightBar() {
    const {teacher} = useSelector((state) => state.TeacherReducer)
    const {profileImgStatus,teacherNameStatus,teacherTypeStatus,introVideoStatus,emailStatus,phoneStatus,nativeLanguageStatus,GenderStatus,ageStatus,dobStatus,countryStatus,teachesStatus,speaksStatus,aboutStatus,educationTitleStatus,educationInstitutionStatus,educationLocationStatus,educationDescStatus,educationStartStatus,educationEndStatus,workInstitutionStatus,workLocationStatus,workDescStatus,workStartStatus,workEndStatus,certificateInstitutionStatus,certificateLocationStatus,certificateDescStatus,certificateStartStatus,certificateEndStatus}=teacher
    const [teacherStatus,setTeacherStatus] = useState({
        profileImgStatus,
        teacherNameStatus,
        teacherTypeStatus,
        introVideoStatus,
        emailStatus,
        phoneStatus,
        nativeLanguageStatus,
        GenderStatus,
        ageStatus,
        dobStatus,
        countryStatus,
        teachesStatus,
        speaksStatus,
        aboutStatus,
        educationTitleStatus,
        educationInstitutionStatus,
        educationLocationStatus,
        educationDescStatus,
        educationStartStatus,
        educationEndStatus,
        workInstitutionStatus,
        workLocationStatus,
        workDescStatus,
        workStartStatus,
        workEndStatus,
        certificateInstitutionStatus,
        certificateLocationStatus,
        certificateDescStatus,
        certificateStartStatus,
        certificateEndStatus,
    })
    useState(()=>{
        console.log(teacherStatus)
    },[teacherStatus])
    return (
        <teacherContext.Provider value={{teacherStatus,setTeacherStatus:(data)=>setTeacherStatus({...teacherStatus,data})}}>

        <div className={style.rightbar + " row col-12 mx-auto  px-0 pt-0 pb-3"}>
            <ProfileImg/> 
            <ProfileData1 />
            <ProfileData2 />
            <ProfileData3 />
        </div >
        </teacherContext.Provider>
    )
}
