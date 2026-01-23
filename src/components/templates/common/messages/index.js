import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from "moment"
import { SocketContext } from '../../../../context/socketContext';
import styles from "./styles.module.css";
import { useWindowDimensions } from "../../../../utils/util";
import { getConversations } from '../../../../store/actions/conversations';
import { getUser } from '../../../../store/actions/user/userAction';
import { addMessage, getMessages } from '../../../../store/actions/messages';
import { getTeacherDetailById } from '../../../../store/actions/teacher/index';
import { getStudentDetailById } from "../../../../store/actions/student/index"

//Pictures
import staticpic from "../../../../assets/icon/user.png"
import send from "../../../../assets/icon/icons8-send-32.png"
import search from "../../../../assets/icon/search-icon.svg"
import pinIcon from "../../../../assets/icon/pinIcon.png"
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const Messages = () => {
  const adminId = "6220e5b15e6e8a82aff9a0b9"
  const location = useLocation()
  const socket = useContext(SocketContext);
  const [profilePic, setProfilePic] = useState(null)
  const [currUserId, setCurrUserId] = useState();
  const [conversations, setConversations] = useState();
  const [newMsg, setNewMsg] = useState("")
  const [othersDetails, setOthersDetails] = useState(null);
  const [currentChat] = useState(null);

  const [messages, setMessages] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userRole, setUserRole] = useState("")
  const [chatMobileClick, setChatMobileClick] = useState(false)
  const { width } = useWindowDimensions();
  const scrollRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    socket?.on("getMessage", (data) => {

      setArrivalMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // Fetching Current User Id
  useEffect(() => {
    let userProfile = JSON.parse(window.localStorage.getItem("profile"));
    socket?.on("getUsers", users => {
    })
    setCurrUserId(userProfile?._id)
    setUserRole(userProfile?.roleModel)
  }, [])

  // Fetching Conversations
  useEffect(() => {
    async function getConvs() {
      try {
        const res = await dispatch(getConversations(currUserId));
        if (res && Array.isArray(res)) {
          const sorted = [...res].sort((a, b) => {
            const aHasAdmin = a.members.includes(adminId);
            const bHasAdmin = b.members.includes(adminId);
            if (aHasAdmin && !bHasAdmin) return -1;
            if (!aHasAdmin && bHasAdmin) return 1;
            return 0;
          });
          setConversations(sorted);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (currUserId) getConvs();
  }, [currUserId, dispatch, adminId]);

  // Fetching Messages
  useEffect(() => {
    async function getMsgs() {
      try {
        const res = await dispatch(getMessages(currentChat?._id));
        // console.log(res)
        setMessages(res)
      } catch (err) {
        console.error(err)
      }
    }
    getMsgs();
  }, [currentChat])

  // Getting Profile pictures of Current Chat
  useEffect(() => {
    async function getTPP() {
      try {
        const res = await dispatch(getTeacherDetailById(othersDetails?._id))
        // console.log(res[0].teacherProfilePic?.data)
        setProfilePic(res[0].teacherProfilePic?.data)
      } catch (err) {
        console.error(err)
      }
    }

    async function getSPP() {
      try {
        const res = await dispatch(getStudentDetailById(othersDetails?._id))
        setProfilePic(res[0]?.profilePic.data)
      } catch (err) {
        console.error(err)
      }
    }

    if (othersDetails?.roleModel === "Student") {
      getSPP()
    } else if (othersDetails?.roleModel === "Teacher") {
      getTPP()
    } else {
      setProfilePic(null)
    }

  }, [othersDetails])

  // Handle Chat Click
  const handleChatClick = async (ch) => {
    const othersId = ch?.members.find((m) => m !== currUserId)

    try {
      const res = await dispatch(getUser(othersId));
      // console.log(res)
      setOthersDetails(res)
    } catch (err) {
      console.error(err)
    }
  }

  // Handle send Button Click
  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      senderId: currUserId,
      message: newMsg,
      conversationId: currentChat._id,
    }
    const receiverId = currentChat.members.find((m) => m !== currUserId)

    socket?.emit("sendMessage", {
      senderId: currUserId,
      receiverId,
      message: newMsg,
    })

    socket?.emit("sendNotification", {
      senderId: currUserId,
      receiverId,
      role: userRole,
    })

    try {
      const response = await dispatch(addMessage(msgObj))
      // console.log(response);
      setMessages([...messages, response])
      setNewMsg("")
    } catch (error) {
      console.error(error)
    }
  }

  //open chat directly from student current teacher 
  useEffect(() => {

    if (location.pathname === "/student/messages") {
      handleChatClick(location.state?.cchat)
    }
  }, [location])

  //Automatic scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "nearest", behaviour: "smooth" })
  }, [messages])

  let color = {
    msWrapper: userRole === "Student" ? "#FECDE6" : "#9ECDE6",
    msHead: userRole === "Student" ? "#fb698e" : "#3eaeea",
    msMsg: userRole === "Student" ? "#ff97b1" : "#3a9fd5",
    msSearch: userRole === "Student" ? "#fcb1c4" : "#76bbe0",
  }


  return (
    <>
      <main className={styles.mainSection}>
        {width >= 992 ? (
          <div className={styles.mainWrapper}>
            {/* MessageSection */}
            <div className={styles.MS_wrapper} style={{ backgroundColor: color.msWrapper }}>
              {
                currentChat ? <>
                  {/* Name of the Chat  */}
                  <div className={styles.MS_head} style={{ backgroundColor: color.msHead }}>
                    <div className={styles.MS_head_left}>
                      <img src={profilePic ? profilePic : staticpic} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#fff" }} />
                      <div className={styles.MS_studentName}>{othersDetails?.fullName}</div>
                    </div>
                    {userRole === "Admin" ?
                      <div className={styles.MS_head_right}>
                        id: {othersDetails?._id}
                      </div> : null}
                  </div>
                  <div className={userRole === "Teacher" ? styles.MS_msgs : styles.MS_msgsStudent}> {/* Doing this for scroll bar color */}
                    {messages?.map((item) => {
                      return (
                        <div ref={scrollRef} className={styles.MSG_container} style={{ alignSelf: item.senderId === currUserId ? "flex-end" : "" }}>
                          <Msg text={item.message} time={moment(item.createdAt).format("MMM DD, h:mm A")} ownMsg={item.senderId === currUserId} color={color} />
                        </div>
                      )
                    })}
                  </div>
                  <form onSubmit={(e) => sendMessage(e)} className={styles.MS_in}>
                    <input type="text" name="sendMsg" className={styles.MS_inMsg} style={{ backgroundColor: color.msSearch }} value={newMsg} placeholder="Type your message here" onChange={(e) => setNewMsg(e.target.value)} />
                    {/* <Input type="text" placeholder="Type your message here" id="inMsg"/> */}
                    <button type='submit' className={styles.MS_sendBtn} style={{ backgroundColor: color.msMsg }} >
                      <img src={send} alt="" />
                    </button>
                  </form>
                </> :
                  <>
                    <div className={styles.MS_nochat}>Open a conversation to start Chatting.</div>
                  </>
              }
            </div>

            {/* AllChats */}
            <div className={styles.AC_wrapper} style={{ backgroundColor: color.msWrapper }}>
              <div className={styles.AC_heading} style={{ backgroundColor: color.msHead }}>All Chats</div>
              <div className={styles.AC_search}>
                <input type="text" name="searchChats" placeholder='Search' className={styles.AC_searchIn} style={{ backgroundColor: color.msSearch }} />
                <img src={search} alt="" className={styles.AC_searchIcon} />
              </div>
              <div className={styles.AC_results}>
                {conversations?.map((item) => {

                  return (
                    <div onClick={() => handleChatClick(item)}>
                      <ACField conversation={item} currentUser={currUserId} color={color} adminId={adminId} />
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className={styles.mainWrapper}>


            {!chatMobileClick ? (
              /* AllChats */
              <div className={styles.AC_wrapper} style={{ backgroundColor: color.msWrapper }}>
                <div className={styles.AC_heading} style={{ backgroundColor: color.msHead }}>All Chats</div>
                <div className={styles.AC_search}>
                  <input type="text" name="searchChats" placeholder='Search' className={styles.AC_searchIn} style={{ backgroundColor: color.msSearch }} />
                  <img src={search} alt="" className={styles.AC_searchIcon} />
                </div>
                <div className={styles.AC_results}>
                  {conversations?.map((item) => {

                    return (
                      <div onClick={() => handleChatClick(item)}>
                        <ACField conversation={item} currentUser={currUserId} color={color} adminId={adminId} />
                      </div>
                    )
                  })}
                </div>
              </div>) :
              /* MessageSection */
              < div className={styles.MS_wrapper} style={{ backgroundColor: color.msWrapper }}>
                {
                  currentChat ? <>
                    {/* Name of the Chat  */}
                    <div className={styles.MS_head} style={{ backgroundColor: color.msHead }}>
                      <div className={styles.MS_head_left}>
                        <div className="MS_backbtn" onClick={() => setChatMobileClick(false)}>
                          <i class="fa-solid fa-arrow-left"></i>
                        </div>
                        <img src={profilePic ? profilePic : staticpic} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#fff" }} />
                        <div className={styles.MS_studentName}>{othersDetails?.fullName}</div>
                      </div>
                      {userRole === "Admin" ?
                        <div className={styles.MS_head_right}>
                          id: {othersDetails?._id}
                        </div> : null}
                    </div>
                    <div className={userRole === "Teacher" ? styles.MS_msgs : styles.MS_msgsStudent}> {/* Doing this for scroll bar color */}
                      {messages?.map((item) => {
                        return (
                          <div ref={scrollRef} className={styles.MSG_container} style={{ alignSelf: item.senderId === currUserId ? "flex-end" : "" }}>
                            <Msg text={item.message} time={moment(item.createdAt).format("MMM DD, h:mm A")} ownMsg={item.senderId === currUserId} color={color} />
                          </div>
                        )
                      })}
                    </div>
                    <form onSubmit={(e) => sendMessage(e)} className={styles.MS_in}>
                      <input type="text" name="sendMsg" className={styles.MS_inMsg} style={{ backgroundColor: color.msSearch }} value={newMsg} placeholder="Type your message here" onChange={(e) => setNewMsg(e.target.value)} />
                      {/* <Input type="text" placeholder="Type your message here" id="inMsg"/> */}
                      <button type='submit' className={styles.MS_sendBtn} style={{ backgroundColor: color.msMsg }} >
                        <img src={send} alt="" />
                      </button>
                    </form>
                  </> :
                    <>
                      <div className={styles.MS_nochat}>Open a conversation to start Chatting.</div>
                    </>
                }
              </div>
            }



          </div>
        )
        }

      </main>
    </>
  )
}

const Msg = ({ text, time, ownMsg, color }) => {
  return (

    <div className={styles.MSG_wrapper}>
      <div className={styles.MSG_msg} style={{ backgroundColor: ownMsg ? color.msMsg : "#fff" }}>
        {text}
      </div>
      <div className={styles.MSG_time}>
        {time}
      </div>
    </div>

  )
}

const ACField = ({ conversation, currentUser, color, adminId }) => {


  const [otherUser, setOtherUser] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const othersId = conversation.members.find((m) => m !== currentUser)

    async function getPartUser(id) {

      try {
        const res = await dispatch(getUser(id));

        setOtherUser(res)
        // setOtherName(res.fullName)
      } catch (err) {
        console.error(err)
      }
    }
    getPartUser(othersId);
  }, [conversation, currentUser])

  return (
    <>
      {currentUser !== adminId ?
        <div className={styles.AC_field} style={{ backgroundColor: color.msMsg, }}>
          {otherUser?.fullName}
          <img src={pinIcon} alt="pin" style={{ display: otherUser?.fullName === "Admin" ? "flex" : "none" }} />
        </div> : <div className={styles.AC_field} style={{ backgroundColor: otherUser?.roleModel === "Teacher" ? "#3eaeea" : "#ff97b1" }}>
          {otherUser?.fullName}
          <img src={pinIcon} alt="pin" style={{ display: otherUser?.fullName === "Admin" ? "flex" : "none" }} />
        </div>
      }
    </>

  )
}

export default Messages
