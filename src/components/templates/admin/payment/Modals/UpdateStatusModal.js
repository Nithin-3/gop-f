import React, { useState } from "react";
import { updatePayoutById } from "../../../../../store/actions/payout";
import styles from "../styles.module.css";
import { toast } from "react-toastify";

const UpdateStatusModal = ({
  data,
  payouts,
  setPaymentStatusModal,
  setPayouts,
}) => {
  console.log(data);
  const [paymentStatus, setPaymentStatus] = useState(data?.paymentStatus || "");

  const handleClick = async () => {
    const result = await updatePayoutById(data?._id, {
      paymentStatus: paymentStatus,
    });

    if (result.success) {
      toast.success("Payout updated successfully");

      const index = payouts.findIndex((el) => el._id === data._id);
      if (index !== -1) {
        payouts[index] = result.data;
        setPayouts(payouts);
      }

      setPaymentStatusModal(false);
    } else {
      toast.success("Something went wrong! Please try again later.");
    }
  };

  const handleChange = (e) => {
    setPaymentStatus(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{ width: "500px", height: "500px", overflow: "auto" }}>
        <div className={styles.modal_header}>
          <h1>Update Payment Status</h1>
          <i
            className={styles.closeBtn + " fas fa-close"}
            onClick={() => {
              setPaymentStatusModal(false);
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
          <div class={styles.radio_input}>
            <input
              type='radio'
              name='status'
              value='Initiated'
              checked={paymentStatus === "Initiated"}
              onChange={handleChange}
            />
            Initiated
          </div>
          <div class={styles.radio_input}>
            <input
              type='radio'
              name='status'
              value='In Progress'
              checked={paymentStatus === "In Progress"}
              onChange={handleChange}
            />
            In Progress
          </div>
          <div class={styles.radio_input}>
            <input
              type='radio'
              name='status'
              value='Completed'
              checked={paymentStatus === "Completed"}
              onChange={handleChange}
            />
            Completed
          </div>

          <div class={styles.radio_input}>
            <input
              type='radio'
              name='status'
              value='Rejected'
              checked={paymentStatus === "Rejected"}
              onChange={handleChange}
            />
            Rejected
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

export default UpdateStatusModal;
