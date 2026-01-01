import React from 'react'
import style from "../../rightbar.module.css"
import About from './About'
import Certificate from './Certificate'
import Education from './Education'
import List from './List'
import Work from './Work'
export default function ProfileData3() {
    return (
        <>
            <div className={style.ProfileDataThree + " row  col-12 mx-auto border border-2 p-0 px-1 m-0 mb-1 "}>
                <ul class="nav nav-pills  d-flex justify-content-evenly mx-auto  p-0 pt-2" id="pills-tab" role="tablist">
                    <List  active={"active"} show={true} title={"About"} target={"#pills-about"} />
                    <List  show={false} title={"Education"} target={"#pills-education"} />
                    <List  show={false} title={"Work"} target={"#pills-work"} />
                    <List  show={false} title={"Certificate"} target={"#pills-certificate"} />
                </ul>
                <div class={style.tabContent + " tab-content col-12  d-flex flex-column p-0 m-0"} id="pills-tabContent">
                   <About/>
                    <Education/>
                    <Work/>
                    <Certificate/>
                </div>

            </div>
            
        </>
    )
}
