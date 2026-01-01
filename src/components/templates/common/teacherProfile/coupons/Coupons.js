import React from "react";
import { useDispatch } from "react-redux";
import CouponCard from "../../../teacher/coupons/CouponCard/CouponCard";
import CouponButton from "./CouponButton";
import moment from "moment";
import { getTeacherDetailByTId } from "../../../../../store/actions/teacher";

function Coupons(props) {
  const { width, coupons, handleSelectCoupon, selectedCoupon } = props;
  
  const dispatch = useDispatch()
  const [teacherName, setTeacherName] = React.useState()
  // const [coupon, setCoupon] = React.useState()
  React.useEffect(async () => {
    console.log("working")
    console.log(coupons[0]?.generatedBy, "coupons")
    try {
      const teacher = await dispatch(getTeacherDetailByTId(coupons[0].generatedBy));
      console.log(teacher)
      setTeacherName(teacher.firstName.data)
    } catch (error) {
      console.log(error);
    }
  }, [coupons]);
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
        {coupons && coupons.length === 0 ? (
          <p>No Coupons</p>
        ) : (
          coupons.map((coupon) => {
            return (
              <CouponCard
                CourseName={coupon.couponCode}
                teacherName={teacherName}
                expDate={moment(coupon.validTill).format("MMMM DD, YYYY")}
                price={coupon.discountAmt}
                height="155px"
                width="330px"
                margin="0"
              />
              // <CouponButton
              //   coupon={coupon}
              //   handleSelectCoupon={handleSelectCoupon}
              //   selectedCoupon={selectedCoupon}
              // />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Coupons;
