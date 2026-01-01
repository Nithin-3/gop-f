import React from "react";
import "./couponcard.css";

const CouponCard = ({ CourseName, price, expDate, teacherName, height, width, margin }) => {
  return (
    <div className="couponCard" style={{ height, width, margin }}>
      <div className="left">
        <div className="courseName">{CourseName}</div>
        <div className="details">
          <div className="coupon">COUPON</div>
          <div className="info">
            <div>Valid Till:</div>
            <div>{expDate}</div>
          </div>
        </div>
        <div className="line">
          <div style={{ visibility: "hidden" }}>hello</div>
        </div>
        <div className="name">{teacherName}</div>
      </div>
      <div className="rightCC">
        <div className="rotate">
          <div className="rightCoupon">COUPON</div>
          <div className="price">
            {price} <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
