import React, { useEffect, useState } from 'react';
import modalStyles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCouponSlot } from '../../../../../store/actions/coupon';
import { getMyCourses } from '../../../../../store/actions/course';

const CreateModal = ({ setCreateModal, width, setApiCall }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ couponCode: '', validTill: '', discountAmt: '' });
  const [selectedCourses, setSelectedCourses] = useState([]);
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
    const data = { ...formData, courses: selectedCourses };
    try {
      const result = await dispatch(addCouponSlot(data));
      if (result.status) toast.success(result.msg);
      else toast.error(result.msg);
      setFormData({ couponCode: '', validTill: '', discountAmt: '' });
      setSelectedCourses([]);
      setCreateModal(false);
      setApiCall(false);
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  const handleCheckboxChange = (checked, courseId) => {
    setSelectedCourses(prev =>
      checked ? [...prev, courseId] : prev.filter(id => id !== courseId)
    );
  };

  return (
    <div className={modalStyles.modalBackdrop}>
      <div className={modalStyles.modal}>
        <i
          className={`${modalStyles.closeBtn} fas fa-close`}
          onClick={() => setCreateModal(false)}
        ></i>
        <h3 className={modalStyles.modalHeading}>Create Coupon</h3>

        <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
          <div className={modalStyles.inputFormat}>
            <input
              type='text'
              placeholder='Coupon Name'
              value={formData.couponCode}
              required
              onChange={e => setFormData({ ...formData, couponCode: e.target.value })}
            />
          </div>

          <div className={modalStyles.inputFormat}>
            <input
              type='number'
              placeholder='Percentage Discount'
              value={formData.discountAmt}
              required
              onChange={e => setFormData({ ...formData, discountAmt: e.target.value })}
            />
          </div>

          <div className={modalStyles.inputFormat}>
            <input
              type='date'
              value={formData.validTill}
              required
              onChange={e => setFormData({ ...formData, validTill: e.target.value })}
            />
          </div>

          <div>
            <label>Courses</label>
            {courses.map(course => (
              <div key={course.id}>
                <input
                  type='checkbox'
                  checked={selectedCourses.includes(course.id)}
                  onChange={e => handleCheckboxChange(e.target.checked, course.id)}
                  id={`course-${course.id}`}
                />
                <label htmlFor={`course-${course.id}`}>{course.title.data}</label>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <div
              onClick={() => setCreateModal(false)}
              style={{
                cursor: 'pointer',
                borderRadius: '10px',
                border: '1px solid #9fcce6',
                padding: '10px 20px',
              }}
            >
              Cancel
            </div>
            <button
              type='submit'
              style={{
                all: 'unset',
                cursor: 'pointer',
                backgroundColor: '#9fcce6',
                borderRadius: '10px',
                padding: '10px 20px',
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

export default CreateModal;
