import React from "react";
import styles from "./styles.module.css";
import { useWindowDimensions } from "../../../../utils/util";
import graduation_cap from "../../../../assets/icons/graduation-cap-solid.svg";
import class_taken from "../../../../assets/icons/class_learning_from_home_education_icon.svg";
import verified from "../../../../assets/icons/check_checklist_list_mark_ok_icon.svg";
import non_verified from "../../../../assets/icons/close_circled_icon.svg";
import down_arrow from "../../../../assets/icons/down_arrow_icon.svg";
import graph_img from "../../../../assets/icons/temp_graph.png";
import notification from "../../../../assets/icons/bell_mobile ui_notification_icon.svg";

import { useDispatch } from "react-redux";
import { getAdminNumbers } from "../../../../store/actions/admin";

const TopWidgets = ({ widgets }) => {
    return (
        <div className={styles.row}>
            {widgets.map((item, index) => (
                <div key={index} className={styles.firstRowTab}>
                    <img src={item.icon} alt="icon" className={styles.widgetIcon} />
                    <div className={styles.widgetTitle}>{item.title}</div>
                    <div className={styles.widgetNumber}>{item.number}</div>
                </div>
            ))}
        </div>
    );
};

const FeeCollection = () => (
    <div className={styles.fee}>
        <div className={styles.secondRowHeadings}>Fee Collection</div>
        <div className={styles.secondRowBody}>Monthly Overview</div>
    </div>
);

const GraphCard = ({ graphOptions, graph, setGraph, width }) => (
    <div className={styles.graphCard}>
        <div className={styles.graphHeader} style={{ flexDirection: width >= 992 ? "row" : "column" }}>
            <div className={styles.graphTabs} style={{ width: width >= 992 ? "70%" : "100%" }}>
                {graphOptions.map((item, index) => (
                    <div key={index} className={item.name === graph ? styles.graphNameActive : styles.graphName} onClick={() => setGraph(item.name)} role="button" tabIndex={0}>{item.name}</div>
                ))}
            </div>
            <div className={styles.graphFilter}>Week<img src={down_arrow} alt="down arrow" style={{ width: "20px" }} /></div>
        </div>
        <div className={styles.graphBody}><img src={graph_img} alt="graph" style={{ width: "100%", height: "auto" }} /></div>
    </div>
);

const RightAdminCard = () => (
    <div className={styles.rightCard}>
        <div className={styles.rightCardContent}>
            <div style={{ marginTop: "20px" }}><i className="far fa-comment fa-2x" /></div>
            <img src={notification} alt="notification" className={styles.notification} />
            <div style={{ flex: 1 }}></div>
        </div>
    </div>
);

function AdminDashboard({ socket }) {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const [numbers, setNumbers] = React.useState({
        totalStudents: 0,
        currentStudents: 0,
        totalTeachers: 0,
        currentTeachers: 0,
        totalCourses: 0,
        visitors: 0
    });

    React.useEffect(() => {
        const fetchNumbers = async () => {
            try {
                const res = await dispatch(getAdminNumbers());
                if (res?.success) {
                    setNumbers(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch admin stats:", err);
            }
        };
        fetchNumbers();
    }, [dispatch]);

    const widgets = [
        { title: "Total Students", icon: graduation_cap, number: numbers.totalStudents },
        { title: "Current Students", icon: class_taken, number: numbers.currentStudents },
        { title: "Total Teachers", icon: verified, number: numbers.totalTeachers },
        { title: "Current Teachers", icon: verified, number: numbers.currentTeachers },
        { title: "Total Courses", icon: graduation_cap, number: numbers.totalCourses },
        { title: "Visitors", icon: notification, number: numbers.visitors },
    ];
    const graphOptions = [{ name: "Courses Impression" }, { name: "Per Session Earning" }, { name: "Top Student" }];
    const [graph, setGraph] = React.useState("Courses Impression");
    return (
        <>
            {width >= 992 ? (
                <>
                    <main className={styles.mainSection}>
                        <TopWidgets widgets={widgets} />
                        <div className={styles.row}><FeeCollection /></div>
                        <div className={styles.row}><GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} /></div>
                    </main>
                    <RightAdminCard />
                </>
            ) : (
                <main className={styles.mainSection}>
                    <div className={styles.mobileWelcome}>Welcome Admin</div>
                    <div className={styles.mobileUpcoming}>Upcoming Class</div>
                    <FeeCollection />
                    <div className={styles.row}><GraphCard graphOptions={graphOptions} graph={graph} setGraph={setGraph} width={width} /></div>
                </main>
            )}
        </>
    );
}
export default AdminDashboard;
