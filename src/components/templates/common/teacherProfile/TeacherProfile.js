import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import TeacherCard from "./teacherCard/TeacherCard";
import TeacherStats from "./teacherStats/TeacherStats";
import AboutMe from "./aboutMe/AboutMe";
import TrialLesson from "./trialLesson/TrialLesson";
import PrivateLesson from "./privateLesson/PrivateLesson";
import TeachingExperties from "./teachingExperties/TeachingExperties";
import Ratings from "./ratings/Ratings";
import MyCalendar from "../../student/Calendar/MyCalendar";

import Navigation from "../../../../landing/components/Nav";

import { useWindowDimensions } from "../../../../utils/util";

import "./teacherProfile.css";
import Coupons from "./coupons/Coupons";
import { useDispatch } from "react-redux";
import { viewCouponByCourse } from "../../../../store/actions/coupon";
import { getTeacherRatings } from "../../../../store/actions/course";

function TeacherProfile() {
  const location = useLocation();
  const dispatch = useDispatch();

  const getInitialCourse = () => {
    try {
      if (location.state?.course) return location.state.course;
      const stored = localStorage.getItem("chosenCourse");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return null;
    }
  };

  const course = getInitialCourse();
  const [coupons, setCoupons] = React.useState([]);
  const [ratings, setRatings] = React.useState(null);
  const [selectedCoupon, setSelectedCoupon] = React.useState();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!course?._id) {
      toast.error("Course details not found");
      navigate("/find-teacher");
      return;
    }

    async function getCouponsData() {
      try {
        const result = await dispatch(viewCouponByCourse(course._id));
        if (Array.isArray(result)) {
          setCoupons(result);
        } else {
          setCoupons([]);
        }
      } catch (e) {
        console.error("viewCouponByCourse error:", e);
        setCoupons([]);
      }
    }

    async function getRatingsData() {
      try {
        if (course.userId?.onType?._id) {
          const result = await dispatch(getTeacherRatings(course.userId.onType._id));
          if (result && typeof result === 'object') {
            setRatings(result);
          }
        }
      } catch (e) {
        console.error("getTeacherRatings error:", e);
      }
    }

    getCouponsData();
    getRatingsData();
  }, [dispatch, course?._id, navigate]);

  if (!course) return null;
  const teacherData = course.userId?.onType;

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  return (
    <div className='parent-container' style={{ paddingTop: "100px" }}>
      <div>
        <Navigation />
      </div>

      {width >= 992 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 10vw",
          }}>
          <div style={{ width: "65%" }}>
            <TeacherCard course={course} width={width} />

            <Coupons
              width={width}
              coupons={coupons}
              handleSelectCoupon={handleSelectCoupon}
              selectedCoupon={selectedCoupon}
            />

            <AboutMe width={width} teacherData={teacherData} />

            <MyCalendar teacherData={teacherData} course={course} />

            <TeachingExperties
              width={width}
              teacherData={teacherData}
            />

            <Ratings
              width={width}
              teacherData={ratings}
              selectedCoupon={selectedCoupon}
            />
          </div>

          <div style={{ width: "30%", marginLeft: "20px" }}>
            <TeacherStats width={width} teacherData={teacherData} ratings={ratings} />

            <TrialLesson width={width} teacherData={teacherData} course={course} />

            <PrivateLesson
              width={width}
              data={course}
              selectedCoupon={selectedCoupon}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            margin: "0 auto",
            // width: "90vw",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TeacherCard
            course={course}
            width={width}
            teacherData={teacherData}
          />

          <AboutMe width={width} teacherData={teacherData} />

          <Coupons
            width={width}
            coupons={coupons}
            handleSelectCoupon={handleSelectCoupon}
            selectedCoupon={selectedCoupon}
          />

          <MyCalendar teacherData={teacherData} course={course} />

          <TeacherStats width={width} teacherData={teacherData} ratings={ratings} />

          <TrialLesson width={width} teacherData={teacherData} course={course} />

          <PrivateLesson
            width={width}
            data={course}
            selectedCoupon={selectedCoupon}
          />

          <TeachingExperties width={width} teacherData={teacherData} />

          <Ratings width={width} teacherData={ratings} />
        </div>
      )}
    </div>
  );
}

export default TeacherProfile;
