import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./pages/main";
import Teacher from "./pages/teacher";
import Admin from "./pages/admin";
import Student from "./pages/student";
import Loader from "./pages/common/loader/loader";
import { ToastContainer, Flip } from "react-toastify";
import VerifyEmailConfirmation from "./pages/common/verifyEmailConfirmation";
import ProtectedRoute from "./utils/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import EmailVerified from "./pages/common/emailVerified";

const App = (props) => {
    useEffect(() => {
        document.getElementById("loader").style.display = "none";
    }, []);

    useEffect(() => {
        let lastReset = localStorage.getItem("lastReset");
    }, []);

    return (
        <>
            <Loader />
            <ToastContainer
                position="top-center"
                autoClose={1500}
                transition={Flip}
            />
            <Routes>
                {/* Student */}
                <Route
                    path="/student/verifyEmail"
                    element={<VerifyEmailConfirmation />}
                />

                <Route
                    path="/emailVerified"
                    element={<EmailVerified />}
                />

                <Route
                    path="/student/*"
                    element={
                        <ProtectedRoute authRole={["Student"]}>
                            <Student />
                        </ProtectedRoute>
                    }
                />

                {/* Teacher */}
                <Route
                    path="/teacher/verifyEmail"
                    element={<VerifyEmailConfirmation />}
                />

                <Route
                    path="/teacher/*"
                    element={
                        <ProtectedRoute authRole={["Teacher"]}>
                            <Teacher />
                        </ProtectedRoute>
                    }
                />

                {/* Admin */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute authRole={["Admin", "Tutor", "Payment"]}>
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route path="/*" element={<Main />} />
            </Routes>
        </>
    );
};

export default App;
