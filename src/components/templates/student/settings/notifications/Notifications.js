import React from 'react';
import styles from './styles.module.css';
import commonStyles from '../styles.module.css';

function Notifications(props) {

    const [notificationOptions, setNotficationOptions] = React.useState([
        { value: 'Promotions', label: 'Promotions', isChecked: props.myDetails.notificationOptions.promotions },
        { value: 'News + updates', label: 'News + updates', isChecked: props.myDetails.notificationOptions.newsUpdates },
        { value: 'Lesson updates', label: 'Lesson updates', isChecked: props.myDetails.notificationOptions.lessonUpdates },
        { value: 'Reminder emails - 5 minutes before lesson', label: 'Reminder emails - 5 minutes before lesson', isChecked: true },
        { value: 'Reminder emails - 30 minutes before lesson', label: 'Reminder emails - 30 minutes before lesson', isChecked: true },
        { value: 'Reminder emails - 24 hours before lesson', label: 'Reminder emails - 24 hours before lesson', isChecked: false },
        { value: 'Desktop Notifications Grant permission', label: 'Desktop Notifications Grant permission', isChecked: props.myDetails.notificationOptions.desktopNotification },
    ]);

    function handleSubmit(e) {
        e.preventDefault();
    }

    const handleChange = (e) => {
        console.log("ww", e);
        // setNotficationOptions(
        //     notificationOptions.map((item) =>
        //         item.value === e.target.defaultValue ?
        //             { ...item, isChecked: !item.isChecked }
        //             :
        //             item
        //     )
        // );
    }

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <div className={commonStyles.title}>Notifications</div>

            <form onSubmit={handleSubmit}>
                <div style={{ backgroundColor: 'yellow0', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                        {notificationOptions.map((item, index) => (
                            <div className={styles.checkStatement}>
                                {index >= 3 && index <= 4 ?
                                    <input className={styles.check} checked type="checkbox" key={index} id={index} name={index} value={item.value} />
                                    :
                                    <input className={styles.check} onChange={e => handleChange(e)} checked={item.isChecked} type="checkbox" key={index} id={index} name={index} value={item.value} />
                                }
                                <label for={index}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={commonStyles.submitButtonContainer}>
                    <button
                        className={commonStyles.submitButton}
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Notifications;
