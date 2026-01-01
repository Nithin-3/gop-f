import React from "react";
//images
// import c1 from "../../assets/image/german.svg";
// import c2 from "../../assets/image/swahili.png";
// import c3 from "../../assets/image/arab.png";
// import c4 from "../../assets/image/india1.png";
// import c5 from "../../assets/image/russia.png";
// import c6 from "../../assets/image/korea.png";
// import c7 from "../../assets/image/portguse.svg";
// import c8 from "../../assets/image/italy.svg";
// import c9 from "../../assets/image/romanian.png";
// import c10 from "../../assets/image/thailand.png";
// import c11 from "../../assets/image/indonesia.png";
// import c12 from "../../assets/image/turkey.png";
// import c13 from "../../assets/image/vietnam.png";
// import c14 from "../../assets/image/polish.png";
// import c15 from "../../assets/image/india1.png";
// import c16 from "../../assets/image/esparanto.png";
// import c17 from "../../assets/image/tanzania.png";
//css
import "./OtherCountriesModal.css";

const OtherCountries = ({ setShowModal, langInModal, handleLangClick }) => {
  const closeModal = (e) => {
    if (e.target.id === "outer_div") {
      setShowModal(false);
    }
  };

  return (
    <div className="other_countries_section other_countries_fade" id="outer_div" onClick={closeModal}>
      {/* <div className="" id="outer_div" onClick={closeModal}> */}
      <div className="other_countries_modal-content other_countries__center">
        <span class="close" className="closeBtn" onClick={() => { setShowModal(false); }}>&times;</span>
        <h2 className="other_countries_choose_language">Choose a Language</h2>
        <div className="other_countries_countries">
          {langInModal.map((item, index) => (
            <div key={index} className="other_countries_country font-face-lt"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLangClick(item.value)}
            >
              <img src={item.flag} alt='lang_flag' />
              {item.value}
            </div>
          ))}
          {/* <div className="other_countries_country font-face-lt">
            <img src={c1} alt="o_countries" />
            German
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c2} alt="o_countries" />
            Dutch
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c3} alt="o_countries" />
            Arabic
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c4} alt="o_countries" />
            Sanskrit
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c5} alt="o_countries" />
            Russian
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c6} alt="o_countries" />
            Korean
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c7} alt="countries" />
            Portuguese
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c8} alt="countries" />
            Italian
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c9} alt="o_countries" />
            Romanian
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c17} alt="o_countries" />
            Swahili
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c10} alt="o_countries" />
            Thai
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c11} alt="o_countries" />
            Indonesian
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c12} alt="o_countries" />
            Turkish
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c13} alt="o_countries" />
            Vietnamese
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c14} alt="o_countries" />
            Polish
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c15} alt="o_countries" />
            Bengali
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c15} alt="o_countries" />
            Tamil
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c15} alt="o_countries" />
            Telugu
          </div>
          <div className="other_countries_country font-face-lt">
            <img src={c16} alt="o_countries" />
            Esparanto
          </div> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default OtherCountries;
