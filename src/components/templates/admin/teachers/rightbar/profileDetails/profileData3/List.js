import React from 'react'
import style from "../../rightbar.module.css"
export default function List({ active,show,title, target }) {
    return (
        <li class={style.pillList+ " nav-item col-auto p-0 m-0"} role="presentation">
            <button class={"nav-link fs-6 p-2 py-1 " + active }id="pills-certificate-tab" data-bs-toggle="pill" data-bs-target={target} type="button" role="tab" aria-controls="pills-certificate" aria-selected={show}>{title}</button>
        </li>
    )
}
