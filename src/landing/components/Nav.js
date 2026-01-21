import React, { useState } from "react";
//images
import logo from "../../assets/image/logo.png";
import hamburger from "../../assets/icons/hamburger.svg";
//React Router
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
//css
import "./Nav.css";
import { toast } from "react-toastify";

const Nav = ({ setPage, roleModal }) => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const authData = useSelector((state) => state.auth.authData);
  const profile = authData || JSON.parse(window.localStorage.getItem("profile"));

  const signOut = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out");
  };

  function DefaultNav() {
    return (
      <>
        <NavLink className="nav_link_find" exact to="/find-teacher">
          <li className="nav_teacher" style={{ paddingTop: "10px" }}>
            Find a Teacher
          </li>
        </NavLink>
        <NavLink className="nav_link" exact to="/auth/login">
          <li className="nav_log">Log in</li>
        </NavLink>
        <NavLink
          className="nav_link0"
          exact
          to="/auth/signup"
          onClick={() => {
            if (roleModal) roleModal(true);
          }}
        >
          <li className="nav_sign">Sign up</li>
        </NavLink>
      </>
    );
  }

  function StudentNav() {
    return (
      <>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/find-teacher">
            Find a Teacher
          </NavLink>
        </li>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/student/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav_link_find"
            style={{ fontWeight: "bold" }}
            to="/"
            onClick={signOut}
          >
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  function TeacherNav() {
    return (
      <>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/teacher/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/teacher/courses">
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav_link_find"
            style={{ fontWeight: "bold" }}
            to="/"
            onClick={signOut}
          >
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  function TeacherOnboardingNav() {
    return (
      <>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/teacher/onboard">
            Onboarding
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav_link_find"
            style={{ fontWeight: "bold" }}
            to="/"
            onClick={signOut}
          >
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  function AdminNav() {
    return (
      <>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/admin/dashboard">
            Dasboard
          </NavLink>
        </li>
        <li className="nav_teacher">
          <NavLink className="nav_link_find" exact to="/admin/courses">
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav_link_find"
            style={{ fontWeight: "bold" }}
            to="/"
            onClick={signOut}
          >
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <div className="nav_section">
      <div className="nav_left">
        <NavLink className="nav_lg" exact to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <div className={click ? "header__navMenu" : "header__nav"}>
        <ul
          className="nav_right menu_icon_hamburger"
          onClick={() => setClick((prev) => false)}
        >
          {/* <li className="nav_teacher">
            <NavLink
              className="nav_link_find"
              exact
              to="/find-teacher"
            >
              Find a Teacher
            </NavLink>
          </li> */}

          {profile && profile.role ? (
            profile.role === "Student" ? (
              <StudentNav />
            ) : profile.role === "Teacher" ? (
              profile.isOnBoarding ? (
                <TeacherNav />
              ) : (
                <TeacherOnboardingNav />
              )
            ) : (
              <AdminNav />
            )
          ) : (
            <DefaultNav />
          )}
        </ul>
      </div>

      <div className="nav_icon" onClick={() => setClick((prev) => !prev)}>
        {click ? "X" : <img src={hamburger} alt="errImg" />}
      </div>
    </div>
  );
};

export default Nav;
