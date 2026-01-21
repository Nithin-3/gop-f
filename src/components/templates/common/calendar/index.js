import React from 'react';
import TrailCalendar from '../../student/Calendar/TrailCalendar';
import Navigation from '../../../../landing/components/Nav';

function CalendarScreen(props) {

    const course = JSON.parse(localStorage.getItem("chosenCourse"))

    return (
        <div style={{ paddingTop: '100px' }}>
            <div>
                <Navigation />
            </div>
            <TrailCalendar teacherData={course.userId.onType} course={course} />
        </div>
    )
}

export default CalendarScreen;