import React, { useState } from 'react';

import RescheduleModal from '../modals/RescheduleModal';
import IssueModal from '../modals/IssueModal';
import HomeworkModal from '../modals/HomeworkModal';

import { Card, CardMobile } from '../commonUtils';

const All = ({ width, arr = [] }) => {
  // Modal states
  const [modals, setModals] = useState({
    reschedule: false,
    issue: false,
    homework: false,
  });
  const all = [...arr].sort((a, b) => new Date(b.from) - new Date(a.from));
  // Dropdown actions
  const dropDownArr = [
    { text: "Request to Reschedule", modal: (val) => setModals({ ...modals, reschedule: val }) },
    // Add other actions if needed:
    // { text: "Report Issue", modal: (val) => setModals({ ...modals, issue: val }) },
    // { text: "Complete HW", modal: (val) => setModals({ ...modals, homework: val }) },
  ];

  return (
    <>
      {/* Modals */}
      {modals.reschedule && <RescheduleModal setRescheduleModal={(val) => setModals({ ...modals, reschedule: val })} width={width} />}
      {modals.issue && <IssueModal setIssueModal={(val) => setModals({ ...modals, issue: val })} width={width} />}
      {modals.homework && <HomeworkModal setHomeworkModal={(val) => setModals({ ...modals, homework: val })} width={width} />}

      {/* Sessions */}
      <div style={{ marginTop: width >= 992 ? '50px' : '30px' }}>
        {all.length > 0 ? (
          all.map((item, index) =>
            width >= 992 ? (
              <Card key={index} width={width} cardInfo={item} dropDown={dropDownArr} />
            ) : (
              <CardMobile key={index} width={width} cardInfo={item} dropDown={dropDownArr} />
            )
          )
        ) : (
          <div style={{ textAlign: 'center' }}>No Sessions</div>
        )}
      </div>
    </>
  );
};

export default All;
