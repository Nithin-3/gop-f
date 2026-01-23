import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LeftSideBar from "../../components/templates/common/leftSideBar/leftSidebar";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { adminSidebar } from "../../utils/constants";

import AdminDashboard from '../../components/templates/admin/dashboard';
import AdminTeachers from '../../components/templates/admin/teachers';
import AdminCourses from '../../components/templates/admin/courses/index';
import AdminLanguages from "../../components/templates/admin/languages/language";
import AdminStudents from "../../components/templates/admin/students";
import AdminBookedCourses from "../../components/templates/admin/bookedCourses";
import AdminCancelledSessions from "../../components/templates/admin/cancelledSessions";
import AdminPayment from "../../components/templates/admin/payment";
import AdminBlog from "../../components/templates/admin/blog";
import AdminNotification from "../../components/templates/admin/notification";
import Messages from "../../components/templates/common/messages";

const Admin = () => {
  return (
    <>
      <LeftSideBar list={adminSidebar} />
      <Routes>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute authRole={["Admin", "Tutor", "Payment"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="teachers"
          element={
            <ProtectedRoute authRole={["Admin", "Tutor"]}>
              <AdminTeachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <ProtectedRoute authRole={["Admin", "Tutor"]}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="languages"
          element={
            <ProtectedRoute authRole={["Admin", "Tutor"]}>
              <AdminLanguages />
            </ProtectedRoute>
          }
        />
        <Route path="students" element={<AdminStudents />} />
        <Route path="booked-courses" element={<AdminBookedCourses />} />
        <Route path="cancelledSessions" element={<AdminCancelledSessions />} />
        <Route path="payment" element={<AdminPayment />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notification" element={<AdminNotification />} />

        {/* Redirect unknown admin routes to dashboard */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </>
  );
};

export default Admin;
