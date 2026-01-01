import React from 'react'
// import logo from "../../../assets/image/logo.png"
import avtar from "../../Avtar.png"

import style from "./navbar.module.css"
export default function Navbar() {
    return (
        <>
            <div className={style.navbar + "  col-12 d-none d-lg-flex flex-row justify-content-center"}>
                <i className=" mx-1 my-auto fs-3 far fa-comments text-danger"></i>
                <h4 className="mx-1 text-uppercase my-auto text-white fwt-bold">neurolingua</h4>
            </div>
            <div className={style.navbar + "  col-12 d-flex d-lg-none flex-row  justify-content-start align-items-center my-2 mx-0"}>
                <img src={avtar} alt="" />
                <div className="ms-2  ">
                    <h4 className=" px-1 mx-0 text-capitalize my-auto text-white fwt-bold">Welcome Aayush!</h4>
                    <span className=" px-1 text-capitalize my-auto text-white fwt-bold">Admin</span>
                </div>
                <i class=" ms-auto fs-2 me-2 text-light far fa-times-circle" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
            </div>
        </>
    )
}
