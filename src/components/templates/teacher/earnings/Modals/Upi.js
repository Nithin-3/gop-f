import React from "react";
import styles from "../styles.module.css";

const Upi = ({ handleChange, upi }) => {
  return (
    <div className={styles.inputFormat}>
      <input
        type='text'
        placeholder='UPI id'
        value={upi}
        required
        onChange={handleChange}
      />
    </div>
  );
};

export default Upi;
