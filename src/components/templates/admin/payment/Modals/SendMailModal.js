import React, { useState } from "react";
import { sendEmailToTeacher } from "../../../../../store/actions/payout";
import styles from "../styles.module.css";
import { toast } from "react-toastify";

const SendMailModal = ({ data, setSendMailModal }) => {
  console.log(data);

  const [formData, setFormData] = useState({
    subject: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendEmailToTeacher({
      fullName: "",
      email: data?.teacherId?.userId?.email,
      data: formData.body,
      subject: formData.subject,
    });

    toast.success("Mail sent ");
    setSendMailModal(false);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modal}
        style={{ width: "500px", height: "500px", overflow: "auto" }}>
        <div className={styles.modal_header}>
          <h1>Send Email</h1>

          <i
            className={styles.closeBtn + " fas fa-close"}
            onClick={() => {
              setSendMailModal(false);
            }}></i>
        </div>
        <div className={styles.modal_body}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "30px" }}>
              <div className={styles.inputFormat}>
                <div>
                  {/* <label htmlFor='couponCode'>Coupon Name: </label> */}
                  <input
                    type='text'
                    id='couponCode'
                    placeholder='Email'
                    value={data?.teacherId?.userId?.email}
                    disabled
                  />
                </div>
              </div>

              <div className={styles.inputFormat}>
                <div>
                  <input
                    type='text'
                    id='couponCode'
                    placeholder='Subject'
                    name='Subject'
                    value={formData.subject}
                    style={{ width: "100%" }}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className={styles.inputFormat}>
                <div>
                  {/* <label htmlFor='couponCode'>Coupon Name: </label> */}
                  <textarea
                    rows='4'
                    cols='50'
                    type='text'
                    placeholder='Write the mail'
                    name='body'
                    value={formData.value}
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, body: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "30px",
              }}>
              <button
                type='submit'
                style={{
                  all: "unset",
                  cursor: "pointer",
                  backgroundColor: "#9fcce6",
                  borderRadius: "10px",
                  padding: "10px 20px",
                }}>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMailModal;
