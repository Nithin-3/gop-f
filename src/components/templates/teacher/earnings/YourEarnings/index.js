import React, { useEffect, useState } from "react";
import { getTeacherTodayEarnings } from "../../../../../store/actions/teacher";
import styles from "../styles.module.css";

const YourEarnings = ({ pending }) => {
  const [teacherEarnings, setTeacherEarnings] = useState(0);

  useEffect(() => {
    const fetchEarnings = async () => {
      const data = await getTeacherTodayEarnings();
      if (data?.success) setTeacherEarnings(data.data || 0);
    };
    fetchEarnings();
  }, []);

  return (
    <div className={styles.myEarnings}>
      <div className={styles.secondRowHeadings}>My Earnings</div>
      <div className={styles.earningsRow}>
        <div className={styles.earningsBlock}>
          <p className={styles.earningsTitle}>Today Earning</p>
          <p className={styles.earningsValue}>$ {teacherEarnings}</p>
        </div>
        <div className={styles.earningsBlock}>
          <p className={styles.earningsTitle}>Pending</p>
          <p className={styles.earningsValue}>$ {pending}</p>
        </div>
      </div>
      <div className={styles.withdrawSection}>
        <div className={styles.withdrawBtn}>Withdraw</div>
      </div>
    </div>
  );
};

export default YourEarnings;
