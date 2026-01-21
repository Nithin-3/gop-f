import React from "react";

import RescheduleModal from "../modals/RescheduleModal";
import AddLessonModal from "../modals/AddLessonModal";

import { Card, CardMobile } from "../commonUtils";
import { getTeacherFreeSessions } from "../../../../../store/actions/session";

function FreeCourses(props) {
  let { width, arr } = props;
  if (!Array.isArray(arr)) arr = [];
  const [rescheduleModal, setRescheduleModal] = React.useState(false);
  const [addLessonModal, setAddlessonModal] = React.useState(false);
  const [freeSessions, setFreeSessions] = React.useState([]);

  const dropDownArr = [
    { text: "Request to Reschedule", modal: setRescheduleModal },
    { text: "Add Lesson Plan", modal: setAddlessonModal },
  ];

  const getFreeSessions = async () => {
    const result = await getTeacherFreeSessions();
    if (result.success) {
      setFreeSessions(result.data);
    } else {
      console.error(result);
    }
  };

  React.useEffect(() => {
    getFreeSessions();
  }, []);

  const todayDate = new Date();
  const sessionsToDisplay = freeSessions.length > 0 ? freeSessions : (arr || []);
  const filteredSessions = sessionsToDisplay.filter(
    (item) => item.isFree && new Date(item.from) - todayDate >= 0
  );



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
          {filteredSessions && filteredSessions.length > 0 ? (
            filteredSessions.map((item, index) => (

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
          {filteredSessions && filteredSessions.length > 0 ? (
            filteredSessions.map((item, index) => (

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
