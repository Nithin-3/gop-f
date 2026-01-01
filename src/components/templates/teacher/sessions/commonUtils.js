import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { getCourseById } from "../../../../store/actions/course/index"
import { getAvailByAId, getAvailByTeacher } from "../../../../store/actions/availability/index"
import { getTeacherDetailByTId } from "../../../../store/actions/teacher/index"
import english from "../../../../assets/flags/english.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getStudentData, getStudentDetailById } from "../../../../store/actions/student";
import CancelModal from './modals/CancelModal';
import { cancelVideoSession } from "../../../../store/actions/student/index";

export const SubmitButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "30px",
      }}>
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px 20px",
          backgroundColor: "#5bd056",
          color: "#fffefe",
          borderRadius: "5px",
        }}>
        Submit
        <i
          class='fas fa-check-circle'
          style={{
            fontWeight: "bold",
            marginLeft: "10px",
            color: "#fffefe",
          }}></i>
      </div>
    </div>
  );
};

export const Card = (props) => {
  const { width, cardInfo, dropDown } = props;
  const [showOtherOptions, setShowOtherOptions] = React.useState(false);
  const otherOptions = React.useRef();
  const [isOpen, setIsopen] = React.useState(false);
  const dispatch = useDispatch()
  const history = useNavigate()
  const [courseDetails, setCourseDetails] = React.useState()
  const [availDetails, setAvailDetails] = React.useState()
  const [teacherDetails, setTeacherDetails] = React.useState()
  const [studentName, setStudentName] = React.useState()
  const [disableBtn, setDisableBtn] = React.useState(false);
  const [btnName, setBtnName] = React.useState("Start Class");
  const [cancelModal, setCancelModal] = React.useState(false);
  const openLiveClass = () => {
    if (disableBtn) {
      toast.error("This session time has elapsed.")
    } else {
      history({
        pathname: "/liveclass",
        state: {
          role: "Teacher",
          studentName,
          availDetails,
          courseDetails,
          sessionDetails: cardInfo,
        }
      })
    }
  }
  const handleClick = e => {
    if (otherOptions.current && !otherOptions.current.contains(e.target)) {
      setShowOtherOptions(false);
    }
  };
  window.addEventListener('mousedown', handleClick, false);

  React.useEffect(() => {
    console.log(cardInfo.status === "Need Scheduling",)
  
    async function getStudentName() {
      try {
        const student = await dispatch(getStudentDetailById(cardInfo.studentId))
        console.log(student)
        setStudentName(student[0].firstName + " " + student[0].lastName)
      } catch (error) {
        console.log(error)
      }
    }

    async function getCourseDetails(cid) {
      try {
        const res = await dispatch(getCourseById(cid))
        // console.log(res)
        setCourseDetails(res)
      } catch (error) {
        console.log(error)
      }
    }

    async function getTeacherName(tid) {
      try {
        const tname = await dispatch(getTeacherDetailByTId(tid))
        // console.log(tname)
        setTeacherDetails(tname)
      } catch (error) {
        console.log(error)
      }
    }

    async function getAvailTime(aid) {
      // console.log(tid)
      try {
        const availTime = await dispatch(getAvailByAId(aid))
         console.log(availTime)
         console.log(cardInfo);
        let classDate = moment(cardInfo?.to)
        let todayDate = moment(Date.now())
        // console.log(classDate, todayDate)
        // console.log(moment.duration(classDate.diff(Date.now())).asHours());
        // if (moment.duration(classDate.diff(Date.now())).asHours() <= 0) {
        //   setDisableBtn(true)
        // }
        if (Number(classDate) < Number(todayDate)) {
          setDisableBtn(true)
      }
        setAvailDetails(availTime)
      } catch (error) {
        console.log(error)
      }
    }
    if (cardInfo?.availabilityIds?.length > 0) {
      getAvailTime(cardInfo.availabilityIds[0])
    }
    getStudentName()
    getTeacherName(cardInfo.teacherId)
    getCourseDetails(cardInfo.courseId)
  }, [cardInfo]);
  const cancelSession = async () => {
    console.log("cancelling session");
    console.log("CourseDetails: ", courseDetails)
    console.log("availInfo: ", availDetails)
    console.log(cardInfo);
    let sessionObj = {};
    sessionObj.teacherId = cardInfo.teacherId;
    sessionObj.studentId = cardInfo.studentId;
    sessionObj.sessionId = cardInfo._id;
    if (availDetails) {
      sessionObj.availId = availDetails.id;
    } else {
      sessionObj.availId = '';
    }
    console.log(sessionObj);
    const result = await dispatch(cancelVideoSession(sessionObj));
    if (result) {
      setCancelModal(false);
      alert("Session Cancelled Successfully.")
      window.location.reload();
    }
  }

  return (
    <>
      {cancelModal ?
        <CancelModal setCancelModal={setCancelModal} width={width} cancelSession={cancelSession} availDetails={availDetails} cardInfo={cardInfo} />
        :
        <></>
      }
      <div className={styles.cardContainer}>
        <div className={styles.courseimg}>
          <img src={courseDetails ? courseDetails?.courseImage?.data : english} alt="language_flag" className={styles.cardImg} />
        </div>
        {availDetails ?
          <div className={styles.div1}>
            <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
            <div style={{ fontSize: '20px', fontWeight: "bold" }}>{availDetails ? moment(availDetails.from).format("hh:mm a") : cardInfo.time}</div>
            <div style={{ fontSize: '14px' }}>{availDetails ? moment(availDetails.from).format("dddd - MMMM DD, yyyy") : "Not Scheduled"}</div>
          </div> :
          <div className={styles.div1}>
            <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
            <div style={{ marginTop: "1rem", fontSize: '14px' }}>Not Scheduled</div>
          </div>}
        <div className={styles.div2}>
          <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>{studentName}</div>
          <div style={{ fontSize: '20px', fontWeight: "bold" }}>{courseDetails ? courseDetails.language.data : cardInfo.time}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: "0.3rem" }}>
            <i class="far fa-clock"></i>
            <div>{cardInfo.isFree?30:60} minutes</div>
          </div>
        </div>
        {/* {cardInfo.status === "Need Scheduling" ?
          <div className={styles.btncontainer}>
            <button className={styles.CancelBtn} onClick={() => {
              alert("Cancel!");
            }}
              style={{
                color: "#fffefe",
                backgroundColor: "#f83030"
              }}><span>Cancel</span> <i class='fas fa-trash'></i></button>
          </div>
          :  */}
        {cardInfo.status === "Cancelled" ?
          <div className={styles.btncontainer}>
            <button className={styles.btn} >Cancelled</button>
          </div>
          :
          <div className={styles.btncontainer}>
            <button className={styles.btn} onClick={() => openLiveClass()}>{btnName}</button>
            <div className={styles.moreOptions} ref={otherOptions}>
              <i
                className={styles.moreOptionsIcon + ' fas fa-ellipsis-h'}
                onClick={() => {
                  setShowOtherOptions(true);
                }}
              ></i>
              <ul
                className={
                  styles.otherOptions +
                  ' ' +
                  (showOtherOptions ? styles.showOptions : '')
                }
              >
                {
                  dropDown.map((item, index) => {
                    return (<li
                      onClick={() => {
                        item.modal(true);
                        // props.setSelectedCourse(props.courseData);
                        // props.openViewCourse(true);
                        // props.setViewCourseType('View');
                      }}
                    >
                      <span>{item.text}</span>
                    </li>)
                  })
                }
                <li
                  onClick={() => {
                    setCancelModal(true)
                  }}
                  style={{
                    color: "#fffefe",
                    backgroundColor: "#f83030"
                  }}
                >
                  <span>Cancel</span> <i class='fas fa-trash'></i>
                </li>

              </ul>
            </div>
          </div>
        }
        {/* } */}


        {/* <div> */}
        {/* {isOpen ? (
            <div className={styles.viewDropdown}>
              <div
                style={{
                  padding: "10px",
                  borderRadius: "10px 10px 0 0",
                  backgroundColor: "#359cd7",
                  color: "#fffefe",
                }}>
                {dropDown.map((item, index) => (
                  <div
                    className={styles.dropdownButton}
                    style={{ marginBottom: "10px" }}
                    onClick={() => {
                      item.modal(true);
                      setIsopen(false);
                    }}>
                    {item.text}
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "10px",
                  borderRadius: "0 0 10px 10px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#fffefe",
                  backgroundColor: "#f83030",
                }}
                onClick={() => {
                  alert("Cancel!");
                  setIsopen(false);
                }}>
                <div className={styles.dropdownButton}>Cancel</div>
                <i class='fas fa-trash'></i>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div> */}




        {/* {cardInfo?.availabilityIds &&
        cardInfo.availabilityIds.map((el, i) => {
          return (
            <div className={styles.cardContainer} key={i}>
              <img
                src={cardInfo?.courseId?.courseImage?.data}
                alt={cardInfo?.courseId?.title?.data}
                className={styles.cardImg}
              />
              <div>
                <h4 className={styles.cardText1}>
                  {cardInfo?.courseId?.title?.data}
                </h4>
                <div style={{ fontSize: "20px" }}>
                  {moment(el?.from).format("DD-MM-YYYY h:mm a")}
                </div>
                {cardInfo.date}
              </div>
              <div style={{ minWidth: "100px" }}>
                <h4 className={styles.cardText1}>Details</h4>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i class='far fa-clock'></i>
                  <div>{cardInfo.isFree?30:60} minutes</div>
                </div>
              </div>

              {dropDown ? (
                <div>
                  <div
                    className={styles.viewButton}
                    onClick={() => setIsopen(!isOpen)}>
                    <div>View</div>
                    {isOpen ? (
                      <i
                        style={{ marginLeft: "10px" }}
                        class='fas fa-caret-up'></i>
                    ) : (
                      <i
                        style={{ marginLeft: "10px" }}
                        class='fas fa-caret-down'></i>
                    )}
                  </div>
                  
            </div>
          );
        })} */}
      </div>
    </>
  )
}


