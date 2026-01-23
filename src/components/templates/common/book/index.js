import React, { useEffect } from "react";
import MyCalendar from "../../student/Calendar/MyCalendar";
import Navigation from "../../../../landing/components/Nav";
import { useLocation, useNavigate } from "react-router-dom";

function BookScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = JSON.parse(localStorage.getItem("chosenCourse")) || {};

  useEffect(() => {
    if (!course || !course.userId) {
      navigate("/find-teacher");
    }
  }, [course, navigate]);

  if (!course || !course.userId) {
    return null;
  }

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
