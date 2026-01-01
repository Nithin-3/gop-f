import React, { useEffect, useState, useRef } from "react";
import CourseCard from "./courseCard/courseCard";
import CreateCourseModal from "./createCourseModal/createCourseModal";
import ViewCourse from "./viewCourse/viewCourse";
import stylesPrev from "./styles.module.css";
import CreateLesson from "./createLesson/createLesson";
import DeleteConfirmationModal from "../../common/deleteConfirmationModal/deleteConfirmationModal";
import { getMyCourses } from "../../../../store/actions/course";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../../../utils/util";
import styles from "../sessions/styles.module.css";

const TeacherCourses = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();

    const [apiCalled, setApiCalled] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
    const [showCreateLessonModal, setShowCreateLessonModal] = useState(false);
    const [createLessonModalType, setCreateLessonModalType] = useState();

    const [activeTab, setActiveTab] = useState("Courses");
    const [mobileDropdown, setMobileDropdown] = useState(false);
    const [tabsPhone, setTabsPhone] = useState(false);
    const dashboardTabsPhone = useRef();

    const [showViewCourse, setShowViewCourse] = useState(false);
    const [viewCourseType, setViewCourseType] = useState();

    const [myCourses, setMyCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const [page, setPage] = useState(1);

    const handleClick = (e) => {
        if (dashboardTabsPhone.current && !dashboardTabsPhone.current.contains(e.target)) {
            setTabsPhone(false);
        }
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        if (apiCalled) return;

        const fetchCourses = async () => {
            setApiCalled(true);
            const userObj = JSON.parse(window.localStorage.getItem("profile"));

            if (!userObj?.isOnBoarding) {
                toast.warn("Onboarding Pending");
                navigate("/teacher/onboard");
                return;
            }

            const teacherData = JSON.parse(window.localStorage.getItem("teacherData"));
            if (teacherData?.approvalStatus !== "verified") {
                toast.warn("Admin Verification Pending");
                navigate("/teacher/dashboard");
                return;
            }

            try {
                const result = await dispatch(getMyCourses(userObj._id));
                if (result?.data) setMyCourses(result.data);
            } catch (e) {
                console.log(e);
                toast.error("Failed to fetch your courses");
            }
        };

        fetchCourses();
    }, [dispatch, page, navigate, apiCalled]);

    const tabs = ["Courses", "Lesson Plans", "Homework"];

    return (
        <>
            {showConfirmationModal && selectedCourse && (
                <DeleteConfirmationModal
                    showModal={showConfirmationModal}
                    handleModal={setShowConfirmationModal}
                    selectedCourse={selectedCourse}
                    setApiCalled={setApiCalled}
                />
            )}

            <CreateCourseModal
                showModal={showCreateCourseModal}
                setModal={setShowCreateCourseModal}
                setApiCalled={setApiCalled}
            />

            <CreateLesson
                showModal={showCreateLessonModal}
                setModal={setShowCreateLessonModal}
                modalType={createLessonModalType}
            />

            {showViewCourse && selectedCourse && (
                <ViewCourse
                    showModal={showViewCourse}
                    setModal={setShowViewCourse}
                    modalType={viewCourseType}
                    activeTab={activeTab}
                    courseData={selectedCourse}
                    setApiCalled={setApiCalled}
                />
            )}

            <main className={stylesPrev.mainSection}>
                {width >= 992 ? (
                    <div className={styles.sessionTabs}>
                        {tabs.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.sessionTab} ${activeTab === item ? styles.sessionTabActive : ""}`}
                                onClick={() => setActiveTab(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className={styles.sessionTabs}>
                            <div className={styles.sessionTabHeading}>{activeTab}</div>
                            <div className={styles.arrowIcon} onClick={() => setMobileDropdown(!mobileDropdown)}>
                                {mobileDropdown ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
                            </div>
                        </div>
                        {mobileDropdown && (
                            <div style={{ position: "relative" }}>
                                <div className={styles.mobileDropdown}>
                                    {tabs.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.sessionTab} ${activeTab === item ? styles.sessionTabActiveDropdown : ""}`}
                                            onClick={() => {
                                                setActiveTab(item);
                                                setMobileDropdown(false);
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className={styles.scrollBarNone} style={{ marginTop: "10px", height: "75vh" }}>
                    <div className={stylesPrev.courses} style={{ height: "100%" }}>
                        {activeTab === "Courses" && myCourses?.length > 0 ? (
                            myCourses.map((course, i) => (
                                <CourseCard
                                    key={i}
                                    openViewCourse={setShowViewCourse}
                                    setViewCourseType={setViewCourseType}
                                    activeTab={activeTab}
                                    setShowConfirmationModal={setShowConfirmationModal}
                                    courseData={course}
                                    setSelectedCourse={setSelectedCourse}
                                />
                            ))
                        ) : (
                            <h4 style={{ textAlign: "center", marginTop: "1em" }}>No Courses Found</h4>
                        )}
                    </div>

                    <div className={stylesPrev.createCourse}>
                        {activeTab === "Courses" && (
                            <button onClick={() => setShowCreateCourseModal(true)}>Create Course</button>
                        )}
                        {activeTab === "Lesson Plans" && (
                            <button
                                onClick={() => {
                                    setShowCreateLessonModal(true);
                                    setCreateLessonModalType("Lesson");
                                }}
                            >
                                New Lesson Plan
                            </button>
                        )}
                        {activeTab === "Homework" && (
                            <button
                                onClick={() => {
                                    setShowCreateLessonModal(true);
                                    setCreateLessonModalType("Homework");
                                }}
                            >
                                New Homework
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default TeacherCourses;
