import React from 'react';
import teacherStyles from '../styles.module.css';
import styles from './styles.module.css';

import BasicInfo from './basicInfo/basicInfo';
import ProfilePic from './profilePic/ProfilePic';
import Languages from './languages/Languages';
import Password from './password/Password';
import Notifications from './notifications/Notifications';
import { useWindowDimensions } from '../../../../utils/util';

const StudentSettings = () => {
  const [activeTab, setActiveTab] = React.useState('Basic Info');
  const { width } = useWindowDimensions();

  const [mobileDropdown, setMobileDropdown] = React.useState(false);

  const tabs = [
    'Basic Info',
    'Profile Pic',
    'Languages',
    'Password',
    'Notifications',
  ];

  const studentData = JSON.parse(localStorage.getItem('studentData'));

  return (
    <>
      <main className={teacherStyles.mainSection} style={{ width: '100%' }}>
        {width >= 992 ? (
          <>
            <div
              className={styles.settingsTabs}
              style={{ width: '100%', overflow: 'auto' }}
            >
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={
                    styles.settingsTab +
                    ' ' +
                    `${activeTab === item ? styles.settingsTabActive : ''}`
                  }
                  onClick={() => {
                    setActiveTab(item);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '50px' }}>
              {
                {
                  'Basic Info': <BasicInfo myDetails={studentData.data} />,
                  'Profile Pic': <ProfilePic myDetails={studentData.data} />,
                  Languages: <Languages myDetails={studentData.data} />,
                  Password: <Password myDetails={studentData.data} />,
                  Notifications: <Notifications myDetails={studentData.data} />,
                }[activeTab]
              }
            </div>
          </>
        ) : (
          <>
            <div className={styles.settingsTabs}>
              <div className={styles.settingsTabHeading}>{activeTab}</div>
              <div
                className={styles.arrowIcon}
                onClick={() => setMobileDropdown(!mobileDropdown)}
              >
                {mobileDropdown ? (
                  <i class='fas fa-caret-up'></i>
                ) : (
                  <i class='fas fa-caret-down'></i>
                )}
              </div>
            </div>

            {mobileDropdown ? (
              <div style={{ position: 'relative' }}>
                <div className={styles.mobileDropdown}>
                  {tabs.map((item, index) => (
                    <div
                      key={index}
                      className={
                        styles.settingsTab +
                        ' ' +
                        `${
                          activeTab === item
                            ? styles.settingsTabActiveDropdown
                            : ''
                        }`
                      }
                      onClick={() => {
                        setActiveTab(item);
                        setMobileDropdown(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            <div style={{ marginTop: '50px' }}>
              {
                {
                  'Basic Info': <BasicInfo myDetails={studentData.data} />,
                  'Profile Pic': <ProfilePic myDetails={studentData.data} />,
                  Languages: <Languages myDetails={studentData.data} />,
                  Password: <Password myDetails={studentData.data} />,
                  Notifications: <Notifications myDetails={studentData.data} />,
                }[activeTab]
              }
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default StudentSettings;
