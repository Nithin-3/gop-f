import React, { useEffect } from "react";
import { getTeacherTodayEarnings } from "../../../../../store/actions/teacher";
import { useWindowDimensions } from "../../../../../utils/util";
import WithDrawModal from "../Modals/WithDrawModal";
import styles from "../styles.module.css";

const YourEarnings = ({ pending }) => {
  const [teacherEarnings, setTeacherEarnings] = React.useState();

  const getEarnings = async () => {
    const data = await getTeacherTodayEarnings();
    if (data?.success) setTeacherEarnings(data.data);
  };

  useEffect(() => {
    getEarnings();
  }, []);

  return (
    <div className={styles.myEarnings}>
      <div className={styles.secondRowHeadings}>My Earnings</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          height: "100%",
          borderTop: "1px solid #359DD6",
          backgroundColor: "#9ECDE6",
        }}>
        <div
          style={{
            padding: "10px 0",
            width: "50%",
            borderRight: "1px solid #359DD6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}>
          <div style={{ display: "inline-block" }}>
            <p
              style={{
                marginBottom: "10px",
                color: "black",
                fontSize: "20px",
              }}>
              Today Earning
            </p>
            <p style={{ textAlign: "center" }}>$ {teacherEarnings}</p>
          </div>
        </div>
        <div
          style={{
            padding: "10px 0",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}>
          <div style={{ display: "inline-block" }}>
            <p
              style={{
                marginBottom: "10px",
                color: "black",
                fontSize: "20px",
              }}>
              Pending
            </p>
            <p style={{ textAlign: "center" }}>$ {pending}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#FC879E",
          borderRadius: "0 0 20px 20px",
          textAlign: "center",
          padding: "10px 0",
        }}>
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#359DD6",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px 20px",
          }}>
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default YourEarnings;

// const YourEarnings = () => {
//   const { width } = useWindowDimensions();
//   const [editModal, setEditModal] = React.useState(false);
//   return (
//     <>
//       {editModal ? (
//         <WithDrawModal setEditModal={setEditModal} width={width} />
//       ) : (
//         <></>
//       )}
//       <div className={styles.section_your_earnings}>
//         <div className={styles.section_your_earnings_header}>
//           <h1>Your Earnings</h1>
//         </div>

//         <div className={styles.earning_body}>
//           <div className={styles.earning_title}>
//             <p>Today Earnings</p>
//             <p className={styles.earnings_value}>$1000</p>
//           </div>

//           <div className={styles.earning_title}>
//             <p>Pending</p>
//             <p className={styles.earnings_value}>$60</p>
//           </div>

//           <div className={styles.earning_title}>
//             <p>In Review</p>
//             <p className={styles.earnings_value}>$50</p>
//           </div>
//         </div>

//         <div className={styles.earning_footer}>
//           <div className={styles.available_funds}>
//             <p>Available</p>
//             <p className={styles.earnings_value}>$150</p>
//           </div>
//           <div>
//             <button className={styles.btn} onClick={() => setEditModal(true)}>
//               Withdraw
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
