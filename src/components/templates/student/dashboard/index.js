import React, { useContext } from "react";
import teacherStyles from "../styles.module.css";
import styles from "./styles.module.css";
import { SocketContext } from "../../../../context/socketContext";
import avatar from "../../../../assets/icon/student.png";
import down_arrow from "../../../../assets/icons/down_arrow_icon.svg";
import graph_img from "../../../../assets/icons/temp_graph.png";
import notification from "../../../../assets/icons/bell_mobile ui_notification_icon.svg";
import classroom from "../../../../assets/images/teacher_type.png";
import { createConversation } from "../../../../store/actions/conversations";
import { useWindowDimensions } from "../../../../utils/util";
import { getStudentData, getUpcomingClassForStudent, getStudentDashNums } from "../../../../store/actions/student";
import { getCourseById } from "../../../../store/actions/course";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const StudentDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const { width } = useWindowDimensions();
    const graphOptions = [{ name: "Courses Impression" }, { name: "Per Session Earning" }, { name: "Top Student" }];
    const [graph, setGraph] = React.useState("Courses Impression");
    const [studentData, setStudentData] = React.useState();
    const [profile, setProfile] = React.useState();
    const [msgFromT, setMsgFromT] = React.useState(false);
    const [msgFromA, setMsgFromA] = React.useState(false);
    const [upcomingClass, setUpcomingClass] = React.useState();
    const [languageUC, setLanguageUC] = React.useState();
    const [priceUC, setPriceUC] = React.useState();
    const [numbers, setNumbers] = React.useState();

    React.useEffect(() => {
        const handleNotification = d => d.role === "Teacher" ? setMsgFromT(true) : d.role === "Admin" && setMsgFromA(true);
        socket?.on("getNotification", handleNotification);
        return () => socket?.off("getNotification", handleNotification);
    }, [socket]);

    React.useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem("profile"));
        setProfile(userProfile);
        if (userProfile?._id) {
            socket?.emit("addUser", userProfile._id);
        }

        const init = async () => {
            if (!userProfile?._id) return;
            try {
                try {
                    await dispatch(createConversation({ senderId: userProfile._id, receiverId: "6220e5b15e6e8a82aff9a0b9" }));
                } catch (chatErr) {
                    console.error("Chat initialization failed:", chatErr);
                }

                const studentId = userProfile.onType;
                if (!studentId) return;

                const res = await dispatch(getUpcomingClassForStudent(studentId));
                if (res?.data) {
                    setUpcomingClass(res.data);
                    const course = await dispatch(getCourseById(res.data.courseId));
                    setLanguageUC(course?.language?.data || "");
                    setPriceUC(course?.price?.data || 0);
                }

                const nums = await dispatch(getStudentDashNums(studentId));
                setNumbers(nums);

                const dataRes = await dispatch(getStudentData(userProfile._id));
                if (Array.isArray(dataRes) && dataRes.length > 0) {
                    setStudentData({ data: dataRes[0] });
                }
            } catch (e) {
                console.error("Dashboard initialization failed:", e);
            }
        };
        init();
    }, []);

    const handleJoinClass = () => {
        if (!upcomingClass) return;
        navigate("/liveclass", {
            state: {
                role: "Student",
                availDetails: upcomingClass,
                courseDetails: { title: languageUC },
                sessionDetails: upcomingClass,
            }
        });
    };

    return (
        <>
            {width >= 992 ? (
                <>
                    <main className={teacherStyles.mainSection}>
                        <div style={{ marginBottom: 20, borderRadius: 20, padding: 20, display: "flex", justifyContent: "space-between", border: "1px solid" }}>
                            <div><div style={{ fontWeight: "bold", color: "#FD879F", fontSize: "2rem" }}>{`Welcome ${profile?.fullName || ""}`}</div></div>
                            <img src={classroom} alt="img" style={{ width: 60 }} />
                        </div>
                        <div className={styles.row}><SessionOverviewCard numbers={numbers} /><TeacherCard /><WalletCard /></div>
                        <div className={styles.row}><GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} /></div>
                    </main>
                    <RightTeacherCard
                        studentData={studentData}
                        fromt={msgFromT}
                        froma={msgFromA}
                        setfromt={setMsgFromT}
                        setfroma={setMsgFromA}
                        upcomingClass={upcomingClass}
                        language={languageUC}
                        price={priceUC}
                        onJoin={handleJoinClass}
                    />
                </>
            ) : (
                <main className={teacherStyles.mainSection}>
                    <div style={{ fontSize: 24, fontWeight: 500, textAlign: "center" }}>{`Welcome ${profile?.fullName || ""}`}</div>
                    <MobileUpcomingCard
                        upcomingClass={upcomingClass}
                        language={languageUC}
                        price={priceUC}
                        onJoin={handleJoinClass}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}><SessionOverviewCard numbers={numbers} /><WalletCard /></div>
                    <div className={styles.row}><GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} /></div>
                </main>
            )}
        </>
    );
};

