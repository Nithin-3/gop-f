import React from "react";
import MyCalendar from "../Calendar/MyCalendar";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Availability = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    let userObj = JSON.parse(window.localStorage.getItem("profile"));

    if (!userObj.isOnBoarding) {
      toast.warn("Onboarding Pending");
      return navigate("/teacher/onboard");
    }

    let teacherData = JSON.parse(window.localStorage.getItem("teacherData"));
    if (teacherData.approvalStatus !== "verified") {
      toast.warn("Admin Verification Pending");
      return navigate("/teacher/dashboard");
    }
  }, []);

  return (
    <>
      <main className={styles.mainSection} style={{ display: 'flex', justifyContent: 'center' }}>
        <MyCalendar />
      </main>
    </>
  );
};

export default Availability;
