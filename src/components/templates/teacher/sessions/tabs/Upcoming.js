import React from "react";
import RescheduleModal from "../modals/RescheduleModal";
import AddLessonModal from "../modals/AddLessonModal";
import { Card, CardMobile } from "../commonUtils";

function Upcoming({ width, arr }) {
  if (!Array.isArray(arr)) arr = [];
  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const [addLessonModal, setAddlessonModal] = React.useState(false);

  let todayDate = new Date();
  arr = arr.filter(item => item.status === "Upcoming" && new Date(item.to) - todayDate >= 0);
  arr.sort((a, b) => new Date(a.from) - new Date(b.from));

  const dropDownArr = [{ text: "Add Lesson Plan", modal: setAddlessonModal }];

  return (
    <>
      {rescheduleModal && <RescheduleModal setRescheduleModal={setRescheduleModal} width={width} />}
      {addLessonModal && <AddLessonModal setAddlessonModal={setAddlessonModal} width={width} />}
      {width >= 992 ? (
        <div style={{ marginTop: "50px", width: "100%" }}>
          {arr.length > 0 ? arr.map((item, index) => <Card width={width} key={index} cardInfo={item} dropDown={dropDownArr} />) : <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr.length > 0 ? arr.map((item, index) => <CardMobile width={width} key={index} cardInfo={item} dropDown={dropDownArr} />) : <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>}
        </div>
      )}
    </>
  );
}

export default Upcoming;
