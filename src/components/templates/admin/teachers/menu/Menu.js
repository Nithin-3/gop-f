import React, { useState } from 'react'
import MenuList from '../menuList/MenuList'

export default function Menu() {
    const List = [
        {
            name: "Dashboard",
            iconClass: "fas fa-th-large"
        },
        {
            name: "Teachers",
            iconClass: "fas fa-chalkboard-teacher",
            link:"/teacher/dashboard"
        },
        {
            name: "Courses",
            iconClass: "fas fa-graduation-cap"
        },
        {
            name: "Students",
            iconClass: "fas fa-user-graduate"
        },
        {
            name: "Booked Course",
            iconClass: "fas fa-book"
        },
        {
            name: "Payment",
            iconClass: "far fa-credit-card"
        },
        {
            name: "Blog",
            iconClass: "fas fa-pen-square"
        },
        {
            name: "Notification",
            iconClass: "fas fa-volume-down"
        },
    ]
    const [active,setActive]=useState("-1")
    return (
        <div className="row col-8  col-lg-12  mx-0 mx-lg-auto  p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            {
                List?.map((l,i) =>
                    <MenuList active={active} setActive={(idx)=>setActive(idx)} link={l.link} index={i} name={l.name} iconClass={l.iconClass} />
                )
            }
            
        </div>
    )
}
