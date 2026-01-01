/* eslint-disable jsx-a11y/alt-text */
import moment from "moment";
import React, { useState } from "react";
import styles from "./styles.module.css"; // Fixed import
import Expand from "../../../../assets/icon/expand-01.svg";
import PaymentsModal from "../payment/Modals/PaymentsModal";

const BookedCoursesTable = ({ columns, data }) => {
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [paymentsModal, setPaymentsModal] = useState(false);

  return (
    <>
      {paymentsModal && (
        <PaymentsModal
          setPaymentsModal={setPaymentsModal}
          data={selectedTransaction}
        />
      )}

      <div className={styles.payment_sheet}>
        <table className={styles.payment_table}>
          <thead>
            <tr className={styles.payment_table_heading}>
              {columns && columns.map((name, i) => <th key={i}>{name}</th>)}
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((e) => {
                const teacherName = `${
                  e?.teacherId?.firstName?.data ? e.teacherId.firstName.data : ""
                } ${
                  e?.teacherId?.lastName?.data ? e.teacherId.lastName.data : ""
                }`;

                let amount = e?.total;
                if (e.couponUsed) amount = e?.totalAfterDiscount;

                return (
                  <tr className={styles.table_row} key={e._id}>
                    <td>{e?.studentId?.fullName}</td>
                    <td>{teacherName}</td>
                    <td>{e?.courseId?.title?.data}</td>
                    <td>
                      {e.createdAt
                        ? moment(e.updatedAt).format("D-MM-YYYY h:mm a")
                        : "-"}
                    </td>
                    <td>$ {e?.refundAmount}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookedCoursesTable;
