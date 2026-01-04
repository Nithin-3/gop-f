import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import { studentSidebar } from "../../utils/constants";

import StudentDashboard from "../../components/templates/student/dashboard";
import StudentSessions from "../../components/templates/student/sessions";
import StudentTeachers from "../../components/templates/student/teachers";
import StudentHomework from "../../components/templates/student/homework";
import StudentWallet from "../../components/templates/student/wallet";
import StudentRefer from "../../components/templates/student/referFriend";
import StudentProgress from "../../components/templates/student/progress";
import StudentSettings from "../../components/templates/student/settings";
import StudentCertificates from "../../components/templates/student/certificates";
import Messages from "../../components/templates/common/messages";
import MyCalendar from "../../components/templates/student/Calendar/MyCalendar";

const Student = () => {
  const location = useLocation();
  const hideSidebarPaths = ["/student/calendar", "/student/verifyEmail"];
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <>
      {showSidebar && <LeftSideBar list={studentSidebar} student />}

      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="sessions" element={<StudentSessions />} />
        <Route path="teachers" element={<StudentTeachers />} />
        <Route path="homework" element={<StudentHomework />} />
        <Route path="wallet" element={<StudentWallet />} />
        <Route path="refer" element={<StudentRefer />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="certificates" element={<StudentCertificates />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="calendar" element={<MyCalendar />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </>
  );
};

export default Student;
