import React from "react";
import MyCalendar from "../../student/Calendar/MyCalendar";
import Navigation from "../../../../landing/components/Nav";
import { useLocation } from "react-router-dom";

function BookScreen() {
  const location = useLocation();
  const course = JSON.parse(localStorage.getItem("chosenCourse")) || {};

  const coupon = location.state?.coupon || null;
  const teacherData = course.userId?.onType || null;

  return (
    <div style={{ paddingTop: "100px" }}>
      <Navigation />
      <MyCalendar teacherData={teacherData} coupon={coupon} />
    </div>
  );
}

export default BookScreen;
