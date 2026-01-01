import React from "react";
//images
import v from "../../assets/image/v.png";
import c from "../../assets/image/c.png";
import a from "../../assets/image/a.png";
//icons
import arrowForward from '../../assets/image/Vector-3.png';
//css
import './why.css';

import {Link} from 'react-router-dom';

const Why = () => {
  return (
    <div className="why_section">
      <h1 className="why_learn">Features of Neurolingua</h1>
      {/* <h2 className="learner">
        Safe, effective, affordable learning. For language learners just like
        you.
      </h2> */}
      <div className="why_cards why_center">
        <div className="why_verified why_center">
          <img className="why_card_image" src={v} alt="pic" />
          <h3>Handpicked Teachers</h3>
          <h4>
            We verify and select teachers based on their qualifications, experience, quality and teaching style.
          </h4>
        </div>
        <div className="why_affordable why_center">
          <img className="why_card_image" src={a} alt="pic" />
          <h3>Personalised Learning</h3>
          <h4>
            Live 1-on-1 lessons that are customized to your goals, learning style, and proficiency level.
          </h4>
        </div>
        <div className="why_convenience why_center">
          <img className="why_card_image1" src={c} alt="pic" />
          <h3>Book & Learn On The Go</h3>
          <h4>
            Book your lesson by availability, price, profile & take your lessons on-the-go.
          </h4>
        </div>
      </div>
      <Link to="/find-teacher" style={{ textDecoration: 'none' }}>
        <button className="why_free font-face-lt">
          Book a Free Lesson Now &nbsp;&nbsp;<img className="why_arrow" src={arrowForward} alt="errImg" />
          {/* <i className="fas fa-arrow-alt-circle-right"></i> */}
        </button>
      </Link>
    </div>
  );
};

export default Why;
