import React from "react";
import styles from "../styles.module.css";

const TransactionDetailsModal = ({ data, setTransactionModal }) => {


  const teacherName = `${data?.teacherId.firstName?.data ? data.teacherId.firstName.data : ""
    } ${data?.teacherId.lastName?.data ? data.teacherId.lastName.data : ""}`;

  return (
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{ width: "750px", height: "750px", overflow: "auto" }}>
        <div className={styles.modal_header}>
          <h1>Payout details</h1>
          <i
            className={styles.closeBtn + " fas fa-close"}
            onClick={() => {
              setTransactionModal(false);
            }}></i>
        </div>

        <div className={styles.modal_body} style={{ padding: "2rem 1rem" }}>
          <div className={styles.detail_row}>
            <h3>Payout Id</h3>
            <h3>{data?._id}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Teacher Id</h3>
            <h3>{data?.teacherId?.id}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Teacher Name</h3>
            <h3>{teacherName}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Withdrawal Amount</h3>
            <h3>$ {data?.withdrawalAmount}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Payment Status</h3>
            <h3>{data?.paymentStatus}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Mode of Transaction</h3>
            <h3>{data?.modeOfTransaction}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Bank Reference Id</h3>
            <h3>{data?.bankReferenceId}</h3>
          </div>

          {data?.modeOfTransaction === "UPI" && (
            <>
              <div className={styles.detail_row}>
                <h3>UPI ID</h3>
                <h3>{data?.upi?.upiId}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Bank Verified Name</h3>
                <h3>{data?.upi?.bankVerifiedName}</h3>
              </div>
            </>
          )}

          {data?.modeOfTransaction === "Paypal" && (
            <>
              <div className={styles.detail_row}>
                <h3>PAYPAL ID</h3>
                <h3>{data?.paypal?.paypalId}</h3>
              </div>
            </>
          )}

          {data?.modeOfTransaction === "Bank Transfer" && (
            <>
              <div className={styles.detail_row}>
                <h3>Account Holder Name</h3>
                <h3>{data?.bankDetails?.accountHolderName}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Account Number</h3>
                <h3>{data?.bankDetails?.accountNumber}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Bank Location</h3>
                <h3>{data?.bankDetails?.bankLocation}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Bank IFSC Code</h3>
                <h3>{data?.bankDetails?.bankIFSCode}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Bank Swift Code</h3>
                <h3>{data?.bankDetails?.bankSwiftCode}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Bank Account Type</h3>
                <h3>{data?.bankDetails?.bankAccountType}</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
