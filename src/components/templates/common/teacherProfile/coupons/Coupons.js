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
  React.useEffect(async () => {
    try {
      const teacher = await dispatch(getTeacherDetailByTId(coupons[0].generatedBy));

      setTeacherName(teacher.firstName.data)
    } catch (error) {
      console.error(error);
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
            );

          })
        )}
      </div>
    </div>
  );
}

export default Coupons;
