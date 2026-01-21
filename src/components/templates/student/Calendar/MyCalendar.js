import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, dateFnsLocalizer, Navigate } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import * as dates from "date-arithmetic";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useWindowDimensions } from "../../../../utils/util";
import { getAvailByTeacher } from "../../../../store/actions/availability";
import { reSchedule } from "../../../../store/actions/student";
import modalStyles from "./popupModal/styles.module.css";
import "./calendar.css";



// Date-fns locales
const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function MyCalendar({ teacherData: propTeacherData, course, coupon }) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [availability, setAvailability] = useState([]);
  const [popupModal, setPopupModal] = useState(null); // event id

  const rescheduleObj = JSON.parse(localStorage.getItem("rescheduleObj") || "null");

  // Fetch teacher availability
  const getTeacherAvail = async () => {
    const result = await getAvailByTeacher(propTeacherData._id);
    if (result.success) {
      const sortedData = result.data.sort(
        (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime()
      );
      const slots = sortedData.map((slot) => ({
        title: `Available (${10 - (slot.bookedCount || 0)} left)`,
        id: slot._id,
        start: new Date(slot.from),
        end: new Date(slot.to),
      }));
      setAvailability(slots);
    }
  };

  useEffect(() => {
    getTeacherAvail();
  }, [propTeacherData]);

  // Drag & Drop handlers
  const dropEvent = (data) => {
    setAvailability(
      availability.map((e) =>
        e.id === data.slot.id
          ? { ...e, start: data.start, end: data.end }
          : e
      )
    );
  };

  const resizeEvent = (data) => {
    setAvailability(
      availability.map((e) =>
        e.id === data.slot.id
          ? { ...e, start: data.start, end: data.end }
          : e
      )
    );
  };

  // Time conversion
  const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "am" : "pm";
    const hours = +sHours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  // Popup Modal
  const PopupModal = ({ event }) => (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => setPopupModal(null)}
        ></i>
        <h3 className={modalStyles.modalHeading}>Book This Slot</h3>
        <div className="popup" style={{ textAlign: "center", marginTop: 20 }}>
          <div className="header">
            <img src={propTeacherData.teacherProfilePic.data} alt="" width={100} />
            <h5>
              {propTeacherData.firstName.data} {propTeacherData.lastName.data}
            </h5>
          </div>
          <div className="popup-body">
            <h5>
              Date: <span>{event.start.toDateString()}</span>
            </h5>
            <h5>
              Time:{" "}
              <span>
                {convertFrom24To12Format(String(event.start).slice(16, 21))} -{" "}
                {convertFrom24To12Format(String(event.end).slice(16, 21))}
              </span>
            </h5>
          </div>
          <div className="slotBtn" style={{ marginTop: 20 }}>
            <button onClick={() => bookSlot(event)}>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Book Slot
  const bookSlot = async (event) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (!token) return toast.warn("Please Login to continue");

    localStorage.setItem("chosenEvent", JSON.stringify(event));

    if (rescheduleObj) {
      handleCheckout(event);
    } else {
      navigate("/payment", {
        state: { course, teacherData: propTeacherData, event, trail: false, coupon, availability },
      });
    }
  };

  const handleCheckout = async (eventData) => {
    const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
    const courseLocal = JSON.parse(localStorage.getItem("chosenCourse") || "{}");

    let body = {
      courseId: courseLocal._id,
      studentId: studentData?.data?.userId,
      teacherId: courseLocal.userId.onType._id,
      type: "1",
      from: eventData.start,
      to: eventData.end,
    };

    if (rescheduleObj) {
      body.availabilityIds = [eventData.id];
      body.session = rescheduleObj;
      try {
        const result = await dispatch(reSchedule(body));
        if (result.success) {
          toast.success("Session Booked successfully");
          localStorage.removeItem("rescheduleObj");
          localStorage.removeItem("chosenCourse");
          navigate("/student/dashboard");
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        console.error("Booking Slot failed:", e);
        toast.error("Failed to Book Slot");
      }
    }
  };

  // Event Component
  const Event = ({ event }) => {
    return (
      <div className="event" onClick={() => setPopupModal(event.id)}>
        <p>{event.title}</p>
      </div>
    );
  };

  // Custom 3-day week
  function MyWeek({ date, localizer, max, min, scrollToTime, ...props }) {
    const currRange = useMemo(() => MyWeek.range(date, { localizer }), [date, localizer]);
    return <TimeGrid date={date} localizer={localizer} max={max} min={min} range={currRange} scrollToTime={scrollToTime} {...props} />;
  }

  MyWeek.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    localizer: PropTypes.object,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    scrollToTime: PropTypes.instanceOf(Date),
  };

  MyWeek.range = (date, { localizer }) => {
    const start = new Date(date);
    const range = [];
    for (let i = 0; i < 3; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      range.push(day);
    }
    return range;
  };

  MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
      case Navigate.PREVIOUS:
        return dates.add(date, -3, "day");
      case Navigate.NEXT:
        return dates.add(date, 3, "day");
      default:
        return date;
    }
  };

  MyWeek.title = (date, { localizer }) => {
    const start = new Date(date);
    const end = dates.add(start, 2, "day");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}`;
  };

  const views = { week: MyWeek };

  return (
    <div style={{ marginTop: 10, borderRadius: 10, width: width >= 992 ? "100%" : "90%", backgroundColor: "#fefeff", padding: 20 }}>
      <div style={{ marginBottom: 10, fontWeight: "bold" }}>Calendar</div>

      <Calendar
        localizer={localizer}
        events={availability}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        defaultDate={new Date()}
        defaultView="week"
        views={views}
        onSelectEvent={(e) => setPopupModal(e.id)}
        components={{ event: Event }}
        onEventDrop={dropEvent}
        resizable
        onEventResize={resizeEvent}
      />

      {popupModal && <PopupModal event={availability.find(e => e.id === popupModal)} />}
    </div>
  );
}

export default MyCalendar;