export const CardMobile = (props) => {
  const { width, cardInfo, dropDown } = props;
  const [courseDetails, setCourseDetails] = React.useState()
  const dispatch = useDispatch()
  const [availDetails, setAvailDetails] = React.useState()
  const [cancelModal, setCancelModal] = React.useState(false);
  const [teacherDetails, setTeacherDetails] = React.useState()
  const history = useNavigate()
  const [isOpen, setIsopen] = React.useState(false);
  const [showOtherOptions, setShowOtherOptions] = React.useState(false);
  const otherOptions = React.useRef();
  const [btnName, setBtnName] = React.useState("Start Class")
  const [studentName, setStudentName] = React.useState()
  const [disableBtn, setDisableBtn] = React.useState(false);
  React.useEffect(() => {
    // console.log(cardInfo)
    console.log(cardInfo)
    if (cardInfo.status === "Need Scheduling") setBtnName("Schedule");
    async function getCourseDetails(cid) {
      try {
        const res = await dispatch(getCourseById(cid))
        // console.log(res)
        setCourseDetails(res)
      } catch (error) {
        console.log(error)
      }
    }

    async function getStudentName() {
      try {
        const student = await dispatch(getStudentDetailById(cardInfo.studentId))
        console.log(student)
        setStudentName(student[0].firstName + " " + student[0].lastName)
      } catch (error) {
        console.log(error)
      }
    }

    async function getTeacherName(tid) {
      try {
        const tname = await dispatch(getTeacherDetailByTId(tid))
        // console.log(tname)
        setTeacherDetails(tname)
      } catch (error) {
        console.log(error)
      }
    }

    async function getAvailTime(aid) {
      // console.log(tid)
      try {
          const availTime = await dispatch(getAvailByAId(aid))
          // console.log(availTime?.from)
          let classDate = moment(cardInfo?.to)
          let todayDate = moment(Date.now())
          // console.log(classDate, todayDate)
          // console.log(moment.duration(classDate.diff(Date.now())).asHours());
          // if (moment.duration(classDate.diff(Date.now())).asHours() <= 0){
          //     setDisableBtn(true)
          // }
          if (Number(classDate) < Number(todayDate)) {
            setDisableBtn(true)
        }
          setAvailDetails(availTime)
      } catch (error) {
          console.log(error)
      }
  }
    if (cardInfo?.availabilityIds?.length > 0) {
      getAvailTime(cardInfo.availabilityIds[0])
    }
    getTeacherName(cardInfo.teacherId)
    getCourseDetails(cardInfo.courseId)
    getStudentName()
  }, [cardInfo]);

  const cancelSession = async () => {
    console.log("cancelling session");
    console.log("CourseDetails: ", courseDetails)
    console.log("availInfo: ", availDetails)
    console.log(cardInfo);
    let sessionObj = {};
    sessionObj.teacherId = cardInfo.teacherId;
    sessionObj.studentId = cardInfo.studentId;
    sessionObj.sessionId = cardInfo._id;
    if (availDetails) {
      sessionObj.availId = availDetails.id;
    } else {
      sessionObj.availId = '';
    }
    console.log(sessionObj);
    const result = await dispatch(cancelVideoSession(sessionObj));
    if (result) {
      setCancelModal(false);
      alert("Session Cancelled Successfully.")
      window.location.reload();
    }
  }
  const openLiveClass = () => {
    if (disableBtn) {
      toast.error("This session time has elapsed.")
    } else {
      history({
        pathname: "/liveclass",
        state: {
          role: "Teacher",
          studentName,
          availDetails,
          courseDetails,
          sessionDetails: cardInfo,
        }
      })
    }
  }

  return (
    <>
      {cancelModal ?
        <CancelModal setCancelModal={setCancelModal} width={width} cancelSession={cancelSession} availDetails={availDetails} cardInfo={cardInfo}/>
        :
        <></>
      }
      <div className={styles.cardMobileContainer} style={{ marginBottom: "1.5rem" }}>
        {availDetails ?
          <div className={styles.div1}>
            <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
            <div style={{ fontSize: '20px', fontWeight: "bold" }}>{availDetails ? moment(availDetails.from).format("hh:mm a") : cardInfo.time}</div>
            <div style={{ fontSize: '14px' }}>{availDetails ? moment(availDetails.from).format("dddd - MMMM DD, yyyy") : "Not Scheduled"}</div>
          </div> :
          <div className={styles.div1}>
            <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc" }}>{courseDetails ? courseDetails?.title?.data : cardInfo.heading}</div>
            <div style={{ marginTop: width >= 992 ? "1rem" : "", fontSize: '14px' }}>Not Scheduled</div>
          </div>
        }
        <div style={{ fontSize: '16px', fontWeight: "bold", color: "#51addc", marginTop: width >= 992 ? "" : "1rem" }}>{studentName}</div>
        <div style={{ fontSize: '20px', fontWeight: "bold" }}>{courseDetails ? courseDetails.language.data : cardInfo.time}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: "0.3rem" }}>
          <i class="far fa-clock"></i>
          <div>{cardInfo.isFree ? 30 : 60} minutes</div>
        </div>
        {cardInfo.status === "Cancelled" ?
          <div className={styles.btncontainer}>
            <button className={styles.btn} >Cancelled</button>
          </div>
          : <div className={styles.btncontainer}>
            <button className={styles.btn} onClick={() => openLiveClass()}>{btnName}</button>
            <div className={styles.moreOptions} ref={otherOptions}>
              <i
                className={styles.moreOptionsIcon + ' fas fa-ellipsis-h'}
                onClick={() => {
                  setShowOtherOptions(true);
                }}
              ></i>
              <ul
                className={
                  styles.otherOptions +
                  ' ' +
                  (showOtherOptions ? styles.showOptions : '')
                }
              >{
                  dropDown.map((item, index) => {
                    return (<li
                      onClick={() => {
                        item.modal(true);
                        // props.setSelectedCourse(props.courseData);
                        // props.openViewCourse(true);
                        // props.setViewCourseType('View');
                      }}
                    >
                      <span>{item.text}</span>
                    </li>)
                  })
                }
                <li
                  onClick={() => {
                    setCancelModal(true)
                  }}
                  style={{
                    color: "#fffefe",
                    backgroundColor: "#f83030"
                  }}
                >
                  <span>Cancel</span> <i class='fas fa-trash'></i>
                </li>

              </ul>
            </div>
          </div>
        }
        {/* <div className={styles.btnMobileContainer} style={{ marginTop: width >= 992 ? "" : "1rem" }}>
          <button className={styles.btn} onClick={() => openLiveClass()}>Start Class</button>
          {
            dropDown.map((item, index) => {
              console.log(item)
              return (
                <button className={styles.btn}
                  onClick={() => {
                    props.setSelectedCourse(props.courseData);
                    props.openViewCourse(true);
                    props.setViewCourseType('View');
                  }}
                >
                  <div>{item.text}</div>
                </button>)
            })
          }
          <button className={styles.btn}
            style={{
              color: "#fffefe",
              backgroundColor: "#f83030"
            }}
          >
            <div>Cancel</div>
            <i class='fas fa-trash'></i>
          </button>
      </div> */}
      </div>

      {/* <div
        className={styles.cardMobileContainer}
        style={{ marginBottom: dropDown ? "" : "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={english} style={{ width: "60px", height: "60px" }} />
          <div>
            <div
              style={{
                fontSize: "20px",
                color: "#359cd7",
                fontWeight: "bold",
              }}>
              {cardInfo.course}
            </div>{" "}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#359cd7",
                  fontWeight: "bold",
                }}>
                Status
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                Verified
                {cardInfo.isVerified ? (
                  <i
                    class='fas fa-check-circle'
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      color: "#00df76",
                    }}></i>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>{cardInfo.desc}</div>
      </div>

      {dropDown ? (
        <div
          style={{
            margin: "-20px 0 20px 0",
            boxShadow: "10px 10px 20px #aaaaaa",
            borderRadius: "10px",
          }}>
          <div
            onClick={() => setIsopen(!isOpen)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderRadius: "10px",
              outline: "1px solid #ececee",
              backgroundColor: "#359cd7",
            }}>
            <div
              style={{
                borderRadius: "10px 0 0 10px",
                textAlign: "center",
                color: "#359cd7",
                backgroundColor: "#fffefe",
                padding: "10px 20px",
                width: "90%",
              }}>
              View
            </div>
            <i
              style={{
                width: "10%",
                color: "#fff",
                fontSize: "15px",
                textAlign: "center",
              }}
              class='fas fa-caret-down'></i>
          </div>
          {isOpen ? (
            <div className={styles.viewDropdown}>
              <div style={{ position: "absolute", width: "100%" }}>
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "10px 10px 0 0",
                    backgroundColor: "#359cd7",
                    color: "#fffefe",
                  }}>
                  {dropDown.map((item, index) => (
                    <div
                      className={styles.dropdownButton}
                      style={{ marginBottom: "10px" }}
                      onClick={() => {
                        item.modal(true);
                        setIsopen(false);
                      }}>
                      {item.text}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: "10px",
                    borderRadius: "0 0 10px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#fffefe",
                    backgroundColor: "#f83030",
                  }}
                  onClick={() => {
                    alert("Cancel!");
                    setIsopen(false);
                  }}>
                  <div className={styles.dropdownButton}>Cancel</div>
                  <i class='fas fa-trash'></i>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
};
