import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../atoms/input";
import Button from "../../atoms/button";
import Checkbox from "../../atoms/checkbox";

import validationSchema from "../../../utils/loginValidation";
import { login } from "../../../store/actions/main/authAction";
import { ROLE_STUDENT, ROLE_TEACHER, ROLE_ADMIN, ROLE_PAYMENT, ROLE_TUTOR } from "../../../utils/constants";

import classes from "./styles.module.css";

const LoginInputContainer = ({ type, role }) => {
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

      const result = await dispatch(login(data));

      if (result && result._doc) {
        toast.success("Logged In");
        const user = result._doc;

        if (user.role === ROLE_TEACHER) {
          if (!user.isVerified) return toast.error("User not verified");
          return user.isOnBoarding
            ? navigate("/teacher/dashboard")
            : navigate("/teacher/onboard", { state: { result } });
        }

        if (user.role === ROLE_STUDENT) {
          if (!user.isVerified) return toast.error("User not verified");
          const course = JSON.parse(localStorage.getItem("chosenCourse"));
          return course
            ? navigate("/teacher-profile", { state: { course } })
            : navigate("/student/dashboard");
        }

        if ([ROLE_ADMIN, ROLE_PAYMENT, ROLE_TUTOR].includes(user.role)) {
          if (!user.isVerified) return toast.error("User not verified");
          return navigate("/admin/dashboard");
        }
      }

      // Show error messages if login fails
      if (result?.errors?.length) toast.error(result.errors[0].msg);

      document.getElementById("loader").style.display = "none";
    } catch (e) {
      document.getElementById("loader").style.display = "none";
      toast.error(e.message || e);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => submitData({ ...values, role }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.inputContainer} method="post">
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

      <div style={{ marginBottom: "10px" }}>
        <Checkbox
          change={() => {
            setChecked((prev) => !prev);
            if (checked) setErr(false);
          }}
          value={formik.values.checkbox}
          id="checkbox"
          type="checkbox"
          label={type ? "I agree with Terms and Privacy" : "Remember me"}
        />
        {err && <div className={classes.error}>Please check the box above</div>}
      </div>

      <Button type="submit" title="Log in" theme="primary" size="medium" style={{ fontSize: "17px" }} />

      <NavLink className={classes.forgotPassword} to="/auth/forgot-password" style={{ fontSize: "16px", marginTop: "10px" }}>
        Forgot password?
      </NavLink>
    </form>
  );
};

export default LoginInputContainer;
