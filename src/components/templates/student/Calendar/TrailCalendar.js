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
    setEventPopup(e);
  };

  const bookSlot = (event) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (!token) return toast.warn("Please Login to continue");

    localStorage.setItem("chosenEvent", JSON.stringify(event));
    navigate("/payment", { state: { course, teacherData: propTeacherData, event, trail: true } });
  };

  const Event = ({ event }) => (
    <div className="event">
      <p style={{ margin: 0, fontSize: '10px' }}>{event.title}</p>
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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()} - ${months[end.getMonth()]} ${end.getDate()}`;
  };

  const views = { week: MyWeek };

  return (
    <div style={{ marginTop: 10, borderRadius: 15, width: width >= 992 ? "100%" : "90%", backgroundColor: "#fefeff", padding: 25, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
      <div style={{ marginBottom: 20, fontWeight: "800", fontSize: '1.2rem', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: 10 }}>Teacher Availability</div>
      <Calendar
        localizer={localizer}
        events={availability}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={views}
        style={{ height: 550 }}
        selectable
        onSelectEvent={handleSelect}
        components={{ event: Event }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: "#3174ad",
            borderRadius: "5px",
            border: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            color: "white",
            fontSize: "0.8rem"
          }
        })}
      />

      {eventPopup && (
        <div className={modalStyles.modalBackdrop} onClick={() => setEventPopup(null)}>
          <div className={modalStyles.modal} onClick={e => e.stopPropagation()} style={{ overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #fe1848 0%, #ff4b2b 100%)', padding: '20px', color: 'white', position: 'relative' }}>
              <i
                className={modalStyles.closeBtn + " fas fa-close"}
                onClick={() => setEventPopup(null)}
                style={{ position: 'absolute', top: 15, right: 15, margin: 0 }}
              ></i>
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Confirm Booking</h3>
            </div>

            <div style={{ padding: '30px', textAlign: "center" }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
                <img
                  src={propTeacherData.teacherProfilePic?.data}
                  alt="teacher"
                  style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #fff', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', objectFit: 'cover' }}
                />
              </div>

              <h4 style={{ fontWeight: '700', color: '#333', marginBottom: 5 }}>
                {`${propTeacherData.firstName?.data || propTeacherData.firstName} ${propTeacherData.lastName?.data || propTeacherData.lastName}`}
              </h4>
              <p style={{ color: '#666', marginBottom: 20 }}>TRIAL SESSION</p>

              <div style={{ backgroundColor: '#f9f9f9', borderRadius: 12, padding: 20, marginBottom: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <i className="far fa-calendar-alt" style={{ color: '#fe1848' }}></i>
                  <span style={{ fontWeight: '600', color: '#444' }}>{format(eventPopup.start, "EEEE, MMMM do, yyyy")}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                  <i className="far fa-clock" style={{ color: '#fe1848' }}></i>
                  <span style={{ fontWeight: '600', color: '#444' }}>
                    {format(eventPopup.start, "hh:mm a")} - {format(eventPopup.end, "hh:mm a")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => bookSlot(eventPopup)}
                style={{
                  background: 'linear-gradient(135deg, #fe1848 0%, #ff4b2b 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(254, 24, 72, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  width: '100%'
                }}
                onMouseOver={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 20px rgba(254, 24, 72, 0.4)'; }}
                onMouseOut={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 5px 15px rgba(254, 24, 72, 0.3)'; }}
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrailCalendar;
