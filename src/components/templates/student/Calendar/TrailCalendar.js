import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, dateFnsLocalizer, Navigate } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import * as dates from "date-arithmetic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useWindowDimensions } from "../../../../utils/util";
import { getAvailByTeacher } from "../../../../store/actions/availability";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import modalStyles from "./popupModal/styles.module.css";
import "./calendar.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function TrailCalendar({ teacherData: propTeacherData, course }) {
  const [availability, setAvailability] = useState([]);
  const [popupModal, setPopupModal] = useState("");
  const [eventPopup, setEventPopup] = useState(null);

  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAvailability() {
      const result = await getAvailByTeacher(propTeacherData?._id);
      if (result?.success) {
        const slots = result.data
          .filter(slot => new Date(slot.from) > new Date())
          .map(slot => ({
            id: slot.id,
            title: "My Availability",
            start: new Date(slot.from),
            end: new Date(slot.to),
          }));
        setAvailability(slots);
      }
    }
    fetchAvailability();
  }, [propTeacherData]);

  const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "am" : "pm";
    const hours = +sHours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  const handleSelect = (e) => {
    const converted = Math.round(e.start.getTime() / 1000);
    if (popupModal !== converted) {
      setPopupModal(converted);
      setEventPopup(e);
    } else {
      setPopupModal("");
      setEventPopup(null);
    }
  };

  const bookSlot = (event) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (!token) return toast.warn("Please Login to continue");

    localStorage.setItem("chosenEvent", JSON.stringify(event));
    navigate("/payment", { state: { course, teacherData: propTeacherData, event, trail: true } });
  };

  const Event = ({ event }) => (
    <div className="event">
      <p>{event.title}</p>
      {popupModal === Math.round(event.start.getTime() / 1000) && (
        <div className={modalStyles.modalBackdrop}>
          <div className={modalStyles.modal}>
            <i className={modalStyles.closeBtn + " fas fa-close"} onClick={() => setPopupModal("")}></i>
            <h3 className={modalStyles.modalHeading}>Book This Slot</h3>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <img src={propTeacherData.teacherProfilePic?.data} alt="" style={{ width: 100 }} />
              <h5>{`${propTeacherData.firstName?.data} ${propTeacherData.lastName?.data}`}</h5>
              <h5>Date: {event.start.toDateString()}</h5>
              <h5>
                Time: {convertFrom24To12Format(String(event.start).slice(16, 21))} -{" "}
                {convertFrom24To12Format(String(event.end).slice(16, 21))}
              </h5>
              <button onClick={() => bookSlot(event)}>Book Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Custom 3-day week
  const MyWeek = ({ date, localizer, ...props }) => {
    const range = useMemo(() => MyWeek.range(date, { localizer }), [date, localizer]);
    return <TimeGrid date={date} localizer={localizer} range={range} {...props} />;
  };
  MyWeek.range = (date, { localizer }) => {
    const start = new Date(date);
    const range = [0, 1, 2].map(i => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
    return range;
  };
  MyWeek.navigate = (date, action) => {
    switch (action) {
      case Navigate.PREVIOUS: return dates.add(date, -3, "day");
      case Navigate.NEXT: return dates.add(date, 3, "day");
      default: return date;
    }
  };
  MyWeek.title = (date) => {
    const end = dates.add(new Date(date), 2, "day");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[date.getMonth()]} ${date.getDate()} - ${months[end.getMonth()]} ${end.getDate()}`;
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
        defaultView="week"
        views={views}
        style={{ height: 500 }}
        selectable
        onSelectEvent={handleSelect}
        components={{ event: Event }}
      />
    </div>
  );
}

export default TrailCalendar;
