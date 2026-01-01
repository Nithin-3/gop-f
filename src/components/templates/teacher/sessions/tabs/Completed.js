import React from 'react';

import HomeworkModal from '../modals/HomeworkModal';
import IssueModal from '../modals/IssueModal';

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

    // const arrMobile = [
    //     { course: 'Communication Skill 3', isVerified: true, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    //     { course: 'Communication Skill 3', isVerified: true, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    //     { course: 'Communication Skill 3', isVerified: true, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." },
    // ]

    const dropDownArr = [
        { text: 'Resolve Issue', modal: setIssueModal },
        { text: 'Assign Homework', modal: setHomeworkModal }
    ]

    arr = arr?.filter((item) => item.status === "Completed" )
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
                    {arr && arr.length > 0 ? (
                        arr.map((item, index) => (
                            <Card
                                width={width}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        )))
                        :
                        <div style={{ textAlign: 'center' }}>No Completed Sessions</div>
                    }
                </div>
                :
                <div style={{ marginTop: '30px' }}>
                    {arr && arr.length > 0 ? (
                        arr.map((item, index) => (
                            <CardMobile
                                width={width}
                                cardInfo={item}
                                dropDown={dropDownArr}
                            />
                        )))
                        :
                        <div style={{ textAlign: 'center' }}>No Completed Sessions</div>
                    }
                </div>
            }
        </>
    )
}

export default Completed;