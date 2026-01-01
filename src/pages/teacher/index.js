import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import { teacherSidebar } from "../../utils/constants";

import TeacherDashboard from "../../components/templates/teacher/dashboard";
import TeacherCourses from "../../components/templates/teacher/courses/index";
import TeacherSessions from "../../components/templates/teacher/sessions/index";
import Availability from "../../components/templates/teacher/availability/availability";
import TeacherStudents from "../../components/templates/teacher/students/index";
import TeacherBlogs from "../../components/templates/teacher/blogs";
import TeacherCoupons from "../../components/templates/teacher/coupons/index";
import TeacherEarnings from "../../components/templates/teacher/earnings";
import TeacherSettings from "../../components/templates/teacher/settings/settings";
import TeacherOnBoard from "../../components/templates/teacher/onboard";
import Messages from "../../components/templates/common/messages";

const Teacher = () => {
  const location = useLocation();

  const hideSidebarPaths = ["/teacher/onboard", "/teacher/verifyEmail"];
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <>
      {showSidebar && <LeftSideBar list={teacherSidebar} />}
      <Routes>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeacherCourses />} />
        <Route path="/teacher/sessions" element={<TeacherSessions />} />
        <Route path="/teacher/availability" element={<Availability />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/blogs" element={<TeacherBlogs />} />
        <Route path="/teacher/coupons" element={<TeacherCoupons />} />
        <Route path="/teacher/earnings" element={<TeacherEarnings />} />
        <Route path="/teacher/messages" element={<Messages />} />
        <Route path="/teacher/settings" element={<TeacherSettings />} />
        <Route path="/teacher/onboard" element={<TeacherOnBoard />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default Teacher;
