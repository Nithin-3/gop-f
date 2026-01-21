import React from 'react';
import StudentBookingGrid from '../../student/Calendar/StudentBookingGrid';
import Navigation from '../../../../landing/components/Nav';

function CalendarScreen(props) {

    const course = JSON.parse(localStorage.getItem("chosenCourse"))

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