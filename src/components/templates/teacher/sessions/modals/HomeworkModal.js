import React from 'react';
import styles from './styles.module.css';

import english from '../../../../../assets/flags/english.png';
import { SubmitButton } from '../commonUtils';

const HomeworkModal = (props) => {
    const { setHomeworkModal, width } = props;

    return (
        <>
            <div className={styles.modalBackdrop}>
                <div className={styles.modal}>

                    {/* Header */}
                    <i className={styles.closeBtn + " fas fa-close"}
                        onClick={() => { setHomeworkModal(false) }}
                    ></i>
                    <h3 className={styles.modalHeading}>Add Homework</h3>


                    {/* Body */}
                    {width >= 992 ?
                        <>
                            {[1, 2, 3].map((item, index) => (
                                <div style={{ padding: '20px', marginTop: '20px', borderRadius: '10px', border: '1px solid #359cd7', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <img src={english} alt="language_flag" style={{ width: '40px', height: '40px' }} />
                                    <div>
                                        <div style={{ fontSize: '20px', color: '#359cd7', fontWeight: 'bold' }}>Communication Skill3</div>
                                        Hi all. This is Communication skill class.
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '20px', color: '#359cd7', fontWeight: 'bold' }}>Status</div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            Verified
                                            <i style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '10px', color: '#00df76', }} class="fas fa-check-circle"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                        :
                        <></>
                    }

                    <SubmitButton onClick={() => { alert("Submit!"); setHomeworkModal(false) }} />
                </div>
            </div>
        </>
    )
}

export default HomeworkModal;
