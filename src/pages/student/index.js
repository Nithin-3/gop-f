import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import { studentSidebar } from "../../utils/constants";

import StudentDashboard from '../../components/templates/student/dashboard';
import StudentSessions from '../../components/templates/student/sessions/index';
import StudentTeachers from '../../components/templates/student/teachers/index';
import StudentHomework from '../../components/templates/student/homework';
import StudentWallet from '../../components/templates/student/wallet';
import StudentRefer from '../../components/templates/student/referFriend';
import StudentProgress from '../../components/templates/student/progress';
import StudentSettings from "../../components/templates/student/settings";
import StudentCertificates from '../../components/templates/student/certificates';
import Messages from "../../components/templates/common/messages";
import MyCalendar from '../../components/templates/student/Calendar/MyCalendar';

const Student = () => {
  const location = useLocation();

  // Conditionally hide LeftSideBar for calendar and verifyEmail routes
  const hideSidebarPaths = ["/student/calendar", "/student/verifyEmail"];
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <>
      {showSidebar && <LeftSideBar list={studentSidebar} student />}
      <Routes>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/sessions" element={<StudentSessions />} />
        <Route path="/student/teachers" element={<StudentTeachers />} />
        <Route path="/student/homework" element={<StudentHomework />} />
        <Route path="/student/wallet" element={<StudentWallet />} />
        <Route path="/student/refer" element={<StudentRefer />} />
        <Route path="/student/progress" element={<StudentProgress />} />
        <Route path="/student/certificates" element={<StudentCertificates />} />
        <Route path="/student/messages" element={<Messages />} />
        <Route path="/student/settings" element={<StudentSettings />} />
        <Route path="/student/calendar" element={<MyCalendar />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default Student;
