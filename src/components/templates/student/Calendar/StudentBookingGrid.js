import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAvailByTeacher } from "../../../../store/actions/availability";
import { getAllSessions } from "../../../../store/actions/session";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "../../teacher/availability/gridStyle.module.css";
import modalStyles from "../../student/Calendar/popupModal/styles.module.css";
import { format } from "date-fns";

const StudentBookingGrid = ({ teacherData, course }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [availability, setAvailability] = useState([]);
    const [weekStart, setWeekStart] = useState(moment().startOf('day'));
    const [eventPopup, setEventPopup] = useState(null);

    // Grid config
    const startTime = 0; // 0:00
    const endTime = 24; // 24:00
    const interval = 30; // minutes

    useEffect(() => {
        fetchAvailability();
    }, [teacherData]);

    const fetchAvailability = async () => {
        if (!teacherData?._id) return;

        const availPromise = getAvailByTeacher(teacherData._id);
        const sessionsPromise = getAllSessions()(() => { });

        const [availResult, sessionsResult] = await Promise.all([availPromise, sessionsPromise]);

        if (availResult?.success) {
            const bookedIds = new Set();
            if (sessionsResult?.success && sessionsResult.data) {
                sessionsResult.data.forEach(session => {
                    if (session.status !== "Cancelled" && session.availabilityIds) {
                        session.availabilityIds.forEach(id => bookedIds.add(id));
                    }
                });
            }

            setAvailability(availResult.data.map(slot => ({
                ...slot,
                from: new Date(slot.from),
                to: new Date(slot.to),
                booked: bookedIds.has(slot._id || slot.id)
            })));
        }
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

    const getSlotStatus = (day, time) => {
        const checkDate = moment(day).set({
            hour: time.hour(),
            minute: time.minute(),
            second: 0,
            millisecond: 0
        }).toDate();

        const found = availability.find(slot => Math.abs(slot.from - checkDate) < 1000);
        if (found) {
            return found.booked || found.isBooked ? 'booked' : 'available';
        }
        return 'empty';
    };

    const handleSelectSlot = (day, time) => {
        const checkDate = moment(day).set({
            hour: time.hour(),
            minute: time.minute(),
            second: 0,
            millisecond: 0
        }).toDate();

        const found = availability.find(slot => Math.abs(slot.from - checkDate) < 1000);
        if (found) {
            if (found.booked || found.isBooked) {
                toast.info("This session is already booked.");
                return;
            }
            setEventPopup({
                ...found,
                start: found.from,
                end: found.to
            });
        }
    };

    const bookSlot = (event) => {
        const token = JSON.parse(localStorage.getItem("profile"))?.token;
        if (!token) return toast.warn("Please Login to continue");

        localStorage.setItem("chosenEvent", JSON.stringify(event));
        navigate("/payment", { state: { course, teacherData, event } });
    };

    const handlePrevWeek = () => setWeekStart(prev => moment(prev).subtract(1, 'week'));
    const handleNextWeek = () => setWeekStart(prev => moment(prev).add(1, 'week'));

    return (
        <div className={styles.gridContainer} style={{ width: '100%' }}>
            <div className={styles.header}>
                <button onClick={handlePrevWeek}>Prev</button>
                <h3>{weekStart.format("MMM DD")} - {moment(weekStart).add(6, 'days').format("MMM DD")}</h3>
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
                            const status = getSlotStatus(day, time);
                            return (
                                <div
                                    key={t}
                                    className={`${styles.cell} ${styles[status]}`}
                                    onClick={() => handleSelectSlot(day, time)}
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
                                    src={teacherData.teacherProfilePic?.data}
                                    alt="teacher"
                                    style={{ width: 100, height: 100, borderRadius: '50%', border: '4px solid #fff', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', objectFit: 'cover' }}
                                />
                            </div>

                            <h4 style={{ fontWeight: '700', color: '#333', marginBottom: 5 }}>
                                {`${teacherData.firstName?.data || teacherData.firstName} ${teacherData.lastName?.data || teacherData.lastName}`}
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
                            >
                                PROCEED TO PAYMENT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentBookingGrid;
