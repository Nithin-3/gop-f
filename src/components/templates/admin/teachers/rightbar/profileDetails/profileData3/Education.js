import React from 'react'
import DataValue from './DataValue'
import { useSelector } from "react-redux"
export default function Education() {
    const { teacher } = useSelector((state) => state.TeacherReducer) 
    const { educationTitle, educationInstitution, educationLocation, educationDesc,educationStart,educationEnd } = teacher

    return (
        <div className=" row col-12  mx-auto tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab">
            <DataValue Datakey={"Title"} data={educationTitle} />
            <DataValue Datakey={"Institute"} data={educationInstitution} />
            <DataValue Datakey={"Location"} data={educationLocation} />
            <DataValue Datakey={"Desc"} data={educationDesc} />
            <DataValue Datakey={"start"} data={educationStart} />
            <DataValue Datakey={"end"} data={educationEnd} />
        </div>
    )
}
/*
 profileImgStatus:false,
        teacherNameStatus:false,
        teacherTypeStatus:false,
        introVideoStatus:false,
        emailStatus:false,
        phoneStatus:false,
        nativeLanguageStatus:false,
        GenderStatus:false,
        ageStatus:false,
        dobStatus:false,
        countryStatus:false,
        teachesStatus:false,
        speaksStatus:false,
        aboutStatus:false,
        educationTitle:false,
        educationInstitutionStatus:false,
        educationLocationStatus:false,
        educationDescStatus:false,
        educationStartStatus:false,
        educationEndStatus:false,
        workInstitutionStatus:false,
        workLocationStatus:false,
        workDescStatus:false,
        workStartStatus:false,
        workEndStatus:false,
        certificateInstitutionStatus:false,
        certificateLocationStatus:false,
        certificateDescStatus:false,
        certificateStartStatus:false,
        certificateEndStatus:false,

*/