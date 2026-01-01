import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./payment.css";
import student from "../../../../assets/icons/student_man_icon.svg";
import razorpayLogo from "../../../../assets/icons/razorpayLogo.svg";
import { useDispatch } from "react-redux";
import { useWindowDimensions } from "../../../../utils/util";
import { bookSlot, reSchedule, makePayment } from "../../../../store/actions/student";
import { addPayment } from "../../../../store/actions/payment/Payment";
import { toast } from "react-toastify";
import Navigation from "../../../../landing/components/Nav";

// function to load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const state = location.state || {};
  const trail = state.trail || false;
  const teacherData = state.teacherData || null;
  const availabilities = state.availability || [];
  const couponDetails = state.couponDetails || null;

  const couponDiscountPercentage = couponDetails?.discountAmt || 0;
  const couponDiscountAmt = couponDiscountPercentage / 100;

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const chosenEvent = JSON.parse(localStorage.getItem("chosenEvent")) || {};
  const course = JSON.parse(localStorage.getItem("chosenCourse")) || {};
  const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
  const rescheduleObj = JSON.parse(localStorage.getItem("rescheduleObj")) || null;

  const monthArr = [
    "January","February","March","April","May","June","July",
    "August","September","October","November","December",
  ];

  const [slotStart, setSlotStart] = useState(new Date(chosenEvent.start));
  const [slotEnd, setSlotEnd] = useState(new Date(chosenEvent.end));
  const diffMin = Math.ceil(Math.abs(slotEnd - slotStart) / (1000 * 60));

  const [slotToBookStart, setSlotToBookStart] = useState(diffMin === 30 ? slotStart : null);
  const [slotToBookEnd, setSlotToBookEnd] = useState(diffMin === 30 ? slotEnd : null);

  const [selectedPlan, setSelectedPlan] = useState({});
  const platformFeesPercentage = 8;
  const platformFeesAmt = platformFeesPercentage / 100;
  const platformFees = selectedPlan?.itemPrice ? Number(selectedPlan.itemPrice * platformFeesAmt) : 0;
  const couponDiscountPrice = selectedPlan?.itemPrice ? Number(selectedPlan.itemPrice * couponDiscountAmt).toFixed(2) : 0;
  const totalAmount = selectedPlan?.itemPrice ? Number(selectedPlan.itemPrice + platformFees - couponDiscountPrice).toFixed(2) : 0;

  let lessonPrices = [];
  if (trail) {
    lessonPrices = [{ number: "30 Minute Trial Lesson", itemPrice: 0, actual: "$ 0/hrs" }];
  } else if (rescheduleObj) {
    lessonPrices = [{ number: "1 Lesson", itemPrice: 0, actual: "$ 0/hrs" }];
  } else if (course.price1?.data && course.price2?.data) {
    lessonPrices = [
      { ...course, number: "1 Lesson", itemPrice: course.price.data, actual: `$${course.price.data}/hr` },
      { ...course, number: "5 Lessons", itemPrice: course.price1.data, actual: `$${course.price1.data}/hr` },
      { ...course, number: "10 Lessons", itemPrice: course.price2.data, actual: `$${course.price2.data}/hr` },
    ];
  } else if (course.price1?.data) {
    lessonPrices = [
      { ...course, number: "1 Lesson", itemPrice: course.price.data, actual: `$${course.price.data}/hr` },
      { ...course, number: "5 Lessons", itemPrice: course.price1.data, actual: `$${course.price1.data}/hr` },
    ];
  } else {
    lessonPrices = [{ ...course, number: "Course Price", itemPrice: course.price.data, actual: `$${course.price.data}/hr` }];
  }

  const obj = `${convertHours(slotStart.getHours(), slotStart.getMinutes())} to ${convertHours(addMinutes(slotStart, 30).getHours(), addMinutes(slotStart, 30).getMinutes())}`;
  const [lesson, setLesson] = useState(obj);

  const [data, setData] = useState();

  useEffect(() => {
    async function pay() {
      try {
        document.getElementById("loader").style.display = "flex";
        const result = await dispatch(makePayment());
        document.getElementById("loader").style.display = "none";
        setData(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    pay();
  }, [dispatch]);

  async function displayRazorpay() {
    if (!selectedPlan.number) return;

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) return toast.error("Razorpay SDK failed to load. Are you online?");

    const options = {
      key: "rzp_test_NFQu7j9qsd4IfM",
      currency: "USD",
      amount: (totalAmount * 100).toFixed(2),
      name: selectedPlan.number,
      description: "Thank you for choosing us",
      image: "http://localhost:1337/logo.svg",
      handler: async function (response) {
        const paymentData = {
          courseId: course?._id,
          studentId: studentData?.data?.userId,
          teacherId: teacherData?._id,
          itemPrice: selectedPlan.itemPrice,
          platformFees: platformFees,
          total: selectedPlan.itemPrice + platformFees,
          razorpay_payment_id: response?.razorpay_payment_id,
          razorpay_order_id: response?.razorpay_order_id,
          razorpay_signature: response?.razorpay_signature,
        };

        if (couponDetails) {
          paymentData.couponUsed = couponDetails.id;
          paymentData.totalAfterDiscount = totalAmount;
          paymentData.couponDiscount = couponDetails?.discountAmt;
          paymentData.couponName = couponDetails?.couponCode;
        }

        const paidData = await dispatch(addPayment(paymentData));
        const paymentId = paidData?.paymentData._id;
        handleCheckout(paymentId);
      },
      prefill: {
        name: profile?.fullName,
        email: profile?.email,
        contact: studentData?.data?.mobileNumber,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleCheckout = async (bookedPaymentId) => {
    let body = {
      courseId: course._id,
      studentId: studentData?.data?.userId,
      teacherId: course.userId.onType._id,
      type: lesson.split(" ")[0],
      from: chosenEvent.start,
      to: chosenEvent.end,
    };

    if (bookedPaymentId) body.paymentId = bookedPaymentId;

    if (rescheduleObj) {
      let arr = [chosenEvent.id];
      if (lesson === "1 Lesson") {
        const index = availabilities.findIndex(el => el.id === chosenEvent.id);
        if (index !== -1 && availabilities[index + 1]) arr.push(availabilities[index + 1].id);
      }
      body.availabilityIds = arr;
      body.session = rescheduleObj;
      try {
        const result = await dispatch(reSchedule(body));
        if (result.success) {
          toast.success("Session booked successfully");
          localStorage.removeItem('rescheduleObj');
          localStorage.removeItem('chosenCourse');
          navigate("/student/dashboard");
        } else toast.error(result.message);
      } catch (e) {
        toast.error("Failed to book slot");
      }
    } else {
      let arr = [chosenEvent.id];
      if (lesson === "1 Lesson") {
        const index = availabilities.findIndex(el => el.id === chosenEvent.id);
        if (index !== -1 && availabilities[index + 1]) arr.push(availabilities[index + 1].id);
      }
      body.availabilityIds = arr;

      try {
        const result = await dispatch(bookSlot(body));
        if (result.success) {
          toast.success("Session booked successfully");
          navigate("/find-teacher");
        } else toast.error(result.message);
      } catch (e) {
        toast.error("Failed to book slot");
      }
    }
  };

  function convertHours(h, m) {
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    m = m.toString().padStart(2, "0");
    return `${h}:${m} ${ampm}`;
  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  return (
    <div className='parent-container' style={{ paddingTop: "100px" }}>
      <Navigation />
      {/* Your JSX remains exactly same as before */}
      {/* ... */}
    </div>
  );
}

export default Payment;