const SessionOverviewCard = ({ numbers }) => (
    <div className={styles.sessions}><div className={styles.secondRowHeadings}>Sessions Overview</div><div className={styles.secondRowBody}><div><div>Book Session</div><div>Upcoming</div></div><div><div>{numbers?.booked}</div><div>{numbers?.upcoming}</div></div></div></div>
);

const TeacherCard = () => (
    <div className={styles.teacher}><div className={styles.secondRowHeadings}>Teacher</div><div className={styles.secondRowBody}><div><div>Teacher Name</div><div>(Past Class / Upcoming)</div></div></div></div>
);

const WalletCard = () => (
    <div className={styles.wallet}><div className={styles.secondRowHeadings}>Wallet</div><div className={styles.secondRowBody}><div><div>Available</div><div>Credits</div></div><div><div>$50</div><div>$50</div></div></div></div>
);

const GraphCard = ({ graphOptions, graph, setGraph, width }) => (
    <div style={{ padding: 20, borderRadius: 20, border: "1px solid" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {graphOptions.map((i, k) => <div key={k} className={i.name === graph ? styles.graphNameActive : styles.graphName} onClick={() => setGraph(i.name)}>{i.name}</div>)}
            <div style={{ display: "flex", alignItems: "center" }}>Week<img src={down_arrow} alt="d" style={{ width: 20 }} /></div>
        </div>
        <img src={graph_img} alt="graph" style={{ width: "100%", marginTop: 20 }} />
    </div>
);

const RightTeacherCard = ({ studentData, fromt, froma, setfromt, setfroma, upcomingClass, language, price, onJoin }) => (
    <div style={{ width: "20%", position: "fixed", right: 25 }}>
        <div style={{ backgroundColor: "rgba(158,205,230,0.15)", borderRadius: 20, minHeight: "97vh", padding: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div onClick={() => { setfromt(false); }}><i className="far fa-comment fa-2x" /></div>
                <div onClick={() => { setfroma(false); }}><img src={notification} alt="n" style={{ width: 35 }} /></div>
            </div>
            <div style={{ textAlign: "center" }}>
                <img src={studentData?.data?.profilePic?.data || avatar} alt="s" style={{ width: 150, height: 150, borderRadius: "50%" }} />
                <div>{studentData?.data?.firstName}</div>
            </div>
            <div style={{ backgroundColor: "#FD879F", color: "#fff", padding: 20, borderRadius: 20 }}>
                {upcomingClass ? (
                    <>
                        <div>{language}</div>
                        <div>{moment(upcomingClass.from).format("DD MMM YYYY")}</div>
                        <div>{moment(upcomingClass.from).format("hh:mm A")}</div>
                        <div>{moment(upcomingClass.to).diff(moment(upcomingClass.from), "minutes")} Minutes</div>
                        <div>{price}</div>
                        <button
                            onClick={onJoin}
                            style={{
                                backgroundColor: "white",
                                color: "#FD879F",
                                border: "none",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                marginTop: "10px",
                                width: "100%",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                            }}
                        >
                            Join Class
                        </button>
                    </>
                ) : <div>No meetings to show</div>}
            </div>
        </div>
    </div>
);

const MobileUpcomingCard = ({ upcomingClass, language, price, onJoin }) => (
    <div style={{ backgroundColor: "#FD879F", color: "#fff", borderRadius: 10, padding: 10 }}>
        {upcomingClass ? (
            <>
                <div>{language}</div>
                <div>{moment(upcomingClass.from).format("DD MMM YYYY")}</div>
                <div>{moment(upcomingClass.from).format("hh:mm A")}</div>
                <div>{moment(upcomingClass.to).diff(moment(upcomingClass.from), "minutes")} Minutes</div>
                <div>${price}</div>
                <button
                    onClick={onJoin}
                    style={{
                        backgroundColor: "white",
                        color: "#FD879F",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 15px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginTop: "10px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    Join Now
                </button>
            </>
        ) : <div>No meetings to show</div>}
    </div>
);

export default StudentDashboard;
