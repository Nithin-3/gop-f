import React, { useState } from "react";
import modalStyles from "./styles.module.css";
import english from "../../../../../assets/flags/english.png";
import { SubmitButton } from "../commonUtils";

const sampleHomework = [
  {
    title: "Communication Skill 1",
    description: "Hi all. This is Communication skill class.",
    status: "Verified",
  },
  {
    title: "Communication Skill 2",
    description: "Hi all. This is Communication skill class.",
    status: "Pending",
  },
  {
    title: "Communication Skill 3",
    description: "Hi all. This is Communication skill class.",
    status: "Verified",
  },
];

const HomeworkModal = ({ setHomeworkModal, width }) => {
  const [homeworks, setHomeworks] = useState(sampleHomework);

  return (
    <div className={modalStyles.modalBackdrop}>
      <div
        className={modalStyles.modal}
        style={{
          padding: width >= 992 ? "2em" : "1.5em",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => setHomeworkModal(false)}
        ></i>
        <h3 className={modalStyles.modalHeading}>Add Homework</h3>

        {/* Homework List */}
        <div style={{ marginTop: "20px" }}>
          {homeworks.map((hw, idx) => (
            <div
              key={idx}
              style={{
                padding: "15px",
                marginTop: "15px",
                borderRadius: "10px",
                border: "1px solid #ED224C",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={english}
                alt="flag"
                style={{ width: "40px", height: "40px", marginBottom: width < 992 ? "10px" : 0 }}
              />
              <div style={{ flex: 1, marginLeft: "15px", minWidth: "150px" }}>
                <div style={{ fontSize: "18px", color: "#ED224C", fontWeight: "bold" }}>
                  {hw.title}
                </div>
                <div>{hw.description}</div>
              </div>
              <div style={{ minWidth: "120px", textAlign: "center", marginTop: width < 992 ? "10px" : 0 }}>
                <div style={{ fontSize: "16px", color: "#ED224C", fontWeight: "bold" }}>
                  Status
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                  {hw.status}
                  {hw.status === "Verified" && (
                    <i
                      className="fas fa-check-circle"
                      style={{ fontSize: "18px", color: "#00df76" }}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: "20px" }}>
          <SubmitButton
            onClick={() => {
              alert("Homework submitted!");
              setHomeworkModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeworkModal;
