import React, { useState, useEffect } from 'react'

import Teacher from '../teacher/Teacher'
import style from "./TeachersListTable.module.css"
import { useDispatch } from "react-redux"

import axios from "axios"
import { setTeacher } from '../../../../../store/actions/teacherOnboard/teacherOnboardAction'
export default function TeachersListTable({searchInput}) {
      const dispatch = useDispatch()
    const [teacherList, setTeacherList] = useState([])
    const [activeTeacher, setActiveTeacher] = useState([])
    
    useEffect(() => {
        const getAllTeachers = async () => {
            try {
                const teacherList = await axios.get("/teacherManagement/")
                setTeacherList(teacherList.data)
            } catch (err) {
                console.log("error in getting all teacher", err)
            }
        }
        getAllTeachers()
    }, [])
    useEffect(() => {
        const getTeacher = async () => {
            try {
                const teacher = await axios.get(`/teacherManagement/specific/${activeTeacher}`)
                dispatch(setTeacher(teacher.data))
            } catch (err) {
                console.log("error in getting a teacher", err)
            }
        }
        getTeacher()
    }, [activeTeacher])
    return (
        <div className={style.tableContainer + " row col-12  mx-auto p-0"}>
            <table class="table table-borderless  text-center p-0 m-0 mb-auto">
                <thead class=" m-0">
                    <tr className={style.tableHeading}>
                        <td scope="col" class="">
                            <span className="d-none d-lg-inline">Status</span>
                            <div className=" d-inline justify-content-center align-items-center">

                                <i class={style.status + "  d-inline d-lg-none   fas fa-circle"}></i>
                                <i class={" fas fa-arrow-down ms-2"}></i>
                            </div>
                        </td>
                        <td scope="col">Name<i class=" fas fa-arrow-down ms-2 "></i></td>
                        <td scope="col"><span className="d-none d-lg-inline">Native</span> Language<i class=" fas fa-arrow-down ms-2"></i></td>
                        <td className="d-none d-lg-table-cell" scope="col">Intro Video<i class=" fas fa-arrow-down ms-2"></i></td>
                        <td className="d-none d-lg-table-cell" scope="col">Contact<i class=" fas fa-arrow-down ms-2"></i></td>
                        <td className=" d-lg-none" colspan="2" scope="col">Details<i class=" fas fa-arrow-down ms-2"></i></td>
                        <td scope="col">Country<i class=" fas fa-arrow-down ms-2"></i></td>
                    </tr>
                </thead>
                <tbody className="my-auto">
                    {
                        teacherList?.map((teacher) =>
                            teacher?.teacherName?.toLowerCase().includes(searchInput.toLowerCase())&&<Teacher key={teacher._id} activeTeacher={activeTeacher} setActiveTeacher={(active)=>setActiveTeacher(active)} teacher={teacher}/>
                        )
                    }
                   
                </tbody>
            </table>
        </div>
    )
}
