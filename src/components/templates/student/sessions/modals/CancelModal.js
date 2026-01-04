import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import modalStyles from "./styles.module.css";
import moment from "moment";
import { updateSessionRefund } from "../../../../../store/actions/student/index";

const CancelModal = ({ setCancelModal, width, cancelSession, availDetails, cardInfo }) => {
  const [page, setPage] = useState("1");
  const [refundPercent, setRefundPercent] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cardInfo) return;

    let hours = 25; // default > 24 hours
    if (availDetails) {
      const classDate = moment(availDetails.from);
      const now = moment();
      hours = moment.duration(classDate.diff(now)).asHours();
    }

    let percent = 0;
    if (hours > 24) percent = 100;
    else if (hours > 12) percent = 50;
    else percent = 0;

    const amount = (cardInfo.paymentId.itemPrice / Number(cardInfo.type)) * (percent / 100);

    setRefundPercent(percent);
    setRefundAmount(amount);
  }, [availDetails, cardInfo]);

  const handleCancelLesson = async () => {
    if (!cardInfo) return;
    const sessionObj = {
      sessionId: cardInfo._id,
      amount: Number(refundAmount),
    };
    await dispatch(updateSessionRefund(sessionObj));
    cancelSession();
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        {/* Header */}
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => {
            setCancelModal(false);
            setPage("1");
          }}
        ></i>
        <h3 className={modalStyles.modalHeading}>Cancel Lesson</h3>

        {width >= 992 ? (
          <>
            {page === "1" && (
              <Page1
                setPage={setPage}
                refundAmount={refundAmount}
                refundPercent={refundPercent}
              />
            )}
            {page === "2" && (
              <Page2
                setCancelModal={setCancelModal}
                handleCancelLesson={handleCancelLesson}
                refundAmount={refundAmount}
                refundPercent={refundPercent}
              />
            )}
          </>
        ) : (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            Are you sure you want to cancel this lesson?
            <div
              style={{
                cursor: "pointer",
                color: "#fffefe",
                padding: "8px 20px",
                borderRadius: "5px",
                backgroundColor: "#fd869e",
                marginTop: "10px",
              }}
              onClick={handleCancelLesson}
            >
              Cancel Lesson
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Page1 = ({ setPage, refundAmount, refundPercent }) => (
  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <div
      style={{
        padding: "0 20px",
        textAlign: "center",
        width: "100%",
        display: "inline-block",
      }}
    >
      <div style={{ height: "80px", marginTop: "30px", textAlign: "left" }}>
        Cancelling this lesson will result in a <b>{refundPercent}% refund (${refundAmount.toFixed(2)})</b>.
        <br />
        A cancellation <b>cannot be undone</b> and your lesson <b>cannot be rescheduled</b>.
      </div>
      <div
        style={{
          borderRadius: "5px",
          margin: "20px auto 0",
          cursor: "pointer",
          backgroundColor: "#fc4545",
          padding: "10px 20px",
          color: "white",
          width: "fit-content",
        }}
        onClick={() => setPage("2")}
      >
        Cancel Lesson
      </div>
      <div
        style={{
          color: "#0599d0",
          padding: "10px 20px",
          marginTop: "20px",
          width: "fit-content",
          cursor: "pointer",
          borderRadius: "5px",
          border: "2px solid #0599d0",
        }}
        onClick={() => setPage("1")}
      >
        Close
      </div>
    </div>
  </div>
);

const Page2 = ({ setCancelModal, handleCancelLesson, refundAmount, refundPercent }) => (
  <div style={{ marginTop: "20px" }}>
    <div style={{ padding: "0 20px", textAlign: "center" }}>
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <ul>
          <li>This lesson will be cancelled.</li>
          <li>The student will be notified.</li>
          <li>
            You will receive a {refundPercent}% refund (${refundAmount.toFixed(2)}) in Neurolingua credit, valid for 1 year.
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ fontSize: "20px" }}>Reason</div>
        <textarea rows="3" placeholder="Write your reason here" style={{ width: "100%", padding: "8px" }} />
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            cursor: "pointer",
            color: "#9ecde6",
            padding: "8px 20px",
            width: "fit-content",
            borderRadius: "5px",
            outline: "2px solid #0599d0",
          }}
          onClick={() => setCancelModal(false)}
        >
          Close
        </div>
        <div
          style={{
            cursor: "pointer",
            color: "#fffefe",
            padding: "8px 20px",
            borderRadius: "5px",
            backgroundColor: "#fd869e",
          }}
          onClick={handleCancelLesson}
        >
          Cancel Lesson
        </div>
      </div>
    </div>
  </div>
);

export default CancelModal;
