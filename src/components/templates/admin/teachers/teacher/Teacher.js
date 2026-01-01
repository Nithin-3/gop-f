import React from 'react'
import avtar from "../../Avtar.png"
import style from "./teacher.module.css"
import { Link } from "react-router-dom"
export default function Teacher({ teacher, activeTeacher, setActiveTeacher }) {
    const { _id,finalStatus, teacherName, introVideo, email, phone, nativeLanguage, country } = teacher
    return (
        <tr onClick={() => setActiveTeacher(_id)}
            style={_id + "" == activeTeacher ? { backgroundColor: "var(--bg-light-pink)" } : null}
            className={style.teacher + " my-2"}>
            <td scope="row"><i style={{color:finalStatus?"green":"red"}} class=" fas fa-circle"></i></td>
            <td className={"me-auto"}>
                <img className="d-none d-lg-inline" src={avtar} alt="" />
                <span class="ms-2">{teacherName?.split(" ")[0]}</span>
            </td>
            <td>{nativeLanguage}</td>
            <td>
                <i onClick={() => window.open(introVideo, "_blank")} class={style.youtube + "  fab fa-youtube"}></i>
            </td>
            <td className="   px-1 ">
                <i onClick={() => window.open(`mailto:${email}?`, "_blank")} class={style.contact + " col me-1 me-lg-3  fas fa-envelope"}></i>
                <i class={style.contact + "  col ms-1 ms-lg-3  fas fa-phone"}></i>
            </td>
            <td>{country}</td>
        </tr>

    )
}
