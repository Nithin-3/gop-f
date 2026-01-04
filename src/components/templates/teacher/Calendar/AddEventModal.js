import React, { useState } from "react";
import modalStyles from "./styles.module.css";
import Slot from "./Slot";
import { toast } from "react-toastify";

const AddEventModal = ({ setAddEventModal, slots = [], addSlots, getAvailability }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (slots.length === 0) {
      toast.warning("No slots to add!");
      return;
    }

    setLoading(true);
    try {
      await addSlots(slots);
      await getAvailability();
      toast.success("Slots added successfully!");
      setAddEventModal(false);
    } catch (err) {
      toast.error("Failed to add slots. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        {/* Header */}
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => setAddEventModal(false)}
        ></i>
        <h3 className={modalStyles.modalHeading}>Add Slots</h3>

        {/* Body */}
        <div className={modalStyles.slots}>
          {slots.length > 0 ? (
            slots.map((slot, i) => <Slot key={i} slot={slot} i={i} />)
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>No slots selected</div>
          )}
        </div>

        <button
          className={modalStyles.saveSlotBtn}
          onClick={handleClick}
          disabled={loading || slots.length === 0}
        >
          {loading ? "Adding..." : "Add Slots"}
        </button>
      </div>
    </div>
  );
};

export default AddEventModal;
