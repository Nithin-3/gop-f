import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../atoms/input";
import Button from "../../atoms/button";
// import Checkbox from "../../atoms/checkbox";

import validationSchema from "../../../utils/signupValidation";
import { signup } from "../../../store/actions/main/authAction";
import { getRole } from "../../../utils/util";

import classes from "./styles.module.css";

const SignupInputContainer = ({ type, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState(false);

  const submitData = async (data) => {
    if (!checked && type) {
      setErr(true);
      return;
    }

    try {
      document.getElementById("loader").style.display = "flex";
      const response = await dispatch(signup(data));

      if (response?.status) {
        toast.success("Check your mail for verification link");
        const userRole = role?.toLowerCase() || getRole()?.toLowerCase() || "student";
        navigate(`/${userRole}/verifyEmail`);
      } else if (response?.message === "User Already Exists") {
        toast.error("User Already Exists");
      } else if (response?.errors?.[0]?.msg) {
        toast.error(response.errors[0].msg);
      } else {
        toast.error(response?.message || "Server Error, Please try again later");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.message || "Signup failed");
    } finally {
      document.getElementById("loader").style.display = "none";
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => submitData({ ...values, role }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.inputContainer} method="post">
      {type && (
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label htmlFor="fullName" style={{ fontSize: "16px", fontWeight: 100 }}>Full Name</label>
          <Input
            onBlur={formik.handleBlur}
            change={formik.handleChange}
            value={formik.values.fullName}
            name="fullName"
            id="fullName"
            type="text"
            placeholder="Your Name"
            theme="primary"
            style={{ fontSize: "15px", marginTop: "-10px" }}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className={classes.error}>{formik.errors.fullName}</div>
          )}
        </div>
      )}

      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <label htmlFor="email" style={{ fontSize: "16px", fontWeight: 100 }}>Email</label>
        <Input
          onBlur={formik.handleBlur}
          change={formik.handleChange}
          value={formik.values.email}
          name="email"
          type="email"
          id="email"
          placeholder="example@mail.com"
          style={{ fontSize: "15px", marginTop: "-10px" }}
        />
        {formik.touched.email && formik.errors.email && (
          <div className={classes.error}>{formik.errors.email}</div>
        )}
      </div>

      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <label htmlFor="password" style={{ fontSize: "16px", fontWeight: 100 }}>Password</label>
        <Input
          onBlur={formik.handleBlur}
          change={formik.handleChange}
          value={formik.values.password}
          name="password"
          type="password"
          id="password"
          placeholder="at least 8 characters"
          style={{ fontSize: "15px", marginTop: "-10px" }}
        />
        {formik.touched.password && formik.errors.password && (
          <div className={classes.error}>{formik.errors.password}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <input
          type="checkbox"
          id="checkbox"
          checked={checked}
          onChange={() => {
            setChecked((prev) => !prev);
            if (checked) setErr(false);
          }}
          style={{ width: "15px", height: "15px", marginRight: "8px" }}
        />
        <label htmlFor="checkbox" style={{ cursor: "pointer", fontSize: "16px" }}>
          I agree with &nbsp;
          <Link to="/privacy-policy">Terms and Privacy</Link>
        </label>
      </div>
      {err && <div className={classes.error}>Please check the box above</div>}

      <Button type="submit" title="Sign up" theme="primary" size="medium" style={{ fontSize: "17px" }} />
    </form>
  );
};

export default SignupInputContainer;
