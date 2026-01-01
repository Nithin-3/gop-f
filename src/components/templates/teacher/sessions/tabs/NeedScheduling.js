import React from "react";

import RescheduleModal from "../modals/RescheduleModal";
import AddLessonModal from "../modals/AddLessonModal";

import { Card, CardMobile } from "../commonUtils";
import { getSessionsByStatus } from "../../../../../store/actions/session";

function NeedScheduling(props) {
  let { width, arr } = props;

  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const [addLessonModal, setAddlessonModal] = React.useState(false);
  // sessions = sessions.filter((item) => item.status === "Upcoming" )
  console.log(arr)

  const dropDownArr = [
  ];

  // const getUpcommingSessions = async () => {
  //   const result = await getSessionsByStatus("Upcomming");
  //   console.log(result);
  //   if (result.success) {
  //     setUpcomingArr(result.data);
  //   } else {
  //     console.log(result);
  //   }
  // };

  // React.useEffect(() => {
  //   // getUpcommingSessions();
  // }, []);

  arr = arr?.filter((item) => item.status === "Need Scheduling" )
  console.log(arr)

  return (
    <>
      {/* Schedule Modal */}
      {rescheduleModal ? (
        <RescheduleModal
          setRescheduleModal={setRescheduleModal}
          width={width}
        />
      ) : (
        <></>
      )}

      {/* Lesson Modal */}
      {addLessonModal ? (
        <AddLessonModal setAddlessonModal={setAddlessonModal} width={width} />
      ) : (
        <></>
      )}

      {width >= 992 ? (
        <div style={{ marginTop: "50px", width: "100%" }}>
          {arr && arr.length > 0 ? (
            arr.map((item, index) => (
              <Card
                width={width}
                key={index}
                cardInfo={item}
                dropDown={dropDownArr}
              />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Upcoming Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr && arr.length > 0 ? (
            arr.map((item, index) => (
              <CardMobile
                width={width}
                key={index}
                cardInfo={item}
                dropDown={dropDownArr}
              />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Incompleted Sessions</div>
          )}
        </div>
      )}
    </>
  );
}

export default NeedScheduling;
