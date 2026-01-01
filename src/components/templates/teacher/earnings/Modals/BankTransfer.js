import React, { useState } from "react";
import styles from "../styles.module.css";

const BankTransfer = ({ handleChange, bankDetails, isIFSCCorrect }) => {
  const [bankLocation, setBankLocation] = useState(bankDetails.bankLocation || "");

  const handleBankLocationChange = (e) => {
    const value = e.target.value;
    setBankLocation(value);
    handleChange(e);
  };

  return (
    <div className={styles.inputFormat}>
      <input
        type="text"
        placeholder="Account Holder Name"
        name="accountHolderName"
        value={bankDetails.accountHolderName || ""}
        required
        onChange={handleChange}
      />

      <input
        type="number"
        placeholder="Account Number"
        name="accountNumber"
        value={bankDetails.accountNumber || ""}
        required
        onChange={handleChange}
      />

      <input
        type="number"
        placeholder="Confirm Account Number"
        name="confirmAccountNumber"
        value={bankDetails.confirmAccountNumber || ""}
        required
        onChange={handleChange}
      />

      <div className={styles.input_radios}>
        <p>Bank Location</p>
        <div className={styles.input_radios_group_parent}>
          <div className={styles.input_radios_group}>
            <input
              type="radio"
              id="India"
              name="bankLocation"
              value="India"
              checked={bankLocation === "India"}
              onChange={handleBankLocationChange}
            />
            <label htmlFor="India">India</label>
          </div>
          <div className={styles.input_radios_group}>
            <input
              type="radio"
              id="Outside_India"
              name="bankLocation"
              value="Outside India"
              checked={bankLocation === "Outside India"}
              onChange={handleBankLocationChange}
            />
            <label htmlFor="Outside_India">Outside India</label>
          </div>
        </div>
      </div>

      {bankLocation === "India" && (
        <input
          type="text"
          placeholder="Bank IFSC code"
          name="bankIFSCode"
          value={bankDetails.bankIFSCode || ""}
          maxLength={11}
          required
          onChange={handleChange}
        />
      )}

      {bankLocation === "Outside India" && (
        <input
          type="text"
          placeholder="Bank Swift code"
          name="bankSwiftCode"
          value={bankDetails.bankSwiftCode || ""}
          required
          onChange={handleChange}
        />
      )}

      {isIFSCCorrect && (
        <>
          <input type="text" value={bankDetails.bankName || ""} disabled />
          <input type="text" value={bankDetails.branchName || ""} disabled />
        </>
      )}

      <div className={styles.input_radios}>
        <p>Bank Account Type</p>
        <div className={styles.input_radios_group_parent}>
          <div className={styles.input_radios_group}>
            <input
              type="radio"
              id="Saving_Account"
              name="bankAccountType"
              value="Saving Account"
              checked={bankDetails.bankAccountType === "Saving Account"}
              onChange={handleChange}
            />
            <label htmlFor="Saving_Account">Saving Account</label>
          </div>
          <div className={styles.input_radios_group}>
            <input
              type="radio"
              id="Current_Account"
              name="bankAccountType"
              value="Current Account"
              checked={bankDetails.bankAccountType === "Current Account"}
              onChange={handleChange}
            />
            <label htmlFor="Current_Account">Current Account</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
