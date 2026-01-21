import React from 'react';
import teacherStyles from '../styles.module.css';
import styles from './styles.module.css';
import { useDispatch } from "react-redux";
import { getCurrentTeachers } from '../../../../store/actions/student/index';
import { getTeacherDetailByTId } from '../../../../store/actions/teacher/index';
import CurrTeacherCard from './CurrTeacherCard/CurrTeacherCard';

function StudentTeachers() {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = React.useState('Favorited');
    const [currentTeachers, setCurrentTeachers] = React.useState([])

    const tabs = ['Favorited', 'Current'];

    React.useEffect(() => {
        let userProfile = JSON.parse(window.localStorage.getItem("profile"));
        async function fetchTeachers() {
            try {
                const res = await dispatch(getCurrentTeachers(userProfile._id))
                res.forEach(tid => {
                    getTeacherDetails(tid).then(res => {
                        setCurrentTeachers((prev) => [...prev, res])
                    }).catch(err => { console.error(err) })
                })
            } catch (error) {
                console.error(error)
            }
        }

        async function getTeacherDetails(tid) {
            try {
                const res = await dispatch(getTeacherDetailByTId(tid))
                return res
            } catch (error) {
                console.error(error)
            }
        }

        fetchTeachers()
    }, [dispatch])

    return (
        <main className={teacherStyles.mainSection}>
            <div className={styles.sessionTabs}>
                {tabs.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.sessionTab} ${activeTab === item ? styles.sessionTabActive : ''}`}
                        onClick={() => { setActiveTab(item) }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <div className={styles.displayArea}>
                {activeTab === "Current" ?
                    <div>
                        {currentTeachers?.map((item) => {

                            return (<CurrTeacherCard tinfo={item} />)
                        })}
                    </div>
                    :
                    <div>No Favourite Teachers</div>}
            </div>


        </main>
    )
}

export default StudentTeachers;


