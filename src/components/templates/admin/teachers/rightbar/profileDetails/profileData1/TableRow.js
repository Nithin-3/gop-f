import React from 'react'

export default function TableRow({Datakey,data}) {
    return (
        <tr className="row col-12 mx-auto ">
            <td className="col-6">
                <input class="m-0 me-1" type="checkbox" checked={true} />
                <span style={{wordBreak:"break-all"}}>{Datakey}
                    </span>
            </td >
            <td className="col-6" style={{wordBreak:"break-all"}}>{data}</td>
        </tr>
    )
}
