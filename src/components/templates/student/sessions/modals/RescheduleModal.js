import React, { useState } from "react";
import modalStyles from "./styles.module.css";
import english from "../../../../../assets/flags/english.png";
import { SubmitButton } from "../commonUtils";

const RescheduleModal = ({ setRescheduleModal, width }) => {
  const [page, setPage] = useState("1");

  const closeModal = () => {
    setRescheduleModal(false);
    setPage("1");
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        {/* Header */}
        <i className={`${modalStyles.closeBtn} fas fa-close`} onClick={closeModal}></i>
        <h3 className={modalStyles.modalHeading}>Request to Reschedule</h3>

        {/* Body */}
        {width >= 992 ? (
          <>
            {page === "1" && <Page1 setPage={setPage} />}
            {page === "1A" && <Page1A setRescheduleModal={setRescheduleModal} />}
            {page === "1B" && <Page1B setRescheduleModal={setRescheduleModal} />}
          </>
        ) : (
          <SubmitButton onClick={() => { alert("Submit!"); closeModal(); }} />
        )}
      </div>
    </div>
  );
};

const Page1 = ({ setPage }) => {
  const [option, setOption] = useState("");

  const handleNext = () => {
    if (!option) return alert("Choose an option!");
    setPage(option === "suggest" ? "1A" : "1B");
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div style={{ fontSize: "20px" }}>
          You are about to request a new time for this session.
        </div>
        <div style={{ paddingLeft: "1.5em", marginTop: "10px" }} onChange={(e) => setOption(e.target.value)}>
          <label htmlFor="time1">
            <input type="radio" name="time" id="time1" value="suggest" />
            &nbsp; Suggest new time
          </label>
          <br />
          <label htmlFor="time2">
            <input type="radio" name="time" id="time2" value="student" />
            &nbsp; Let student select new time
          </label>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ fontSize: "20px" }}>Message</div>
        <textarea
          rows="6"
          placeholder="Why are you requesting to reschedule the lesson? Please explain in a message to your student here."
        />
      </div>

      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <span
          style={{
            cursor: "pointer",
            color: "#fffefe",
            borderRadius: "5px",
            backgroundColor: "#fd869e",
            padding: "5px 30px",
          }}
          onClick={handleNext}
        >
          Next
        </span>
      </div>
    </>
  );
};

const Page1A = ({ setRescheduleModal }) => {
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #d6d6d7",
          padding: "10px",
          backgroundColor: "#f1f1f1",
          borderRadius: "5px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Reschedule Suggestion</span>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <img src={english} alt="card_img" style={{ borderRadius: "50%", width: "80px" }} />
          <div>
            <div style={{ fontSize: "18px", color: "#ED224C" }}>Unscheduled</div>
            <div style={{ fontSize: "20px" }}>02:00 PM</div>
            <div style={{ fontSize: "18px" }}>January 02, 2021</div>
            <div>In 3 days</div>
          </div>
          <i style={{ color: "#00b63e", fontSize: "50px" }} className="far fa-arrow-alt-circle-right"></i>
          <div>
            <div style={{ fontSize: "18px" }}>Suggested</div>
            <div style={{ fontSize: "20px" }}>05:30 PM</div>
            <div style={{ fontSize: "18px" }}>January 03, 2021</div>
            <div>In 4 days</div>
          </div>
        </div>
      </div>

      <SubmitButton onClick={() => { alert("Submit!"); setRescheduleModal(false); }} />
    </>
  );
};

const Page1B = ({ setRescheduleModal }) => {
  const timesOfDay = ["Morning", "Afternoon", "Evening", "Night"];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <>
      <div
        style={{
          margin: "20px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "16vw",
          height: "150px",
        }}
      >
        <div>
          {["", ...timesOfDay].map((time, i) => (
            <div style={{ display: "flex", justifyContent: "space-between" }} key={i}>
              <div style={{ marginRight: "10px" }}>{time}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "3px" }}>
                {weekDays.map((day, j) => (
                  <div
                    key={j}
                    style={{
                      width: "1.5vw",
                      height: "1.5vw",
                      textAlign: i === 0 ? "center" : "unset",
                      backgroundColor:
                        i === 0 ? "transparent" : i === 2 ? "#359cd7" : i === 4 ? "#e7f1f9" : "#9fcce6",
                      marginBottom: "5px",
                    }}
                  >
                    {i === 0 ? day : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SubmitButton onClick={() => { alert("Submit!"); setRescheduleModal(false); }} />
    </>
  );
};

export default RescheduleModal;
