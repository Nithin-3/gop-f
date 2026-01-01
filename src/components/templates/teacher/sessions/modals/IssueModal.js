import React from 'react';
import modalStyles from './styles.module.css';

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

    const [page, setPage] = React.useState('1');
    const [selected, setSelected] = React.useState([]);
    const [comment, setComment] = React.useState('');

    return (
        <>
            <div className={modalStyles.modalBackdrop}>
                <div style={{ padding: width >= 991 ? '2em 2em' : '2em 2em 2em 0em', maxHeight: '80vh', overflowY: 'scroll' }} className={modalStyles.modal}>

                    {/* Header */}
                    <i className={modalStyles.closeBtn + " fas fa-close"}
                        onClick={() => { setIssueModal(false) }}
                    ></i>
                    <h3 className={modalStyles.modalHeading}>Resolve Issue</h3>

                    {/* Body */}
                    {page === '1' ?
                        <Page1 width={width} setPage={setPage} setIssueModal={setIssueModal} setSelected={setSelected} setComment={setComment} />
                        :
                        <></>
                    }
                    {page === '2' ?
                        <Page2 width={width} setPage={setPage} setIssueModal={setIssueModal} selected={selected} comment={comment} />
                        :
                        <></>
                    }
                </div>
            </div>
        </>
    )
}

const Page1 = ({ width, setPage, setIssueModal, setSelected, setComment }) => {

    function handleNext(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
        value.issues = data.getAll("issue");

        setSelected(value.issues);
        setComment(e.target[11].value)
        setPage('2');
    }

    return (
        <>
            {width >= 992 ?
                <>
                    <div style={{ margin: '30px 0', fontSize: '16px' }}>
                        <b>This tool is designed for teachers to resolve issues directly with students.</b> If you need to talk with Verbling Support directly for any reason, please email support@verbling.com
                    </div>

                    <div style={{ marginTop: '20px', fontSize: '16px' }}>
                        Select one or more issues that occured
                    </div>

                    <form onSubmit={handleNext}>
                        <div>
                            {issueOptions.map((item, index) => (
                                <div style={{ marginBottom: '-10px' }}>
                                    <input style={{ width: '15px', height: '15px' }} type="checkbox" key={index} id={index} name="issue" value={item.value} />
                                    <label for={index}>{item.label}</label><br />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                            <input style={{ width: '15px', height: '15px' }} type="checkbox" id="issue11" name="issue" value="Boat" />
                            <label for="issue11">Other</label><br />
                        </div>
                        <div style={{ fontWeight: 'bold' }}>Issue a Comment</div>
                        <textarea rows='4' placeholder="I'm sorry I missed the class! I had a family emergency." style={{ resize: 'none', width: '100%', borderRadius: '10px' }}></textarea>

                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <button style={{ all: 'unset', cursor: 'pointer', color: '#0599d0', padding: '8px 20px', width: 'fit-content', borderRadius: '5px', outline: '2px solid #0599d0' }}
                                onClick={() => { setIssueModal(false) }}
                            >
                                Close
                            </button>
                            <button type='submit' style={{ all: 'unset', cursor: 'pointer', color: '#fffefe', padding: '8px 20px', borderRadius: '5px', backgroundColor: '#0599d0' }}>
                                Next
                            </button>
                        </div>
                    </form>
                </>
                :
                <>
                    {/* <div style={{ margin: '30px 0 0 0', marginLeft: '2em', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Select One Or More Issues To Report</div>

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
                    </div> */}
                </>
            }
        </>
    )
}

const Page2 = ({ width, setPage, setIssueModal, selected, comment }) => {

    return (
        <div>
            <div style={{ borderLeft: '3px solid #0599d0', paddingLeft: '15px', margin: '20px 0' }}>
                Selected Issue(s):
                <ul style={{ marginLeft: '30px' }}>
                    {selected.map((item, index) => (
                        <li>
                            {item}
                        </li>
                    ))}
                </ul>
                <div>{comment}</div>
            </div>
            <div>
                <b>How would you like to resolve this?</b>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

                    <input type="radio" id="1" name="resolve" />
                    <label htmlFor='1' style={{ fontWeight: 'normal', fontSize: '16px' }}>Reset lesson to: <span style={{ color: 'yellow' }}>Unschedule</span></label>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

                    <input type="radio" id="2" name="resolve" />
                    <label htmlFor='2' style={{ fontWeight: 'normal',fontSize: '16px' }}>Mark lesson aas: <span style={{ color: 'green' }}>Completed</span></label>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

                    <input type="radio" id="3" name="resolve" />
                    <label htmlFor='3' style={{ fontWeight: 'normal',fontSize: '16px' }}>Mark lesson as: <span style={{ color: 'green' }}>Completed</span> and issue the student a 50% refund</label>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

                    <input type="radio" id="4" name="resolve" />
                    <label htmlFor='4' style={{ fontWeight: 'normal',fontSize: '16px' }}>Mark lesson as: <span style={{ color: 'green' }}>Completed</span> and issue the student a 100% refund</label>
                </div>
            </div>
        </div>
    )
}

export default IssueModal;
