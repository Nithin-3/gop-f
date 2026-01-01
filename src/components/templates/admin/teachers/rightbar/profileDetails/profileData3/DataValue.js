import React from 'react'

export default function DataValue({Datakey,data}) {
    return (
        <div className="row">
            <div className="col-6">
                <input class="m-0 m-1" type="checkbox" checked={true} />
                <span>{Datakey}</span>
            </div>
            <div className="col-6" style={{wordBreak:"break-all"}}>{data}</div>
            
        </div>
    )
}
