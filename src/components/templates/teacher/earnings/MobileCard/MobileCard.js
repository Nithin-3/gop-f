import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStudentDetailById } from "../../../../../store/actions/student";
import moment from "moment";
import "./mobilecard.css";

const MobileCard = ({ data, type }) => {
  const dispatch = useDispatch();
  const [studentPic, setStudentPic] = useState();

  useEffect(() => {
    if (!data?.studentId?._id) return;

    const fetchStudentPic = async () => {
      try {
        const student = await dispatch(getStudentDetailById(data.studentId._id));
        if (student?.[0]?.profilePic?.data) {
          setStudentPic(student[0].profilePic.data);
        }
      } catch (error) {
        console.error("Failed to fetch student pic:", error);
      }
    };

    fetchStudentPic();
  }, [data, dispatch]);

  // Calculate amount for earnings
  const amount =
    type === "Earnings"
      ? data?.couponUsed
        ? data?.totalAfterDiscount - data?.platformFees
        : data?.total - data?.platformFees
      : null;

  return (
    <div className="mobilecard">
      {type === "Earnings" && (
        <>
          <div className="personalInfo">
            <img
              src={studentPic}
              alt={data.studentId.fullName || "Student"}
              style={{ height: "30px", width: "30px", borderRadius: "50%" }}
            />
            <div className="name" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {data.studentId.fullName || "-"}
            </div>
          </div>

          <div className="courseInfo">
            <div className="courseName" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
              Course Name
            </div>
            <div className="courseName" style={{ marginBottom: "0.8rem" }}>
              {data.courseId?.title?.data || "-"}
            </div>
            <div className="dob" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
              Date of Booking
            </div>
            <div className="dob" style={{ marginBottom: "0.8rem" }}>
              {data.createdAt ? moment(data.createdAt).format("D-MM-YYYY h:mm a") : "-"}
            </div>
          </div>

          <div className="transactionInfo">
            <div className="couponName" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
              Coupon Name
            </div>
            <div className="couponName" style={{ marginBottom: "0.8rem" }}>
              {data.couponName || "No coupon used"}
            </div>
            <div className="transId" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
              Transaction Id
            </div>
            <div className="transactionId" style={{ marginBottom: "0.8rem" }}>
              {data._id || "-"}
            </div>
            <div className="amount" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
              Amount
            </div>
            <div className="amount">${amount ?? "-"}</div>
          </div>
        </>
      )}

      {type === "Withdrawals" && (
        <div className="courseInfo">
          <div className="courseName" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
            Amount
          </div>
          <div className="courseName" style={{ marginBottom: "0.8rem" }}>
            {data?.withdrawalAmount ?? "-"}
          </div>

          <div className="dob" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
            Status
          </div>
          <div className="dob" style={{ marginBottom: "0.8rem" }}>
            {data?.paymentStatus ?? "-"}
          </div>

          <div className="couponName" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
            Transaction Mode
          </div>
          <div className="couponName" style={{ marginBottom: "0.8rem" }}>
            {data?.modeOfTransaction ?? "-"}
          </div>

          <div className="transId" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
            Bank Reference Id
          </div>
          <div className="transactionId" style={{ marginBottom: "0.8rem" }}>
            {data?.bankReferenceId ?? "-"}
          </div>

          <div className="amount" style={{ fontWeight: "bold", marginBottom: "0.1rem" }}>
            Date of Withdrawal
          </div>
          <div className="amount">
            {data?.createdAt ? moment(data.createdAt).format("D-MM-YYYY h:mm a") : "-"}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCard;
