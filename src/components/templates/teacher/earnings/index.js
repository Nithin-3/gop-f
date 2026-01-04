import React, { useEffect, useState, useCallback } from "react";
import { getTeacherPendingEarnings, getTeacherWithdrawals } from "../../../../store/actions/teacher";
import BalanceSheet from "./BalanceSheet";
import WithdrawalStatus from "./WithdrawalStatus";
import YourEarnings from "./YourEarnings";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

const TeacherEarnings = () => {
  const teacherData = JSON.parse(localStorage.getItem("teacherData"));
  const [withdrawals, setWithdrawals] = useState([]);
  const [teacherPending, setTeacherPending] = useState(0);

  const getWithdrawals = useCallback(async () => {
    try {
      const data = await getTeacherWithdrawals();
      if (data?.success) setWithdrawals(data.data);
      else toast.error("Failed to fetch withdrawals");
    } catch {
      toast.error("Failed to fetch withdrawals");
    }
  }, []);

  const getTeacherPending = useCallback(async () => {
    try {
      const data = await getTeacherPendingEarnings();
      if (data?.success) setTeacherPending(data.data);
      else toast.error("Failed to fetch pending earnings");
    } catch {
      toast.error("Failed to fetch pending earnings");
    }
  }, []);

  useEffect(() => { getWithdrawals(); getTeacherPending(); }, [getWithdrawals, getTeacherPending]);

  return (
    <div className={styles.mainSection}>
      <div className={styles.section_first}>
        <YourEarnings pending={teacherPending} />
        <WithdrawalStatus teacherData={teacherData || {}} handleWithdrawals={getWithdrawals} handlePending={getTeacherPending} />
      </div>
      <div className={styles.section_second}>
        <BalanceSheet data={withdrawals} handleFunction={getWithdrawals} />
      </div>
    </div>
  );
};

export default TeacherEarnings;
