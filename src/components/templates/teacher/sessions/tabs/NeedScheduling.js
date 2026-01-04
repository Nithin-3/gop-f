import React from "react";
import RescheduleModal from "../modals/RescheduleModal";
import AddLessonModal from "../modals/AddLessonModal";
import { Card, CardMobile } from "../commonUtils";

function NeedScheduling({ width, arr }) {
  if (!Array.isArray(arr)) arr = [];
  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const [addLessonModal, setAddlessonModal] = React.useState(false);

  arr = arr.filter(item => item.status === "Need Scheduling");
  const dropDownArr = [];

  return (
    <>
      {rescheduleModal && <RescheduleModal setRescheduleModal={setRescheduleModal} width={width} />}
      {addLessonModal && <AddLessonModal setAddlessonModal={setAddlessonModal} width={width} />}
      {width >= 992 ? (
        <div style={{ marginTop: "50px", width: "100%" }}>
          {arr.length > 0 ? arr.map((item, index) => <Card width={width} key={index} cardInfo={item} dropDown={dropDownArr} />) : <div style={{ textAlign: "center" }}>No Need Scheduling Sessions</div>}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr.length > 0 ? arr.map((item, index) => <CardMobile width={width} key={index} cardInfo={item} dropDown={dropDownArr} />) : <div style={{ textAlign: "center" }}>No Need Scheduling Sessions</div>}
        </div>
      )}
    </>
  );
}

export default NeedScheduling;
