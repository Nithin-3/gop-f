import React from 'react'
import { useSelector } from "react-redux"
export default function About() {
    const {teacher} = useSelector((state) => state.TeacherReducer)
    
    return (
        <div class="  row col-12  mx-auto tab-pane fade show active " id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab">
            <input class="m-0 m-1" type="checkbox" checked={true} />
            <div className="col-11 mx-auto">
                <p className=" row col-12 mx-auto text-justify">{teacher.about}</p>
               </div>
        </div>
    )
}
 