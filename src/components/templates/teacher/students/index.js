import { useState } from "react";
import styles from "../styles.module.css";

function TeacherStudents() {
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [showActions, setShowActions] = useState(false);

  const tabs = ["All","Upcoming","Trial","Completed","Cancelled","Issue Reported","Need Scheduling"];

  return (
    <main className={styles.mainSection}>
      <h2>Teacher Students</h2>
      <p>Under Development</p>

      <div style={{display:"none"}}>
        <div style={{marginTop:"20px",fontWeight:"bold",width:"100%",padding:"10px 20px",backgroundColor:"#9fcce6",display:"flex",justifyContent:"space-between"}}>
          <div>Student Name</div>
          <div>Student Email</div>
          <div>Class Taken</div>
          <div>Last Course (Date/Time)</div>
          <div>
            <div onClick={()=>setShowActions(!showActions)}>Actions</div>
            {showActions && (
              <div style={{marginTop:"10px",border:"1px solid",padding:"10px",borderRadius:"10px",position:"absolute",backgroundColor:"#fff"}}>
                <div>See Profile</div>
                <div>Message</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{display:"none"}}>
        <div className={styles.sessionTabs}>
          <div className={styles.sessionTabHeading}>{activeTab}</div>
          <div className={styles.arrowIcon} onClick={()=>setMobileDropdown(!mobileDropdown)}>
            {mobileDropdown ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
          </div>
        </div>
        {mobileDropdown && (
          <div style={{position:"relative"}}>
            <div className={styles.mobileDropdown}>
              {tabs.map((item,i)=>(
                <div key={i} className={`${styles.sessionTab} ${activeTab===item?styles.sessionTabActiveDropdown:""}`} onClick={()=>{setActiveTab(item);setMobileDropdown(false);}}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default TeacherStudents;
