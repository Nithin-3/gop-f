import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { getCourseById } from "../../../../store/actions/course/index";
import { getAvailByAId } from "../../../../store/actions/availability/index";
import { getTeacherDetailByTId } from "../../../../store/actions/teacher/index";
import english from "../../../../assets/flags/english.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getStudentDetailById } from "../../../../store/actions/student";
import CancelModal from './modals/CancelModal';
import { cancelVideoSession } from "../../../../store/actions/student/index";

export const SubmitButton = ({ onClick }) => (
    <div onClick={onClick} style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
        <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", cursor: "pointer", padding: "8px 20px", backgroundColor: "#5bd056", color: "#fffefe", borderRadius: "5px" }}>
            Submit
            <i className='fas fa-check-circle' style={{ fontWeight: "bold", marginLeft: "10px", color: "#fffefe" }}></i>
        </div>
    </div>
);

export const Card = ({ width, cardInfo, dropDown = [] }) => {
    const [showOtherOptions, setShowOtherOptions] = React.useState(false);
    const otherOptions = React.useRef();
    const dispatch = useDispatch();
    const history = useNavigate();
    const [courseDetails, setCourseDetails] = React.useState();
    const [availDetails, setAvailDetails] = React.useState();
    const [teacherDetails, setTeacherDetails] = React.useState();
    const [studentName, setStudentName] = React.useState("");
    const [disableBtn, setDisableBtn] = React.useState(false);
    const [btnName] = React.useState("Start Class");
    const [cancelModal, setCancelModal] = React.useState(false);

    const openLiveClass = () => {
        if (disableBtn) {
            return toast.error("This session time has elapsed.");
        }
        history("/liveclass", {
            state: {
                role: "Teacher",
                studentName,
                availDetails,
                courseDetails,
                sessionDetails: cardInfo,
                teacherDetails
            }
        });
    };

    const handleClick = e => { if (otherOptions.current && !otherOptions.current.contains(e.target)) setShowOtherOptions(false); };

    React.useEffect(() => {
        window.addEventListener('mousedown', handleClick, false);
        return () => window.removeEventListener('mousedown', handleClick, false);
    }, []);

    React.useEffect(() => {
        async function getStudentInfo() {
            if (!cardInfo?.studentId) {
                setStudentName("No Student Assigned");
                return;
            }
            try {
                const res = await dispatch(getStudentDetailById(cardInfo.studentId));
                const student = res?.success ? res.data : res;
                if (student && student.length > 0) {
                    setStudentName(student[0].firstName + " " + student[0].lastName);
                } else if (student && student.firstName) {
                    setStudentName(student.firstName + " " + student.lastName);
                } else {
                    setStudentName("Student Details Not Found");
                }
            } catch (error) {
                console.error("getStudentInfo error:", error);
                setStudentName("Error Loading Student");
            }
        }
        async function getCourseDetails(cid) {
            try {
                const res = await dispatch(getCourseById(cid));
                const course = res?.success ? res.data : res;
                setCourseDetails(course);
            } catch (error) { console.error("getCourseDetails error:", error); }
        }
        async function getTeacherInfo(tid) {
            try {
                const res = await dispatch(getTeacherDetailByTId(tid));
                const teacher = res?.success ? res.data : res;
                setTeacherDetails(teacher);
            } catch (error) { console.error("getTeacherInfo error:", error); }
        }
        async function getAvailTime(aid) {
            try {
                const res = await dispatch(getAvailByAId(aid));
                const availTime = res?.success ? res.data : res;
                let classDate = moment(availTime?.to);
                let todayDate = moment();
                if (classDate.isBefore(todayDate)) setDisableBtn(true);
                setAvailDetails(availTime);
            } catch (error) { console.error("getAvailTime error:", error); }
        }

        if (cardInfo?.availabilityIds?.length > 0) getAvailTime(cardInfo.availabilityIds[0]);
        getStudentInfo();
        getTeacherInfo(cardInfo.teacherId);
        getCourseDetails(cardInfo.courseId);
    }, [cardInfo, dispatch]);

    const cancelSession = async () => {
        let sessionObj = { teacherId: cardInfo.teacherId, studentId: cardInfo.studentId, sessionId: cardInfo._id, availId: availDetails ? availDetails.id : '' };
        const result = await dispatch(cancelVideoSession(sessionObj));
        if (result) {
            setCancelModal(false);
            toast.success("Session Cancelled Successfully.");
            window.location.reload();
        }
    }

    return (
        <>
            {cancelModal && <CancelModal setCancelModal={setCancelModal} width={width} cancelSession={cancelSession} availDetails={availDetails} cardInfo={cardInfo} />}
            <div className={styles.cardContainer}>
                <div className={styles.courseimg}><img src={courseDetails ? courseDetails?.courseImage?.data : english} alt="language_flag" className={styles.cardImg} /></div>
                {availDetails ? (
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>
                            {courseDetails ? courseDetails?.title?.data : cardInfo.heading}
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: "bold" }}>{moment(availDetails.from).format("hh:mm a")}</div>
                        <div style={{ fontSize: '14px' }}>{moment(availDetails.from).format("dddd - MMMM DD, yyyy")}</div>
                    </div>
                ) : (
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>
                            {courseDetails ? courseDetails?.title?.data : cardInfo.heading}
                        </div>
                        <div style={{ marginTop: "1rem", fontSize: '14px' }}>Not Scheduled</div>
                    </div>
                )}
                <div className={styles.div2}>
                    <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>{studentName}</div>
                    <div style={{ fontSize: '20px', fontWeight: "bold" }}>
                        {courseDetails ? courseDetails.language.data : cardInfo.time}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: "0.3rem" }}>
                        <i className="far fa-clock"></i>
                        <div>{cardInfo.isFree || cardInfo.type === "30" ? 30 : 60} minutes</div>
                    </div>
                </div>
                {cardInfo.status === "Cancelled" ? (
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} style={{ background: '#999', cursor: 'default' }}>Cancelled</button>
                    </div>
                ) : (
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} onClick={openLiveClass}>{btnName}</button>
                        <div className={styles.moreOptions} ref={otherOptions}>
                            <i className={styles.moreOptionsIcon + ' fas fa-ellipsis-h'} onClick={() => setShowOtherOptions(true)}></i>
                            <ul className={styles.otherOptions + ' ' + (showOtherOptions ? styles.showOptions : '')}>
                                {dropDown?.map((item, index) => (
                                    <li key={index} onClick={() => { item.modal(true); setShowOtherOptions(false); }}>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                                <li onClick={() => { setCancelModal(true); setShowOtherOptions(false); }} style={{ color: "#fffefe", backgroundColor: "#f83030" }}>
                                    <span>Cancel</span>
                                    <i className='fas fa-trash'></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export const CardMobile = ({ width, cardInfo, dropDown = [] }) => {
    const [courseDetails, setCourseDetails] = React.useState();
    const [availDetails, setAvailDetails] = React.useState();

    const [cancelModal, setCancelModal] = React.useState(false);
    const [studentName, setStudentName] = React.useState("");
    const [disableBtn, setDisableBtn] = React.useState(false);
    const [btnName, setBtnName] = React.useState("Start Class");
    const [showOtherOptions, setShowOtherOptions] = React.useState(false);
    const otherOptions = React.useRef();
    const dispatch = useDispatch();
    const history = useNavigate();

    React.useEffect(() => {
        if (cardInfo.status === "Need Scheduling") setBtnName("Schedule");
        async function getCourseDetails(cid) {
            try {
                const res = await dispatch(getCourseById(cid));
                const course = res?.success ? res.data : res;
                setCourseDetails(course);
            } catch (error) { console.error(error); }
        }
        async function getTeacherInfo(tid) {
            try {
                const res = await dispatch(getTeacherDetailByTId(tid));
                const teacher = res?.success ? res.data : res;

            } catch (error) { console.error(error); }
        }
        async function getStudentInfo() {
            if (!cardInfo?.studentId) {
                setStudentName("No Student Assigned");
                return;
            }
            try {
                const res = await dispatch(getStudentDetailById(cardInfo.studentId));
                const student = res?.success ? res.data : res;
                if (student && student.length > 0) {
                    setStudentName(student[0].firstName + " " + student[0].lastName);
                } else if (student && student.firstName) {
                    setStudentName(student.firstName + " " + student.lastName);
                } else {
                    setStudentName("Student Details Not Found");
                }
            } catch (error) {
                console.error("getStudentInfo error:", error);
                setStudentName("Error Loading Student");
            }
        }
        async function getAvailTime(aid) {
            try {
                const res = await dispatch(getAvailByAId(aid));
                const availTime = res?.success ? res.data : res;
                let classDate = moment(availTime?.to);
                let todayDate = moment();
                if (classDate.isBefore(todayDate)) setDisableBtn(true);
                setAvailDetails(availTime);
            } catch (error) { console.error(error); }
        }
        if (cardInfo?.availabilityIds?.length > 0) getAvailTime(cardInfo.availabilityIds[0]);
        getCourseDetails(cardInfo.courseId);
        getTeacherInfo(cardInfo.teacherId);
        getStudentInfo();
    }, [cardInfo, dispatch]);

    const cancelSession = async () => {
        let sessionObj = { teacherId: cardInfo.teacherId, studentId: cardInfo.studentId, sessionId: cardInfo._id, availId: availDetails ? availDetails.id : '' };
        const result = await dispatch(cancelVideoSession(sessionObj));
        if (result) {
            setCancelModal(false);
            toast.success("Session Cancelled Successfully.");
            window.location.reload();
        }
    }
    const openLiveClass = () => disableBtn ? toast.error("This session time has elapsed.") : history("/liveclass", { state: { role: "Teacher", studentName, availDetails, courseDetails, sessionDetails: cardInfo } });

    const handleClick = e => { if (otherOptions.current && !otherOptions.current.contains(e.target)) setShowOtherOptions(false); };

    React.useEffect(() => {
        window.addEventListener('mousedown', handleClick, false);
        return () => window.removeEventListener('mousedown', handleClick, false);
    }, []);

    return (
        <>
            {cancelModal && <CancelModal setCancelModal={setCancelModal} width={width} cancelSession={cancelSession} availDetails={availDetails} cardInfo={cardInfo} />}
            <div className={styles.cardMobileContainer} style={{ marginBottom: "1.5rem" }}>
                {availDetails ? (
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>
                            {courseDetails ? courseDetails?.title?.data : cardInfo.heading}
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: "bold" }}>{moment(availDetails.from).format("hh:mm a")}</div>
                        <div style={{ fontSize: '14px' }}>{moment(availDetails.from).format("dddd - MMMM DD, yyyy")}</div>
                    </div>
                ) : (
                    <div className={styles.div1}>
                        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>
                            {courseDetails ? courseDetails?.title?.data : cardInfo.heading}
                        </div>
                        <div style={{ marginTop: width >= 992 ? "1rem" : "", fontSize: '14px' }}>Not Scheduled</div>
                    </div>
                )}
                <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc", marginTop: width >= 992 ? "" : "1rem" }}>{studentName}</div>
                <div style={{ fontSize: '20px', fontWeight: "bold" }}>{courseDetails ? courseDetails.language.data : cardInfo.time}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: "0.3rem" }}>
                    <i className="far fa-clock"></i>
                    <div>{cardInfo.isFree || cardInfo.type === "30" ? 30 : 60} minutes</div>
                </div>
                {cardInfo.status === "Cancelled" ? (
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} style={{ background: '#999', cursor: 'default', width: '100%' }}>Cancelled</button>
                    </div>
                ) : (
                    <div className={styles.btncontainer}>
                        <button className={styles.btn} onClick={openLiveClass}>{btnName}</button>
                        <div className={styles.moreOptions} ref={otherOptions}>
                            <i className={styles.moreOptionsIcon + ' fas fa-ellipsis-h'} onClick={() => setShowOtherOptions(true)}></i>
                            <ul className={styles.otherOptions + ' ' + (showOtherOptions ? styles.showOptions : '')}>
                                {dropDown?.map((item, index) => (
                                    <li key={index} onClick={() => { item.modal(true); setShowOtherOptions(false); }}>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                                <li onClick={() => { setCancelModal(true); setShowOtherOptions(false); }} style={{ color: "#fffefe", backgroundColor: "#f83030" }}>
                                    <span>Cancel</span>
                                    <i className='fas fa-trash'></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
