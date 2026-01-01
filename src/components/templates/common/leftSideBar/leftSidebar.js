import React, { useState, useRef, useEffect } from 'react';
import './leftSideBar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import hamburgerIcon from '../../../../assets/icons/hamburger.svg';
import avtar from '../../admin/Avtar.png';
import { toast } from 'react-toastify';
import Logo from '../../../../assets/image/logo.svg';
import { useWindowDimensions } from '../../../../utils/util';

const LeftSideBar = ({ student, list }) => {
  const { width } = useWindowDimensions();
  const [teacherData, setTeacherData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showSideBar, setShowSideBar] = useState(false);
  const nav = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setUserProfile(profile);

    if (profile?.roleModel === 'Student') {
      const storedStudent = JSON.parse(localStorage.getItem('studentData'));
      setStudentData(storedStudent?.data);
    } else if (profile?.roleModel === 'Teacher') {
      const storedTeacher = JSON.parse(localStorage.getItem('teacherData'));
      setTeacherData(storedTeacher);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = e => {
      if (nav.current && !nav.current.contains(e.target)) {
        setShowSideBar(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const signOut = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Logged out');
  };

  const avatarSrc =
    (student && studentData?.profilePic?.data) ||
    (!student && teacherData?.teacherProfilePic?.data) ||
    avtar;

  return (
    <>
      {/* Side Navigation */}
      <div
        style={{
          backgroundColor: student ? '#FD879F' : '',
          borderRadius: width >= 992 ? '' : '0px',
          paddingTop: width >= 992 ? '' : '20px',
        }}
        className={`sideNav ${showSideBar ? 'show-menu' : ''}`}
        ref={nav}
      >
        <nav className="nav__container justify-content-between">
          {width >= 992 ? (
            <NavLink className="nav__link nav__logo" to="/">
              <img src={Logo} alt="Logo" style={{ width: '150px' }} />
            </NavLink>
          ) : (
            <div
              style={{
                padding: '0 20px',
                marginBottom: '20px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={avatarSrc} className="avtar" alt="avatar" style={{ width: '50px' }} />
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '24px' }}>
                    {userProfile?.fullName}
                  </div>
                  <div style={{ fontWeight: 300, fontSize: '18px' }}>
                    <i>{student ? 'Student' : 'Teacher'}</i>
                  </div>
                </div>
              </div>
              <div onClick={() => setShowSideBar(false)}>
                <i className="fas fa-times"></i>
              </div>
            </div>
          )}

          <div className="nav__list">
            <div className="nav__items">
              {list.map(element => (
                <NavLink
                  key={element.link}
                  onClick={() => setShowSideBar(false)}
                  className="nav__link"
                  to={element.link}
                  style={{ width: '100%' }}
                  activeClassName={student ? 'nav__link-active_student' : 'nav__link-active'}
                >
                  <i className={`${element.iconClass} nav__icon`}></i>
                  <span className="nav__name">{element.name}</span>
                </NavLink>
              ))}

              <button className="nav__link signOut" onClick={signOut}>
                <i className="nav__icon fas fa-sign-out-alt"></i>
                <span className="nav__name">Log out</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar */}
      {!showSideBar && (
        <nav className="navbar mobileNav">
          <img
            src={hamburgerIcon}
            className="hamburgerIcon"
            alt="menu"
            onClick={() => setShowSideBar(true)}
          />
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ width: '150px' }} />
          </Link>
          <img src={avatarSrc} className="avtar" alt="avatar" />
        </nav>
      )}
    </>
  );
};

export default LeftSideBar;
