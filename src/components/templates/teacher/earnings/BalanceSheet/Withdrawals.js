import React from "react";
import BalanceTable from "./BalanceTable";

const Withdrawals = ({ withdrawals }) => {
  const columns = [
    "Amount",
    "Status",
    "Transaction Mode",
    "Bank Reference Id",
    "Date of Withdrawal",
  ];

  return (
    <>
      {withdrawals?.length > 0 ? (
        <BalanceTable columns={columns} data={withdrawals} type="Withdrawals" />
      ) : (
        <p>No Withdrawals</p>
      )}
    </>
  );
};

export default Withdrawals;
