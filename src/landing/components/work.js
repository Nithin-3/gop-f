import React from "react";
//icons
import arrowForward from '../../assets/image/Vector-3.png';
//css
import './work.css';
import {Link} from 'react-router-dom';

const Work = () => {
  return (
    <div className="workSection">
      <h1 className="work_works">How it works</h1>
      <div className="work_type work_center">
        <div className="work_one work_center">
          <div className="work_find work_center">1.</div>
          <h3 className="work_text">Find A Course</h3>
          <h5 className="work_small">
            Sign up for free and choose one of our experiences language
            teachers.
          </h5>
          {/* <div></div> */}
        </div>
        <div className="work_two work_center">
          <div className="work_book work_center">2.</div>
          <h3 className="work_text">Book Lesson</h3>
          <h5 className="work_small">
            Simply select available session slots wth your preferred teacher &
            confirm your booking.
          </h5>
        </div>
        <div className="work_three work_center">
          <div className="work_start work_center">3.</div>
          <h3 className="work_text">Start Learning</h3>
          <h5 className="work_small">
            Connect to your teacher via Neurolingua classroom and enjoy the new
            learning experience.
          </h5>
        </div>
      </div>
      <Link to="/find-teacher" style={{ textDecoration: 'none' }}>
        <button className="work_free font-face-lt">
          Book a Free Lesson Now &nbsp;&nbsp;<img src={arrowForward} alt="errImg" />
        </button>
      </Link>
    </div>
  );
};

export default Work;
