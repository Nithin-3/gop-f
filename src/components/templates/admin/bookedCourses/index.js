import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../../../store/actions/payment/Payment";
import adminStyles from "../styles.module.css"; // default import
import paymentStyles from "./styles.module.css"; // default import
import { toast } from "react-toastify";
import BookedCoursesTable from "./BookedCoursesTable";

function AdminBookedCourses() {
  const [transactions, setTransactions] = useState([]);

  const getPayments = async () => {
    const data = await getAllPayments();
    if (data?.success) setTransactions(data.data);
    else toast.error("Something went wrong. Please try again");
  };

  const columns = [
    "Transaction Id",
    "Student Name",
    "Teacher Name",
    "Course Name",
    "Date",
    "Amount",
    "Actions",
  ];

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className={adminStyles.mainSection}>
      <div className={paymentStyles.payment_header}>
        <h1>
          Booked <span>Courses</span>
        </h1>
      </div>

      <div className={paymentStyles.payments_body}>
        <BookedCoursesTable columns={columns} data={transactions} />
      </div>
    </div>
  );
}

export default AdminBookedCourses;
