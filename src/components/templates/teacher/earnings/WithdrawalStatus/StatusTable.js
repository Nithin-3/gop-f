import React from "react";
import styles from "../styles.module.css";

const StatusTable = () => {
  return (
    <table className={styles.status_table}>
      <tr>
        <th>Payment Method</th>
        <th>Payment Requested On</th>
        <th>Payment Status</th>
        <th>Payment Amount</th>
        <th>Action</th>
      </tr>
      <tr>
        <td>UPI</td>
        <td>Feb 10, 2021,3:36pm</td>
        <td>Approved</td>
        <td>$3000</td>
        <td>View Details</td>
      </tr>
      <tr>
        <td>UPI</td>
        <td>Feb 10, 2021,3:36pm</td>
        <td>Approved</td>
        <td>$3000</td>
        <td>View Details</td>
      </tr>
      <tr>
        <td>UPI</td>
        <td>Feb 10, 2021,3:36pm</td>
        <td>Approved</td>
        <td>$3000</td>
        <td>View Details</td>
      </tr>
    </table>
  );
};

export default StatusTable;
