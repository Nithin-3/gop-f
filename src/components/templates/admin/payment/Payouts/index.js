import React, { useEffect } from "react";
import { getAllPayouts } from "../../../../../store/actions/payout";
import PaymentTable from "../PaymentTable";
import { toast } from "react-toastify";

const Payouts = () => {
  const [payouts, setPayouts] = React.useState([]);

  const columns = [
    "Teacher Profile",
    "Teacher Id",
    "Teacher Name",
    "Date of Payout",
    "Status",
    "Amount",
    "Actions",
  ];

  const getPayouts = async () => {
    const data = await getAllPayouts();
    if (data?.success) setPayouts(data.data);
    else {
      return toast.error("Something went wrong.Please try again");
    }
  };

  useEffect(() => {
    getPayouts();
  }, []);

  return (
    <PaymentTable
      columns={columns}
      data={payouts}
      type={"Payouts"}
      handleFunction={setPayouts}
    />
  );
};

export default Payouts;
