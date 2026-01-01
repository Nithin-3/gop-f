import React from 'react'
import DataValue from './DataValue'
import style from "../../rightbar.module.css"
import { useSelector } from "react-redux"
export default function Certificate() {
    const { teacher } = useSelector((state) => state.TeacherReducer)
    const { certificateTitle, certificateInstitution, certificateLocation, certificateDesc, certificateStart, certificateEnd } = teacher

    return (
        <>
            <div class={style.certificate + " row col-12   mx-auto tab-pane fade"} id="pills-certificate" role="tabpanel" aria-labelledby="pills-certificate-tab">
                <div className={style.Info}>
                    <DataValue Datakey={"Title"} data={certificateTitle} />
                    <DataValue Datakey={"Institute"} data={certificateInstitution} />
                    <DataValue Datakey={"Location"} data={certificateLocation} />
                    <DataValue Datakey={"Desc"} data={certificateDesc} />
                    <DataValue Datakey={"start"} data={certificateStart} />
                    <DataValue Datakey={"end"} data={certificateEnd} />
                </div>
                <div className={style.SubmitStatus + " row col-12 mx-auto my-0  d-flex justify-content-around  "}>
                    <button className={style.saveBtn + " col-3 border-0 bg-secondary  "}>Save</button>
                    <button className={style.submitBtn + " col-4 border-0  "}>Submit</button>
                    <button className={style.rejectBtn + " col-4 border-0  "}>Reject</button>
                </div>
            </div>
        </>
    )
}
