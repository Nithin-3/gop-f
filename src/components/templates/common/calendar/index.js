import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentBookingGrid from '../../student/Calendar/StudentBookingGrid';
import Navigation from '../../../../landing/components/Nav';

function CalendarScreen(props) {
    const navigate = useNavigate();
    const course = JSON.parse(localStorage.getItem("chosenCourse"))

    useEffect(() => {
        if (!course || !course.userId) {
            navigate("/find-teacher");
        }
    }, [course, navigate]);

    if (!course || !course.userId) {
        return null;
    }

    return (
        <div style={{ paddingTop: '100px' }}>
            <div>
                <Navigation />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <StudentBookingGrid teacherData={course.userId.onType} course={course} />
            </div>
        </div>
    )
}

export default CalendarScreen;