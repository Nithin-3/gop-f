import React from 'react';

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

function ReportIssue({ width }) {
    return (
        <>
            {
                width >= 992 ?
                    <div style={{ height: '75vh', margin: '40px 5vw 0 5vw', backgroundColor: '#fffefe', borderRadius: '10px', padding: '20px' }}>
                        <div style={{ marginBottom: '30px', textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>Select One Or More Issues To Report</div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '200px' }}>
                            <div style={{ width: '100%', height: '200px' }}>
                                {issueOptions.map((item, index) => (
                                    <div style={{ width: '50%', marginBottom: '5px', display: 'inline-block' }}>
                                        <input style={{ width: '15px', height: '15px' }} type="checkbox" key={index} id={index} name="issue" value={item.value} />
                                        <label for={index}>{item.label}</label><br />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                                <input style={{ width: '15px', height: '15px' }} type="checkbox" id="issue11" name="issue" value="Boat" />
                                <label for="issue11">Other</label><br />
                            </div>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Comment</div>
                            <textarea rows='6' style={{ resize: 'none', width: '100%', borderRadius: '10px' }}></textarea>
                        </div>

                        <SubmitButton onClick={() => alert("Submit!")} />
                    </div>
                    :
                    <>
                        <div style={{ margin: '30px 0 5px 0', textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>Select One Or More Issues To Report</div>

                        {issueOptions.map((item, index) => (
                            <div style={{ width: '100%' }}>
                                <input style={{ width: '15px', height: '15px' }} type="checkbox" key={index} id={index} name="issue" value={item.value} />
                                <label for={index}>{item.label}</label><br />
                            </div>
                        ))}

                        <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Issue a Comment</div>
                            <textarea rows='6' style={{ resize: 'none', width: '100%', borderRadius: '10px' }}></textarea>
                        </div>

                        <div>To alert Neurolingue of the issue with your lesson for help in mediating the problem, please contact <span style={{ color: '#5bd056' }}>Support</span></div>
                        
                        <SubmitButton onClick={() => alert("Submit!")} />
                    </>
            }
        </>
    )
}

export default ReportIssue;