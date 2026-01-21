import React, { useContext } from 'react'
import avtar from "../../../../Avtar.png"
import style from "../../rightbar.module.css"
import { teacherContext } from '../../RightBar'
export default function ProfileImg({ teacherStatus }) {
    const { profileImgStatus, setTeacherStatus } = useContext(teacherContext)
    const HandleInput = (data) => {
        setTeacherStatus(data)
    }
    return (
        <div className={style.ProfileImg + " d-flex mb-1 align-items-center justify-content-center  "}>
            <input class={style.checkbox} type="checkbox" checked={profileImgStatus} onChange={() => HandleInput(!profileImgStatus)} />
            <img className=" " src={avtar} alt="profile" />
        </div>
    )
}
