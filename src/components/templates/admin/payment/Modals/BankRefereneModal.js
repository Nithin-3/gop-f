import React, { useState } from "react";
import { updatePayoutById } from "../../../../../store/actions/payout";
import styles from "../styles.module.css";
import { toast } from "react-toastify";

const BankReferenceModal = ({
  data,
  payouts,
  setBankReferenceModal,
  setPayouts,
}) => {
  console.log(data);
  const [bankId, setBankId] = useState(data?.bankReferenceId || "");

  const handleClick = async () => {
    const result = await updatePayoutById(data?._id, {
      bankReferenceId: bankId,
    });

    if (result.success) {
      toast.success("Payout updated successfully");

      const index = payouts.findIndex((el) => el._id === data._id);
      if (index !== -1) {
        payouts[index] = result.data;
        setPayouts(payouts);
      }

      setBankReferenceModal(false);
    } else {
      toast.success("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{ width: "500px", height: "500px", overflow: "auto" }}>
        <div className={styles.modal_header}>
          <h1>Add Bank Reference Id</h1>
          <i
            className={styles.closeBtn + " fas fa-close"}
            onClick={() => {
              setBankReferenceModal(false);
            }}></i>
        </div>

        <div
          className={styles.modal_body}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "70px",
          }}>
          <div className={styles.inputFormat}>
            <input
              type='text'
              placeholder='Bank Reference Id'
              value={bankId}
              style={{ width: "100%" }}
              required
              onChange={(e) => setBankId(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}>
          <button
            onClick={handleClick}
            style={{
              all: "unset",
              cursor: "pointer",
              backgroundColor: "#9fcce6",
              borderRadius: "10px",
              padding: "10px 20px",
            }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankReferenceModal;
