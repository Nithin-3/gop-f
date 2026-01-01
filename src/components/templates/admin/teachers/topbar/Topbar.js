import React from 'react'
import style from "./topbar.module.css"
export default function Topbar({searchInput,setSearchInput}) {
    return (
        <div className={style.topProfileVerification + " row col-12 mx-auto  d-flex justify-content-between p-4 px-2"}>
            <span className="col-4 d-none d-lg-flex fs-4 my-auto ">Profile Verification</span>
            <span className={style.downloadBtn + " col-5 order-2 order-lg-1 col-lg-2  ms-auto   text-center my-auto p-2"}>
                Download
                <i class="fs-5 ms-1  fas fa-download"></i>
                </span>
            <span className={style.searchInput + " col-6  order-1 order-lg-2 col-lg-4 p-0 px-2  ms-2 my-auto  d-flex flex-row"}>
                <i class=" fs-6 mx-1  my-auto fas fa-search"></i>
                <input value={searchInput}onChange={(e)=>setSearchInput(e.target.value)}  className="form-control border-0 outline-none form-control-sm bg-transparent" type="text" placeholder="Search here by name" aria-label=".form-control-sm example"></input>
            </span>
        </div>
    )
}
