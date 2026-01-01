import React from "react";
import styles from "../styles.module.css";
import moment from "moment";
import { useWindowDimensions } from "../../../../../utils/util";
import MobileCard from "../MobileCard/MobileCard";

const BalanceTable = ({ columns, data = [], type }) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {width > 769 ? (
        <table className={styles.balance_table}>
          <thead>
            <tr>
              {columns &&
                columns.map((name, i) => (
                  <th key={i}>{name}</th>
                ))}
            </tr>
          </thead>

          <tbody>
            {type === "Earnings" &&
              data.map((el) => {
                let amount = el?.total - el?.platformFees;
                if (el?.couponUsed) {
                  amount = el?.totalAfterDiscount - el?.platformFees;
                }

                return (
                  <tr key={el._id} className={styles.table_row}>
                    <td>Photo</td>
                    <td>{el.studentId?.fullName ?? "-"}</td>
                    <td>{el.courseId?.title?.data ?? "-"}</td>
                    <td>
                      {el.createdAt
                        ? moment(el.createdAt).format("D-MM-YYYY h:mm a")
                        : "-"}
                    </td>
                    <td>{el.couponName ?? "-"}</td>
                    <td>{el._id}</td>
                    <td>$ {amount}</td>
                  </tr>
                );
              })}

            {type === "Withdrawals" &&
              data.map((el) => {
                return (
                  <tr key={el._id} className={styles.table_row}>
                    <td>$ {el?.withdrawalAmount}</td>
                    <td>{el?.paymentStatus}</td>
                    <td>{el?.modeOfTransaction}</td>
                    <td>{el?.bankReferenceId ?? "-"}</td>
                    <td>
                      {el.createdAt
                        ? moment(el.createdAt).format("D-MM-YYYY h:mm a")
                        : "-"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="mobileWrapper">
          {data.map((el) => (
            <MobileCard key={el._id} data={el} type={type} />
          ))}
        </div>
      )}
    </>
  );
};

export default BalanceTable;
