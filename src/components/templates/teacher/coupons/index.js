/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from '../../../../utils/util';
import CouponCard from './CouponCard/CouponCard';
import styles from './styles.module.css';
import moment from 'moment';
import CreateModal from './createModal/CreateModal';
import EditModal from './createModal/EditModal';
import { useDispatch } from 'react-redux';
import { viewCouponByUser } from '../../../../store/actions/coupon';

function TeacherCoupons() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const [page, setPage] = useState(1);
  const tableHeader = ['All Coupons', 'Redeemed', 'Expired'];

  const [coupons, setCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('All Coupons');
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [apiCall, setApiCall] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Coupons');
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedTeacher = JSON.parse(localStorage.getItem('teacherData'));
      if (storedTeacher?.firstName?.data) setTeacherName(storedTeacher.firstName.data);

      setApiCall(true);
      try {
        const result = await dispatch(viewCouponByUser(searchQuery, page));
        setCoupons(result || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [!apiCall, searchQuery, page]);

  return (
    <>
      {createModal && (
        <CreateModal
          setCreateModal={setCreateModal}
          width={width}
          coupons={coupons}
          setCoupons={setCoupons}
          setApiCall={setApiCall}
        />
      )}

      <main className={styles.mainSection}>
        {width >= 992 ? (
          <div className={styles.sessionTabs}>
            <div>
              <h1>Coupons</h1>
            </div>
            <div className={styles.sessionshow}>
              {tableHeader.map((item, index) => (
                <div
                  key={index}
                  className={styles.sessionTab}
                  onClick={() => {
                    setSearchQuery(item);
                    setApiCall(false);
                  }}
                >
                  {item}
                </div>
              ))}
              <div
                className={styles.sessionTabAdd}
                style={{ margin: '0px 20px' }}
                onClick={() => setCreateModal(true)}
              >
                <span className="fa fa-plus"></span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.sessionTabs}>
              <div className={styles.sessionTabHeading}>{activeTab}</div>
              <div
                className={styles.arrowIcon}
                onClick={() => setMobileDropdown(!mobileDropdown)}
              >
                {mobileDropdown ? (
                  <i className="fas fa-caret-up"></i>
                ) : (
                  <i className="fas fa-caret-down"></i>
                )}
              </div>
            </div>
          </div>
        )}

        {coupons.length > 0 ? (
          coupons.map((item, index) => (
            <CouponCard
              key={index}
              CourseName={item.couponCode}
              teacherName={teacherName}
              expDate={moment(item.validTill).format('MMMM DD, YYYY')}
              price={item.discountAmt}
            />
          ))
        ) : (
          <div>No Coupons</div>
        )}

        {editModal && editUser && (
          <EditModal
            setEditModal={setEditModal}
            width={width}
            editUser={editUser}
            setEditUser={setEditUser}
            setApiCall={setApiCall}
          />
        )}
      </main>
    </>
  );
}

export default TeacherCoupons;
