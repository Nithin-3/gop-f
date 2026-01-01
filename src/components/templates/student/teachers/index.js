import React from 'react';
import teacherStyles from '../styles.module.css';
import styles from './styles.module.css';
import { useDispatch } from "react-redux";
import { getCurrentTeachers } from '../../../../store/actions/student/index';
import { getTeacherDetailByTId } from '../../../../store/actions/teacher/index';
import { useWindowDimensions } from '../../../../utils/util';
import CurrTeacherCard from './CurrTeacherCard/CurrTeacherCard';

function StudentTeachers(props) {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = React.useState('Favorited');
    const [currentTeachers, setCurrentTeachers] = React.useState([])

    const tabs = ['Favorited', 'Current'];
    console.log(activeTab)

    React.useEffect(() => {
        console.log("running")
        let userProfile = JSON.parse(window.localStorage.getItem("profile"));
        console.log(userProfile._id)
        async function getCurrenTeachers() {
            try {
                const res = await dispatch(getCurrentTeachers(userProfile._id))
                console.log(res)
                res.map(tid => {
                    getTeacherDetails(tid).then(res => {
                        setCurrentTeachers((prev) => [...prev, res])
                    })
                        .catch(err => { console.log(err) })
                })
            } catch (error) {
                console.log(error)
            }
        }

        async function getTeacherDetails(tid) {
            try {
                const res = await dispatch(getTeacherDetailByTId(tid))
                console.log(res)
                return res
            } catch (error) {
                console.log(error)
            }
        }

        getCurrenTeachers()
    }, [])

    console.log(currentTeachers)
    return (
        <main className={teacherStyles.mainSection}>
            <div className={styles.sessionTabs}>
                {tabs.map((item, index) => (
                    <div key={index} className={styles.sessionTab + ' ' + `${activeTab == item ? styles.sessionTabActive : ''}`} onClick={() => { setActiveTab(item) }}>
                        {item}
                    </div>
                ))}
            </div>
            
            <div className={styles.displayArea}>
                {activeTab === "Current" ?
                    <div>
                        {currentTeachers?.map((item) => {
                                console.log(item);
                                return (<CurrTeacherCard tinfo={item} /> )
                            })}
                    </div>
                    :
                    <div>No Favourite Teachers</div>}
            </div>


        </main>
    )
}

export default StudentTeachers;


