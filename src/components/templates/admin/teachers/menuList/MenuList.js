import React from 'react'
import style from "./menuList.module.css"
import {Link} from "react-router-dom"
export default function MenuList({link,active,name,iconClass,setActive,index}) {
   
    return (
        <Link to={link+""} id={active==index && style.activeStyle} onClick={()=>setActive(index)} className={style.MenuList+ " col-12 mx-lg-auto  text-decoration-none   py-3  d-flex flex-row  justify-content-start"}>
            <i className={" fs-5 my-auto   "+ iconClass}></i>
            <h4 className={style.item+ " my-auto "}>{name}</h4>
        </Link>
    )
}
 