import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllPayments } from "../../../../../store/actions/payment/Payment";
import PaymentTable from "../PaymentTable";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const getPayments = async () => {
    const data = await getAllPayments();
    if (data?.success) setTransactions(data.data);
    else {
      return toast.error("Something went wrong.Please try again");
    }
  };

  console.log(transactions);

  useEffect(() => {
    getPayments();
  }, []);

  const columns = [
    "Transaction Id",
    "Student Name",
    "Teacher Name",
    "Course Name",
    "Date",
    "Amount",
    "Actions",
  ];

  return (
    <PaymentTable
      columns={columns}
      data={transactions}
      type={"Transactions"}
      handleFunction={setTransactions}
    />
  );
};

export default Transactions;
