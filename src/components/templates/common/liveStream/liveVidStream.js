import React, { useState, useEffect, useContext } from 'react'
import VideoCall from './VideoCall'
import styles from "./styles.module.css"
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { generateAgoraToken } from '../../../../store/actions/agoraToken'
import { SocketContext } from '../../../../context/socketContext'

const LiveVidStream = () => {
  const socket = useContext(SocketContext)
  const [inCall, setInCall] = useState(false)
  const location = useLocation()
  const [currRole, setCurrRole] = useState()
  const [courseDetails, setCourseDetails] = React.useState()
  const [availDetails, setAvailDetails] = React.useState()
  const [teacherDetails, setTeacherDetails] = React.useState()
  const [sessionDetails, setSessionDetails] = React.useState()
  const [studentName, setStudentName] = React.useState()
  const [token, setToken] = React.useState()
  const [currUser, setCurrUser] = React.useState()
  const [isTeacherLive, setIsTeacherLive] = React.useState()
  const [refreshPage, setRefreshPage] = useState(true)
  // const [btnDisableForStudent, setBtnDisableForStudent] = React.useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("reaching here")
    socket?.on("getIsTeacherLive", (data) => {
      console.log(data)
      setIsTeacherLive(data.isTeacherLive)
    })
  }, [socket])

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("profile"))
    console.log(userProfile)
    setCurrUser(userProfile)
    // console.log(location.state?.teacherDetails)
    setTeacherDetails(location.state?.teacherDetails)
    // console.log(location.state?.availDetails)
    setAvailDetails(location.state?.availDetails)
    // console.log(location.state?.courseDetails)
    setCourseDetails(location.state?.courseDetails)
    // console.log(location.state?.role)
    setCurrRole(location.state?.role)
    // console.log(location.state?.sessionDetails)
    setSessionDetails(location.state?.sessionDetails)
    // console.log(location.state?.sessionDetails?._id, location.state?.sessionDetails?.studentId)
    // console.log(location?.state?.studentName)
    setStudentName(location?.state?.studentName)

    async function generateToken(role) {
      try {
        if (role === "Student") {
          console.log("Student")
          const token = await dispatch(generateAgoraToken(location.state?.sessionDetails?._id, "audience", location.state?.sessionDetails?.studentId))
          console.log(token.data.rtcToken)
          setToken(token.data.rtcToken)
        } else if (role === "Teacher") {
          console.log("Teacher")
          const token = await dispatch(generateAgoraToken(location.state?.sessionDetails?._id, "publisher", location.state?.sessionDetails?.teacherId))
          console.log("teacher token", token.data.rtcToken)
          setToken(token.data.rtcToken)
        } else {
          console.log("Not a Valid Role")
        }

      } catch (error) {
        console.log(error)
      }
    }

    generateToken(location.state?.role)
  }, [location])

  const classTime = moment(availDetails?.from)
  const [currentTime, setCurrentTime] = useState(moment());
  const timeLeft = moment.duration(classTime?.diff(currentTime));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currRole === "Student") {
      socket?.emit("addUser", sessionDetails?.studentId)
    } else {
      socket?.emit("addUser", sessionDetails?.teacherId)
    }
  }, [sessionDetails])


  const handleJoinCall = () => {
    if (currRole === "Teacher") {
      console.log("reaching here")
      setInCall(true)
      socket?.emit("sendTeacherIsLive", {
        senderId: sessionDetails?.teacherId,
        receiverId: sessionDetails?.studentId,
        isTeacherLive: true
      })
    } else {
      setInCall(true)
    }
  }

  console.log("is teacher Live", isTeacherLive)

  return (
    <div className={styles.joinScreen} style={{ height: "100%", width: "100%" }}>
      {inCall ?
        <>
          {currRole === "Student" ?
            <VideoCall role={currRole} setInCall={setInCall} channel={sessionDetails._id} uid={sessionDetails.studentId} token={token} courseDetails={courseDetails} />
            :
            <VideoCall role={currRole} setInCall={setInCall} channel={sessionDetails._id} uid={sessionDetails.teacherId} token={token} setisteacherlive={setIsTeacherLive} courseDetails={courseDetails} />
          }
        </>

        :
        <div className={styles.cardSection}>
          <>
            {currRole === "Student" ?
              <div className={styles.msgForStu}>
                {isTeacherLive ?
                  <div>The teacher has started the session you may join the class</div>
                  :
                  <div>Waiting for the teacher to start the class</div>
                }
              </div> : null}
          </>
          <div className={styles.joinCallWrapper}>
            <div className={styles.detailsOfCall}>
              <div className={styles.field}>
                <div className={styles.fieldName}>Course Name</div>
                <div className={styles.fieldValue}>{courseDetails?.title?.data}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldName}>{currRole === "Student" ? <span>Teacher</span> : <span>Student</span>}</div>
                <div className={styles.fieldValue}>{currRole === "Student" ? teacherDetails?.firstName?.data : studentName}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldName}>Starts At </div>
                <div className={styles.fieldValue}>{moment(availDetails?.from).format("HH:mm A, dddd")}</div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldName}>Time Left </div>
                <div className={styles.fieldValue}>{timeLeft.asSeconds() > 0 ? `⏳ ${timeLeft.hours()} H : ${timeLeft.minutes()} M : ${timeLeft.seconds()} S` : `🟢 Live`}</div>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "#51addc",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1.1rem",
                padding: "0.5rem 1rem",
                cursor: "pointer"
              }}
              disabled = {timeLeft.asSeconds() > 0 ? true : false}
              //disabled={currRole === "Student" ? !isTeacherLive : false}
              onClick={ handleJoinCall }
            >Join Call</button>
          </div>
        </div>
      }
    </div>
  )
}


export default LiveVidStream
