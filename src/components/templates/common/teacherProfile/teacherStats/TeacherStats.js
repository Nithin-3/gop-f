import React from 'react';

import styles from './styles.module.css';

function TeacherStats(props) {
    const { width, teacherData, ratings } = props;

    // console.log("TeacherStats ratings:", ratings);

    const d = teacherData?.createdAt ? new Date(teacherData.createdAt) : new Date();
    const final_d = new Date(d.getTime() + d.getTimezoneOffset() * 60000);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const joinedDate = teacherData?.createdAt
        ? `${monthNames[final_d.getMonth()]} ${final_d.getDate()}, ${final_d.getFullYear()}`
        : "N/A";

    const stats = [
        {
            icon: 'far fa-clock',
            stat: 'Response Time',
            details: teacherData?.responseTime || 'Within a few hours'
        },
        {
            icon: 'far fa-calendar',
            stat: 'Joined Neurolingua',
            details: joinedDate
        },
        {
            icon: 'fas fa-map-marker-alt',
            stat: 'Attendance Rate',
            details: teacherData?.attendanceRate ? `${teacherData.attendanceRate}%` : '100.00%'
        },
        {
            icon: 'fas fa-desktop',
            stat: 'Total Lessons',
            details: teacherData?.numClassesTaken || ratings?.totalLessons || '0'
        },
        {
            icon: 'fas fa-chalkboard-teacher',
            stat: 'Lessons per Student',
            details: teacherData?.lessonsPerStudent || `${ratings?.lessonsPerStudent || '0'} lesson average`
        },
        {
            icon: 'far fa-star',
            stat: 'Average Rating',
            details: teacherData?.avgRating || ratings?.avgRating || '5.0'
        }
    ]

    return (
        <div style={{ borderRadius: '10px', width: width >= 992 ? '100%' : '90%', marginTop: width >= 992 ? '0' : '10px', backgroundColor: '#fefeff', padding: '20px' }}>
            <div style={{ fontWeight: 'bold' }}>Teacher Stats</div>

            {stats.map((item, index) => (
                <div style={{ marginTop: '30px', display: 'inline-block', width: '50%' }}>
                    <i className={styles.iconClass + " " + item.icon}></i>
                    <br />
                    <span className={styles.text1}>{item.stat}</span>
                    <br />
                    <span className={styles.text2}>{item.details}</span>
                </div>
            ))}
        </div>
    )
}

export default TeacherStats;
