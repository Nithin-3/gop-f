import React from 'react';

import IssueModal from '../modals/IssueModal';
import HomeworkModal from '../modals/HomeworkModal';

import { Card, CardMobile } from '../commonUtils';

function Completed(props) {

    let { width, arr } = props;

    const [issueModal, setIssueModal] = React.useState(false);
    const [homeworkModal, setHomeworkModal] = React.useState(false);

    // const arr = [
    //     { heading: 'Completed', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    //     { heading: 'Completed', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    //     { heading: 'Completed', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    // ]

    const arrMobile = [
        { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." }
    ]

    const dropDownArr = [
        { text: 'Report an Issue', modal: setIssueModal },
        { text: 'Complete HW', modal: setHomeworkModal }
    ]

    arr = arr.filter((item) => item.status === "Trial" )
    console.log(arr)

    return (
        <>
            {/* Issue Modal */}
            {issueModal ?
                <IssueModal setIssueModal={setIssueModal} width={width} />
                :
                <></>
            }

            {/* Homework Modal */}
            {homeworkModal ?
                <HomeworkModal setHomeworkModal={setHomeworkModal} width={width} />
                :
                <></>
            }

            {width >= 992 ?
                <div style={{ marginTop: '50px' }}>
                    {arr.length !== 0 ?
                        arr.map((item, index) => (
                            <Card
                                width={width}
                                key={index}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Completed Sessions</div>
                    }
                </div>
                :
                <div style={{ marginTop: '30px' }}>
                    {arr.length !== 0 ?
                        arr.map((item, index) => (
                            <CardMobile
                                width={width}
                                key={index}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Completed Sessions</div>
                    }
                </div>
            }
        </>
    )
}

export default Completed;