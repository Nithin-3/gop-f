import React from 'react';
import styles from './styles.module.css';
import { Card, CardMobile } from '../commonUtils';

function NeedScheduling(props) {

    let { width, arr } = props;
    arr = arr.filter((item) => item.status === "Need Scheduling")
    console.log(arr)

    return (
        // <>
        //     {width >= 992 ?
        //         <div style={{ marginTop: '50px' }}>
        //             <div className={styles.cardContainer}>
        //                 <div style={{ fontWeight: '900', fontSize: '40px' }}>Schedule a Lesson</div>
        //                 <div style={{ fontWeight: '400', fontSize: '30px' }}>You don't have schedule Lesson. Click below to schedule.</div>
        //                 <div style={{ cursor: 'pointer', fontWeight: '400', fontSize: '20px', backgroundColor: '#9ECDE7', color: '#fff', borderRadius: '20px', padding: '10px 20px' }}>Shedule a Lesson</div>
        //             </div>
        //         </div>
        //         :
        //         <div style={{ marginTop: '30px' }}>
        //         </div>
        //     }
        // </>
        <>
            {width >= 992 ?
                <div style={{ marginTop: '50px' }}>
                    {arr.length !== 0 ?
                        arr.map((item, index) => (
                            <Card
                                width={width}
                                cardInfo={item}
                                key={index}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Need Scheduling Sessions</div>
                    }
                </div>
                :
                <div style={{ marginTop: '30px' }}>
                    {arr.length !== 0 ?
                        arr.map((item, index) => (
                            <CardMobile
                                width={width}
                                cardInfo={item}
                                key={index}
                            />
                        ))
                        :
                        <div style={{ textAlign: 'center' }}>No Need Scheduling Sessions</div>
                    }
                </div>
            }
        </>
    )
}

export default NeedScheduling;
