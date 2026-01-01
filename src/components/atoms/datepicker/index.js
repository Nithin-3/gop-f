import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './styles.module.css';
//To be customised further...
const DatePicker = (props) => {
  return (
    <div>
      <Calendar onChange={props.onChange} value={props.value} />
    </div>
  );
};
export default DatePicker;
