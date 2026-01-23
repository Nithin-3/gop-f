import React from 'react';

function TeachingExperties(props) {
    const { width, teacherData } = props;

    return (
        <div style={{ marginTop: '10px', borderRadius: '10px', width: width >= 992 ? '100%' : '90%', backgroundColor: '#fefeff', padding: '20px' }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Teaching Expertise</div>
            <div>
                <div style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                    <div style={{ color: '#fe1848', marginBottom: '10px' }}>Teaches</div>
                    <div style={{ maxHeight: '200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '30px' }}>
                        {teacherData?.expertise?.teaches?.map((item, index) => (
                            <div key={index}>{item}</div>
                        )) || <div>N/A</div>}
                    </div>
                </div>
                <div style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                    <div style={{ color: '#fe1848', marginBottom: '10px' }}>Boards</div>
                    <div style={{ maxHeight: '200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                        {teacherData?.expertise?.boards?.map((item, index) => (
                            <div key={index}>{item}</div>
                        )) || <div>N/A</div>}
                    </div>
                </div>
                <div style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                    <div style={{ color: '#fe1848', marginBottom: '10px' }}>Courses</div>
                    <div style={{ maxHeight: '200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                        {teacherData?.expertise?.courses?.map((item, index) => (
                            <div key={index}>{item}</div>
                        )) || <div>N/A</div>}
                    </div>
                </div>
                <div style={{ padding: '10px 20px', backgroundColor: '#fefeff', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 0.1)' }}>
                    <div style={{ color: '#fe1848', marginBottom: '10px' }}>Test Preparation</div>
                    <div style={{ maxHeight: '200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                        {teacherData?.expertise?.testPreparations?.map((item, index) => (
                            <div key={index}>{item}</div>
                        )) || <div>N/A</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeachingExperties;