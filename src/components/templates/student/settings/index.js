import React from "react";
import teacherStyles from "../styles.module.css";
import styles from "./styles.module.css";
import BasicInfo from "./basicInfo/basicInfo";
import ProfilePic from "./profilePic/ProfilePic";
import Languages from "./languages/Languages";
import Password from "./password/Password";
import Notifications from "./notifications/Notifications";
import { useWindowDimensions } from "../../../../utils/util";

const StudentSettings = () => {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = React.useState("Basic Info");
  const [mobileDropdown, setMobileDropdown] = React.useState(false);
  const tabs = ["Basic Info", "Profile Pic", "Languages", "Password", "Notifications"];
  const studentData = JSON.parse(localStorage.getItem("studentData"));
  const views = {
    "Basic Info": <BasicInfo myDetails={studentData?.data} />,
    "Profile Pic": <ProfilePic myDetails={studentData?.data} />,
    Languages: <Languages myDetails={studentData?.data} />,
    Password: <Password myDetails={studentData?.data} />,
    Notifications: <Notifications myDetails={studentData?.data} />,
  };

  return (
    <main className={teacherStyles.mainSection} style={{ width: "100%" }}>
      {width >= 992 ? (
        <>
          <div className={styles.settingsTabs}>
            {tabs.map((t, i) => (
              <div key={i} className={`${styles.settingsTab} ${activeTab === t ? styles.settingsTabActive : ""}`} onClick={() => setActiveTab(t)}>{t}</div>
            ))}
          </div>
          <div style={{ marginTop: 50 }}>{views[activeTab]}</div>
        </>
      ) : (
        <>
          <div className={styles.settingsTabs}>
            <div className={styles.settingsTabHeading}>{activeTab}</div>
            <div className={styles.arrowIcon} onClick={() => setMobileDropdown(!mobileDropdown)}>
              <i className={`fas fa-caret-${mobileDropdown ? "up" : "down"}`} />
            </div>
          </div>
          {mobileDropdown && (
            <div className={styles.mobileDropdown}>
              {tabs.map((t, i) => (
                <div key={i} className={`${styles.settingsTab} ${activeTab === t ? styles.settingsTabActiveDropdown : ""}`} onClick={() => { setActiveTab(t); setMobileDropdown(false); }}>{t}</div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 50 }}>{views[activeTab]}</div>
        </>
      )}
    </main>
  );
};

export default StudentSettings;
