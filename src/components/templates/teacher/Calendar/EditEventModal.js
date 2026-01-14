import React from "react";
import modalStyles from "./styles.module.css";
import DeleteSlot from "./DeleteSlot";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editAvailability } from "../../../../store/actions/teacher";
import { deleteAvailability } from "../../../../store/actions/availability";

const EditEventModal = ({
  setEditEventModal,
  selectedSlot,
  availability,
  setAvailability,
}) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const data = await deleteAvailability(selectedSlot.id);
    if (data.success) {
      toast.success("Slot Deleted Successfully!");
      setAvailability((prev) => prev.filter((el) => el.id !== selectedSlot.id));
      setEditEventModal(false);
    } else {
      toast.error(data.message || "Failed to delete slot.");
    }
  };

  return (
    <>
      <div className={modalStyles.modalBackdrop}>
        <div className={modalStyles.modal}>
          {/* Header */}
          <i
            className={modalStyles.closeBtn + " fas fa-close"}
            onClick={() => setEditEventModal(false)}
          ></i>
          <h3 className={modalStyles.modalHeading}>Delete Slot</h3>

          {/* Body */}
          <div className={modalStyles.slots}>
            <DeleteSlot slot={selectedSlot} />
          </div>

          <button className={modalStyles.saveSlotBtn} onClick={handleClick}>
            Delete Slot
          </button>
        </div>
      </div>
    </>
  );
};

export default EditEventModal;
