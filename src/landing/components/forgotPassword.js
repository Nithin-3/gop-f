import React, { useState } from "react";
import Navigation from "./Nav";
import "./forgotPassword.css";
import Svg from "../../assets/image/Mar-Business_18 1.svg";
import eye_icon from "../../assets/icons/eye.svg";
import slashEye from "../../assets/icons/hidden.png";
import { validateEmail } from "../../utils/util";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getVerificationCode, resetPassword } from "../../store/actions/main/authAction";
import { useNavigate } from "react-router-dom"; // React Router v6

const ForgotPasswordComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router v6
  const dispatch = useDispatch();

  const sendVerificationCode = async () => {
    try {
      if (!validateEmail(email)) {
        return toast("Please Enter a valid Email ID");
      }

      document.getElementById("loader").style.display = "flex";

      const data = await dispatch(getVerificationCode(email));

      document.getElementById("loader").style.display = "none";
      toast(data.msg);
    } catch (error) {
      console.error("sendVerificationCode error:", error);
      document.getElementById("loader").style.display = "none";
      toast(error.message || "Something went wrong");
    }
  };

  const resetPass = async () => {
    try {
      if (!validateEmail(email)) {
        return toast("Please Enter a valid Email ID");
      }
      if (code.length !== 6) {
        return toast("Invalid Token");
      }
      if (password.length < 8) {
        return toast("Password: Min 8 Characters required");
      }

      const body = { email, token: code, password };

      document.getElementById("loader").style.display = "flex";

      const data = await dispatch(resetPassword(body));

      document.getElementById("loader").style.display = "none";
      toast(data);

      if (data === "Your password has been changed") {
        setEmail("");
        setCode("");
        setPassword("");
        setTimeout(() => {
          navigate("/auth/login"); // Navigate after 1 second
        }, 1000);
      }
    } catch (error) {
      console.error("resetPass error:", error);
      document.getElementById("loader").style.display = "none";
      toast(error.message || "Something went wrong");
    }
  };

  return (
    <main className="forgotpassword_page">
      <Navigation />
      <div className="forgotPassword_section">
        <div className="left_section">
          <h3>Reset Password</h3>
          <form className="forgotPassword_form">
            <div className="form_group">
              <label>Email</label>
              <input
                placeholder="your registered email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="button" onClick={sendVerificationCode}>
                Get code
              </button>
            </div>

            <div className="form_group">
              <label>Verification Code</label>
              <input
                placeholder="6-digit code from email"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="form_group">
              <label>New Password</label>
              <input
                placeholder="at least 8 characters"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                className="password_icon"
                src={showPassword ? slashEye : eye_icon}
                alt="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <button type="button" className="resetPassword_button" onClick={resetPass}>
              Reset Password
            </button>
          </form>
        </div>
        <div className="right_section">
          <img src={Svg} alt="Svg" />
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordComponent;
