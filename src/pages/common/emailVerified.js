import React, { useEffect } from "react";
import Navigation from "./../../landing/components/Nav";
import classes from "./styles.module.css";
import Blob1 from "../../assets/image/verification_blob.svg";
import Blob2 from "../../assets/image/verification_blob2.svg";
import Svg from "../../assets/image/Mar-Business_18 1.svg";
import { useNavigate, useLocation } from "react-router-dom";

const EmailVerified = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const value = path.split("/")[1]; // optional if needed

    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile.role) {
      if (profile.role === "Teacher") {
        navigate("/teacher/dashboard", { replace: true });
        return;
      } else if (profile.role === "Student") {
        navigate("/student/dashboard", { replace: true });
        return;
      } else if (["Admin", "Payment", "Tutor"].includes(profile.role)) {
        navigate("/admin/dashboard", { replace: true });
        return;
      }
    }

    // Redirect to login after 5 seconds if no profile
    const timeout = setTimeout(() => {
      navigate("/auth/login", { replace: true });
    }, 5000);

    return () => clearTimeout(timeout); // cleanup on unmount
  }, [navigate, location]);

  return (
    <main className={classes.verification_page}>
      <Navigation />
      <div className={classes.verification_section}>
        <img src={Blob2} alt="Blob" className={classes.up_blob} />
        <img src={Blob1} alt="Blob" className={classes.down_blob} />
        <div className={classes.left_section}>
          <h2>Your Account has been verified</h2>
          <h4>Redirecting you to login page....</h4>
        </div>
        <div className={classes.right_section}>
          <img src={Svg} alt="Svg" />
        </div>
      </div>
    </main>
  );
};

export default EmailVerified;
