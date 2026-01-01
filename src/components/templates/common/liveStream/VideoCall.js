import { useEffect, useState }  from "react";
import React from 'react';
import { rtc, options } from "../../../../agoraSettings";
import AgoraRTC from "agora-rtc-sdk-ng";
import styles from "./styles.module.css"
import { Alert } from "bootstrap";
import RatingsModal from '../../student/sessions/modals/RatingsModal';

export default function VideoCall(props) {
  const { setInCall, uid, channel, token, courseDetails, role } = props;
  const [mic, setMic] = useState(false)
  const [cam, setCam] = useState(false)
  const [color, setColor] = useState()
  const [start, setStart] = useState(false)
  const [audioRating, setAudioRating] = useState(0)
  const [videoRating, setVideoRating] = useState(0)
  const [teacherRating, setTeacherRating] = useState(0)
  const [comments, setComments] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [ratingsModal, setRatingsModal] = React.useState(false);
  const { width } = props;
  useEffect(() => {
    if (role === "Student") setColor("#fcb1c4")
    else setColor("#76bbe0")
    async function startCall() {
      try {
        
        console.log("222222");
        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
        await rtc.client.join(options.appId, channel, token, uid)

        // Create an audio track from the audio captured by a microphone
        startAudio()
        // rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a video track from the video captured by a camera
        startVideo()
        // rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        // rtc.localVideoTrack.play("localVideo")

        rtc.client.on("user-published", async (user, mediaType) => {
          if (rtc.client._users.length > 1) {
            roomFull();
          }
          // Subscribe to a remote user
          await rtc.client.subscribe(user, mediaType);
          console.log("subscribe success");
          // console.log(user);

          if (mediaType === "video") {
            // Get `RemoteVideoTrack` in the `user` object.
            const remoteVideoTrack = user.videoTrack;
            console.log(remoteVideoTrack);

            remoteVideoTrack.play("remoteVideo")

          }
          if (mediaType === "audio" || mediaType === "all") {
            // Get `RemoteAudioTrack` in the `user` object.
            const remoteAudioTrack = user.audioTrack;
            // Play the audio track. Do not need to pass any DOM element
            remoteAudioTrack.play();
          }
        });

      } catch (error) {
        console.log(error)
      }
    }
    startCall()
  }, [rtc, options])

  function mute(type) {
    if (type === "audio") {
      if (mic) {
        stopAudio()
      }
      else startAudio()
    } else if (type === "video") {
      if (cam) {
        stopVideo()
      }
      else startVideo()
    }
  }

  const roomFull = () => {
    leave();
  };

  const leave = () => {
    stopVideo();
    stopAudio();
    console.log("ciamala")
    rtc.client.leave();
    if(role === "Student")
    {
      setRatingsModal(true);
    }
    else 
    {
      setInCall(false);
    }
    return false;
  };

  const stopAudio = () => {
    rtc.localAudioTrack.close();
    rtc.client.unpublish(rtc.localAudioTrack);
    setMic(false)
  };

  const stopVideo = () => {
    rtc.localVideoTrack.close();
    rtc.client.unpublish(rtc.localVideoTrack);
    setCam(false)
  };

  const startAudio = async () => {
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.client.publish(rtc.localAudioTrack);
    setMic(true)
  };

  const startVideo = async () => {
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    rtc.client.publish(rtc.localVideoTrack);
    rtc.localVideoTrack.play("localVideo");
    setCam(true)
  };
  console.log(courseDetails?.title?.data)

  return (
    <>
      {ratingsModal ?
          <RatingsModal 
            audioRating={audioRating}
            videoRating={videoRating}
            teacherRating={teacherRating}
            comments={comments}
            showComments={showComments}
            setInCall={setInCall} 
            setShowComments={setShowComments}
            setAudioRating={setAudioRating}
            setVideoRating={setVideoRating}
            setTeacherRating={setTeacherRating}
            setComments={setComments}
            setRatingsModal={setRatingsModal} 
            width={width} 
          />
          :
          <></>
      }
      <div className={styles.VCPage}>
      <div className={styles.heading} style={{backgroundColor: color}}>{courseDetails?.title?.data}</div>
      <div className={styles.vidCallPortion}>
        <div className={styles.VideoContainer}>
          <div className={styles.vidHolder}>
            <div className={styles.remoteVideo} id="remoteVideo"></div>
            <div className={styles.localVideo} id="localVideo"></div>
            <div className={styles.controlsWrapper}>
              <div className={styles.Ccontainer}>
                <div className={styles.Citem}>
                  <button style={{ backgroundColor: mic ? "#51addc" : "#ed224c", cursor: "pointer" }} onClick={() => mute("audio")}>
                    {mic ? <i class="fa-solid fa-microphone"></i> : <i class="fa-solid fa-microphone-slash"></i>}
                  </button>
                </div>
                <div className={styles.Citem}>
                  <button style={{ backgroundColor: cam ? "#51addc" : "#ed224c" }} onClick={() => mute("video")}>
                    {cam ? <i class="fa-solid fa-video"></i> : <i class="fa-solid fa-video-slash"></i>}
                  </button>
                </div>
                <div className={styles.Citem}>
                  <button style={{ backgroundColor: "#ed224c" }} onClick={() => leave()}>
                    Leave
                    <i class="fa-solid fa-right-from-bracket"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightPortion} style={{backgroundColor: color}}>
          <div className={styles.rightCard}></div>
        </div>
      </div>
    </div >
    </>
   

    // <div className={styles.vidCallWrapper} style={{height: "100%", width: "100%"}}>
    //   <div className={styles.VideoContainer}>
    //     <div className={styles.remoteVideo}></div>
    //     {start && tracks && (
    //       <Video tracks={tracks} users={users} />
    //     )}
    //   </div>
    //   <div style={{height: "10%"}}>
    //     {ready && tracks && (
    //       <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    //     )}
    //   </div>
    // </div>
    // <div style={{height: "100%", display: "flex", width: "100%", flexDirection: "column"}}>
    //   <div style={{height: "5%"}}>
    //     {ready && tracks && (
    //       <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    //     )}
    //   </div>
    //   <div style={{ height: "95%" }}>
    //     {start && tracks && (
    //       <Video tracks={tracks} users={users} />
    //     )}
    //   </div>
    // </div>
  )
}
