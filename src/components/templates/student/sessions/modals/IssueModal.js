import React from 'react';
import modalStyles from './styles.module.css';

import { SubmitButton } from '../commonUtils';

const issueOptions = [
    { value: "Student was late", label: 'Student was late' },
    { value: "Student was absent", label: 'Student was absent' },
    { value: "Student left early", label: 'Student left early' },
    { value: "Teacher was absent", label: 'Teacher was absent' },
    { value: "Teacher was late", label: 'Teacher was late' },
    { value: "Teacher left early", label: 'Teacher left early' },
    { value: "Student-related teachnical difficulties", label: 'Student-related teachnical difficulties' },
    { value: "Teacher-related technical difficulties", label: 'Teacher-related technical difficulties' },
    { value: "Neurolingua-related technical difficulties", label: 'Neurolingua-related technical difficulties' },
    { value: "Lesson status should be completed", label: 'Lesson status should be completed' }
]

const IssueModal = (props) => {
    const { setIssueModal, width } = props;

    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div style={{ padding: width >= 991 ? '2em 2em' : '2em 2em 2em 0em', maxHeight: '80vh', overflowY: 'scroll' }} className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
                        onClick={() => { setIssueModal(false) }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Report An Issue</h3>


                    {/* Body */}
                    {width >= 992 ?
                        <>
                            <div style={{ margin: '30px 0', fontSize: '20px', fontWeight: 'bold' }}>Select One Or More Issues To Report</div>
                            <div style={{ width: '50vw' }}>
                                {issueOptions.map((item, index) => (
                                    <div style={{ width: '50%', marginBottom: '-10px', display: 'inline-block' }}>
                                        <input style={{ width: '15px', height: '15px' }} type="checkbox" key={index} id={index} name="issue" value={item.value} />
                                        <label for={index}>{item.label}</label><br />
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                <input style={{ width: '15px', height: '15px' }} type="checkbox" id="issue11" name="issue" value="Boat" />
                                <label for="issue11">Other</label><br />
                            </div>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Issue a Comment</div>
                            <textarea rows='4' style={{ resize: 'none', width: '100%', borderRadius: '10px' }}></textarea>
                            <div style={{ marginTop: '10px' }}>To alert Neurolingua of the issue with your lesson for help in mediating the problem, please contact Support</div>
                        </>
                        :
                        <>
                            <div style={{ margin: '30px 0 0 0', marginLeft: '2em', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Select One Or More Issues To Report</div>

                            {issueOptions.map((item, index) => (
                                <div style={{ width: '100%', marginBottom: '-20px' }}>
                                    <input style={{ width: '15px', height: '15px' }} type="checkbox" key={index} id={index} name="issue" value={item.value} />
                                    <label style={{ fontSize: '0.9em' }} for={index}>{item.label}</label><br />
                                </div>
                            ))}

                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                <input style={{ width: '15px', height: '15px' }} type="checkbox" id="issue11" name="issue" value="Boat" />
                                <label for="issue11">Other</label><br />
                            </div>

                            <div style={{ marginLeft: '2em' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Issue a Comment</div>
                                <textarea rows='2' style={{ resize: 'none', width: '100%', borderRadius: '10px' }}></textarea>
                                <div style={{ marginTop: '10px', textAlign: 'justified', textJustify: 'inter-word' }}>To alert Neurolingua of the issue with your lesson for help in mediating the problem, please contact <span style={{ color: '#5bd056' }}>Support</span></div>
                            </div>
                        </>
                    }

                    <SubmitButton onClick={() => { alert("Submit!"); setIssueModal(false) }} />
                </div>
            </div>
        </>
    )
}

export default IssueModal;
