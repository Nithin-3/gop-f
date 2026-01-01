import React from "react";
import styles from "../styles.module.css";

const PaymentsModal = ({ data, setPaymentsModal }) => {
  console.log(data);

  const teacherName = `${
    data?.teacherId.firstName?.data ? data.teacherId.firstName.data : ""
  } ${data?.teacherId.lastName?.data ? data.teacherId.lastName.data : ""}`;

  return (
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{ width: "750px", height: "750px", overflow: "auto" }}>
        <div className={styles.modal_header}>
          <h1>Transaction details</h1>
          <i
            className={styles.closeBtn + " fas fa-close"}
            onClick={() => {
              setPaymentsModal(false);
            }}></i>
        </div>

        <div className={styles.modal_body} style={{ padding: "2rem 1rem" }}>
          <div className={styles.detail_row}>
            <h3>Transaction Id</h3>
            <h3>{data?._id}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Course Id</h3>
            <h3>{data?.courseId?.id}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Course Name</h3>
            <h3>{data?.courseId?.title?.data}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Student Id</h3>
            <h3>{data?.studentId?._id}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Student Name</h3>
            <h3>{data?.studentId?.fullName}</h3>
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
            <h3>Course Price</h3>
            <h3>$ {data?.itemPrice}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Platform Fees</h3>
            <h3>$ {data?.platformFees}</h3>
          </div>

          <div className={styles.detail_row}>
            <h3>Total</h3>
            <h3>$ {data?.total}</h3>
          </div>

          {data?.couponUsed && (
            <>
              <div className={styles.detail_row}>
                <h3>Coupon Id</h3>
                <h3>{data?.couponUsed}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Coupon Name</h3>
                <h3>{data?.couponName}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Coupon Discount</h3>
                <h3>{data?.couponDiscount}%</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Total After Discount</h3>
                <h3>$ {data?.totalAfterDiscount}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Razorpay Payment Id</h3>
                <h3>{data?.razorpay_payment_id}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Razorpay Order Id</h3>
                <h3>{data?.razorpay_order_id}</h3>
              </div>

              <div className={styles.detail_row}>
                <h3>Razorpay Signature Id</h3>
                <h3>{data?.razorpay_signature}</h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsModal;
