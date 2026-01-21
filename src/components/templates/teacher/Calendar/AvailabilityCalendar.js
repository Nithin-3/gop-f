import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer, Navigate } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import PropTypes from "prop-types";
import moment from "moment";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import { useDispatch } from "react-redux";
import { getTeacherData } from "../../../../store/actions/teacher";

import { addTeacherAvailability, getTeacherAvailability } from "../../../../store/actions/availability";
import { useWindowDimensions } from "../../../../utils/util";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import "./calendar.css";


const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const DragAndDropCalendar = withDragAndDrop(Calendar);

function AvailabilityCalendar() {
  const [availability, setAvailability] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const getTeacherLoggedData = useCallback(async () => {
    const result = await dispatch(getTeacherData());
    if (result) setTeacherData(result);
  }, [dispatch]);

  const getTeacherAvail = useCallback(async () => {
    const result = await dispatch(getTeacherAvailability());
    if (result?.success) {
      setAvailability(result.data.map(el => ({
        title: "My Availability",
        id: el.id,
        start: new Date(el.from),
        end: new Date(el.to),
        isBooked: el.isBooked
      })));
    }
  }, [dispatch]);

  const addTeacherAvail = async (slots) => {
    const result = await dispatch(addTeacherAvailability(slots));
    return result;
  };

  useEffect(() => { getTeacherLoggedData(); getTeacherAvail(); }, [getTeacherLoggedData, getTeacherAvail]);

  const handleAddEvent = (e) => {
    if (e.start < new Date()) return;
    let slots = [];
    let start = e.start;
    const end = e.end;
    while (start < end) {
      const next = moment(start).add(30, "minutes").toDate();
      slots.push({ from: start, to: next > end ? end : next, sessionDate: new Date(start), teacherId: teacherData?.teacherId });
      start = next;
    }
    setSelectedTimeSlots(slots);
    setAddEventModal(true);
  };

  const handleEditEvent = (e) => {
    if (e.start < new Date() || e.isBooked) return;
    setSelectedSlot({ id: e.id, from: e.start, to: e.end });
    setEditEventModal(true);
  };

  const dropEvent = ({ event, start, end }) => {
    if (event.isBooked || start < new Date()) return;
    setAvailability(prev => prev.map(e => e.id === event.id ? { ...e, start, end } : e));
  };

  const Event = ({ event }) => (
    <div className="event" style={{ fontSize: '0.8rem', padding: '2px' }}>
      {moment(event.start).format("h:mm A")}
    </div>
  );

  const CustomToolbar = (toolbar, step = 7) => {
    const goToBack = () => toolbar.onNavigate("prev");
    const goToNext = () => toolbar.onNavigate("next");
    return (
      <div className="rbc-toolbar" style={{ marginBottom: '20px' }}>
        <span className="rbc-btn-group"><button onClick={goToBack} style={{ padding: '8px 15px' }}>Prev</button></span>
        <span className="rbc-toolbar-label" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{toolbar.label}</span>
        <span className="rbc-btn-group"><button onClick={goToNext} style={{ padding: '8px 15px' }}>Next</button></span>
      </div>
    );
  };

  const CustomMobileToolbar = toolbar => CustomToolbar(toolbar, 3);

  function MyWeek({ date, localizer, ...props }) {
    const range = useMemo(() => MyWeek.range(date, { localizer }), [date, localizer]);
    return <TimeGrid date={date} localizer={localizer} range={range} {...props} />;
  }

  MyWeek.propTypes = { date: PropTypes.instanceOf(Date).isRequired, localizer: PropTypes.object };
  MyWeek.range = (date, { localizer }) => {
    const start = new Date(date); start.setHours(0, 0, 0, 0);
    const end = new Date(start); end.setDate(end.getDate() + 6); // Display 7 days like in screenshot
    const range = [];
    let current = start;
    while (localizer.lte(current, end, "day")) { range.push(new Date(current)); current = localizer.add(current, 1, "day"); }
    return range;
  };
  MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
      case Navigate.PREVIOUS: return localizer.add(date, -7, "day");
      case Navigate.NEXT: return localizer.add(date, 7, "day");
      default: return date;
    }
  };

  MyWeek.title = (date) => {
    const start = moment(date);
    const end = moment(date).add(6, 'days');
    return `${start.format("MMMM DD")} - ${end.format("DD")}`;
  };

  const { views, formats } = useMemo(() => ({
    views: { week: MyWeek },
    formats: {
      dayFormat: (date, culture, localizer) => localizer.format(date, 'd EEE', culture),
      weekdayFormat: (date, culture, localizer) => localizer.format(date, 'EEE', culture),
      timeGutterFormat: (date, culture, localizer) => localizer.format(date, 'h:mm a', culture),
    }
  }), []);

  return (
    <>
      {addEventModal && <AddEventModal setAddEventModal={setAddEventModal} slots={selectedTimeSlots} addSlots={addTeacherAvail} getAvailability={getTeacherAvail} />}
      {editEventModal && <EditEventModal setEditEventModal={setEditEventModal} selectedSlot={selectedSlot} availability={availability} setAvailability={setAvailability} />}
      <div className="teacherCalendar">
        <DragAndDropCalendar
          localizer={localizer}
          events={availability}
          startAccessor="start"
          endAccessor="end"
          selectable
          draggableAccessor={event => !event.isBooked}
          onSelectSlot={handleAddEvent}
          onSelectEvent={handleEditEvent}
          onEventDrop={dropEvent}
          defaultView="week"
          views={views}
          step={30}
          timeslots={1}
          formats={formats}
          components={{ event: Event, week: { toolbar: width >= 992 ? CustomToolbar : CustomMobileToolbar } }}
          eventPropGetter={event => ({ style: { backgroundColor: event.isBooked ? "gray" : "#3174ad", cursor: event.isBooked ? "not-allowed" : "pointer", border: "1px solid white", borderRadius: '4px' } })}
          style={{ height: 600, background: '#e6e6e6', padding: '10px', borderRadius: '8px' }}
        />
      </div>
    </>
  );
}

export default AvailabilityCalendar;
