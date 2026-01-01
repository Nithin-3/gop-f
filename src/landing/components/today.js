import React from "react";
//icons
import arrowForward from '../../assets/image/Vector-3.png';
//css
import './today.css';
import {Link} from 'react-router-dom';

const Today = () => {
  return (
    <div className="today_section" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <div className="today_learn">
        <h1>Learn a language today</h1>
        <h3>
          Get ready to learn and speak confidently with our online language teacher
        </h3>
        <Link to="/find-teacher" style={{ textDecoration: 'none' }}>
          <button className="today_free">
            Try free lesson &nbsp;<img src={arrowForward} alt="errImg" />
          </button>
        </Link>
      </div>
    </div>
  );
};


export default Today;
