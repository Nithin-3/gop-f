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

const TopWidgets = ({ widgets }) => {
    const [activeTab, setActiveTab] = React.useState("Class Taken");
    return (
        <div className={styles.row}>
            {widgets.map((item, index) => (
                <div key={index} className={item.title === activeTab ? styles.firstRowTabActive : styles.firstRowTab} onClick={() => setActiveTab(item.title)} role="button" tabIndex={0}>
                    <div className={styles.widgetTitle}>{item.title}<div style={{ float: "right" }}><i className="fas fa-ellipsis-h" /></div></div>
                    <div className={styles.widgetValue}><img src={item.icon} alt="icon" style={{ width: "30px" }} /><div style={{ float: "right" }}>{item.number}</div></div>
                </div>
            ))}
        </div>
    );
};

const FeeCollection = () => (
    <div className={styles.fee}>
        <div className={styles.secondRowHeadings}>Fee Collection</div>
        <div className={styles.secondRowBody}>Some Data</div>
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
            <i className="far fa-comment fa-2x" />
            <img src={notification} alt="notification" className={styles.notification} />
        </div>
    </div>
);

function AdminDashboard({ socket }) {
    const { width } = useWindowDimensions();
    const widgets = [
        { title: "Total Students", icon: graduation_cap, number: "4586" },
        { title: "Current Students", icon: class_taken, number: "456" },
        { title: "Total Teachers", icon: verified, number: "589" },
        { title: "Current Teachers", icon: non_verified, number: "0" },
        { title: "Total Courses", icon: non_verified, number: "48" },
        { title: "Visitors", icon: non_verified, number: "0" },
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
