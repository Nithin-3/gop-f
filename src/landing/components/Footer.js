import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowDimensions } from "../../utils/util";

// Images
import facebook from "../../assets/image/fb.svg";
import insta from "../../assets/image/insta.svg";
import youtube from "../../assets/image/youtube.svg";
import pinterest from "../../assets/image/pinterest.svg";
import twitter from "../../assets/image/twitter.svg";
import linkedin from "../../assets/image/linkedIn.svg";

// Flags
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

import Others from './OtherCountriesModal';
import './Footer.css';

const Footer = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="footer_section">
      <div className="footer_c footer_center">
        {width >= 600 ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <NeurolinguaColumn />
            <LanguagesColumn />
            <TestPrepColumn />
            <SocialColumn width={width} />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <NeurolinguaColumn />
              <LanguagesColumn />
              <TestPrepColumn />
            </div>
            <div style={{ width: '100%' }}>
              <SocialColumn width={width} />
            </div>
          </>
        )}
      </div>
      <div className="footer_cp">
        <h2>&copy;&nbsp;2021 Neurolingua</h2>
      </div>
    </div>
  );
};

const NeurolinguaColumn = () => (
  <ul className="footer_f">
    <li className="footer_head">Neurolingua</li>
    {[
      { label: "Blog", link: "/blog" },
      { label: "Apply to teach", link: "/apply-teacher" },
      { label: "FAQ", link: "/faq" },
      { label: "Contact", link: "/contact" },
      { label: "Refund Policy", link: "/refund-policy" },
      { label: "Cookie Policy", link: "/cookie-policy" },
      { label: "Terms | Privacy", link: "/privacy-policy" },
    ].map((item, idx) => (
      <li key={`neurolingua-${idx}`}>
        <Link className="footer_link" to={item.link}>{item.label}</Link>
      </li>
    ))}
  </ul>
);

const LanguagesColumn = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const langInModal = [
    { value: 'English', flag: english },
    { value: 'Chinese', flag: chinese },
    { value: 'Spanish', flag: spanish },
    { value: 'French', flag: french },
    { value: 'Hindi', flag: hindi },
    { value: 'Japanese', flag: japanese },
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
    { value: 'Esperanto', flag: esperanto },
  ];

  const handleLangClick = (lang) => {
    navigate("/find-teacher", { state: { lang } });
  };

  const langInFooter = ['English', 'French', 'Spanish', 'German', 'Italian', 'Portuguese'];

  return (
    <ul className="footer_f">
      {showModal && <Others setShowModal={setShowModal} langInModal={langInModal} handleLangClick={handleLangClick} />}
      <li className="footer_head">Languages</li>
      {langInFooter.map((lang) => (
        <li key={`lang-${lang}`} onClick={() => handleLangClick(lang)}>{lang}</li>
      ))}
      <li onClick={() => setShowModal(true)}>All Languages</li>
    </ul>
  );
};

const TestPrepColumn = () => (
  <ul className="footer_f">
    <li className="footer_head">Test Preparation</li>
    {['IELTS', 'TOEFL', 'ICSE', 'CBSE', 'IGCSE', 'IP', 'All Test'].map((test) => (
      <li key={`test-${test}`}>{test}</li>
    ))}
  </ul>
);

const SocialColumn = ({ width }) => {
  const socialLinks = [
    { name: 'Facebook', icon: facebook, url: 'https://www.facebook.com/neurolingua.in' },
    { name: 'Twitter', icon: twitter, url: 'https://twitter.com/neurolingua_in' },
    { name: 'Instagram', icon: insta, url: 'https://www.instagram.com/neurolingua.in/' },
    { name: 'YouTube', icon: youtube, url: 'https://www.youtube.com/channel/UC8PcCNMwz5hpk5Ujj2RewaQ' },
    { name: 'LinkedIn', icon: linkedin, url: 'https://www.linkedin.com/company/neurolingua' },
    { name: 'Pinterest', icon: pinterest, url: 'https://in.pinterest.com/neurolingua' },
  ];

  return (
    <ul className="footer_f" style={{ width: width >= 600 ? 'auto' : '100%' }}>
      <li className="footer_head" style={{ textAlign: 'center' }}>Social</li>
      <div style={{
        display: 'flex',
        flexDirection: width >= 600 ? 'column' : 'row',
        justifyContent: width >= 600 ? 'flex-start' : 'space-around',
        width: '100%'
      }}>
        {socialLinks.map((social) => (
          <li key={`social-${social.name}`}>
            <a className="footer_redirect" href={social.url} target="_blank" rel="noreferrer">
              <img className="footer_social" src={social.icon} alt={social.name} /> {social.name}
            </a>
          </li>
        ))}
      </div>
    </ul>
  );
};

export default Footer;
