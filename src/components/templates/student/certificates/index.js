import React from 'react';
import teacherStyles from '../styles.module.css';
import styles from './styles.module.css';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

function StudentCertificates() {
    const  options  = [
        { label:  'English', value:  'english'  },
        { label:  'Hindi', value:  'hindi'  },
        { label:  'Frensh', value:  'french'  },
      ]

    return (
        <main className={teacherStyles.mainSection}>
            <div style={{ fontSize: '25px' }}>Neurolingua Certificate</div>
            <div>Download a certificate showing your progress.</div>

            <label htmlFor="study_lang" style={{ color: 'grey', fontSize: '18px' }}>Language of Study</label>
            <br />
            <select id="study_lang" style={{ padding: '10px' }}>
                <option selected>Select Language</option>
                <option>English</option>
                <option>Hindi</option>
                <option>French</option>
            </select>

            <br />

            <label style={{ color: 'grey', fontSize: '18px' }}>Include fields</label>
            <div style={{ marginTop: '-15px', marginBottom: '-15px' }}>
                <input id="dob" type="checkbox" />
                <label htmlFor="dob">Date of Birth</label>
            </div>
            <div style={{ marginBottom: '-15px' }}>
                <input id="email" type="checkbox" />
                <label htmlFor="dob">Email</label>
            </div>
            <div style={{ marginBottom: '-15px' }}>
                <input id="hours" type="checkbox" />
                <label htmlFor="hours">Hours</label>
            </div>
            <div style={{ marginBottom: '-15px' }}>
                <input id="prof" type="checkbox" />
                <label htmlFor="dob">Proficiency</label>
            </div>

            <br />

            <label htmlFor="cent_lang" style={{ color: 'grey', fontSize: '18px' }}>Certificate Text Language</label>
            <br />
            <MultiSelect
                // onChange={handleOnchange}
                options={options}
            />
            {/* <select id="cert_lang" style={{ padding: '10px' }}>
                <option selected>Select Language</option>
                <option>English</option>
                <option>Hindi</option>
                <option>French</option>
            </select> */}

            <br />

            <button style={{ all: 'unset', marginTop: '20px', color: '#fff', padding: '10px 20px', backgroundColor: '#ED224C', borderRadius: '10px' }}>
                Download
            </button>
        </main>
    )
}

export default StudentCertificates;
