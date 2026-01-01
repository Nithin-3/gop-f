import React from "react";
import teacherStyles from "../styles.module.css";
import styles from "./styles.module.css";
import { SocketContext } from "../../../../context/socketContext";
import avatar from "../../../../assets/icon/student.png";
// import up_arrow from '../../../../assets/icons/up-arrow.svg';
import down_arrow from "../../../../assets/icons/down_arrow_icon.svg";
import graph_img from "../../../../assets/icons/temp_graph.png";
import notification from "../../../../assets/icons/bell_mobile ui_notification_icon.svg";
import classroom from "../../../../assets/images/teacher_type.png";
import { createConversation } from "../../../../store/actions/conversations/index";
import { useWindowDimensions } from "../../../../utils/util";
import { getStudentData, newStudent, getUpcomingClassForStudent, getStudentDashNums } from "../../../../store/actions/student/index";
import { getCourseById } from '../../../../store/actions/course';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"

const StudentDashboard = (props) => {
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const socket = useContext(SocketContext)
    const graphOptions = [
        { name: "Courses Impression", values: "" },
        { name: "Per Session Earning", values: "" },
        { name: "Top Student", values: "" },
    ];

    const [graph, setGraph] = React.useState("Courses Impression");

    const [studentData, setStudentData] = React.useState();
    const [profile, setProfile] = React.useState();
    const [msgFromT, setMsgFromT] = React.useState(false)
    const [msgFromA, setMsgFromA] = React.useState(false)
    const [upcomingClass, setUpcomingClass] = React.useState()
    const [languageUC, setLanguageUC] = React.useState()
    const [priceUC, setPriceUC] = React.useState()
    const [numbers, setNumbers] = React.useState()

    React.useEffect(() => {

        const handleNotification = (data) => {
            if (data.role === "Teacher") setMsgFromT(true);
            else if (data.role === "Admin") setMsgFromA(true);
        };
        socket?.on("getNotification", handleNotification);

        return () => socket?.off("getNotification", handleNotification);
    }, [socket]);


    React.useEffect(() => {
        async function initChatWithAdmin(userId) {
            // console.log("running")
            const bodyObj = {
                senderId: userId,
                receiverId: "6220e5b15e6e8a82aff9a0b9"
            }
            try {
                const res = await dispatch(createConversation(bodyObj))
                // console.log("reaching here")
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        let userProfile = JSON.parse(window.localStorage.getItem("profile"));
        setProfile(userProfile ? userProfile : "");
        // adding user to the live socket server
        socket?.emit("addUser", userProfile._id)

        async function getMyDetails() {
            try {
                const result = await dispatch(getStudentData(userProfile._id));
                setStudentData(result);
                localStorage.setItem("studentData", JSON.stringify(result));
                getUpcomingClass(result);
            } catch (e) {
                toast.error("Failed to fetch your details");
                console.log(e);
            }
        }

        async function getUpcomingClass(result) {
            console.log(studentData);
            const student = result; //JSON.parse(localStorage.getItem('studentData'))
            console.log(student);
            console.log(student?.data?.userId)
            try {
                if (student) {
                    const res = await dispatch(getUpcomingClassForStudent(student?.data?.userId))
                    const course = await dispatch(getCourseById(res.data?.courseId))
                    const numbers = await dispatch(getStudentDashNums(student?.data?.userId))
                    console.log(numbers)
                    console.log(course)
                    console.log(res)
                    setNumbers(numbers)
                    setLanguageUC(course.language?.data)
                    setPriceUC(course.price?.data)
                    setUpcomingClass(res?.data)
                }
            } catch (err) {
                console.log(err)
            }
        }

        getUpcomingClass()
        getMyDetails();
        initChatWithAdmin(userProfile._id)
    }, []);
    // console.log(studentData)
    return (
        <>
            {width >= 992 ? (
                <>
                    <main className={teacherStyles.mainSection}>
                        <div
                            style={{
                                marginBottom: "20px",
                                borderRadius: "20px",
                                padding: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                                border: "1px solid",
                            }}>
                            <div style={{ maxWidth: "50%" }}>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        color: "#FD879F",
                                        fontSize: "2rem",
                                        marginBottom: "10px",
                                    }}>
                                    {`Welcome ${profile ? profile.fullName : ""}`}
                                </div>
                                {/* <div>
                  Lorem Ipsum is simply a dummy text of printing and typesetting
                  industry.
                </div> */}
                            </div>
                            <div>
                                <img src={classroom} alt='img' style={{ width: "60px" }} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <SessinoOverviewCard numbers={numbers} />

                            <TeacherCard />

                            <WalletCard />
                        </div>

                        <div className={styles.row}>
                            <GraphCard
                                graphOptions={graphOptions}
                                graph={graph}
                                setGraph={setGraph}
                                width={width}
                            />
                        </div>
                    </main>

                    <RightTeacherCard studentData={studentData} fromt={msgFromT} froma={msgFromA} setfromt={setMsgFromT} setfroma={setMsgFromA} upcomingClass={upcomingClass} language={languageUC} price={priceUC} />
                </>
            ) : (
                <>
                    <main className={teacherStyles.mainSection}>
                        <div
                            style={{
                                fontSize: "24px",
                                fontWeight: "500",
                                textAlign: "center",
                                padding: "10px 0",
                                border: "1px solid",
                                borderRadius: "10px",
                            }}>
                            {`Welcome ${profile ? profile.fullName : ""}`}
                        </div>
                        <div
                            style={{
                                marginTop: "20px",
                                textAlign: "center",
                                fontSize: "21px",
                                fontWeight: "600",
                            }}>
                            Upcoming Class
                        </div>

                        <MobileUpcomingCard upcomingClass={upcomingClass} language={languageUC} price={priceUC} />

                        <div
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}>
                            <SessinoOverviewCard numbers={numbers} />

                            <WalletCard />
                        </div>

                        <div
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}>
                            <ProgressCard />

                            <SessinoOverviewCard />
                        </div>

                        <div className={styles.row}>
                            <GraphCard
                                graphOptions={graphOptions}
                                graph={graph}
                                setGraph={setGraph}
                                width={width}
                            />
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

const SessinoOverviewCard = ({ numbers }) => {
    return (
        <div className={styles.sessions}>
            <div className={styles.secondRowHeadings}>Sessions Overview</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>Book Session</div>
                    <div>Upcoming</div>
                </div>
                <div>
                    <div>{numbers?.booked}</div>
                    <div>{numbers?.upcoming}</div>
                </div>
            </div>
        </div>
    );
};

const TeacherCard = () => {
    return (
        <div className={styles.teacher}>
            <div className={styles.secondRowHeadings}>Teacher</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>Teacher Name</div>
                    <div>(Past Class/ Upcoming)</div>
                </div>
            </div>
        </div>
    );
};

const WalletCard = () => {
    return (
        <div className={styles.wallet}>
            <div className={styles.secondRowHeadings}>Wallet</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>Available</div>
                    <div>Credits</div>
                </div>
                <div>
                    <div>$50</div>
                    <div>$50</div>
                </div>
            </div>
        </div>
    );
};

const ProgressCard = () => {
    return (
        <div className={styles.sessions}>
            <div className={styles.secondRowHeadings}>Progress</div>
            <div className={styles.secondRowBody}>
                <div>
                    <div>English</div>
                </div>
                <div>
                    <i className={styles.icon + " fas fa-clock"}></i>
                </div>
            </div>
        </div>
    );
};

const GraphCard = ({ graphOptions, graph, setGraph, width }) => {
    return (
        <div
            style={{
                marginTop: width >= 992 ? "0" : "20px",
                padding: width >= 992 ? "20px" : "10px",
                width: "100%",
                borderRadius: "20px",
                border: "1px solid",
            }}>
            <div
                style={{
                    display: width >= 992 ? "flex" : "block",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: width >= 992 ? "70%" : "100%",
                    }}>
                    {graphOptions.map((item, index) => (
                        <div
                            className={
                                item.name === graph ? styles.graphNameActive : styles.graphName
                            }
                            key={index}
                            onClick={() => setGraph(item.name)}>
                            {item.name}
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        marginTop: width >= 992 ? "" : "20px",
                        display: width >= 992 ? "" : "flex",
                        justifyContent: "center",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            alignItems: "center",
                            padding: "5px 20px",
                            border: "1px solid #FC879E",
                            borderRadius: "30px",
                        }}>
                        Week
                        <img
                            src={down_arrow}
                            alt='down_arrow_icon'
                            style={{ width: "20px" }}
                        />
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                }}>
                <img src={graph_img} alt='graph_img' style={{ width: "100%" }} />
            </div>
        </div>
    );
};

const RightTeacherCard = ({ studentData, fromt, setfromt, froma, setfroma, upcomingClass, language, price }) => {
    // console.log("ssq", studentData);
    console.log(froma, fromt)
    const navigate = useNavigate();

    const handleMsgTeacher = () => {
        navigate("/student/messages")
        setfromt(false)
    }

    const handleMsgAdmin = () => {
        navigate("/student/messages")
        setfroma(false)
    }

    console.log(upcomingClass);
    return (
        <div
            style={{ width: "20%", position: "absolute", top: "0", right: "25px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: "20px",
                    margin: "10px",
                    width: "20vw",
                    minHeight: "97vh",
                    backgroundColor: "rgba(158, 205, 230, 0.15)",
                    position: "fixed",
                }}>
                <div
                    style={{
                        width: "85%",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <div className={styles.msgBadgeDiv} onClick={() => handleMsgTeacher()}>
                        <div className={styles.redNotificationDot} style={{ display: fromt ? "flex" : "none" }}></div>
                        <i class="far fa-comment fa-2x"></i>
                    </div>
                    <div className={styles.notificationsBadgeDiv} onClick={() => handleMsgAdmin()}>
                        <div className={styles.redNotificationDot} style={{ display: froma ? "flex" : "none" }}></div>
                        <img src={notification} alt="notification_img" style={{ width: '35px' }} />
                    </div>
                </div>

                <div style={{ width: "85%" }}>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        {studentData ? (
                            <img
                                src={studentData && studentData?.data?.profilePic?.data ? studentData?.data?.profilePic?.data : avatar}
                                alt='student'
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                    border: "3px solid grey",
                                }}
                            />
                        ) : (
                            <i
                                class='fas fa-user-circle fa-9x'
                                style={{
                                    opacity: "0.2",
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "50%",
                                }}></i>
                        )}
                    </div>

                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            fontSize: "20px",
                        }}>
                        {`Welcome ${studentData?.data?.firstName
                            ? studentData?.data?.firstName : " " + studentData?.data?.lastName ? studentData?.data?.lastName
                                : ""
                            } `}

                    </div>

                    <div
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "24px",
                            marginBottom: "20px",
                        }}>
                        Upcoming Class
                    </div>

                    <div
                        style={{
                            padding: "20px 0",
                            marginBottom: "20px",
                            color: "#fff",
                            backgroundColor: "#FD879F",
                            width: "100%",
                            borderRadius: "20px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '350px',
                        }}>
                        {upcomingClass ? (
                            <>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        fontSize: "26px",
                                    }}>
                                    {language}
                                </div>
                                <div
                                    style={{
                                        backgroundColor: "#fff",
                                        height: "2px",
                                        margin: "20px 20px 30px 20px",
                                    }}></div>
                                <div style={{ width: "80%", margin: "0 auto" }}>
                                    <div
                                        style={{
                                            marginBottom: "30px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                        <i className={styles.studentCardIcons + " far fa-calendar"}></i>
                                        {moment(upcomingClass?.from).format("DD MMMM, YYYY")}
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "30px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                        <i className={styles.studentCardIcons + " far fa-clock"}></i>
                                        {moment(upcomingClass?.from).format("hh:mm A")}
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "30px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                        <i
                                            className={
                                                styles.studentCardIcons + " fas fa-circle-notch"
                                            }></i>
                                        {moment(upcomingClass?.to).diff(moment(upcomingClass?.from), 'minutes')} Minutes
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "30px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}>
                                        <i
                                            className={
                                                styles.studentCardIcons + " fas fa-dollar-sign"
                                            }></i>
                                        {price}
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            padding: "10px 25px",
                                            borderRadius: "5px",
                                            backgroundColor: "#FF0000",
                                        }}>
                                        Join Class
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ fontSize: '20px', margin: '0 auto', padding: '20px' }}>
                                No meetings to show
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

