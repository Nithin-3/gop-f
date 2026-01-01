import React from 'react'

export default function TeacherInfoField({ title, data, checked }) {
    return (
        <div className="col col-auto ">
            <div className="row my-1">
                <div className="col">
                    <input class="m-0 m-1" type="checkbox" checked={checked} />
                    <span>{title}</span>
                </div>
            </div>
            <div className="row my-1">
                <div className="col text-center">
                    <span>{data}</span>
                </div>
            </div>
        </div>
    )
}
