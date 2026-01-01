import React from "react";
import styles from "../styles.module.css";

const Paypal = ({ handleChange, paypal }) => {
  return (
    <div className={styles.inputFormat}>
      <input
        type='text'
        placeholder='Paypal id'
        value={paypal}
        required
        onChange={handleChange}
      />
    </div>
  );
};

export default Paypal;
