import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { SocketContext } from "../../../../context/socketContext";
import { useWindowDimensions } from "../../../../utils/util";
import graduation_cap from "../../../../assets/icons/graduation-cap-solid.svg";
import class_taken from "../../../../assets/icons/class_learning_from_home_education_icon.svg";
import verified from "../../../../assets/icons/check_checklist_list_mark_ok_icon.svg";
import non_verified from "../../../../assets/icons/close_circled_icon.svg";
import graph_img from "../../../../assets/icons/temp_graph.png";
import { getTeacherData, getTeacherSessions, getUpcomingClassForTeacher, getTeacherDashNums } from "../../../../store/actions/teacher";
import { getCourseById } from "../../../../store/actions/course";
import { createConversation } from "../../../../store/actions/conversations";
import styles from "./styles.module.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { width } = useWindowDimensions();
  const [graph, setGraph] = useState("Courses Impression");
  const [teacherData, setTeacherData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [numbers, setNumbers] = useState({});
  const [upcomingClass, setUpcomingClass] = useState(null);
  const [languageUC, setLanguageUC] = useState("");
  const [priceUC, setPriceUC] = useState(0);

  useEffect(() => {
    const init = async () => {
      const userObj = JSON.parse(localStorage.getItem("profile"));
      socket?.emit("addUser", userObj?._id);
      if (!userObj?.isOnBoarding) {
        toast.warn("Onboarding Pending");
        navigate("/teacher/onboard");
        return;
      }
      try {
        const teacher = await dispatch(getTeacherData());
        setTeacherData(teacher);
        const sess = await dispatch(getTeacherSessions());
        setSessions(sess || []);
        const dashNums = await dispatch(getTeacherDashNums());
        setNumbers(dashNums?.data || {});
        await dispatch(createConversation({ senderId: userObj?._id, receiverId: "6220e5b15e6e8a82aff9a0b9" }));
        const upcoming = await dispatch(getUpcomingClassForTeacher());
        if (upcoming?.data) {
          const course = await dispatch(getCourseById(upcoming.data.courseId));
          setUpcomingClass(upcoming.data);
          setLanguageUC(course?.language?.data || "");
          setPriceUC(course?.price?.data || 0);
        }
      } catch (e) {
        console.error("Dashboard initialization failed:", e);
        toast.error("Failed to load dashboard");
      }
    };
    init();
  }, [dispatch, socket, navigate]);

  const sessionCounts = sessions.reduce((acc, s) => {
    if (s.status === "Upcoming") acc.upcoming++;
    if (s.status === "Need Scheduling") acc.notscheduled++;
    if (s.status === "Cancelled") acc.cancelled++;
    return acc;
  }, { upcoming: 0, notscheduled: 0, cancelled: 0 });

  const widgets = [
    { title: "Courses", icon: graduation_cap, number: numbers?.numCourses },
    { title: "Class Taken", icon: class_taken, number: 0 },
    { title: "Verified Courses", icon: verified, number: numbers?.numVC },
    { title: "Non-Verified Courses", icon: non_verified, number: numbers?.numNVC },
  ];

  return width >= 992 ? (
    <DesktopView widgets={widgets} sessions={sessions} sessionCounts={sessionCounts} graph={graph} setGraph={setGraph} teacherData={teacherData} upcomingClass={upcomingClass} languageUC={languageUC} priceUC={priceUC} />
  ) : (
    <MobileView widgets={widgets} sessions={sessions} sessionCounts={sessionCounts} graph={graph} setGraph={setGraph} teacherData={teacherData} upcomingClass={upcomingClass} languageUC={languageUC} priceUC={priceUC} />
  );
};

const DesktopView = ({ widgets, sessionCounts, graph, setGraph, teacherData, upcomingClass, languageUC, priceUC }) => (
  <main className={styles.mainSection}>
    <TopWidgets widgets={widgets} />
    <LessonOverview sessionCounts={sessionCounts} />
    <GraphCard graph={graph} setGraph={setGraph} />
    <RightTeacherCard teacherData={teacherData} upcomingClass={upcomingClass} language={languageUC} price={priceUC} />
  </main>
);

const MobileView = ({ widgets, sessionCounts, graph, setGraph, teacherData, upcomingClass, languageUC, priceUC }) => (
  <main className={styles.mainSection}>
    <div className={styles.mobileHeader}>Welcome {teacherData?.firstName?.data || "Teacher"}</div>
    <MobileUpcomingCard upcomingClass={upcomingClass} language={languageUC} price={priceUC} />
    <TopWidgets widgets={widgets} />
    <LessonOverview sessionCounts={sessionCounts} />
    <GraphCard graph={graph} setGraph={setGraph} />
  </main>
);

const TopWidgets = ({ widgets }) => (
  <div className={styles.row}>
    {widgets.map((w, i) => (
      <div key={i} className={styles.firstRowTab}>
        <img src={w.icon} alt={w.title} className={styles.widgetIcon} />
        <div className={styles.widgetTitle}>{w.title}</div>
        <div className={styles.widgetNumber}>{w.number}</div>
      </div>
    ))}
  </div>
);

const LessonOverview = ({ sessionCounts }) => (
  <div className={styles.lessonOverview}><div>Upcoming: {sessionCounts.upcoming}</div><div>Not Scheduled: {sessionCounts.notscheduled}</div><div>Cancelled: {sessionCounts.cancelled}</div></div>
);

const GraphCard = ({ graph, setGraph }) => (
  <div className={styles.graphCard}><div>{graph}</div><img src={graph_img} alt="graph" /></div>
);

const RightTeacherCard = ({ teacherData, upcomingClass, language, price }) => (
  <div className={styles.rightCard}>{upcomingClass ? <><h3>{language}</h3><p>{moment(upcomingClass.from).format("DD MMM YYYY")}</p><p>{moment(upcomingClass.from).format("hh:mm A")}</p><p>${price}</p></> : <p>No upcoming class</p>}</div>
);

const MobileUpcomingCard = ({ upcomingClass, language, price }) => (
  <div className={styles.mobileUpcoming}>{upcomingClass ? <><div>{language}</div><div>{moment(upcomingClass.from).format("DD MMM YYYY")}</div><div>${price}</div></> : <div>No meetings</div>}</div>
);

export default TeacherDashboard;
