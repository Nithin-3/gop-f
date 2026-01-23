import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { format, addDays, addWeeks, addMonths, startOfWeek, startOfMonth, endOfMonth, isSameDay, isBefore, isAfter, startOfDay } from "date-fns";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useWindowDimensions } from "../../../../utils/util";
import { getAvailByTeacher } from "../../../../store/actions/availability";
import { reSchedule } from "../../../../store/actions/student";
import { getAllSessions } from "../../../../store/actions/session";
import modalStyles from "./popupModal/styles.module.css";
import "./calendar.css";

// Styled Components
const MatrixContainer = styled.div`
  margin-top: 20px;
  background: #fefeff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  overflow: hidden;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 10px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 15px;
  background: #fcfcfc;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 10px;
    margin-bottom: 15px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const NavButton = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? "transparent" : "#ddd"};
  background: ${props => props.active ? "#dc3545" : "#fff"};
  color: ${props => props.active ? "#fff" : "#444"};
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.active ? "0 4px 12px rgba(220, 53, 69, 0.3)" : "none"};
  
  &:hover {
    background: ${props => props.active ? "#c82333" : "#f5f5f5"};
    border-color: ${props => props.active ? "transparent" : "#ccc"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    flex-grow: 1;
    min-width: 70px;
  }
`;

const DateDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    width: 100%;
    margin-bottom: 5px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: 700;
  color: #666;
  padding: 10px;
  font-size: 0.85rem;
  text-transform: uppercase;
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  background: ${props => {
    if (props.isSelected) return "linear-gradient(135deg, #dc3545 0%, #ff4b2b 100%)";
    if (props.isToday) return "#fff5f6";
    if (props.hasAvailability) return "#e8f5e9";
    return "#fff";
  }};
  border: 2px solid ${props => {
    if (props.isSelected) return "transparent";
    if (props.isToday) return "#dc3545";
    if (props.hasAvailability) return "#28a745";
    return "#eee";
  }};
  opacity: ${props => props.disabled ? 0.4 : 1};
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: ${props => props.disabled ? "none" : "scale(1.05)"};
    box-shadow: ${props => props.disabled ? "none" : "0 4px 15px rgba(0,0,0,0.1)"};
  }

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const DayNumber = styled.span`
  font-size: 1.1rem;
  font-weight: ${props => props.isToday ? "800" : "600"};
  color: ${props => props.isSelected ? "#fff" : "#333"};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const AvailabilityDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.isSelected ? "#fff" : "#28a745"};
  margin-top: 4px;
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  max-height: 400px;
  overflow-y: auto;
`;

const TimeSlotButton = styled.button`
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  background: ${props => {
    if (props.isBooked) return "#dc3545";
    if (props.isPast) return "#ccc";
    return "linear-gradient(135deg, #28a745 0%, #34ce57 100%)";
  }};
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: ${props => (props.isBooked || props.isPast) ? "not-allowed" : "pointer"};
  opacity: ${props => props.isPast ? 0.5 : 1};
  transition: all 0.2s ease;
  box-shadow: ${props => (props.isBooked || props.isPast) ? "none" : "0 4px 12px rgba(40, 167, 69, 0.3)"};

  &:hover {
    transform: ${props => (props.isBooked || props.isPast) ? "none" : "translateY(-2px)"};
  }
`;

const NoSlotsMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 1rem;
`;

const SelectedDateHeader = styled.div`
  background: linear-gradient(135deg, #dc3545 0%, #ff4b2b 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 12px 12px 0 0;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function MyCalendar({ teacherData: propTeacherData, course, coupon }) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("today"); // "today", "week", "month"
  const [baseDate, setBaseDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [popupModal, setPopupModal] = useState(null);

  const now = useMemo(() => new Date(), []);

  const rescheduleObj = useMemo(() => {
    try {
      const stored = localStorage.getItem("rescheduleObj");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const getTeacherAvail = useCallback(async () => {
    if (!propTeacherData?._id) return;

    const sessionsRes = await dispatch(getAllSessions());
    let bookedSlotIds = [];
    if (sessionsRes?.success && Array.isArray(sessionsRes.sessions)) {
      bookedSlotIds = sessionsRes.sessions
        .filter(s => s && s.status !== "Cancelled")
        .map(s => s.availabilityId || (s.availabilityIds && s.availabilityIds[0]));
    }

    const result = await getAvailByTeacher(propTeacherData._id);
    if (result.success && Array.isArray(result.data)) {
      const slots = result.data
        .map((slot) => ({
          id: slot._id,
          start: new Date(slot.from),
          end: new Date(slot.to),
          isBooked: bookedSlotIds.includes(slot._id),
          isFull: (10 - (slot.bookedCount || 0)) <= 0,
          capacityLeft: 10 - (slot.bookedCount || 0)
        }))
        .filter(slot => isAfter(slot.start, now) || isSameDay(slot.start, now)); // Only future slots
      setAvailability(slots);
    }
  }, [propTeacherData, dispatch, now]);

  useEffect(() => {
    getTeacherAvail();
  }, [getTeacherAvail]);

  // Get dates for the current view
  const calendarDates = useMemo(() => {
    if (viewMode === "today") {
      return [startOfDay(new Date())];
    } else if (viewMode === "week") {
      const start = startOfWeek(baseDate, { weekStartsOn: 0 });
      return Array.from({ length: 7 }).map((_, i) => addDays(start, i));
    } else {
      // Month view
      const monthStart = startOfMonth(baseDate);
      const monthEnd = endOfMonth(baseDate);
      const start = startOfWeek(monthStart, { weekStartsOn: 0 });
      const dates = [];
      let current = start;
      while (isBefore(current, monthEnd) || isSameDay(current, monthEnd) || dates.length % 7 !== 0) {
        dates.push(current);
        current = addDays(current, 1);
        if (dates.length > 42) break; // Max 6 weeks
      }
      return dates;
    }
  }, [viewMode, baseDate]);

  // Get availability count for a specific date
  const getAvailabilityForDate = useCallback((date) => {
    return availability.filter(slot => isSameDay(slot.start, date) && !slot.isBooked && !slot.isFull);
  }, [availability]);

  // Get time slots for selected date
  const selectedDateSlots = useMemo(() => {
    return availability
      .filter(slot => isSameDay(slot.start, selectedDate))
      .sort((a, b) => a.start - b.start);
  }, [availability, selectedDate]);

  const handleDayClick = (date) => {
    if (isBefore(startOfDay(date), startOfDay(now))) return; // Don't allow past dates
    setSelectedDate(date);
  };

  const handleBookClick = (slot) => {
    if (slot.isBooked || slot.isFull) return;
    if (isBefore(slot.start, now)) return; // Don't allow booking past slots
    setPopupModal(slot);
  };

  const confirmBooking = async (event) => {
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    if (!token) return toast.warn("Please Login to continue");

    localStorage.setItem("chosenEvent", JSON.stringify(event));

    if (rescheduleObj) {
      handleReschedule(event);
    } else {
      navigate("/payment", {
        state: { course, teacherData: propTeacherData, event, trail: false, coupon },
      });
    }
  };

  const handleReschedule = async (eventData) => {
    const studentData = JSON.parse(localStorage.getItem("studentData") || "{}");
    const courseLocal = JSON.parse(localStorage.getItem("chosenCourse") || "{}");

    let body = {
      courseId: courseLocal._id,
      studentId: studentData?.data?.userId,
      teacherId: courseLocal.userId.onType._id,
      type: "1",
      from: eventData.start,
      to: eventData.end,
      availabilityIds: [eventData.id],
      session: rescheduleObj
    };

    try {
      const result = await dispatch(reSchedule(body));
      if (result.success) {
        toast.success("Rescheduled successfully");
        localStorage.removeItem("rescheduleObj");
        navigate("/student/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error("Failed to reschedule");
    }
  };

  const navigateCalendar = (direction) => {
    if (viewMode === "week") {
      setBaseDate(prev => addWeeks(prev, direction));
    } else if (viewMode === "month") {
      setBaseDate(prev => addMonths(prev, direction));
    }
  };

  const isSlotPast = (slot) => {
    return isBefore(slot.start, now);
  };

  const PopupModal = ({ event }) => (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal} style={{ maxWidth: "450px" }}>
        <i className={`${modalStyles.closeBtn} fas fa-close`} onClick={() => setPopupModal(null)}></i>
        <h3 className={modalStyles.modalHeading}>Confirm Booking</h3>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ color: "#888", fontSize: "0.9rem" }}>Teacher</div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{propTeacherData?.firstName?.data || propTeacherData?.firstName} {propTeacherData?.lastName?.data || propTeacherData?.lastName}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
            <div>
              <div style={{ color: "#888", fontSize: "0.9rem" }}>Date</div>
              <div style={{ fontWeight: "700" }}>{format(event.start, "MMM dd, yyyy")}</div>
            </div>
            <div>
              <div style={{ color: "#888", fontSize: "0.9rem" }}>Time</div>
              <div style={{ fontWeight: "700" }}>{format(event.start, "hh:mm a")}</div>
            </div>
          </div>
          <div className="slotBtn">
            <button style={{ width: "100%", borderRadius: "10px", padding: "12px" }} onClick={() => confirmBooking(event)}>Confirm & Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <MatrixContainer>
      <div style={{ marginBottom: "15px", fontWeight: "800", fontSize: "1.1rem", color: "#dc3545" }}>AVAILABILITY CALENDAR</div>
      <Toolbar>
        <DateDisplay>
          {viewMode === "today" && format(new Date(), "EEEE, MMMM dd, yyyy")}
          {viewMode === "week" && `Week of ${format(startOfWeek(baseDate), "MMM dd")} - ${format(addDays(startOfWeek(baseDate), 6), "MMM dd, yyyy")}`}
          {viewMode === "month" && format(baseDate, "MMMM yyyy")}
        </DateDisplay>
        <ButtonGroup>
          <NavButton active={viewMode === "today"} onClick={() => { setViewMode("today"); setBaseDate(new Date()); setSelectedDate(new Date()); }}>
            Today
          </NavButton>
          <NavButton active={viewMode === "week"} onClick={() => { setViewMode("week"); setBaseDate(new Date()); }}>
            Week
          </NavButton>
          <NavButton active={viewMode === "month"} onClick={() => { setViewMode("month"); setBaseDate(new Date()); }}>
            Month
          </NavButton>
          {(viewMode === "week" || viewMode === "month") && (
            <>
              <NavButton onClick={() => navigateCalendar(-1)}>
                <i className="fas fa-chevron-left"></i>
              </NavButton>
              <NavButton onClick={() => navigateCalendar(1)}>
                <i className="fas fa-chevron-right"></i>
              </NavButton>
            </>
          )}
        </ButtonGroup>
      </Toolbar>

      {/* Week/Month Calendar Grid */}
      {(viewMode === "week" || viewMode === "month") && (
        <CalendarGrid>
          {WEEKDAYS.map(day => (
            <DayHeader key={day}>{day}</DayHeader>
          ))}
          {calendarDates.map((date, idx) => {
            const dayAvailability = getAvailabilityForDate(date);
            const isPast = isBefore(startOfDay(date), startOfDay(now));
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, now);
            const isCurrentMonth = viewMode === "month" ? date.getMonth() === baseDate.getMonth() : true;

            return (
              <DayCell
                key={idx}
                disabled={isPast || !isCurrentMonth}
                isSelected={isSelected}
                isToday={isToday}
                hasAvailability={dayAvailability.length > 0 && !isPast}
                onClick={() => !isPast && isCurrentMonth && handleDayClick(date)}
              >
                <DayNumber isToday={isToday} isSelected={isSelected}>
                  {format(date, "d")}
                </DayNumber>
                {dayAvailability.length > 0 && !isPast && (
                  <AvailabilityDot isSelected={isSelected} />
                )}
              </DayCell>
            );
          })}
        </CalendarGrid>
      )}

      {/* Time Slots for Selected Date */}
      <div style={{ marginTop: "20px" }}>
        <SelectedDateHeader>
          <span>{format(selectedDate, "EEEE, MMMM dd, yyyy")}</span>
          <span>{selectedDateSlots.filter(s => !s.isBooked && !s.isFull && !isSlotPast(s)).length} slots available</span>
        </SelectedDateHeader>
        {selectedDateSlots.length > 0 ? (
          <TimeSlotGrid>
            {selectedDateSlots.map((slot) => {
              const isPast = isSlotPast(slot);
              return (
                <TimeSlotButton
                  key={slot.id}
                  isBooked={slot.isBooked || slot.isFull}
                  isPast={isPast}
                  onClick={() => !isPast && handleBookClick(slot)}
                  disabled={slot.isBooked || slot.isFull || isPast}
                >
                  {format(slot.start, "hh:mm a")}
                  {slot.isBooked && " (Booked)"}
                  {slot.isFull && !slot.isBooked && " (Full)"}
                  {isPast && !slot.isBooked && !slot.isFull && " (Past)"}
                </TimeSlotButton>
              );
            })}
          </TimeSlotGrid>
        ) : (
          <NoSlotsMessage>
            <i className="fas fa-calendar-times" style={{ fontSize: "2rem", marginBottom: "10px", color: "#ddd" }}></i>
            <div>No available slots for this date</div>
          </NoSlotsMessage>
        )}
      </div>

      {popupModal && <PopupModal event={popupModal} />}
    </MatrixContainer>
  );
}

MyCalendar.propTypes = {
  teacherData: PropTypes.object,
  course: PropTypes.object,
  coupon: PropTypes.object
};

export default MyCalendar;
