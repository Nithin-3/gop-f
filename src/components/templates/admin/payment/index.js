import React from "react";
import adminStyles from "../styles.module.css";
import Payouts from "./Payouts";
import paymentStyles from "./styles.module.css";
import Transactions from "./Transactions";

function AdminPayment() {
  const [activeTab, setActiveTab] = React.useState("Transactions");

  const tabs = ["Transactions", "Payouts"];

  return (
    <div className={adminStyles.mainSection}>
      <div className={paymentStyles.payment_header}>
        <h1>
          Payment <span>Management</span>
        </h1>
      </div>

      <div className={paymentStyles.sessionTabs}>
        {tabs.map((item, index) => (
          <div
            key={index}
            className={
              paymentStyles.sessionTab +
              " " +
              `${activeTab === item ? paymentStyles.sessionTabActive : ""} `
            }
            onClick={() => {
              setActiveTab(item);
            }}>
            {item}
          </div>
        ))}
      </div>

      <div className={paymentStyles.payments_body}>
        {
          {
            Transactions: <Transactions />,
            Payouts: <Payouts />,
          }[activeTab]
        }
      </div>
    </div>
  );
}

export default AdminPayment;
