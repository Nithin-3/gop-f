import React, { useState } from "react";
// images
import p1 from "../../assets/image/p1.png";
import p2 from "../../assets/image/p2.png";
import p3 from "../../assets/image/p3.png";
import p4 from "../../assets/image/p4.png";
import p5 from "../../assets/image/p5.png";

// flags
import english from '../../assets/flags/english.png';
import chinese from '../../assets/flags/chinese.png';
import spanish from '../../assets/flags/spanish.png';
import french from '../../assets/flags/french.png';
import hindi from '../../assets/flags/hindi.png';
import german from '../../assets/flags/german.png';
import dutch from '../../assets/flags/dutch.png';
import arabic from '../../assets/flags/arabic.png';
import japanese from '../../assets/flags/japanese.png';
import russian from '../../assets/flags/russian.png';
import korean from '../../assets/flags/korean.png';
import portuguese from '../../assets/flags/portuguese.png';
import italian from '../../assets/flags/italian.png';
import romanian from '../../assets/flags/romanian.png';
import swahili from '../../assets/flags/swahili.png';
import thai from '../../assets/flags/thai.png';
import indonesia from '../../assets/flags/indonesia.png';
import turkish from '../../assets/flags/turkish.png';
import vietnamese from '../../assets/flags/vietnamese.png';
import polish from '../../assets/flags/polish.png';
import bengali from '../../assets/flags/bengali.png';
import tamil from '../../assets/flags/tamil.png';
import telugu from '../../assets/flags/telugu.png';
import esperanto from '../../assets/flags/esperanto.png';

import arrowForward from '../../assets/image/Vector-3.png';
// Modal
import Others from "./OtherCountriesModal";

// React Router v6
import { Link, useNavigate } from "react-router-dom";

// css
import './main.css'

const Main = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const langOnDisplay = [
    { value: 'English', flag: english },
    { value: 'Chinese', flag: chinese },
    { value: 'Spanish', flag: spanish },
    { value: 'French', flag: french },
    { value: 'Hindi', flag: hindi },
    { value: 'Japanese', flag: japanese },
  ];

  const langInModal = [
    { value: 'German', flag: german },
    { value: 'Dutch', flag: dutch },
    { value: 'Arabic', flag: arabic },
    { value: 'Russian', flag: russian },
    { value: 'Korean', flag: korean },
    { value: 'Portuguese', flag: portuguese },
    { value: 'Italian', flag: italian },
    { value: 'Romanian', flag: romanian },
    { value: 'Swahili', flag: swahili },
    { value: 'Thai', flag: thai },
    { value: 'Indonesian', flag: indonesia },
    { value: 'Turkish', flag: turkish },
    { value: 'Vietnamese', flag: vietnamese },
    { value: 'Polish', flag: polish },
    { value: 'Bengali', flag: bengali },
    { value: 'Tamil', flag: tamil },
    { value: 'Telugu', flag: telugu },
    { value: 'Esparanto', flag: esperanto },
  ];

  const handleLangClick = (lang) => {
    navigate("/find-teacher", { state: { lang } }); // React Router v6
  };

  return (
    <div className="main_section">
      {showModal && (
        <Others
          setShowModal={setShowModal}
          langInModal={langInModal}
          handleLangClick={handleLangClick}
        />
      )}

      <div className="main_left">
        <h1 className="main_learn_head main_font-face-gm">Learn&nbsp;</h1>
        <h1 className="main_head font-face-lt">any&nbsp;language</h1>
        <br />
        <h1 className="main_head font-face-lt">with native speakers.</h1>
        <h3 className="font-face-lt">Anywhere, anytime. Start learning today!</h3>
        <Link to='/find-teacher' style={{ textDecoration: 'none' }}>
          <button className="main_free font-face-lt">
            Try free lesson &nbsp;
            <img src={arrowForward} alt="arrow" />
          </button>
        </Link>
        <div className="main_pic">
          {[p1, p2, p3, p4, p5].map((img, idx) => (
            <img
              key={idx}
              className={`main_person ${idx > 0 ? `main_p${idx + 1}` : ''}`}
              src={img}
              alt={`main_person_${idx + 1}`}
            />
          ))}
          <h4 className="font-face-lt">1000+ Verified Teachers</h4>
        </div>
      </div>

      <div className="main_right">
        <h3 className="main_l font-face-lt">What do you want to learn today?</h3>
        <div className="main_countries">
          {langOnDisplay.map((item, index) => (
            <div
              key={index}
              className="main_country font-face-lt"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLangClick(item.value)}
            >
              <img src={item.flag} alt={`${item.value}_flag`} />
              {item.value}
            </div>
          ))}
          <div
            className="main_country font-face-lt main_other"
            onClick={() => setShowModal(true)}
          >
            <div className="main_more">...</div>
            Other
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
