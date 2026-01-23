import React, { useState, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { format, addDays, subDays, isSameDay } from "date-fns";
import moment from "moment";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import { getTeacherData } from "../../../../store/actions/teacher";
import { addTeacherAvailability, getTeacherAvailability } from "../../../../store/actions/availability";
import { useWindowDimensions } from "../../../../utils/util";
import "./calendar.css";

// Styled Components for Matrix UI
const MatrixContainer = styled.div`
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
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
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
  background: ${props => props.active ? "#dc3545" : "#fff"}; // Consistent Red for Active
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

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    flex-grow: 1;
    min-width: 90px;
  }
`;

const DateDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
`;

const GridWrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  width: 100%;
  max-width: 100%;
  max-height: 650px;
  -webkit-overflow-scrolling: touch;
  position: relative;
  box-sizing: border-box;
  &::-webkit-scrollbar { 
    width: 10px;
    height: 10px; 
  }
  &::-webkit-scrollbar-thumb { 
    background: #d1d1d1; 
    border-radius: 10px;
    border: 2px solid #fff;
  }
`;

const MatrixTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 2500px;
  table-layout: fixed;

  @media (max-width: 768px) {
    min-width: 2000px;
  }
`;

const Th = styled.th`
  padding: 20px 15px;
  background: #f9fafb;
  border-bottom: 2px solid #eee;
  border-right: 1px solid #f0f0f0;
  font-size: 1.1rem; /* Even larger font */
  color: #444;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 3;
  width: 120px;

  @media (max-width: 768px) {
    padding: 14px 10px;
    font-size: 0.9rem;
    width: 100px;
  }
`;

const TdDate = styled.td`
  padding: 20px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-right: 2px solid #eee;
  font-weight: 800;
  color: #1a1a1a;
  width: 220px;
  font-size: 1.2rem; /* Even larger font */
  position: sticky;
  left: 0;
  z-index: 2;
  box-shadow: 4px 0 10px rgba(0,0,0,0.03);

  @media (max-width: 768px) {
    width: 160px;
    padding: 15px;
    font-size: 1rem;
  }
`;

const SlotCell = styled.td`
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
  padding: 6px;
  height: 70px;
  background: ${props => props.isWeekend ? "#fafafa" : "#fff"};

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const SlotButton = styled.div`
  width: 100%;
  height: 100%;
  min-height: 65px; /* Taller cells */
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem; /* Larger font */
  font-weight: 900;
  cursor: pointer;
  background: ${props => {
    if (props.isBooked) return "#dc3545"; // Red for Booked
    if (props.exists) return "linear-gradient(135deg, #28a745 0%, #34ce57 100%)"; // Green for Available
    return "#f0f0f0";
  }};
  color: ${props => props.exists || props.isBooked ? "#fff" : "#ccc"};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.12);
    background: ${props => props.isBooked ? "#c82333" : props.exists ? "linear-gradient(135deg, #218838 0%, #28a745 100%)" : "#e0e0e0"};
  }

  @media (max-width: 768px) {
    min-height: 55px;
    font-size: 0.9rem;
  }
`;

const CustomDateInput = styled.input`
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: inherit;

  @media (max-width: 768px) {
    width: 100%;
    padding: 7px;
  }
`;

const TIME_SLOTS = [];
for (let hour = 0; hour < 24; hour++) {
  for (let min of ["00", "30"]) {
    const h12 = hour % 12 || 12;
    const ampm = hour < 12 ? "AM" : "PM";
    TIME_SLOTS.push({
      id: `${hour.toString().padStart(2, "0")}:${min}`,
      label: `${h12}:${min} ${ampm}`
    });
  }
}

function MyCalendar() {
  const [availability, setAvailability] = useState([]);
  const [teacherData, setTeacherData] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [addEventModal, setAddEventModal] = useState(false);
  const [editEventModal, setEditEventModal] = useState(false);
  const [baseDate, setBaseDate] = useState(new Date());
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
        id: el.id,
        start: new Date(el.from),
        end: new Date(el.to),
        isBooked: el.isBooked
      })));
    }
  }, [dispatch]);

  const addTeacherAvail = async (slots) => {
    return await dispatch(addTeacherAvailability(slots));
  };

  useEffect(() => { getTeacherLoggedData(); getTeacherAvail(); }, [getTeacherLoggedData, getTeacherAvail]);

  const dateRange = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(baseDate, i)), [baseDate]);

  const handleCellClick = (cellStart) => {
    if (cellStart < new Date()) return;

    const existing = availability.find(s => s.start.getTime() === cellStart.getTime());
    if (existing) {
      if (existing.isBooked) return;
      setSelectedSlot({ id: existing.id, from: existing.start, to: existing.end });
      setEditEventModal(true);
    } else {
      const end = moment(cellStart).add(30, "minutes").toDate();
      setSelectedTimeSlots([{ from: cellStart, to: end, sessionDate: new Date(cellStart), teacherId: teacherData?.teacherId }]);
      setAddEventModal(true);
    }
  };

  return (
    <MatrixContainer>
      <div style={{ marginBottom: "15px", fontWeight: "800", fontSize: "1.1rem", color: "#3eaeea" }}>TEACHER AVAILABILITY MATRIX</div>
      <Toolbar>
        <DateDisplay>{format(baseDate, "MMMM yyyy")}</DateDisplay>
        <ButtonGroup>
          <NavButton onClick={() => setBaseDate(subDays(new Date(), 1))}>Yesterday</NavButton>
          <NavButton active={isSameDay(baseDate, new Date())} onClick={() => setBaseDate(new Date())}>Today</NavButton>
          <NavButton onClick={() => setBaseDate(addDays(new Date(), 1))}>Tomorrow</NavButton>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "10px", borderLeft: "1px solid #eee", paddingLeft: "15px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#888" }}>PICK DATE:</span>
            <CustomDateInput type="date" value={format(baseDate, "yyyy-MM-dd")} onChange={(e) => setBaseDate(new Date(e.target.value))} />
          </div>
        </ButtonGroup>
      </Toolbar>

      <GridWrapper>
        <MatrixTable>
          <thead>
            <tr>
              <Th style={{ position: "sticky", left: 0, top: 0, zIndex: 4, background: "#f8f9fa" }}>Day / Time</Th>
              {TIME_SLOTS.map(slot => <Th key={slot.id}>{slot.label}</Th>)}
            </tr>
          </thead>
          <tbody>
            {dateRange.map(date => (
              <tr key={date.toISOString()}>
                <TdDate>{format(date, "EEE, MMM dd")}</TdDate>
                {TIME_SLOTS.map(timeSlot => {
                  const [h, m] = timeSlot.id.split(":").map(Number);
                  const cellStart = new Date(date);
                  cellStart.setHours(h, m, 0, 0);
                  const slot = availability.find(s => s.start.getTime() === cellStart.getTime());
                  return (
                    <SlotCell key={timeSlot.id} isWeekend={date.getDay() === 0 || date.getDay() === 6}>
                      <SlotButton
                        exists={!!slot}
                        isBooked={slot?.isBooked}
                        onClick={() => handleCellClick(cellStart)}
                      >
                        {slot ? (slot.isBooked ? "BOOKED" : "AVAIL") : "+"}
                      </SlotButton>
                    </SlotCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </MatrixTable>
      </GridWrapper>

      {addEventModal && <AddEventModal setAddEventModal={setAddEventModal} slots={selectedTimeSlots} addSlots={addTeacherAvail} getAvailability={getTeacherAvail} />}
      {editEventModal && <EditEventModal setEditEventModal={setEditEventModal} selectedSlot={selectedSlot} availability={availability} setAvailability={setAvailability} />}
    </MatrixContainer>
  );
}

export default MyCalendar;
