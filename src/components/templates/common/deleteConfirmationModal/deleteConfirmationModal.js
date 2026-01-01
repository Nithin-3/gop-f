import React from "react";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../../../../store/actions/course";
import { toast } from "react-toastify";

const DeleteConfirmationModal = (props) => {
  const dispatch = useDispatch();
  // alert(props.selectedCourse.id);
  const handleDelete = async () => {
    props.setApiCalled(false)
    const form = {
      id: props.selectedCourse.id,
    };

    // show Loader
    document.getElementById("loader").style.display = "flex";

    const result = await dispatch(deleteCourse(form));

    // hide Loader
    document.getElementById("loader").style.display = "none";

    if (result === "Deleted Successfully") {
      toast.success("Course Deleted Successfully");
      props.handleModal(false);
    } else {
      toast.error("Failed to Delete");
    }
  };
  return (
    <>
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          <h3>Are you sure you want to delete?</h3>

          <div className={styles.actions}>
            <button
              onClick={() => {
                props.handleModal(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
