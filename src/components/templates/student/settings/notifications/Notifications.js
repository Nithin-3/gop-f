import React from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";

const Notifications = ({ myDetails }) => {
  const [notificationOptions, setNotificationOptions] = React.useState([]);

  React.useEffect(() => {
    if (!myDetails?.notificationOptions) return;
    setNotificationOptions([
      { value: "Promotions", label: "Promotions", isChecked: myDetails.notificationOptions.promotions },
      { value: "News + updates", label: "News + updates", isChecked: myDetails.notificationOptions.newsUpdates },
      { value: "Lesson updates", label: "Lesson updates", isChecked: myDetails.notificationOptions.lessonUpdates },
      { value: "Reminder 5 min", label: "Reminder emails - 5 minutes before lesson", isChecked: true, disabled: true },
      { value: "Reminder 30 min", label: "Reminder emails - 30 minutes before lesson", isChecked: true, disabled: true },
      { value: "Reminder 24 hrs", label: "Reminder emails - 24 hours before lesson", isChecked: false },
      { value: "Desktop", label: "Desktop Notifications Grant permission", isChecked: myDetails.notificationOptions.desktopNotification },
    ]);
  }, [myDetails]);

  const handleChange = index => {
    setNotificationOptions(prev =>
      prev.map((item, i) => i === index ? { ...item, isChecked: !item.isChecked } : item)
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(notificationOptions);
  };

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <div className={commonStyles.title}>Notifications</div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {notificationOptions.map((item, index) => (
              <div key={index} className={styles.checkStatement}>
                <input
                  className={styles.check}
                  type="checkbox"
                  checked={item.isChecked}
                  disabled={item.disabled}
                  onChange={() => handleChange(index)}
                  id={`notify-${index}`}
                />
                <label htmlFor={`notify-${index}`}>{item.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={commonStyles.submitButtonContainer}>
          <button className={commonStyles.submitButton} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
