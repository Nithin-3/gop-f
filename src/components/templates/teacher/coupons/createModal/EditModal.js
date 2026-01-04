import React, { useEffect, useState } from "react";
import modalStyles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editCouponSlot } from "../../../../../store/actions/coupon";
import { getMyCourses } from "../../../../../store/actions/course";

const EditModal = ({ setEditModal, width, editUser, setEditUser, setApiCall }) => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await dispatch(getMyCourses());
        if (result?.data) setCourses(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(editCouponSlot(editUser, editUser.id));
      toast.success(result.msg);
      setEditModal(false);
      setApiCall(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const handleCheckboxChange = (checked, courseId) => {
    setEditUser(prev => ({
      ...prev,
      courses: checked
        ? [...prev.courses, courseId]
        : prev.courses.filter(id => id !== courseId)
    }));
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => setEditModal(false)}
        ></i>
        <h3 className={modalStyles.modalHeading}>Edit Coupon</h3>

        <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <div className={modalStyles.inputFormat}>
            <input
              type="text"
              placeholder="Coupon Name"
              value={editUser.couponCode}
              onChange={(e) =>
                setEditUser({ ...editUser, couponCode: e.target.value })
              }
            />
          </div>

          <div className={modalStyles.inputFormat}>
            <input
              type="number"
              placeholder="Discount"
              value={editUser.discountAmt}
              onChange={(e) =>
                setEditUser({ ...editUser, discountAmt: e.target.value })
              }
            />
          </div>

          <div className={modalStyles.inputFormat}>
            <input
              type="date"
              value={editUser.validTill}
              onChange={(e) =>
                setEditUser({ ...editUser, validTill: e.target.value })
              }
            />
          </div>

          <div>
            <label>Courses</label>
            {courses.map((course) => (
              <div key={course.id}>
                <input
                  type="checkbox"
                  className="mr-2 mt-1 accent-purple-500"
                  checked={editUser.courses.includes(course.id)}
                  onChange={(e) => handleCheckboxChange(e.target.checked, course.id)}
                  id={`course-${course.id}`}
                />
                <label htmlFor={`course-${course.id}`}>{course.title.data}</label>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
            <div
              onClick={() => setEditModal(false)}
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                border: "1px solid #9fcce6",
                padding: "10px 20px",
              }}
            >
              Cancel
            </div>
            <button
              type="submit"
              style={{
                all: "unset",
                cursor: "pointer",
                backgroundColor: "#9fcce6",
                borderRadius: "10px",
                padding: "10px 20px",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
