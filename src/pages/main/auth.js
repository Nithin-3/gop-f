import React, { useState, useEffect } from "react";
import AuthComponent from "./../../components/templates/main/auth";
import RolePopup from "./../../components/organisms/rolePopup";
import { useNavigate, useLocation } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const [type, setType] = useState(false);
  const [role, setRole] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile && profile.role) {
      if (profile.role === "Teacher") {
        navigate("/teacher/dashboard", { replace: true });
      } else if (profile.role === "Student") {
        navigate("/student/dashboard", { replace: true });
      } else if (["Admin", "Payment", "Tutor"].includes(profile.role)) {
        navigate("/admin/dashboard", { replace: true });
      }
      return; // exit early if user is already logged in
    }

    if (path === "/auth/signup") {
      setType(true);
      setRole(true);
    } else {
      setRole(false);
      setType(false);
    }
  }, [path, navigate]);

  const roleModal = (status) => {
    setRole(status);
  };

  return (
    <>
      {!(location.state && location.state.role === 'Teacher') && (
        <RolePopup shownStatus={role} popupSetter={setRole} />
      )}
      <AuthComponent type={type} typeSetter={setType} roleModal={roleModal} />
    </>
  );
};

export default Authentication;
