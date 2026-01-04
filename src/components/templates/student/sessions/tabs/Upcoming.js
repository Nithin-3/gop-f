import React from "react";
import RescheduleModal from "../modals/RescheduleModal";
import { Card, CardMobile } from "../commonUtils";

const Upcoming = ({ width, arr }) => {
  if (!Array.isArray(arr)) arr = [];
  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const dropDownArr = [{ text: "Request to Reschedule", modal: setRescheduleModal }];
  const today = new Date();

  const upcomingArr = arr
    .filter(i => i.status === "Upcoming" && new Date(i.to) >= today)
    .sort((a, b) => new Date(a.from) - new Date(b.from));

  return (
    <>
      {rescheduleModal && <RescheduleModal setRescheduleModal={setRescheduleModal} width={width} />}
      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {upcomingArr.length ? (
            upcomingArr.map((item, i) => (
              <Card key={i} width={width} cardInfo={item} dropDown={dropDownArr} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {upcomingArr.length ? (
            upcomingArr.map((item, i) => (
              <CardMobile key={i} width={width} cardInfo={item} dropDown={dropDownArr} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>
          )}
        </div>
      )}
    </>
  );
};

export default Upcoming;
