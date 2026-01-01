import React from "react";
import * as modalStyles from "./styles.module.css";
import { timeIntervals } from "../../../../utils/constants";
const Slot = (props) => {
  return (
    <>
      <div className={modalStyles.slot}>
        <h5>Slot {props.i + 1}</h5>
        <div className={modalStyles.formGroup}>
          {/* <label>Start Time</label> */}
          <select
            name="start"
            value={props.slot.start}
            onChange={(e) => {
              props.handleChange(e.target.name, e.target.value, props.i);
            }}
          >
            {timeIntervals.map((interval, index) => {
              return (
                <option value={interval} key={interval} >
                  {interval}
                </option>
              );
            })}
          </select>
          {/* <input
            type="time"
            name="start"
            step="3600000"
            value={props.slot.start}
            onChange={(e) => {
              props.handleChange(e.target.name, e.target.value, props.i);
            }}
          /> */}
        </div>
        <p>:</p>
        <div className={modalStyles.formGroup}>
          {/* <label>End Time</label> */}
          <select
            name="end"
            value={props.slot.end}
            onChange={(e) => {
              props.handleChange(e.target.name, e.target.value, props.i);
            }}
          >
            {timeIntervals.map((interval, index) => {
              return (
                <option value={interval} key={interval} defaultValue={index ? false : true}>
                  {interval}
                </option>
              );
            })}
          </select>
          {/* <input
            type="time"
            name="end"
            step="3600000"
            value={props.slot.end}
            onChange={(e) => {
              props.handleChange(e.target.name, e.target.value, props.i);
            }}
          /> */}
        </div>
        <i
          className="fas fa-trash"
          onClick={() => {
            props.deleteSlot(props.i);
          }}
        >
          {" "}
        </i>
      </div>
    </>
  );
};

export default Slot;
