import React, { useState } from "react";
import styles from "../styles.module.css";
import Earnings from "./Earnings";
import Withdrawals from "./Withdrawals";

const BalanceSheet = ({ data, handleFunction }) => {
  const [activeTab, setActiveTab] = useState("Withdrawals");

  const tabs = ["Withdrawals", "Earnings"];

  return (
    <div className={styles.section_balance_sheet}>
      <div className={styles.section_balance_sheet_header}>
        <h1>Transactions</h1>
        <div className={styles.sessionTabs}>
          {tabs.map((item) => (
            <div
              key={item}
              className={`${styles.sessionTab} ${
                activeTab === item ? styles.sessionTabActive : ""
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section_widthdrawal_body}>
        {activeTab === "Withdrawals" ? (
          <Withdrawals withdrawals={data} handleFunction={handleFunction} />
        ) : (
          <Earnings />
        )}
      </div>
    </div>
  );
};

export default BalanceSheet;
