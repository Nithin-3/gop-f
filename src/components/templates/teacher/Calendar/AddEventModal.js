import React from "react";
import modalStyles from "./styles.module.css";
import { timeOptions } from "./calendarUtils";
import Slot from "./Slot";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAvailability } from "../../../../store/actions/teacher/index";

const AddEventModal = (props) => {
  const { setAddEventModal, slots, addSlots, getAvailability } = props;

  const handleClick = async () => {
    await addSlots(slots);
    await getAvailability();
  };

  return (
    <>
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + " fas fa-close"}
            onClick={() => {
              setAddEventModal(false);
            }}
          ></i>
          <h3 className={modalStyles.modalHeading}>Add Slots</h3>

          {/* Body */}
          <div className={modalStyles.slots}>
            {slots.map((slot, i) => (
              <Slot key={i} slot={slot} i={i} />
            ))}
          </div>

          <button className={modalStyles.saveSlotBtn} onClick={handleClick}>
            Add Slots
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEventModal;
