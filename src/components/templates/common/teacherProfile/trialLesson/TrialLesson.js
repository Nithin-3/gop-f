import React from 'react';

import { BookFreeTrialButton } from '../../commonUtils';

function TrialLesson(props) {

    const { width } = props;
    return (
        <div style={{ marginTop: '10px', width: width >= 992 ? '100%' : '90%' }}>
            <div style={{ borderRadius: '10px 10px 0 0', width: width >= 992 ? '100%' : 'auto', backgroundColor: '#edecec', padding: '10px', fontWeight: 'bold' }}>Trial Lesson</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderRadius: '0 0 10px 10px', width: width >= 992 ? '100%' : 'auto', backgroundColor: '#fefeff', padding: '10px' }}>
                <div>
                    <span style={{ color: '#fe1848', fontSize: '20px', fontWeight: 'bold' }}>Free</span>
                    <br />
                    30 min
                    <br />
                    <div style={{marginTop: '15px'}}></div>
                    <BookFreeTrialButton />
                </div>
                <div style={{ color: '#fe1848' }}>$ 0</div>
            </div>
        </div>
    )
}

export default TrialLesson;