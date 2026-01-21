import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./payment.css";
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
  const [availabilities, setAvailabilities] = useState(state.availability || []);
  const couponDetails = state.couponDetails || null;

  const couponDiscountPercentage = couponDetails?.discountAmt || 0;
  const couponDiscountAmt = couponDiscountPercentage / 100;

  const profile = JSON.parse(localStorage.getItem("profile")) || {};
  const chosenEvent = JSON.parse(localStorage.getItem("chosenEvent")) || {};
  const course = JSON.parse(localStorage.getItem("chosenCourse")) || {};
  const studentData = JSON.parse(localStorage.getItem("studentData")) || {};
  const rescheduleObj = JSON.parse(localStorage.getItem("rescheduleObj")) || null;


  const [slotStart] = useState(new Date(chosenEvent.start));
  const [slotEnd] = useState(new Date(chosenEvent.end));
  const diffMin = Math.ceil(Math.abs(slotEnd - slotStart) / (1000 * 60));

  const [slotToBookStart] = useState(diffMin === 30 ? slotStart : null);
  const [slotToBookEnd] = useState(diffMin === 30 ? slotEnd : null);

  const [selectedPlan, setSelectedPlan] = useState({});
  const platformFeesPercentage = 8;
  const platformFeesAmt = platformFeesPercentage / 100;

  // Calculate amounts with more safety
  const basePrice = selectedPlan?.itemPrice || 0;
  const platformFees = Number((basePrice * platformFeesAmt).toFixed(2));
  const couponDiscountPrice = Number((basePrice * couponDiscountAmt).toFixed(2));
  const totalAmount = Number((basePrice + platformFees - couponDiscountPrice).toFixed(2));

  let lessonPrices = [];
  if (trail) {
    lessonPrices = [{ number: "30 Minute Trial Lesson", itemPrice: 0, actual: "₹ 0/hrs" }];
  } else if (rescheduleObj) {
    lessonPrices = [{ number: "1 Lesson", itemPrice: 0, actual: "₹ 0/hrs" }];
  } else if (course.price1?.data && course.price2?.data) {
    lessonPrices = [
      { ...course, number: "1 Lesson", itemPrice: course.price.data, actual: `₹${course.price.data}/hr` },
      { ...course, number: "5 Lessons", itemPrice: course.price1.data, actual: `₹${course.price1.data}/hr` },
      { ...course, number: "10 Lessons", itemPrice: course.price2.data, actual: `₹${course.price2.data}/hr` },
    ];
  } else if (course.price1?.data) {
    lessonPrices = [
      { ...course, number: "1 Lesson", itemPrice: course.price.data, actual: `₹${course.price.data}/hr` },
      { ...course, number: "5 Lessons", itemPrice: course.price1.data, actual: `₹${course.price1.data}/hr` },
    ];
  } else {
    lessonPrices = [{ ...course, number: "Course Price", itemPrice: course.price.data, actual: `₹${course.price.data}/hr` }];
  }

  const obj = `${convertHours(slotStart.getHours(), slotStart.getMinutes())} to ${convertHours(addMinutes(slotStart, 30).getHours(), addMinutes(slotStart, 30).getMinutes())}`;
  const [lesson, setLesson] = useState(obj);

  useEffect(() => {
    if (trail) setLesson("30 Minute Trial Lesson");
    else if (rescheduleObj) setLesson("1 Lesson");
  }, [trail, rescheduleObj]);



  useEffect(() => {
    async function pay() {
      if (!teacherData?._id || !course?._id) return;

      try {
        document.getElementById("loader").style.display = "flex";
        // Passing teacherId and courseId to fetch their availability/initialize payment
        const result = await dispatch(makePayment({
          teacherId: teacherData._id,
          courseId: course._id
        }));
        document.getElementById("loader").style.display = "none";

        if (result?.success && Array.isArray(result.data)) {
          // Sort availabilities by date to ensure findIndex(next) works correctly
          const sortedAvails = [...result.data].sort((a, b) => new Date(a.from) - new Date(b.from));
          setAvailabilities(sortedAvails);

        }
      } catch (e) {
        console.error("Payment initialization failed:", e);
        document.getElementById("loader").style.display = "none";
      }
    }
    pay();
  }, [dispatch, teacherData?._id, course?._id]);

  async function displayRazorpay() {
    if (!selectedPlan?.number && !trail && !rescheduleObj) {
      return toast.warning("Please select a lesson plan first");
    }

    // IF total is 0 (Free Trial or Reschedule), skip Razorpay
    if (totalAmount <= 0) {
      return handleCheckout(null);
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) return toast.error("Razorpay SDK failed to load. Are you online?");

    const options = {
      key: "rzp_test_NFQu7j9qsd4IfM",
      currency: "INR",
      amount: (totalAmount * 100).toFixed(0), // Amount in paise/cents
      name: selectedPlan.number || "Lesson Booking",
      description: "Secure payment for your session",
      image: "https://gop.com/logo.png", // Use a real logo or placeholder
      handler: async function (response) {
        const paymentData = {
          courseId: course?._id,
          studentId: studentData?.data?.userId || studentData?._id,
          teacherId: teacherData?._id,
          itemPrice: basePrice,
          platformFees: platformFees,
          total: basePrice + platformFees,
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

        try {
          if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";
          const paidData = await dispatch(addPayment(paymentData));
          if (paidData?.success) {
            handleCheckout(paidData?.data?._id);
          } else {
            if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
            toast.error("Payment registration failed. Please contact support.");
          }
        } catch (error) {
          if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
          console.error("Add payment error:", error);
          toast.error("A system error occurred after payment.");
        }
      },
      prefill: {
        name: profile?.fullName,
        email: profile?.email,
        contact: studentData?.data?.mobileNumber,
      },
      theme: {
        color: "#fe1848",
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleCheckout = async (bookedPaymentId) => {
    if (document.getElementById("loader")) document.getElementById("loader").style.display = "flex";
    let body = {
      courseId: course._id,
      studentId: studentData?.data?.userId,
      teacherId: course.userId.onType._id,
      type: lesson.split(" ")[0],
      from: chosenEvent.start,
      to: chosenEvent.end,
      isFree: trail,
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
        if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
        if (result.success) {
          toast.success("Session booked successfully");
          localStorage.removeItem('rescheduleObj');
          localStorage.removeItem('chosenCourse');
          navigate("/student/dashboard");
        } else toast.error(result.message);
      } catch (e) {
        if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
        console.error("Reschedule failed:", e);
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
        if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
        if (result.success) {
          toast.success("Session booked successfully");
          navigate("/find-teacher");
        } else toast.error(result.message);
      } catch (e) {
        if (document.getElementById("loader")) document.getElementById("loader").style.display = "none";
        console.error("Booking failed:", e);
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
    <div className='parent-container' style={{ background: '#f8f9fa' }}>
      <Navigation />

      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: width > 992 ? '1.5fr 1fr' : '1fr', gap: '40px' }}>

          {/* Left Column: Details & Plan Selection */}
          <div>
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '25px', color: '#333' }}>Checkout Summary</h2>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px', padding: '20px', background: '#fff5f6', borderRadius: '15px' }}>
                <img
                  src={teacherData?.teacherProfilePic?.data}
                  alt="Teacher"
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                />
                <div>
                  <h4 style={{ margin: 0, fontWeight: '700', fontSize: '1.2rem' }}>{teacherData?.firstName?.data} {teacherData?.lastName?.data}</h4>
                  <p style={{ margin: '5px 0 0', color: '#fe1848', fontWeight: '600' }}>{course?.title?.data || "Expert Instruction"}</p>
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h5 style={{ fontWeight: '700', marginBottom: '15px' }}>Schedule</h5>
                <div style={{ padding: '15px', background: '#f9f9f9', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="far fa-calendar-alt" style={{ color: '#fe1848' }}></i>
                    <span style={{ fontWeight: '500' }}>{slotStart.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="far fa-clock" style={{ color: '#fe1848' }}></i>
                    <span style={{ fontWeight: '500' }}>{convertHours(slotStart.getHours(), slotStart.getMinutes())} - {convertHours(slotEnd.getHours(), slotEnd.getMinutes())}</span>
                  </div>
                </div>
              </div>

              {!trail && !rescheduleObj && (
                <div>
                  <h5 style={{ fontWeight: '700', marginBottom: '15px' }}>Select Lesson Package</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {lessonPrices.map((plan, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setLesson(plan.number);
                        }}
                        style={{
                          padding: '20px',
                          borderRadius: '15px',
                          border: selectedPlan?.number === plan.number ? '2px solid #fe1848' : '2px solid #eee',
                          background: selectedPlan?.number === plan.number ? '#fff5f6' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div>
                          <p style={{ margin: 0, fontWeight: '700', fontSize: '1.1rem' }}>{plan.number}</p>
                          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{plan.actual}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontWeight: '800', fontSize: '1.2rem', color: '#fe1848' }}>₹{plan.itemPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(trail || rescheduleObj) && (
                <div style={{ padding: '20px', borderRadius: '15px', background: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className="fas fa-check-circle" style={{ fontSize: '1.5rem' }}></i>
                  <span style={{ fontWeight: '600' }}>
                    {trail ? "Your 30-minute free trial session is ready!" : "Rescheduling your balance session."}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Pay */}
          <div style={{ position: width > 992 ? 'sticky' : 'static', top: '120px', height: 'fit-content' }}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px' }}>Order Total</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                  <span>Price ({selectedPlan.number || (trail ? "Trial" : "Reschedule")})</span>
                  <span style={{ fontWeight: '600', color: '#333' }}>₹{basePrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                  <span>Platform Fee (8%)</span>
                  <span style={{ fontWeight: '600', color: '#333' }}>₹{platformFees}</span>
                </div>
                {couponDiscountPercentage > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2e7d32', fontWeight: '600' }}>
                    <span>Discount ({couponDiscountPercentage}%)</span>
                    <span>-₹{couponDiscountPrice}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>Total Amount</span>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fe1848' }}>₹{totalAmount}</span>
              </div>

              <button
                onClick={displayRazorpay}
                disabled={!trail && !rescheduleObj && !selectedPlan.number}
                style={{
                  width: '100%',
                  padding: '18px',
                  borderRadius: '15px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #fe1848 0%, #ff4b2b 100%)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: (trail || rescheduleObj || selectedPlan.number) ? 'pointer' : 'not-allowed',
                  boxShadow: '0 10px 20px rgba(254, 24, 72, 0.3)',
                  transition: 'transform 0.2s',
                  opacity: (trail || rescheduleObj || selectedPlan.number) ? 1 : 0.6
                }}
                onMouseOver={e => { if (trail || rescheduleObj || selectedPlan.number) e.target.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.target.style.transform = 'translateY(0)' }}
              >
                {totalAmount > 0 ? "PAY SECURELY" : (trail ? "BOOK FREE TRIAL" : "CONFIRM BOOKING")}
              </button>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <img src={razorpayLogo} alt="Powered by Razorpay" style={{ height: '20px', opacity: 0.6 }} />
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#888', fontSize: '0.85rem', padding: '0 10px' }}>
              <i className="fas fa-lock"></i>
              <span>Payments are secure and encrypted. Session info will be shared with the teacher.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Payment;
