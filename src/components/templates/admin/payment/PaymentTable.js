/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import TransactionDetailsModal from "./Modals/TransactionDetailsModal";
import styles from "./styles.module.css";
import Bank from "../../../../assets/icon/bank.svg";
import CheckDone from "../../../../assets/icon/check-done-01.svg";
import Mail from "../../../../assets/icon/mail-01.svg";
import Expand from "../../../../assets/icon/expand-01.svg";
import BankReferenceModal from "./Modals/BankRefereneModal";
import SendMailModal from "./Modals/SendMailModal";
import moment from "moment";
import PaymentsModal from "./Modals/PaymentsModal";
import UpdateStatusModal from "./Modals/UpdateStatusModal";

const PaymentTable = ({ columns, data, type, handleFunction }) => {
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [bankReferenceModal, setBankReferenceModal] = useState(false);
  const [sendMailModal, setSendMailModal] = useState(false);
  const [paymentsModal, setPaymentsModal] = useState(false);
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);

  return (
    <>
      {transactionModal ? (
        <TransactionDetailsModal
          setTransactionModal={setTransactionModal}
          data={selectedTransaction}
          payouts={data}
          setPayouts={handleFunction}
        />
      ) : (
        <></>
      )}

      {paymentsModal ? (
        <PaymentsModal
          setPaymentsModal={setPaymentsModal}
          data={selectedTransaction}
        />
      ) : (
        <></>
      )}

      {bankReferenceModal ? (
        <BankReferenceModal
          setBankReferenceModal={setBankReferenceModal}
          data={selectedTransaction}
          payouts={data}
          setPayouts={handleFunction}
        />
      ) : (
        <></>
      )}

      {sendMailModal ? (
        <SendMailModal
          setSendMailModal={setSendMailModal}
          data={selectedTransaction}
          payouts={data}
          setPayouts={handleFunction}
        />
      ) : (
        <></>
      )}

      {paymentStatusModal ? (
        <UpdateStatusModal
          setPaymentStatusModal={setPaymentStatusModal}
          data={selectedTransaction}
          payouts={data}
          setPayouts={handleFunction}
        />
      ) : (
        <></>
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
              type === "Transactions" &&
              data.map((e) => {
                const teacherName = `${
                  e?.teacherId?.firstName?.data ? e.teacherId.firstName.data : ""
                } ${
                  e?.teacherId?.lastName?.data ? e.teacherId.lastName.data : ""
                }`;

                let amount = e?.total;
                if (e.couponUsed) amount = e?.totalAfterDiscount;

                return (
                  <tr className={styles.table_row}>
                    <td>{e?._id}</td>
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
                        className={styles.icons}
                        onClick={() => {
                          setSelectedTransaction(e);
                          setPaymentsModal(true);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })}

            {data &&
              type === "Payouts" &&
              data.map((e) => {
                const teacherName = `${
                  e?.teacherId.firstName?.data ? e.teacherId.firstName.data : ""
                } ${
                  e?.teacherId.lastName?.data ? e.teacherId.lastName.data : ""
                }`;

                return (
                  <tr className={styles.table_row}>
                    <td>
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                        src={e?.teacherIdteacherProfilePic?.data}
                        alt={teacherName}
                      />
                    </td>
                    <td>{e?.teacherId?.id}</td>
                    <td>{teacherName}</td>
                    <td>
                      {e.createdAt
                        ? moment(e.createdAt).format("D-MM-YYYY h:mm a")
                        : "-"}
                    </td>
                    <td>{e?.paymentStatus}</td>
                    <td>$ {e?.withdrawalAmount}</td>
                    <td
                      style={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                      <img
                        className={styles.icons}
                        src={Bank}
                        onClick={() => {
                          setSelectedTransaction(e);
                          setBankReferenceModal(true);
                        }}
                      />
                      <img
                        src={CheckDone}
                        className={styles.icons}
                        onClick={() => {
                          setSelectedTransaction(e);
                          setPaymentStatusModal(true);
                        }}
                      />
                      <img
                        src={Mail}
                        className={styles.icons}
                        onClick={() => {
                          setSelectedTransaction(e);
                          setSendMailModal(true);
                        }}
                      />
                      <img
                        src={Expand}
                        className={styles.icons}
                        onClick={() => {
                          setSelectedTransaction(e);
                          setTransactionModal(true);
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

export default PaymentTable;
