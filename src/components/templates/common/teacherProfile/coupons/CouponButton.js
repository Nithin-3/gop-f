import React from "react";

const CouponButton = ({ coupon, handleSelectCoupon, selectedCoupon }) => {
  const buttonStyles = {
    padding: "20px 10px",
    // height: "60px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    cursor: "pointer",
    letterSpacing: "1px",
    backgroundColor: selectedCoupon?.id === coupon.id ? "#fe1848" : "#ffe3e3",
    color: selectedCoupon?.id === coupon.id ? "white" : "inherit",
    boxShadow: "0 1px 6px 2px rgba(0, 0, 0, 0.2)",
  };

  return (
    <button
      style={buttonStyles}
      onClick={handleSelectCoupon.bind(this, coupon)}>
      {coupon?.couponCode}
    </button>
  );
};

export default CouponButton;
