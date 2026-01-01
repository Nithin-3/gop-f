import React from 'react'
import DataValue from './DataValue'
import { useSelector } from "react-redux"
export default function Work() {
    const { teacher } = useSelector((state) => state.TeacherReducer) 
    const { workTitle, workInstitution, workLocation, workDesc,workStart,workEnd } = teacher

    return (
        <div class=" row col-12  mx-auto tab-pane fade" id="pills-work" role="tabpanel" aria-labelledby="pills-work-tab">
            <DataValue Datakey={"Title"} data={workTitle} />
            <DataValue Datakey={"Institute"} data={workInstitution} />
            <DataValue Datakey={"Location"} data={workLocation} />
            <DataValue Datakey={"Desc"} data={workDesc} />
            <DataValue Datakey={"start"} data={workStart} />
            <DataValue Datakey={"end"} data={workEnd} />
        </div>
    )
}
