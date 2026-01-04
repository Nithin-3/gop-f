import React, { useEffect, useState } from "react";
import { getTeacherAlreadyWithdrawn, getTeacherWallet } from "../../../../../store/actions/teacher";
import { useWindowDimensions } from "../../../../../utils/util";
import { toast } from "react-toastify";
import WithDrawModal from "../Modals/WithDrawModal";
import styles from "../styles.module.css";

const WithdrawalStatus = ({ teacherData, handleWithdrawals, handlePending }) => {
  const { width } = useWindowDimensions();
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [teacherWallet, setTeacherWallet] = useState({});
  const [alreadyWithdrawn, setAlreadyWithdrawn] = useState(0);

  const getWallet = async () => {
    const data = await getTeacherWallet();
    if (data?.success) setTeacherWallet(data.data);
  };

  const getAlreadyWithdrawn = async () => {
    const data = await getTeacherAlreadyWithdrawn();
    if (data?.success) setAlreadyWithdrawn(data.data);
  };

  useEffect(() => { getWallet(); getAlreadyWithdrawn(); }, []);

  return (
    <>
      {withdrawModal && <WithDrawModal
        setEditModal={setWithdrawModal}
        width={width}
        teacherData={teacherData}
        teacherWallet={teacherWallet}
        getWallet={getWallet}
        handleWithdrawals={handleWithdrawals}
        handlePending={handlePending}
      />}
      <div className={styles.myEarnings}>
        <div className={styles.secondRowHeadings}>Withdrawals</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", height: "100%", borderTop: "1px solid #359DD6", backgroundColor: "#9ECDE6" }}>
          <div style={{ padding: "10px 0", width: "50%", borderRight: "1px solid #359DD6", display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>
            <div style={{ display: "inline-block" }}>
              <p style={{ marginBottom: "10px", color: "black", fontSize: "20px" }}>Already Withdrawn</p>
              <p style={{ textAlign: "center" }}>$ {alreadyWithdrawn}</p>
            </div>
          </div>
          <div style={{ padding: "10px 0", width: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>
            <div style={{ display: "inline-block" }}>
              <p style={{ marginBottom: "10px", color: "black", fontSize: "20px" }}>Available to Withdraw</p>
              <p style={{ textAlign: "center" }}>$ {teacherWallet?.balanceAmount}</p>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#FC879E", borderRadius: "0 0 20px 20px", textAlign: "center", padding: "10px 0" }}>
          <div style={{ display: "inline-block", backgroundColor: "#359DD6", color: "#fff", borderRadius: "5px", padding: "5px 20px", cursor: "pointer" }}
               onClick={() => {
                 if (teacherWallet?.balanceAmount < 50) return toast.warning("Your wallet should have above $50 before withdrawal");
                 setWithdrawModal(true);
               }}>
            Withdraw
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalStatus;
