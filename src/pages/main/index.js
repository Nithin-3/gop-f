import React from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./auth";
import Blog from "./blogs";
import Faq from "./faq";
import Privacy from "./privacy";
import Teacher from "./teacher";
import Refund from "./refund";
import CookiePolicy from "./cookie";
import Landing from "./landing";
import ScrollToTop from "./scrollToTop";
import ForgotPassword from "./forgotPassword";
import FindTeacher from "../../components/templates/common/findTeacher/FindTeacher";
import Payment from '../../components/templates/common/payment/Payment';
import TeacherProfile from '../../components/templates/common/teacherProfile/TeacherProfile';
import CalendarScreen from "../../components/templates/common/calendar";
import BookScreen from "../../components/templates/common/book";
import Contact from "./conact";
import LiveVidStream from '../../components/templates/common/liveStream/liveVidStream';

const Main = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/signup" element={<Auth />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/apply-teacher" element={<Teacher />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/find-teacher" element={<FindTeacher />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/teacher-profile" element={<TeacherProfile />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/bookCalendar" element={<BookScreen />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Landing />} />
        <Route path="/liveclass" element={<LiveVidStream />} />
        {/* Add a catch-all route if needed */}
        {/* <Route path="*" element={<Landing />} /> */}
      </Routes>
    </ScrollToTop>
  );
};

export default Main;
