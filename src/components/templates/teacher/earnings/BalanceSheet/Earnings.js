import React, { useEffect, useState } from "react";
import { getTeacherEarnings } from "../../../../../store/actions/teacher";
import { toast } from "react-toastify";
import BalanceTable from "./BalanceTable";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);

  const fetchEarnings = async () => {
    try {
      const data = await getTeacherEarnings();
      if (data?.success) {
        setEarnings(data.data ?? []);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch earnings");
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  const columns = [
    "Student Profile",
    "Student Name",
    "Course Name",
    "Date of Booking",
    "Coupon Name",
    "Transaction Id",
    "Amount",
  ];

  return (
    <>
      {earnings.length > 0 ? (
        <BalanceTable columns={columns} data={earnings} type="Earnings" />
      ) : (
        <p>No Earnings</p>
      )}
    </>
  );
};

export default Earnings;
