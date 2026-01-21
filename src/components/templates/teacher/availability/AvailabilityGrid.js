import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTeacherAvailability, getTeacherAvailability } from "../../../../store/actions/availability";
import { getTeacherData } from "../../../../store/actions/teacher";
import moment from "moment";
import { toast } from "react-toastify";
import styles from "./gridStyle.module.css";
import AddEventModal from "../Calendar/AddEventModal";

const AvailabilityGrid = () => {
    const dispatch = useDispatch();
    const [availability, setAvailability] = useState([]);
    const [teacherData, setTeacherData] = useState({});
    const [weekStart, setWeekStart] = useState(moment().startOf('day'));
    const [duration, setDuration] = useState(60); // default 60 minutes
    const [addEventModal, setAddEventModal] = useState(false);
    const [pendingSlots, setPendingSlots] = useState([]);

    // Grid config
    const startTime = 0; // 0:00
    const endTime = 24; // 24:00
    const interval = 30; // minutes

    useEffect(() => {
        dispatch(getTeacherData()).then(res => setTeacherData(res));
        fetchAvailability();
    }, [dispatch]);

    const fetchAvailability = async () => {
        const res = await dispatch(getTeacherAvailability());
        if (res?.success) {
            setAvailability(res.data.map(el => ({ ...el, from: new Date(el.from), to: new Date(el.to) })));
        }
    };

    const addTeacherAvail = async (slots) => {
        const result = await dispatch(addTeacherAvailability(slots));
        return result;
    };

    const getSlots = () => {
        const slots = [];
        for (let i = 0; i < (endTime - startTime) * 60 / interval; i++) {
            const time = moment().startOf('day').add(startTime * 60 + i * interval, 'minutes');
            slots.push(time);
        }
        return slots;
    };

    const timeSlots = getSlots();

    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(moment(weekStart).add(i, 'days'));
    }

    const isAvailable = (day, timeStr) => {
        // day is moment object, timeStr is "HH:mm" from grid
        // Construct check date
        const checkStart = moment(day).format('YYYY-MM-DD') + ' ' + timeStr;
        const start = new Date(checkStart);

        return availability.some(slot => {
            const slotStart = new Date(slot.from);
            // define loose equality or range check
            return Math.abs(slotStart - start) < 60000; // within 1 min
        });
    };

    const getSlotStatus = (day, time) => {
        const checkDate = moment(day).set({
            hour: time.hour(),
            minute: time.minute(),
            second: 0,
            millisecond: 0
        }).toDate();

        const found = availability.find(slot => Math.abs(slot.from - checkDate) < 1000);
        if (found) {
            return found.isBooked ? 'booked' : 'available';
        }
        return 'empty';
    };

    const toggleSlot = async (day, time) => {
        const start = moment(day).set({
            hour: time.hour(),
            minute: time.minute(),
            second: 0,
            millisecond: 0
        }).toDate();

        // Calculate end time based on selected duration
        const end = moment(start).add(duration, 'minutes').toDate();

        // We need to break this duration into 30-minute slots
        const slotsToAdd = [];
        let curr = moment(start);
        const endMoment = moment(end);

        while (curr.isBefore(endMoment)) {
            const slotStart = curr.toDate();
            const slotEnd = curr.clone().add(30, 'minutes').toDate();

            // Check if this specific 30-min slot exists
            const existing = availability.find(s => Math.abs(new Date(s.from) - slotStart) < 1000);

            if (existing) {
                if (existing.isBooked) {
                    toast.warn(`Slot ${moment(slotStart).format("HH:mm")} is already booked.`);
                    return; // Stop if we hit a booked slot or skip? Best to stop.
                }
                // If exists but available, we just skip re-adding.
            } else {
                slotsToAdd.push({
                    from: slotStart,
                    to: slotEnd,
                    sessionDate: slotStart,
                    teacherId: teacherData?.teacherId
                });
            }
            curr.add(30, 'minutes');
        }

        if (slotsToAdd.length === 0) {
            // Check if user clicked on an existing available slot to REMOVE it?
            const checkFirst = availability.find(s => Math.abs(new Date(s.from) - start) < 1000);
            if (checkFirst && !checkFirst.isBooked) {
                toast.info("Slot removal not implemented in this grid demo yet");
            }
            return;
        }

        setPendingSlots(slotsToAdd);
        setAddEventModal(true);
    };

    const handlePrevWeek = () => setWeekStart(prev => moment(prev).subtract(1, 'week'));
    const handleNextWeek = () => setWeekStart(prev => moment(prev).add(1, 'week'));

    return (
        <div className={styles.gridContainer}>
            {addEventModal &&
                <AddEventModal
                    setAddEventModal={setAddEventModal}
                    slots={pendingSlots}
                    addSlots={addTeacherAvail}
                    getAvailability={fetchAvailability}
                />
            }
            <div className={styles.header}>
                <button onClick={handlePrevWeek}>Prev</button>
                <h3>{weekStart.format("MMM DD")} - {moment(weekStart).add(6, 'days').format("MMM DD")}</h3>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input
                            type="radio"
                            name="dur"
                            checked={duration === 30}
                            onChange={() => setDuration(30)}
                            style={{ marginRight: '5px' }}
                        />
                        30 Min
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input
                            type="radio"
                            name="dur"
                            checked={duration === 60}
                            onChange={() => setDuration(60)}
                            style={{ marginRight: '5px' }}
                        />
                        60 Min
                    </label>
                </div>

                <button onClick={handleNextWeek}>Next</button>
            </div>

            <div className={styles.gridWrapper}>
                {/* Time Header Row */}
                <div className={styles.timeHeader}>
                    <div className={styles.cornerCell}></div>
                    {timeSlots.map((time, i) => (
                        <div key={i} className={styles.timeLabel}>
                            {time.format("h : mm A")}
                        </div>
                    ))}
                </div>

                {/* Days Rows */}
                {days.map((day, d) => (
                    <div key={d} className={styles.dayRow}>
                        <div className={styles.dayLabel}>
                            <strong>{day.format("ddd")}</strong><br />
                            {day.format("MMM DD")}
                        </div>
                        {timeSlots.map((time, t) => {
                            const status = getSlots ? getSlotStatus(day, time) : 'empty';
                            return (
                                <div
                                    key={t}
                                    className={`${styles.cell} ${styles[status]}`}
                                    onClick={() => toggleSlot(day, time)}
                                    title={`${day.format("MMM DD")} ${time.format("HH:mm")}`}
                                >
                                    {status === 'booked' && 'Booked'}
                                    {status === 'available' && 'Available'}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailabilityGrid;
