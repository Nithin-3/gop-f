import React from "react";
import RescheduleModal from "../modals/RescheduleModal";
import AddLessonModal from "../modals/AddLessonModal";
import { Card, CardMobile } from "../commonUtils";

function Upcoming({ width, arr }) {
  if (!Array.isArray(arr)) arr = [];
  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const [addLessonModal, setAddlessonModal] = React.useState(false);

  const todayDate = new Date();
  const upcomingSessions = arr.filter(item => {
    const isFuture = item.to && new Date(item.to) >= todayDate;
    const isUpcomingStatus = item.status === "Upcoming";
    // If status is "Upcoming" OR (it has dates, it is in future, and status is not something else like Cancelled/Need Scheduling)
    return isUpcomingStatus || (isFuture && !item.status);
  });
  upcomingSessions.sort((a, b) => new Date(a.from) - new Date(b.from));

  const dropDownArr = [{ text: "Add Lesson Plan", modal: setAddlessonModal }];

  return (
    <>
      {rescheduleModal && <RescheduleModal setRescheduleModal={setRescheduleModal} width={width} />}
      {addLessonModal && <AddLessonModal setAddlessonModal={setAddlessonModal} width={width} />}
      {width >= 992 ? (
        <div style={{ marginTop: "50px", width: "100%" }}>
          {upcomingSessions.length > 0 ? upcomingSessions.map((item, index) => <Card width={width} key={index} cardInfo={item} dropDown={dropDownArr} />) : <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {upcomingSessions.length > 0 ? upcomingSessions.map((item, index) => <CardMobile width={width} key={index} cardInfo={item} dropDown={dropDownArr} />) : <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>}
        </div>
      )}
    </>
  );
}

export default Upcoming;
