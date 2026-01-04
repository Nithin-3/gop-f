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
import { toast } from "react-toastify";
import { getTeacherData } from "../../../../store/actions/teacher";
import { addTeacherAvailability, getTeacherAvailability } from "../../../../store/actions/availability";
import { useWindowDimensions } from "../../../../utils/util";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import "./calendar.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const locales = { "en-US": require("date-fns/locale/en-US") };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

function MyCalendar() {
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
    if (result?.success) {
      toast.success("Slot added successfully");
      setAddEventModal(false);
      getTeacherAvail();
    } else {
      toast.error("Something went wrong");
      setAddEventModal(false);
    }
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

  const Event = () => <div className="event" />;

  const CustomToolbar = (toolbar, step = 7) => {
    const goToBack = () => toolbar.onNavigate("prev");
    const goToNext = () => toolbar.onNavigate("next");
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group"><button onClick={goToBack}>Prev</button></span>
        <span className="rbc-toolbar-label">{toolbar.label}</span>
        <span className="rbc-btn-group"><button onClick={goToNext}>Next</button></span>
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
    const end = new Date(start); end.setDate(end.getDate() + 2);
    const range = [];
    let current = start;
    while (localizer.lte(current, end, "day")) { range.push(new Date(current)); current = localizer.add(current, 1, "day"); }
    return range;
  };
  MyWeek.navigate = (date, action, { localizer }) => {
    switch (action) {
      case Navigate.PREVIOUS: return localizer.add(date, -3, "day");
      case Navigate.NEXT: return localizer.add(date, 3, "day");
      default: return date;
    }
  };

  const { views } = useMemo(() => ({ views: { week: MyWeek } }), []);

  return (
    <>
      {addEventModal && <AddEventModal setAddEventModal={setAddEventModal} slots={selectedTimeSlots} addSlots={addTeacherAvail} />}
      {editEventModal && <EditEventModal setEditEventModal={setEditEventModal} selectedSlot={selectedSlot} availability={availability} setAvailability={setAvailability} />}
      <div className="teacherCalendar">
        <Calendar
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
          views={width >= 992 ? undefined : views}
          components={{ event: Event, week: { toolbar: width >= 992 ? CustomToolbar : CustomMobileToolbar } }}
          eventPropGetter={event => ({ style: { backgroundColor: event.isBooked ? "gray" : "#3174ad", cursor: event.isBooked ? "not-allowed" : "pointer" } })}
          style={{ height: 500 }}
        />
      </div>
    </>
  );
}

export default MyCalendar;