const MobileUpcomingCard = ({ upcomingClass, language, price }) => {
    return (
        <div
            style={{
                color: "#fff",
                marginTop: "20px",
                backgroundColor: "#FD879F",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
            }}>
            {upcomingClass ? (
                <>
                    <div
                        style={{
                            marginRight: "10px",
                            borderRight: "2px solid #fff",
                            display: "flex",
                            alignItems: "center",
                        }}>
                        <div style={{ transform: "rotate(270deg)" }}>{language}</div>
                    </div>
                    <div style={{ fontSize: "16px", padding: "10px 0 0 0" }}>
                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                            <i className={styles.studentCardIcons + " far fa-calendar"}></i>
                            <span style={{ fontSize: "16px" }}>{moment(upcomingClass?.from).format("DD MMMM, YYYY")}</span>
                        </div>
                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                            <i className={styles.studentCardIcons + " far fa-clock"}></i>
                            {moment(upcomingClass?.from).format("HH:MM A")}
                        </div>
                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                            <i className={styles.studentCardIcons + " fas fa-circle-notch"}></i>
                            {moment(upcomingClass?.to).diff(moment(upcomingClass?.from), 'minutes')} Minutes
                        </div>
                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                            }}>
                            <i className={styles.studentCardIcons + " fas fa-dollar-sign"}></i>
                            $ {price}
                        </div>
                    </div>
                    <div style={{ alignSelf: "flex-end", padding: "0 10px 10px 0" }}>
                        <div
                            style={{
                                textAlign: "center",
                                backgroundColor: "#ED224C",
                                borderRadius: "20px",
                                padding: "5px 10px",
                            }}>
                            Join Class
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ fontSize: '20px', margin: '0 auto', padding: '20px' }}>
                    No meetings to show
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
