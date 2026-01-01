import React from 'react';
import { useDispatch } from 'react-redux';
import modalStyles from './styles.module.css';
import moment from "moment";
import { updateSessionRefund } from "../../../../../store/actions/student/index";

const CancelModal = (props) => {
    const { setCancelModal, width, cancelSession, availDetails, cardInfo } = props;
    const [page, setPage] = React.useState('1');
    const dispatch = useDispatch()
    console.log(availDetails);
    console.log(cardInfo);
    let hours;
    if(availDetails){
        let classDate = moment(availDetails?.from);
        let todayDate = moment(Date.now());
        const duration = moment.duration(classDate.diff(todayDate));
        hours = duration.asHours();
    }else{
        hours = 25;
    }
    console.log(hours);
    let refundPercent = 0;
    if (hours > 24) {
        refundPercent = 100;
    } else if (hours > 12 && hours < 24) {
        refundPercent = 50;
    } else {
        refundPercent = 0;
    }
    const refundAmount = (cardInfo.paymentId.itemPrice) / Number(cardInfo.type) * (refundPercent / 100);
    let sessionObj = {};
    sessionObj.sessionId = cardInfo._id;
    sessionObj.amount = Number(refundAmount);
    const result = dispatch(updateSessionRefund(sessionObj));
    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
                        onClick={() => { setCancelModal(false); setPage('1') }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Cancel Lesson</h3>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        {page === '1' ?
                            <>
                                Are you sure you want to cancel this lesson?
                                {width < 992 &&
                                    <div style={{ cursor: 'pointer', color: '#fffefe', padding: '8px 20px', borderRadius: '5px', backgroundColor: '#fd869e', marginTop: '10px', textAlign: 'center' }}
                                        onClick={cancelSession}
                                    >
                                        Cancel Lesson
                                    </div>
                                }
                            </>
                            :
                            "You're about to cancel this lesson."
                        }
                    </div>

                    {width >= 992 ?
                        <>
                            {/* Body */}
                            {page === '1' ?
                                <Page1 setPage={setPage} setCancelModal={setCancelModal} cancelSession={cancelSession} refundAmount={refundAmount} refundPercent={refundPercent} />
                                :
                                <></>
                            }
                            {page === '2' ?
                                <Page2 setCancelModal={setCancelModal} cancelSession={cancelSession} refundAmount={refundAmount} refundPercent={refundPercent} />
                                :
                                <></>
                            }
                        </>
                        :
                        <>
                            {/* <SubmitButton onClick={() => { alert("Submit!"); setCancelModal(false) }} /> */}
                        </>
                    }
                </div>
            </div>
        </>
    )
}

const Page1 = ({ setPage, setCancelModal, refundAmount, refundPercent }) => {

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '0 20px', textAlign: 'center', width: '100%', display: 'inline-block', borderRight: '1px solid #e2e3e3' }}>
                    <i className={modalStyles.cancelModalCloseIcon + " far fa-times-circle"}></i>
                    <div style={{ height: '80px', marginTop: '30px', textAlign: 'left' }}>
                        Cancelling this lesson will result in a <b>{refundPercent}% refund which is ${refundAmount}.</b> A cancellation <b>cannot be undone</b> and your lesson <b>cannot be scheduled</b> again in the future.
                    </div>
                    <div style={{ borderRadius: '5px', margin: '0 auto', marginTop: '20px', cursor: 'pointer', backgroundColor: '#fc4545', padding: '10px 20px', color: 'white', width: 'fit-content', textAlign: 'center' }}
                        onClick={() => setPage('2')}
                    >
                        Cancel Lesson
                    </div>
                </div>

                {/* <div style={{ padding: '0 20px', textAlign: 'center', width: '50%', display: 'inline-block' }}>
                    <i className={modalStyles.cancelModalReverseIcon + " fas fa-sync"}></i>
                    <div style={{ height: '80px', marginTop: '30px', textAlign: 'left' }}>
                        Or, you can reschedule this lesson for another time.
                    </div>
                    <div style={{ borderRadius: '5px', margin: '0 auto', marginTop: '20px', cursor: 'pointer', backgroundColor: '#0599d0', padding: '10px 20px', color: 'white', width: 'fit-content', textAlign: 'center' }}>
                        Reschedule Lesson
                    </div>
                </div> */}

                <div style={{ color: '#0599d0', padding: '10px 20px', marginTop: '30px', width: 'fit-content', cursor: 'pointer', borderRadius: '5px', border: '2px solid #0599d0' }}
                    onClick={() => { setCancelModal(false); setPage('1') }}
                >
                    Close
                </div>
            </div>
        </>
    )
}

const Page2 = ({ setCancelModal, cancelSession, refundAmount, refundPercent }) => {
    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '0 20px', textAlign: 'center' }}>
                    <i className={modalStyles.cancelModalCloseIcon + " far fa-times-circle"}></i>
                    <div style={{ marginTop: '30px', textAlign: 'left' }}>
                        <ul>
                            <li>This lesson will be cancelled.</li>
                            <li>will be notified.</li>
                            <li>You will receive a {refundPercent}% refund which is ${refundAmount} in Neurolingua credit. Neurolingu credits are valid for 1 year.</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '20px' }}>Reason</div>
                    <textarea rows='3'
                        placeholder="Write your reason here"
                    >
                    </textarea>
                </div>

                <div style={{ marginTop: '10px' }}>
                    Are you sure you want to cancel this lesson?
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ cursor: 'pointer', color: '#9ecde6', padding: '8px 20px', width: 'fit-content', borderRadius: '5px', outline: '2px solid #0599d0' }}
                        onClick={() => { setCancelModal(false) }}
                    >
                        Close
                    </div>
                    <div style={{ cursor: 'pointer', color: '#fffefe', padding: '8px 20px', borderRadius: '5px', backgroundColor: '#fd869e' }}
                        onClick={cancelSession}
                    >
                        Cancel Lesson
                    </div>
                </div>
            </div>
        </>
    )
}

export default CancelModal;
