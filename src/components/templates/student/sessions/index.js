import React from "react";
import { useDispatch } from "react-redux";
import { useWindowDimensions } from "../../../../utils/util";
import { getAllSessions } from "../../../../store/actions/session";
import teacherStyles from "../styles.module.css";
import styles from "./styles.module.css";
import All from "./tabs/All";
import Upcoming from "./tabs/Upcoming";
import Trial from "./tabs/Trial";
import Completed from "./tabs/Completed";
import Cancelled from "./tabs/Cancelled";
import IssueReported from "./tabs/IssueReported";
import NeedScheduling from "./needScheduling/NeedScheduling";

function StudentSessions() {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [mobileDropdown, setMobileDropdown] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("All");
  const [sessions, setSessions] = React.useState();
  const tabs = ["All", "Upcoming", "Trial", "Completed", "Cancelled", "Needs Scheduling"];

  React.useEffect(() => {
    const load = async () => {
      try {
        const result = await dispatch(getAllSessions());
        if (result?.success) {
          setSessions(result.data);
        } else {
          setSessions([]);
        }
      } catch (e) {
        console.error("Failed to load sessions:", e);
        setSessions([]);
      }
    };
    load();
  }, [dispatch]);

  return (
    <main className={teacherStyles.mainSection}>
      {width >= 992 ? (
        <div className={styles.sessionTabs}>
          {tabs.map((t, i) => (
            <div key={i} className={`${styles.sessionTab} ${activeTab === t ? styles.sessionTabActive : ""}`} onClick={() => setActiveTab(t === "Needs Scheduling" ? "Need Scheduling" : t)}>{t}</div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.sessionTabs}>
            <div className={styles.sessionTabHeading}>{activeTab}</div>
            <div className={styles.arrowIcon} onClick={() => setMobileDropdown(!mobileDropdown)}>
              <i className={`fas fa-caret-${mobileDropdown ? "up" : "down"}`} />
            </div>
          </div>
          {mobileDropdown && (
            <div className={styles.mobileDropdown}>
              {tabs.map((t, i) => (
                <div key={i} className={`${styles.sessionTab} ${activeTab === t ? styles.sessionTabActiveDropdown : ""}`} onClick={() => { setActiveTab(t); setMobileDropdown(false); }}>{t}</div>
              ))}
            </div>
          )}
        </>
      )}
      {{
        All: <All width={width} arr={sessions} />,
        Upcoming: <Upcoming width={width} arr={sessions} />,
        Trial: <Trial width={width} arr={sessions} />,
        Completed: <Completed width={width} arr={sessions} />,
        Cancelled: <Cancelled width={width} arr={sessions} />,
        "Issue Reported": <IssueReported width={width} arr={sessions} />,
        "Need Scheduling": <NeedScheduling width={width} arr={sessions} />,
      }[activeTab]}
    </main>
  );
}

export default StudentSessions;
