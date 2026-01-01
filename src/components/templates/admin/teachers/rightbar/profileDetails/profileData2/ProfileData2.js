import React from 'react'
import style from "../../rightbar.module.css"
import TeacherInfoField from './TeacherInfoField'
import { useSelector } from "react-redux"
export default function ProfileData2() {
    const {teacher} = useSelector((state) => state.TeacherReducer)
    const {Gender,dob,country,teaches,speaks,age}=teacher

    return (
        <div className={style.ProfileDataTwo + "  col-12 border border-2   mx-auto p-0 py-2 mb-2"}>
            <div className="row d-flex justify-content-evenly flex-wrap">
                <TeacherInfoField title={"Age"} data={age} checked={true}/>
                <TeacherInfoField title={"Gender"} data={Gender} checked={true}/>
                <TeacherInfoField title={"Date Of Birth"} data={dob} checked={true}/>
                <TeacherInfoField title={"From"} data={country} checked={true}/>
                <TeacherInfoField title={"Teaches"} data={teaches} checked={true}/>
                <TeacherInfoField title={"Also Speakes"} data={speaks} checked={true}/>
            </div>
            
        </div>
    )
}
