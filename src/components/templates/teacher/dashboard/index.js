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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const userObj = JSON.parse(localStorage.getItem("profile"));
      if (!userObj?._id) return;

      socket?.emit("addUser", userObj?._id);

      if (!userObj?.isOnBoarding) {
        toast.warn("Onboarding Pending");
        navigate("/teacher/onboard");
        return;
      }

      setLoading(true);

      // Parallel fetch with individual error handling
      const fetchActions = [
        { key: 'teacher', action: getTeacherData(), setter: setTeacherData },
        { key: 'sessions', action: getTeacherSessions(), setter: setSessions },
        { key: 'numbers', action: getTeacherDashNums(), setter: (data) => setNumbers(data?.data || {}) },
        {
          key: 'upcoming', action: getUpcomingClassForTeacher(), setter: async (upcoming) => {
            if (upcoming?.data) {
              setUpcomingClass(upcoming.data);
              try {
                const course = await dispatch(getCourseById(upcoming.data.courseId));
                setLanguageUC(course?.language?.data || "");
                setPriceUC(course?.price?.data || 0);
              } catch (e) {
                console.error("Failed to load upcoming course details:", e);
              }
            }
          }
        }
      ];

      await Promise.all(fetchActions.map(async ({ key, action, setter }) => {
        try {
          const res = await dispatch(action);
          await setter(res);
        } catch (e) {
          console.error(`Failed to load ${key}:`, e);
          // Optional: toast.error(`Failed to load ${key}`) if critical
        }
      }));

      // Chat is non-critical
      try {
        await dispatch(createConversation({ senderId: userObj?._id, receiverId: "6220e5b15e6e8a82aff9a0b9" }));
      } catch (chatErr) {
        console.error("Chat initialization failed:", chatErr);
      }

      setLoading(false);
    };
    init();
  }, [dispatch, socket, navigate]);

  const sessionCounts = (Array.isArray(sessions) ? sessions : []).reduce((acc, s) => {
    const status = s?.status || "";
    if (status === "Upcoming") acc.upcoming++;
    if (status === "Need Scheduling") acc.notscheduled++;
    if (status === "Cancelled") acc.cancelled++;
    return acc;
  }, { upcoming: 0, notscheduled: 0, cancelled: 0 });

  const widgets = [
    { title: "Courses", icon: graduation_cap, number: numbers?.numCourses || 0 },
    { title: "Class Taken", icon: class_taken, number: numbers?.numClassesTaken || 0 },
    { title: "Verified Courses", icon: verified, number: numbers?.numVC || 0 },
    { title: "Non-Verified Courses", icon: non_verified, number: numbers?.numNVC || 0 },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fe' }}>
        <div className={styles.loader}>Loading your dashboard...</div>
      </div>
    );
  }

  return width >= 992 ? (
    <DesktopView widgets={widgets} sessions={sessions} sessionCounts={sessionCounts} graph={graph} setGraph={setGraph} teacherData={teacherData} upcomingClass={upcomingClass} languageUC={languageUC} priceUC={priceUC} />
  ) : (
    <MobileView widgets={widgets} sessions={sessions} sessionCounts={sessionCounts} graph={graph} setGraph={setGraph} teacherData={teacherData} upcomingClass={upcomingClass} languageUC={languageUC} priceUC={priceUC} />
  );
};

const DesktopView = ({ widgets, sessionCounts, graph, setGraph, teacherData, upcomingClass, languageUC, priceUC, sessions }) => {
  const navigate = useNavigate();

  const handleJoinClass = () => {
    if (!upcomingClass) return;
    navigate("/liveclass", {
      state: {
        role: "Teacher",
        availDetails: upcomingClass,
        courseDetails: { title: languageUC },
        sessionDetails: upcomingClass,
        teacherDetails: teacherData
      }
    });
  };

  return (
    <main className={styles.mainSection}>
      <TopWidgets widgets={widgets} />
      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <SessionManagement sessions={sessions} />
          <GraphCard graph={graph} setGraph={setGraph} />
        </div>
        <div className={styles.rightColumn}>
          <RightTeacherCard
            teacherData={teacherData}
            upcomingClass={upcomingClass}
            language={languageUC}
            price={priceUC}
            onJoin={handleJoinClass}
          />
          <StatusSummary sessionCounts={sessionCounts} />
        </div>
      </div>
    </main>
  );
};

