import React from "react";

import RescheduleModal from "../modals/RescheduleModal";
import AddLessonModal from "../modals/AddLessonModal";

import { Card, CardMobile } from "../commonUtils";
import { getTeacherFreeSessions } from "../../../../../store/actions/session";

function FreeCourses(props) {
  let { width, arr } = props;
  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const [addLessonModal, setAddlessonModal] = React.useState(false);
  const [freeArr, setFreeArr] = React.useState(false);

  const dropDownArr = [
    { text: "Request to Reschedule", modal: setRescheduleModal },
    { text: "Add Lesson Plan", modal: setAddlessonModal },
  ];

  const getFreeSessions = async () => {
    const result = await getTeacherFreeSessions();
    console.log(result);
    if (result.success) {
      setFreeArr(result.data);
    } else {
      console.log(result);
    }
  };

  React.useEffect(() => {
    getFreeSessions();
  }, []);
  const todayDate = new Date()
  arr = arr?.filter((item) => item.isFree && new Date(item.from)-todayDate >=0  )
  console.log(arr)

  return (
    <>
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
        <div style={{ marginTop: "50px" }}>
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
            <div style={{ textAlign: "center" }}>No Free Sessions</div>
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

export default FreeCourses;
