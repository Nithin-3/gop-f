import React, { useState } from "react";
import { Card, CardMobile } from "../commonUtils";
import IssueModal from "../modals/IssueModal";
import HomeworkModal from "../modals/HomeworkModal";

const Completed = ({ width, arr }) => {
  if (!Array.isArray(arr)) arr = [];

  const [issueModal, setIssueModal] = useState(false);
  const [homeworkModal, setHomeworkModal] = useState(false);

  const dropDownArr = [
    { text: "Report an Issue", modal: setIssueModal },
    { text: "Complete HW", modal: setHomeworkModal },
  ];

  arr = arr
    .filter((item) => item.status === "Completed")
    .sort((a, b) => new Date(b.from) - new Date(a.from));

  return (
    <>
      {issueModal && <IssueModal setIssueModal={setIssueModal} width={width} />}
      {homeworkModal && (
        <HomeworkModal setHomeworkModal={setHomeworkModal} width={width} />
      )}

      {width >= 992 ? (
        <div style={{ marginTop: "50px" }}>
          {arr.length ? (
            arr.map((item, i) => (
              <Card key={i} width={width} cardInfo={item} dropDown={dropDownArr} />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Completed Sessions</div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {arr.length ? (
            arr.map((item, i) => (
              <CardMobile
                key={i}
                width={width}
                cardInfo={item}
                dropDown={dropDownArr}
              />
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Completed Sessions</div>
          )}
        </div>
      )}
    </>
  );
};

export default Completed;
