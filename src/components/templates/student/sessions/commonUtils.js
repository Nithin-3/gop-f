import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import CancelModal from './modals/CancelModal';
import { getCourseById } from '../../../../store/actions/course';
import { getAvailByAId } from '../../../../store/actions/availability';
import { getTeacherDetailByTId } from '../../../../store/actions/teacher';
import { cancelVideoSession } from '../../../../store/actions/student';

export const SessionCard = ({ width, cardInfo, dropDown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otherOptions = useRef(null);

  const [courseDetails, setCourseDetails] = useState(null);
  const [availDetails, setAvailDetails] = useState(null);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [btnName, setBtnName] = useState('Join Class');
  const [disableBtn, setDisableBtn] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  useEffect(() => {
    if (!cardInfo) return;

    if (cardInfo.status === 'Need Scheduling') {
      setBtnName('Reschedule');
    }

    const fetchDetails = async () => {
      try {
        const course = await dispatch(getCourseById(cardInfo.courseId));
        const teacher = await dispatch(getTeacherDetailByTId(cardInfo.teacherId));

        let avail = null;
        if (cardInfo.availabilityIds?.length) {
          avail = await dispatch(getAvailByAId(cardInfo.availabilityIds[0]));
        }

        setCourseDetails(course);
        setTeacherDetails(teacher);
        setAvailDetails(avail);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [cardInfo, dispatch]);

  useEffect(() => {
    if (availDetails?.from) {
      setDisableBtn(moment(availDetails.from).isBefore(moment()));
    }
  }, [availDetails]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (otherOptions.current && !otherOptions.current.contains(e.target)) {
        setShowOtherOptions(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleJoinOrReschedule = () => {
    if (disableBtn) {
      toast.error('This session time has elapsed.');
      return;
    }

    if (btnName === 'Join Class') {
      navigate('/liveclass', {
        state: {
          role: 'Student',
          courseDetails,
          teacherDetails,
          availDetails,
          sessionDetails: cardInfo,
        },
      });
    } else {
      localStorage.setItem(
        'rescheduleObj',
        JSON.stringify({
          teacherId: cardInfo.teacherId,
          studentId: cardInfo.studentId,
          sessionId: cardInfo._id,
          availId: availDetails?.id || '',
        })
      );
      navigate('/bookCalendar');
    }
  };

  const handleCancelSession = async () => {
    try {
      await dispatch(
        cancelVideoSession({
          teacherId: cardInfo.teacherId,
          studentId: cardInfo.studentId,
          sessionId: cardInfo._id,
          availId: availDetails?.id || '',
        })
      );
      setCancelModal(false);
      toast.success('Session cancelled successfully');
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel session');
    }
  };

  return (
    <>
      {cancelModal && (
        <CancelModal
          setCancelModal={setCancelModal}
          width={width}
          cancelSession={handleCancelSession}
          availDetails={availDetails}
          cardInfo={cardInfo}
        />
      )}

      <div className={width >= 992 ? styles.cardContainer : styles.cardMobileContainer}>
        <div>{courseDetails?.title?.data || cardInfo.heading}</div>

        <div>
          {availDetails
            ? moment(availDetails.from).format('HH:mm A')
            : 'Not Scheduled'}
        </div>

        <div>{teacherDetails?.firstName?.data || 'Details'}</div>

        <button onClick={handleJoinOrReschedule} disabled={disableBtn}>
          {btnName}
        </button>

        <div className={styles.moreOptions} ref={otherOptions}>
          <i
            className="fas fa-ellipsis-h"
            onClick={() => setShowOtherOptions((p) => !p)}
          ></i>

          {showOtherOptions && (
            <ul>
              {dropDown?.map((item, idx) => (
                <li key={idx} onClick={handleJoinOrReschedule}>
                  {item.text}
                </li>
              ))}
              <li onClick={() => setCancelModal(true)}>Cancel</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};


export const SubmitButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '30px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 20px',
          backgroundColor: '#5bd056',
          color: '#fffefe',
          borderRadius: '5px',
        }}
      >
        Submit
        <i
          className="fas fa-check-circle"
          style={{ marginLeft: '10px', color: '#fffefe' }}
        ></i>
      </div>
    </div>
  );
};

export const Card = (props) => (
  <div className={styles.cardContainer}>{props.children}</div>
);

export const CardMobile = (props) => (
  <div className={styles.cardMobileContainer}>{props.children}</div>
);
