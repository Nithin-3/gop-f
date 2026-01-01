import React from 'react';

import RescheduleModal from '../modals/RescheduleModal';
import IssueModal from '../modals/IssueModal';
import HomeworkModal from '../modals/HomeworkModal';

import { Card, CardMobile } from '../commonUtils';

function All(props) {

    const { width, arr } = props;

    const [rescheduleModal, setRescheduleModal] = React.useState(false);
    const [issueModal, setIssueModal] = React.useState(false);
    const [homeworkModal, setHomeworkModal] = React.useState(false);

    console.log("aaa", arr);

    // const arr = [
    //     { heading: 'Upcoming', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    //     { heading: 'Trial', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    //     { heading: 'Completed', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    // ]

    const arrMobile = [
        { heading: 'Upcoming', time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        { heading: 'Trial', time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        { heading: 'Completed', time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." }
    ]

    const dropDownArr = [
        { text: "Request to Reschedule", modal: setRescheduleModal },
      ];

    return (
        <>
            {/* Schedule Modal */}
            {rescheduleModal ?
                <RescheduleModal setRescheduleModal={setRescheduleModal} width={width} />
                :
                <></>
            }

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
                    {arr?.length !== 0 ?
                        arr?.map((item, index) => (
                            <Card
                                width={width}
                                key={index}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Sessions</div>
                    }
                </div>
                :
                <div style={{ marginTop: '30px' }}>
                    {arr?.length !== 0 ?
                        arr?.map((item, index) => (
                            <CardMobile
                                width={width}
                                key={index}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Sessions</div>
                    }
                </div>
            }
        </>
    )
}

export default All;