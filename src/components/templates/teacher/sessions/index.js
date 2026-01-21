import React from "react";
import Upcoming from "./tabs/Upcoming";
import FreeCourses from "./tabs/FreeCourses";
import Cancelled from "./tabs/Cancelled";
import Completed from "./tabs/Completed";
import Incompleted from "./tabs/Incompleted";
import ReportIssue from "./tabs/ReportIssue";
import NeedScheduling from "./tabs/NeedScheduling";
import { useWindowDimensions } from "../../../../utils/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { getTeacherSessions } from "../../../../store/actions/teacher";

function TeacherSessions() {
  const history = useNavigate();
  const { width } = useWindowDimensions();
  const [sessions, setSessions] = React.useState();
  const dispatch = useDispatch();
  const [mobileDropdown, setMobileDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Upcoming");
  const tabs = ["Upcoming", "Free Trail", "Cancelled", "Completed", "Incompleted", "Report Issue", "Need Scheduling"];

  React.useEffect(() => {
    let userObj = JSON.parse(window.localStorage.getItem("profile"));
    if (!userObj?.isOnBoarding) {
      toast.warn("Onboarding Pending");
      return history("/teacher/onboard");
    }
    let teacherData = JSON.parse(window.localStorage.getItem("teacherData"));
    if (teacherData?.approvalStatus !== "verified") {
      toast.warn("Admin Verification Pending");
      return history("/teacher/dashboard");
    }

    async function getSessions() {
      try {
        const result = await dispatch(getTeacherSessions());

        if (result?.success) {
          setSessions(result.data);
        } else if (Array.isArray(result)) {
          setSessions(result);
        } else {
          setSessions([]);
        }
      } catch (error) {
        console.error("Failed to fetch teacher sessions:", error);
        setSessions([]);
      }
    }
    getSessions();
  }, [dispatch, history]);

  return (
    <main className={styles.mainSection}>
      {width >= 992 ? (
        <div className={styles.sessionTabs}>
          {tabs.map((item, index) => (
            <div key={index} className={styles.sessionTab + " " + `${activeTab === item ? styles.sessionTabActive : ""}`} onClick={() => setActiveTab(item)}>{item}</div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.sessionTabs}>
            <div className={styles.sessionTabHeading}>{activeTab}</div>
            <div className={styles.arrowIcon} onClick={() => setMobileDropdown(!mobileDropdown)}>{mobileDropdown ? <i className='fas fa-caret-up'></i> : <i className='fas fa-caret-down'></i>}</div>
          </div>
          {mobileDropdown && <div style={{ position: "relative" }}><div className={styles.mobileDropdown}>{tabs.map((item, index) => <div key={index} className={styles.sessionTab + " " + `${activeTab === item ? styles.sessionTabActiveDropdown : ""}`} onClick={() => { setActiveTab(item); setMobileDropdown(false); }}>{item}</div>)}</div></div>}
        </>
      )}
      {{
        Upcoming: <Upcoming width={width} arr={sessions} />,
        "Free Trail": <FreeCourses width={width} arr={sessions} />,
        Cancelled: <Cancelled width={width} arr={sessions} />,
        Completed: <Completed width={width} arr={sessions} />,
        Incompleted: <Incompleted width={width} arr={sessions} />,
        "Report Issue": <ReportIssue width={width} />,
        "Need Scheduling": <NeedScheduling width={width} arr={sessions} />
      }[activeTab]}
    </main>
  );
}

export default TeacherSessions;
