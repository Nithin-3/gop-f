import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";

//images
import p1 from "../../assets/image/p1.jpg";
import p2 from "../../assets/image/p2.jpg";
import p3 from "../../assets/image/p3.jpeg";
import p4 from "../../assets/image/p4.jpeg";
import p5 from "../../assets/image/p5.jpeg";
import p6 from "../../assets/image/p6.jpeg";

//icons
import { ReactComponent as ArrowBackIcon } from "../../assets/icons/arrow_left_black_24dp.svg";
import { ReactComponent as ArrowForwardIcon } from "../../assets/icons/arrow_right_black_24dp.svg";
//css
import "./carousel.css";

const breakPoints = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 650, itemsToShow: 2, pagination: false },
  { width: 850, itemsToShow: 3, pagination: false },
  { width: 1150, itemsToShow: 4, pagination: false },
  { width: 1450, itemsToShow: 4, pagination: false },
  { width: 1750, itemsToShow: 4, pagination: false },
];

const breakPoints1 = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 650, itemsToShow: 1, pagination: false },
  { width: 850, itemsToShow: 2, pagination: false },
  { width: 1150, itemsToShow: 2, pagination: false },
  { width: 1450, itemsToShow: 2, pagination: false },
  { width: 1750, itemsToShow: 3, pagination: false },
];

const Carousels = () => {
  const refContainer1 = useRef(null);
  const refContainer2 = useRef(null);

  return (
    <>
      <div className="carousel_section">
        <h1 className="carousel_head">
          Choose The Best Teacher Around The Globe
        </h1>
        <Carousel
          ref={refContainer1}
          breakPoints={breakPoints}
          showArrows={false}
        >
          <div className="carousel_s carousel_center">
            <img src={p1} alt="carousel_pic" />
            <div className="carousel_details carousel_center">
              <div className="carousel_d carousel_center">
                <div className="carousel_flag carousel_center">C</div>{" "}
                &nbsp;&nbsp;&nbsp;
                <h4>Learn Esparanto</h4>
              </div>
              <h5>From $10 per hour</h5>
            </div>
          </div>
          <div className="carousel_s carousel_s2 carousel_center">
            <img src={p2} alt="carousel_pic" />
            <div className="carousel_details carousel_center">
              <div className="carousel_d carousel_center">
                <div className="carousel_flag carousel_center">C</div>{" "}
                &nbsp;&nbsp;&nbsp;
                <h4>Learn Turkish</h4>
              </div>
              <h5>From $20 per hour</h5>
            </div>
          </div>
          <div className="carousel_s carousel_s4 carousel_center">
            <img src={p4} alt="carousel_pic" />
            <div className="carousel_details carousel_center">
              <div className="carousel_d carousel_center">
                <div className="carousel_flag carousel_center">C</div>{" "}
                &nbsp;&nbsp;&nbsp;
                <h4>Learn French</h4>
              </div>
              <h5>From $15 per hour</h5>
            </div>
          </div>
          <div className="carousel_s carousel_s1 carousel_center">
            <img src={p5} alt="carousel_pic" />
            <div className="carousel_details carousel_center">
              <div className="carousel_d carousel_center">
                <div className="carousel_flag carousel_center">C</div>{" "}
                &nbsp;&nbsp;&nbsp;
                <h4>Learn Chinese</h4>
              </div>
              <h5>From $15 per hour</h5>
            </div>
          </div>
          {/* <div className="carousel_s carousel_s2 carousel_center">
            <img src={p6} alt="carousel_pic" />
            <div className="carousel_details carousel_center">
              <div className="carousel_d carousel_center">
                <div className="carousel_flag carousel_center">C</div>{" "}
                &nbsp;&nbsp;&nbsp;
                <h4>Learn English</h4>
              </div>
              <h5>From $351 per hour</h5>
            </div>
          </div>
          <div className="carousel_s carousel_s3 carousel_center">
            <img src={p3} alt="carousel_pic" />
            <div className="carousel_details carousel_center">
              <div className="carousel_d carousel_center">
                <div className="carousel_flag carousel_center">C</div>{" "}
                &nbsp;&nbsp;&nbsp;
                <h4>Learn English</h4>
              </div>
              <h5>From $351 per hour</h5>
            </div>
          </div> */}
        </Carousel>
        <div className="carousel_center">
          {" "}
          <button
            className="carousel_teacher_prev_btn"
            onClick={() => refContainer1.current.slidePrev()}
          >
            <ArrowBackIcon />
          </button>
          <button
            className="carousel_teacher_next_btn"
            onClick={() => refContainer1.current.slideNext()}
          >
            <ArrowForwardIcon />
          </button>
        </div>
        <h1 className="carousel_head carousel_t">Listen from our learners</h1>
        <h3 className="carousel_small">Check out these reviews</h3>
        <Carousel
          ref={refContainer2}
          breakPoints={breakPoints1}
          showArrows={false}
        >
          <div className="carousel_review carousel_center">
            <h3 className="carousel_review_text">
              My overall experience with Neurolingua has been wonderful. They
              have great teachers, and a great platform with great features.
            </h3>
            <h2>Bharath</h2>
          </div>
          <div className="carousel_review carousel_center">
            <h3 className="carousel_review_text">
              It’s great to chat to a native speaker, to activate the target
              language & get all the help the Neurolingua platform offers.
            </h3>
            <h2>Venkat</h2>
          </div>
          <div className="carousel_review carousel_center">
            <h3 className="carousel_review_text">
              My overall experience with Neurolingua has been wonderful. They
              have great teachers, and a great platform with great features.
            </h3>
            <h2>Bharath</h2>
          </div>
          <div className="carousel_review carousel_center">
            <h3 className="carousel_review_text">
              It’s great to chat to a native speaker, to activate the target
              language & get all the help the Neurolingua platform offers.
            </h3>
            <h2>Venkat</h2>
          </div>
          <div className="carousel_review carousel_center">
            <h3 className="carousel_review_text">
              My overall experience with Neurolingua has been wonderful. They
              have great teachers, and a great platform with great features.
            </h3>
            <h2>Bharath</h2>
          </div>
        </Carousel>
        <div className="carousel_center" style={{ marginTop: "40px" }}>
          {" "}
          <button
            className="carousel_teacher_prev_btn"
            onClick={() => refContainer2.current.slidePrev()}
          >
            <ArrowBackIcon />
          </button>
          <button
            className="carousel_teacher_next_btn"
            onClick={() => refContainer2.current.slideNext()}
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousels;
