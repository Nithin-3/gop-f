import React from "react";
import { useDispatch } from "react-redux";
import CouponCard from "../../../teacher/coupons/CouponCard/CouponCard";
import moment from "moment";
import { getTeacherDetailByTId } from "../../../../../store/actions/teacher";

function Coupons(props) {
  const { width, coupons } = props;

  const dispatch = useDispatch()
  const [teacherName, setTeacherName] = React.useState()
  // const [coupon, setCoupon] = React.useState()
  React.useEffect(() => {
    async function fetchTeacher() {
      if (coupons && coupons.length > 0 && coupons[0].generatedBy) {
        try {
          const teacher = await dispatch(getTeacherDetailByTId(coupons[0].generatedBy));
          if (teacher?.firstName?.data) {
            setTeacherName(teacher.firstName.data);
          }
        } catch (error) {
          console.error("fetchTeacher in Coupons error:", error);
        }
      }
    }
    fetchTeacher();
  }, [coupons, dispatch]);
  return (
    <div
      style={{
        marginTop: "10px",
        borderRadius: "10px",
        width: width >= 992 ? "100%" : "90%",
        backgroundColor: "#fefeff",
        padding: "10px 20px",
      }}>
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Coupons</div>
      <div
        style={{
          display: "flex",
          // overflow: "auto",
          paddingBottom: "10px",
          gap: "15px",
        }}>
        {!Array.isArray(coupons) || coupons.length === 0 ? (
          <p>No Coupons</p>
        ) : (
          coupons.map((coupon, index) => {
            return (
              <CouponCard
                key={index}
                CourseName={coupon.couponCode}
                teacherName={teacherName}
                expDate={moment(coupon.validTill).format("MMMM DD, YYYY")}
                price={coupon.discountAmt}
                height="155px"
                width="330px"
                margin="0"
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Coupons;
