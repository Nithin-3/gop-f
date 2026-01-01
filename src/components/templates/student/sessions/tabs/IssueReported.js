import React from 'react';

import { Card, CardMobile } from '../commonUtils';

function IssueReported(props) {

    const { width } = props;

    const arr = [
        // { heading: 'Issue Reported', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
        // { heading: 'Issue Reported', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
        // { heading: 'Issue Reported', time: '8:00 AM', date: 'Tuesday - 7 September, 2021', lang: 'English', duration: '1 hour' },
    ]

    const arrMobile = [
        // { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        // { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." },
        // { time: '8:00 PM', date: 'Tuesday - September 14, 2021', ago: '2 months ago', lang: 'Turkish', duration: '60 - Minute Lesson', teacher: 'Seray - Venkat', sessionName: 'Conversational Turkish 1', desc: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen." }
    ]

    return (
        <>
            {width >= 992 ?
                <div style={{ marginTop: '50px' }}>
                    {arr.length !== 0 ?
                        arr.map((item, index) => (
                            <Card
                                width={width}
                                cardInfo={item}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Reported Sessions</div>
                    }
                </div>

                :
                <div style={{ marginTop: '30px' }}>
                    {arrMobile.length !== 0 ?
                        arrMobile.map((item, index) => (
                            <CardMobile
                                width={width}
                                cardInfo={item}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Reported Sessions</div>
                    }
                </div>
            }
        </>
    )
}

export default IssueReported;