
import { useEffect, useState }  from "react";
import React from 'react';
import modalStyles from './styles.module.css';
import audio from '../../../../../assets/image/audio.png'
import video from '../../../../../assets/image/video.png'
import teacher from '../../../../../assets/image/p1.png'
import ReactStars from "react-rating-stars-component";
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateRatings } from '../../../../../store/actions/teacher/index';
import { toast } from "react-toastify";

const RatingsModal = (props) => {

    const { setRatingsModal, width, setAudioRating, setVideoRating,setTeacherRating,setComments,setShowComments,setInCall, comments, audioRating, videoRating,teacherRating, showComments, } = props;

    const [page, setPage] = React.useState('1');
    const [studentName, setStudentName] = React.useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [availDetails, setAvailDetails] = React.useState()
    const location = useLocation();
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const userProfile = JSON.parse(localStorage.getItem("profile"));
    //     console.log(" userProfile : ",userProfile);
    //     setStudentName(location?.state?.studentName);
    //     setAvailDetails(location.state?.availDetails)
    // }, [])


    async function submitRatings()
    {
        let sessionID = location.state?.sessionDetails?._id;
        let teacherId = location.state?.sessionDetails?.teacherId;
        let studentId = location.state?.sessionDetails?.studentId
        console.log("ocation.state?.sessionDetails : ", location.state?.sessionDetails);
        if(audioRating==0)
            setErrorMsg("Please select Audio call Ratings")
        else if(videoRating==0)
            setErrorMsg("Please select Video call Ratings")
        else    
        {   
            setErrorMsg('');
            const res = await dispatch(updateRatings(audioRating,videoRating,teacherRating,comments,sessionID, teacherId, studentId ))
            if (res.status == 200) {
                toast.success("Thank you for the");
                setInCall(false);
            }else 
            {
                setInCall(false);
            }
        }
    }
    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
            Teaches
            onClick={() => { setRatingsModal(false); setInCall(false); }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Rate Your Lesson</h3>
                    <h6 style={{textAlign:"center", color: '#fe1848'}}>{studentName} : {availDetails}</h6>
                    <div style={{ marginTop: '20px' , paddingBottom:20, borderBottom: "1px solid #9e9e9e",}}>
                        <div style={{display:'flex', justifyContent:'space-between',marginBottom: 15}}>
                            <div style={{textAlign:"center"}}>
                                <img
                                    src={audio}
                                    onClick={() => {
                                    }}
                                    style={{widows:50, height:50}}
                                    alt="audio_call"
                                />  
                                <h3>Audio Quality</h3>
                                <h5>Shared with Verbling to ensure quality</h5>
                               <div className="ratingsStyle" style={{display:"flex", justifyContent:"center"}}>
                                <ReactStars
                                        style={{justifyContent: "center"}}
                                        count={5}
                                        onChange={(newRating) =>{setAudioRating(newRating)}}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                               </div>
                            </div>
                           <div style={{textAlign:"center"}}>
                                <img
                                    src={video}
                                    onClick={() => {
                                    }}
                                    style={{widows:50, height:50}}
                                    alt="video_call"
                                    className={`iconSize`}
                                />   
                                 <h3>Video Quality</h3>
                                 <h5>Shared with Verbling to ensure quality</h5>
                                 <div className="ratingsStyle" style={{display:"flex", justifyContent:"center"}}>
                                <ReactStars
                                        style={{justifyContent: "center"}}
                                        count={5}
                                        onChange={(newRating) =>{setVideoRating(newRating)}}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                               </div>
                           </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                                <img
                                    src={teacher}
                                    onClick={() => {
                                    }}
                                    style={{widows:50, height:50}}
                                    // id={"professionalTeacher"}
                                    alt="video_call"
                                    className={`iconSize`}
                                />   
                                 <h3>Teacher Rating</h3>
                                 <h5>Anonymous, Your name will not be shown . (Required)</h5>
                                {audioRating >3 && videoRating>3 ?
                                <div className="ratingsStyle" style={{display:"flex", justifyContent:"center"}}>
                                <ReactStars
                                        style={{justifyContent: "center"}}
                                        count={5}
                                        size={24}
                                        onChange={(newRating) =>{audioRating >3 && videoRating>3 ? setTeacherRating(newRating)  :  console.log("disabled")}}
                                        color={audioRating >3 && videoRating>3 ? '#808080' : '#e1dada'}
                                        activeColor="#ffd700"
                                    />
                               </div> : <></> } 
                           </div>
                    </div>
                    <div style={{ marginTop: '20px' , paddingBottom:20, borderBottom: "1px solid #9e9e9e", textAlign:"center"}}>
                        {showComments == false ? 
                            <div onClick={()=> {setShowComments(true)}} style={{cursor:"pointer"}}>
                                <h3 style={{color:"#fe1848"}}>Leave a comment</h3>
                            </div> 
                            : 
                            <textarea
                                name="comments"
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Commets"
                                value={comments}
                                style={{ padding: '10px', width: '100%' }}
                                ></textarea>
                        }
                                
                            <h5>Public. Shared on teacher's profile with your name. (Optional)</h5>
                    </div>
                    {
                        errorMsg!='' ?
                        <p style={{textAlign:"center", color:"red", marginTop:10, fontSize:13}}> {errorMsg}</p>
                        : <></>
                    }
                    <div onClick={() => {submitRatings()}} style={{margin: '20px 0px 0px auto', width: 'fit-content', cursor: "pointer", backgroundColor: "#fe1848", color: "#fefeff", padding: "10px", borderRadius: "5px" }}>
                        Continue
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default RatingsModal;
