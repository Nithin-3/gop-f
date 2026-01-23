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
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="sessions" element={<TeacherSessions />} />
        <Route path="availability" element={<Availability />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="blogs" element={<TeacherBlogs />} />
        <Route path="coupons" element={<TeacherCoupons />} />
        <Route path="earnings" element={<TeacherEarnings />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="onboard" element={<TeacherOnBoard />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </>
  );
};

export default Teacher;
