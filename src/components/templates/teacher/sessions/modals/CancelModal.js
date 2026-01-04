import React from "react";
import { useDispatch } from "react-redux";
import modalStyles from "./styles.module.css";
import moment from "moment";
import { updateSessionRefund } from "../../../../../store/actions/student";

const CancelModal = ({ setCancelModal, width, cancelSession, availDetails, cardInfo }) => {
  const [page, setPage] = React.useState("1");
  const dispatch = useDispatch();
  let classDate = moment(availDetails?.from);
  let todayDate = moment(Date.now());
  let hours = moment.duration(classDate.diff(todayDate)).asHours();
  const platformFees = cardInfo.paymentId.platformFees;
  let refundPercent = 100;
  const refundAmount = (cardInfo.paymentId.itemPrice / Number(cardInfo.type)) * (refundPercent / 100) + platformFees / Number(cardInfo.type);
  const sessionObj = { sessionId: cardInfo._id, amount: Number(refundAmount) };
  dispatch(updateSessionRefund(sessionObj));

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        <i className={modalStyles.closeBtn + " fas fa-close"} onClick={() => { setCancelModal(false); setPage("1"); }}></i>
        <h3 className={modalStyles.modalHeading}>Cancel Lesson</h3>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {page === "1" ? (
            <>
              Are you sure you want to cancel this lesson?
              {width < 992 && (
                <div style={{ cursor: "pointer", color: "#fffefe", padding: "8px 20px", borderRadius: "5px", backgroundColor: "#fd869e", marginTop: "10px" }} onClick={cancelSession}>
                  Cancel Lesson
                </div>
              )}
            </>
          ) : (
            "You're about to cancel this lesson."
          )}
        </div>

        {width >= 992 && (
          <>
            {page === "1" && <Page1 setPage={setPage} setCancelModal={setCancelModal} refundAmount={refundAmount} refundPercent={refundPercent} />}
            {page === "2" && <Page2 setCancelModal={setCancelModal} cancelSession={cancelSession} refundAmount={refundAmount} refundPercent={refundPercent} />}
          </>
        )}
      </div>
    </div>
  );
};

const Page1 = ({ setPage, setCancelModal, refundAmount, refundPercent }) => (
  <div style={{ marginTop: "20px" }}>
    <div style={{ padding: "0 20px", textAlign: "center", display: "inline-block", borderRight: "1px solid #e2e3e3" }}>
      <div style={{ height: "80px", marginTop: "30px", textAlign: "left" }}>
        Cancelling this lesson will result in a <b>{refundPercent}% refund which is ${refundAmount}.</b> A cancellation <b>cannot be undone</b>.
      </div>
      <div style={{ borderRadius: "5px", margin: "20px auto 0", cursor: "pointer", backgroundColor: "#fc4545", padding: "10px 20px", color: "white", width: "fit-content" }} onClick={() => setPage("2")}>
        Cancel Lesson
      </div>
    </div>
    <div style={{ color: "#0599d0", padding: "10px 20px", marginTop: "30px", width: "fit-content", cursor: "pointer", borderRadius: "5px", border: "2px solid #0599d0", float: "right" }} onClick={() => { setCancelModal(false); setPage("1"); }}>
      Close
    </div>
  </div>
);

const Page2 = ({ setCancelModal, cancelSession, refundAmount, refundPercent }) => (
  <div style={{ marginTop: "20px" }}>
    <div style={{ padding: "0 20px", textAlign: "center" }}>
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <ul>
          <li>This lesson will be cancelled.</li>
          <li>Student will be notified.</li>
          <li>Student will receive a {refundPercent}% refund which is ${refundAmount} in Neurolingua credit.</li>
        </ul>
      </div>
    </div>

    <div style={{ marginTop: "20px" }}>
      <div style={{ fontSize: "20px" }}>Reason</div>
      <textarea rows="3" placeholder="Write your reason here"></textarea>
    </div>

    <div style={{ marginTop: "10px", textAlign: "center" }}>Are you sure you want to cancel this lesson?</div>

    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
      <div style={{ cursor: "pointer", color: "#0599d0", padding: "8px 20px", borderRadius: "5px", outline: "2px solid #0599d0" }} onClick={() => setCancelModal(false)}>
        Close
      </div>
      <div style={{ cursor: "pointer", color: "#fffefe", padding: "8px 20px", borderRadius: "5px", backgroundColor: "#fd869e" }} onClick={cancelSession}>
        Cancel Lesson
      </div>
    </div>
  </div>
);

export default CancelModal;
