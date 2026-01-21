import React from "react";
import * as modalStyles from "./styles.module.css";
// import { timeOptions } from "./calendarUtils";
import Slot from "./Slot";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAvailability } from "../../../../store/actions/teacher/index";

const AddEventModal = (props) => {
  const dispatch = useDispatch();

  const { setAddEventModal } = props;

  const [slots, setSlots] = React.useState([{ start: "12:00 am", end: "12:00 am", title: "" }]);

  React.useEffect(() => {
    if (props.selectionType === "select") {
      if (props.selectedTimeSlots.length) setSlots(props.selectedTimeSlots);
    }
  }, []);

  function addSlot() {
    setSlots([...slots, { start: "12:00 am", end: "12:00 am", title: "" }]);
  }

  function handleChange(name, value, index) {
    let newSlot = [...slots];
    newSlot[index][name] = value;
    setSlots(newSlot);
  }

  const deleteSlot = (i) => {
    let temp = [...slots];
    if (temp.length > 0) temp.splice(i, 1);
    setSlots(temp);
  };

  function verifyFields() {
    let status = true;

    slots.forEach((slot) => {
      let startTime = new Date(2022, 1, 1, parseInt(slot.start.slice(0, 2)), parseInt(slot.start.slice(3, 5)));
      let endTime = new Date(2022, 1, 1, parseInt(slot.end.slice(0, 2)), parseInt(slot.end.slice(3, 5)));

      if (slot.start === "" || slot.end === "") {
        toast.warn("Please select start and end time");
        status = false;
      } else if ((endTime - startTime) / 1000 / 60 < 30 || (endTime - startTime) / 1000 / 60 > 60) {
        toast.warn("Invalid Slot Time, slot diff should be 30 or 60 min");
        status = false;
      }
    });
    return status;
  }

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const overlapping = (a, b) => {
    const getMinutes = (s) => {
      const p = s.split(":").map(Number);
      return p[0] * 60 + p[1];
    };
    return getMinutes(a.end) > getMinutes(b.start) && getMinutes(b.end) > getMinutes(a.start);
  };

  const isOverlapping = (arr) => {
    let i, j;
    for (i = 0; i < arr.length - 1; i++) {
      for (j = i + 1; j < arr.length; j++) {
        if (overlapping(arr[i], arr[j])) {
          return true;
        }
      }
    }
    return false;
  };

  const saveSlots = async () => {
    if (!verifyFields()) {
      return;
    }
    let temp = slots;

    let slots24HourFormat = temp.map((slot) => {
      return { start: convertTime12to24(slot.start), end: convertTime12to24(slot.end) };
    });

    if (isOverlapping(slots24HourFormat)) {
      return toast.warn("Slots are overlapping");
    }

    props.setAvailability([...props.availability, ...temp]);

    let body;
    /// FOR Multiple dates selection
    if (props.selectedDateSlots.length) {
      let response = { status: true, message: "" };
      props.selectedDateSlots.forEach(async (date) => {
        body = {
          availability: {
            date: date,
            slots: temp,
          },
        };



        try {
          const result = await dispatch(addAvailability(body));

          if (result.status) {
            // toast.success(result.message);
            props.setAddEventModal(false);
          } else {
            response.status = false;
            response.message = result.message;
          }
        } catch (e) {
          console.error(e);
          toast.error("Failed to Save availability");
        }
      });
      if (response.status) {
        toast.success("Slots Added Successfully");
      } else {
        toast.error(response.message);
      }
    } else {
      /// FOR Single dates selection

      body = {
        availability: {
          date: props.selectedDate,
          slots: temp,
        },
      };
      try {
        const result = await dispatch(addAvailability(body));

        if (result.status) {
          toast.success(result.message);
          props.setAddEventModal(false);
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to Save availability");
      }
    }
    return;
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
            {slots.map((slot, i) => {
              return <Slot slot={slot} i={i} handleChange={handleChange} deleteSlot={deleteSlot} />;
            })}
          </div>

          <button onClick={addSlot} className={modalStyles.addSlotBtn}>
            {" "}
            <i className="fas fa-plus"> </i>{" "}
          </button>

          <button className={modalStyles.saveSlotBtn} onClick={saveSlots}>
            Save Slots
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEventModal;
