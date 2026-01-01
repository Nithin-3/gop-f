import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const BookFreeTrialButton = ({ course }) => {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  const clickButton = () => {
    if (profile?.role === "Student") {
      if (course) localStorage.setItem("chosenCourse", JSON.stringify(course));
      navigate("/calendar");
    } else {
      toast.warning("You need to login first!");
      // Optional: redirect to login page
      // navigate("/auth/login");
    }
  };

  return (
    <button
      onClick={clickButton}
      style={{
        textAlign: "center",
        margin: "0 auto",
        cursor: "pointer",
        backgroundColor: "#fe1848",
        color: "#fefeff",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        fontSize: "1em",
      }}
    >
      Book Free Trial
    </button>
  );
};
