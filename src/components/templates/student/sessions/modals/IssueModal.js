import React, { useState } from "react";
import modalStyles from "./styles.module.css";
import { SubmitButton } from "../commonUtils";

const issueOptions = [
  "Student was late",
  "Student was absent",
  "Student left early",
  "Teacher was absent",
  "Teacher was late",
  "Teacher left early",
  "Student-related technical difficulties",
  "Teacher-related technical difficulties",
  "Neurolingua-related technical difficulties",
  "Lesson status should be completed",
];

const IssueModal = ({ setIssueModal, width }) => {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [comment, setComment] = useState("");

  const handleCheckboxChange = (value) => {
    setSelectedIssues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    console.log("Selected Issues:", selectedIssues);
    console.log("Comment:", comment);
    alert("Issue submitted!");
    setIssueModal(false);
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div
        className={modalStyles.modal}
        style={{
          padding: width >= 992 ? "2em" : "2em 1em",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => setIssueModal(false)}
        ></i>
        <h3 className={modalStyles.modalHeading}>Report An Issue</h3>

        {/* Body */}
        <div
          style={{
            margin: width >= 992 ? "30px 0" : "20px 0",
            fontSize: width >= 992 ? "20px" : "16px",
            fontWeight: "bold",
          }}
        >
          Select One Or More Issues To Report
        </div>

        <div style={{ width: width >= 992 ? "50vw" : "100%" }}>
          {issueOptions.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                id={`issue-${idx}`}
                value={item}
                checked={selectedIssues.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                style={{ width: "15px", height: "15px", marginRight: "8px" }}
              />
              <label htmlFor={`issue-${idx}`}>{item}</label>
            </div>
          ))}

          {/* Other option */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="checkbox"
              id="issue-other"
              checked={selectedIssues.includes("Other")}
              onChange={() => handleCheckboxChange("Other")}
              style={{ width: "15px", height: "15px", marginRight: "8px" }}
            />
            <label htmlFor="issue-other">Other</label>
          </div>
        </div>

        {/* Comment Section */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Issue a Comment</div>
          <textarea
            rows={width >= 992 ? 4 : 2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Explain your issue here..."
            style={{ width: "100%", borderRadius: "10px", padding: "8px", resize: "none" }}
          ></textarea>
          <div
            style={{
              marginTop: "10px",
              color: "#555",
              fontSize: "0.9em",
              textAlign: "justify",
            }}
          >
            To alert Neurolingua of the issue with your lesson and get assistance,
            please contact <span style={{ color: "#5bd056" }}>Support</span>.
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: "20px" }}>
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