const MobileView = ({ widgets, sessionCounts, graph, setGraph, teacherData, upcomingClass, languageUC, priceUC, sessions }) => {
  const navigate = useNavigate();

  const handleJoinClass = () => {
    if (!upcomingClass) return;
    navigate("/liveclass", {
      state: {
        role: "Teacher",
        availDetails: upcomingClass,
        courseDetails: { title: languageUC },
        sessionDetails: upcomingClass,
        teacherDetails: teacherData
      }
    });
  };

  return (
    <main className={styles.mainSection}>
      <div className={styles.mobileHeader}>Welcome {teacherData?.firstName?.data || "Teacher"}</div>
      <MobileUpcomingCard
        upcomingClass={upcomingClass}
        language={languageUC}
        price={priceUC}
        onJoin={handleJoinClass}
      />
      <TopWidgets widgets={widgets} />
      <SessionManagement sessions={sessions} />
      <StatusSummary sessionCounts={sessionCounts} />
      <GraphCard graph={graph} setGraph={setGraph} />
    </main>
  );
};

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

const StatusSummary = ({ sessionCounts }) => (
  <div className={styles.statusSummaryCard}>
    <h4>Session Overview</h4>
    <div className={styles.statusItem}><span>Upcoming</span><span className={styles.statusBadgeUpcoming}>{sessionCounts.upcoming}</span></div>
    <div className={styles.statusItem}><span>Not Scheduled</span><span className={styles.statusBadgePending}>{sessionCounts.notscheduled}</span></div>
    <div className={styles.statusItem}><span>Cancelled</span><span className={styles.statusBadgeCancelled}>{sessionCounts.cancelled}</span></div>
  </div>
);

const SessionManagement = ({ sessions }) => {
  const [filter, setFilter] = useState("All");

  const filteredSessions = (Array.isArray(sessions) ? sessions : []).filter(s => {
    if (filter === "All") return true;
    return s.status === filter;
  }).slice(0, 5); // Show top 5

  return (
    <div className={styles.sessionManagement}>
      <div className={styles.sessionHeader}>
        <h3>Recent Sessions</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterDropdown}>
          <option value="All">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Need Scheduling">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredSessions.length > 0 ? (
        <div className={styles.sessionTable}>
          <div className={styles.tableHeader}>
            <span>Date</span>
            <span>Course</span>
            <span>Status</span>
          </div>
          {filteredSessions.map((s, i) => (
            <div key={i} className={styles.tableRow}>
              <span>{s.from ? moment(s.from).format("DD MMM, hh:mm A") : "TBD"}</span>
              <span>{s.courseId?.title?.data || s.courseId?.title || s.courseTitle || "Lesson"}</span>
              <span className={styles[`status${(s.status || "").replace(/\s/g, '')}`] || ""}>{s.status || "Unknown"}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>No sessions found matching your criteria.</div>
      )}
    </div>
  );
};

const GraphCard = ({ graph, setGraph }) => (
  <div className={styles.graphCard}>
    <div className={styles.graphHeader}>
      <h3>Statistics</h3>
      <div className={styles.graphToggle}>{graph}</div>
    </div>
    <img src={graph_img} alt="graph" />
  </div>
);

const RightTeacherCard = ({ teacherData, upcomingClass, language, price, onJoin }) => (
  <div className={styles.rightCard}>
    <div className={styles.upcomingBadge}>NEXT CLASS</div>
    {upcomingClass ? (
      <>
        <h3 className={styles.courseTitle}>{language}</h3>
        <div className={styles.dateTime}>
          <i className="fas fa-calendar-alt"></i> {moment(upcomingClass.from).format("DD MMM YYYY")}
        </div>
        <div className={styles.dateTime}>
          <i className="fas fa-clock"></i> {moment(upcomingClass.from).format("hh:mm A")}
        </div>
        <div className={styles.priceTag}>${price}</div>
        <button onClick={onJoin} className={styles.joinBtn}>Join Class</button>
      </>
    ) : (
      <div className={styles.noClass}>
        <i className="fas fa-calendar-times"></i>
        <p>No upcoming class scheduled</p>
      </div>
    )}
  </div>
);

const MobileUpcomingCard = ({ upcomingClass, language, price, onJoin }) => (
  <div className={styles.mobileUpcoming}>
    {upcomingClass ? (
      <>
        <div className={styles.mobileUpcomingInfo}>
          <h4>{language}</h4>
          <p>{moment(upcomingClass.from).format("DD MMM, hh:mm A")}</p>
          <span>${price}</span>
        </div>
        <button onClick={onJoin} className={styles.mobileJoinBtn}>Join Now</button>
      </>
    ) : (
      <div>No meetings</div>
    )}
  </div>
);

export default TeacherDashboard;
