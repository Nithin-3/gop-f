import React from "react";
import { useNavigate } from "react-router-dom";

function PrivateLesson(props) {
  const { width, data, selectedCoupon } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    const stateData = {};

    if (selectedCoupon) {
      stateData.coupon = selectedCoupon;
    }

    navigate("/bookCalendar", { state: stateData });
  };

  return (
    <div style={{ marginTop: "10px", width: width >= 992 ? "100%" : "90%" }}>
      <div
        style={{
          borderRadius: "10px 10px 0 0",
          width: width >= 992 ? "100%" : "auto",
          backgroundColor: "#edecec",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Private
        <br />
        60 min
      </div>
      <div
        style={{
          borderRadius: "0 0 10px 10px",
          width: width >= 992 ? "100%" : "auto",
          backgroundColor: "#fefeff",
          padding: "10px",
        }}
      >
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid #edecec",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>1 Lesson</div>
          <div style={{ color: "#fe587a" }}>
            ₹ {data?.price?.data || data?.price || "N/A"}/hr
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            margin: "0 auto",
            cursor: "pointer",
            backgroundColor: "#fe1848",
            color: "#fefeff",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={handleClick}
        >
          Book Now
        </div>
      </div>
    </div>
  );
}

export default PrivateLesson;
