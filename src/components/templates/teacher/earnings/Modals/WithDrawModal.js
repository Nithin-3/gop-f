import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { requestPayout } from "../../../../../store/actions/payout";
import modalStyles from "../styles.module.css";
import BankTransfer from "./BankTransfer";
import Paypal from "./Paypal";
import Upi from "./Upi";

const WithDrawModal = ({ width, setEditModal, teacherData, teacherWallet, getWallet, handleWithdrawals, handlePending }) => {
  const [activeTab, setActiveTab] = useState("UPI");
  const [isIFSCCorrect, setIsIFSCCorrect] = useState(false);
  const [upi, setUPI] = useState("");
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "", accountNumber: "", confirmAccountNumber: "", bankLocation: "", bankIFSCode: "", bankSwiftCode: "", bankAccountType: "", bankName: "", branchName: ""
  });
  const [paypal, setPaypal] = useState("");
  const tabs = ["UPI", "Bank Transfer", "Paypal"];

  const getBankByIFSC = async (value) => {
    try {
      const { data } = await axios.get(`https://ifsc.razorpay.com/${value}`);
      setIsIFSCCorrect(true);
      return { branch: data?.BRANCH, bank: data?.BANK };
    } catch (e) {
      console.error("IFSC lookup failed:", e);
      setIsIFSCCorrect(false);
      toast.error("Add Proper IFSC code");
    }
  };

  const handleBankDetails = async (e) => {
    const { name, value } = e.target;
    if (name === "bankIFSCode" && value.length === 11) {
      const data = await getBankByIFSC(value);
      if (data) return setBankDetails(prev => ({ ...prev, bankName: data.bank, branchName: data.branch, bankIFSCode: value }));
    } else if (name === "bankIFSCode") setIsIFSCCorrect(false);
    setBankDetails(prev => ({ ...prev, [name]: value }));
  };

  const requestForPayout = async (payoutObj) => {
    const data = await requestPayout(payoutObj);
    data?.success ? toast.success("Your withdrawal request has been generated.") : toast.error("Something went wrong. Please try again later.");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (activeTab === "UPI" && !upi) return toast.warn("Please fill the required field");
    if (activeTab === "Bank Transfer") {
      const requiredFields = ["accountHolderName", "accountNumber", "confirmAccountNumber", "bankLocation", "bankAccountType", "bankName", "branchName"];
      for (let field of requiredFields) if (!bankDetails[field]) return toast.warn("Please fill the required fields");
      if (bankDetails.confirmAccountNumber !== bankDetails.accountNumber) return toast.warn("Account Number and Confirm Account Number don't match");
    }
    if (activeTab === "Paypal" && !paypal) return toast.warn("Please fill the required field");

    const payoutObj = {
      teacherId: teacherData?.id,
      withdrawalAmount: teacherWallet?.balanceAmount,
      modeOfTransaction: activeTab,
      ...(activeTab === "Bank Transfer" && { bankDetails }),
      ...(activeTab === "UPI" && { upi: { upiId: upi } }),
      ...(activeTab === "Paypal" && { paypal: { paypalId: paypal } }),
    };
    await requestForPayout(payoutObj);
    setEditModal(false);
    getWallet();
    handleWithdrawals();
    handlePending();
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal} style={{ height: "600px", width: "750px", overflow: "auto" }}>
        <div className={modalStyles.modal_header}>
          <h1>Withdrawal</h1>
          <i className={`${modalStyles.closeBtn} fas fa-close`} onClick={() => setEditModal(false)}></i>
        </div>
        <div className={modalStyles.modal_tabs}>
          <div className={modalStyles.sessionTabs}>
            {tabs.map((item, index) => (
              <div key={index} className={`${modalStyles.sessionTab} ${activeTab === item ? modalStyles.sessionTabActive : ""}`} onClick={() => setActiveTab(item)}>{item}</div>
            ))}
          </div>
        </div>
        <div className={modalStyles.modal_body}>
          {{
            UPI: <Upi handleChange={e => setUPI(e.target.value)} upi={upi} />,
            "Bank Transfer": <BankTransfer handleChange={handleBankDetails} bankDetails={bankDetails} isIFSCCorrect={isIFSCCorrect} />,
            Paypal: <Paypal handleChange={e => setPaypal(e.target.value)} paypal={paypal} />
          }[activeTab]}
        </div>
        <div className={modalStyles.modal_footer}>
          <button type="button" onClick={handleClick}>Request Payment</button>
          <button type="button" onClick={() => setEditModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default WithDrawModal;
