import React from "react";

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
  // const {course} = history.location.state;
  const dispatch = useDispatch();
  const course = JSON.parse(localStorage.getItem("chosenCourse"));
  const [coupons, setCoupons] = React.useState([]);
  const [ratings, setRatings] = React.useState([]);
  const [selectedCoupon, setSelectedCoupon] = React.useState();
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    async function getCourses() {
      try {
        const result = await dispatch(viewCouponByCourse(course._id));
        if (result) {
          setCoupons(result);
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function getRatings() {
      try {
        const result = await dispatch(getTeacherRatings(course.userId.onType._id));
        if (result) {
          setRatings(result);
        }
      } catch (e) {
        console.error(e);
      }
    }


    getCourses();
    getRatings();
  }, [dispatch]);

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

            <AboutMe width={width} teacherData={course.userId.onType} />

            <MyCalendar teacherData={course.userId.onType} />

            <TeachingExperties
              width={width}
              teacherData={course.userId.onType}
            />

            <Ratings
              width={width}
              teacherData={ratings}
              selectedCoupon={selectedCoupon}
            />
          </div>

          <div style={{ width: "30%", marginLeft: "20px" }}>
            <TeacherStats width={width} teacherData={course.userId.onType} />

            <TrialLesson width={width} teacherData={course.userId.onType} />

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
            teacherData={course.userId.onType}
          />

          <AboutMe width={width} teacherData={course.userId.onType} />

          <Coupons
            width={width}
            coupons={coupons}
            handleSelectCoupon={handleSelectCoupon}
            selectedCoupon={selectedCoupon}
          />

          <MyCalendar teacherData={course.userId.onType} />

          <TeacherStats width={width} teacherData={course.userId.onType} />

          <TrialLesson width={width} teacherData={course.userId.onType} />

          <PrivateLesson
            width={width}
            data={course}
            selectedCoupon={selectedCoupon}
          />

          <TeachingExperties width={width} teacherData={course.userId.onType} />

          <Ratings width={width} teacherData={ratings} />
        </div>
      )}
    </div>
  );
}

export default TeacherProfile;
