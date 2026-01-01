import React from 'react'
import style from "../../rightbar.module.css"
import TableRow from './TableRow'
import { useSelector } from "react-redux"
export default function ProfileData1() {
    const {teacher} = useSelector((state) => state.TeacherReducer)
    const {teacherName,teacherType,introVideo,email,phone,nativeLanguage}=teacher

    return (
        <div className={style.ProfileDataOne + " row col-12 p-0 m-0 mb-2"}>
            <table class=" bg-white p-0 m-0 table-borderless">
                <tbody>
                    <TableRow Datakey={"Name"} data={teacherName} />
                    <TableRow Datakey={"Teacher Type"} data={teacherType} />
                    <TableRow Datakey={"Intro Video"} data={ <i  onClick={() => window.open(introVideo, "_blank")} class={" text-danger fs-6 fab fa-youtube"}></i>} />
                    <TableRow Datakey={"Email"} data={email} />
                    <TableRow Datakey={"Phone"} data={phone.countryCode+ " "+phone.phoneNumber} /> 
                    <TableRow Datakey={"Mother Tongue"} data={nativeLanguage} />
                </tbody>
            </table>
        </div>
    )
}
