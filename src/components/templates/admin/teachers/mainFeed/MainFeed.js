import React,{useState} from 'react'
import TeachersListTable from '../teachersListTable/TeachersListTable'
import Topbar from '../topbar/Topbar'

export default function MainFeed() {
    const [searchInput,setSearchInput]=useState("")
    return (
        <div>
            <Topbar searchInput={searchInput} setSearchInput={(input)=>setSearchInput(input)}/>
            <TeachersListTable searchInput={searchInput}/>
        </div>
    )
}
