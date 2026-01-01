/* eslint-disable jsx-a11y/alt-text */
import moment from "moment";
import React, { useState } from "react";
import paymentStyles from "./styles.module.css"; // default import
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

      <div className={paymentStyles.payment_sheet}>
        <table className={paymentStyles.payment_table}>
          <thead>
            <tr className={paymentStyles.payment_table_heading}>
              {columns.map((name, i) => (
                <th key={i}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((e) => {
              const teacherName = `${
                e?.teacherId?.firstName?.data || ""
              } ${e?.teacherId?.lastName?.data || ""}`;

              const amount = e.couponUsed ? e.totalAfterDiscount : e.total;

              return (
                <tr className={paymentStyles.table_row} key={e._id}>
                  <td>{e._id}</td>
                  <td>{e?.studentId?.fullName}</td>
                  <td>{teacherName}</td>
                  <td>{e?.courseId?.title?.data}</td>
                  <td>
                    {e.createdAt
                      ? moment(e.createdAt).format("D-MM-YYYY h:mm a")
                      : "-"}
                  </td>
                  <td>$ {amount}</td>
                  <td>
                    <img
                      src={Expand}
                      className={paymentStyles.icons}
                      onClick={() => {
                        setSelectedTransaction(e);
                        setPaymentsModal(true);
                      }}
                    />
                  </td>
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
