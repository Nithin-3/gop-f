import React, { useState } from "react";
// Images
import flexibilityImg from "../../assets/image/flexibilityImg.png";
import buildImg from "../../assets/image/buildImg.png";
import communityImg from "../../assets/image/communityImg.png";
import earnImg from "../../assets/image/earnImg.png";
import securePaymentImg from "../../assets/image/securePaymentImg.png";
import workImg from "../../assets/image/workImg.png";
import arrowForward from "../../assets/image/Vector-3.png";
import arrowDown from "../../assets/icons/down_arrow_icon.svg";
import arrowUp from "../../assets/icons/up-arrow.svg";

// React Router v6
import { useNavigate } from 'react-router-dom';

// CSS
import "./Teacher.css";

const Teacher = () => {
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate(); // React Router v6

  const toggle = (index) => {
    setClicked(clicked === index ? null : index);
  };

  return (
    <div className="teacher_section">
      <div className="teacher_main_banner">
        <span className="teacher_banner_line">
          <span className="teacher_paid">Get paid</span> to help others&nbsp;
        </span>
        <span>speak your language</span>
        <p>connect with new students across the globe.</p>
        <button
          className="teacher_apply_btn"
          onClick={() => navigate('/auth/signup', { state: { role: 'Teacher' } })}
        >
          Apply Now &nbsp; <img src={arrowForward} alt="arrow" />
        </button>
      </div>

      <div className="teacher_earn teacher_center">
        <span>
          <p>Earn from home</p> by teaching students
          <br /> across the globe
        </span>
        <div className="teacher_cards teacher_center">
          {[{
            img: flexibilityImg,
            head: "Ultimate Flexibility",
            body: "Teach full-time, part-time, or occasionally and set your own hours and session fees."
          }, {
            img: workImg,
            head: "Work from anywhere",
            body: "Teach students anywhere you live, at any time."
          }, {
            img: earnImg,
            head: "Earn from home",
            body: "Set your own hourly fees and cash out your earnings at any time."
          }, {
            img: securePaymentImg,
            head: "Secure payments",
            body: "You will receive your earnings directly from your Neurolingua account to your bank account."
          }, {
            img: buildImg,
            head: "Build your Identity",
            body: "Utilize your skills and time to teach students online and build your own identity."
          }, {
            img: communityImg,
            head: "International community",
            body: "Access to international students across the globe."
          }].map((card, idx) => (
            <div key={idx} className="teacher_card teacher_center">
              <img className="teacher_card_image" src={card.img} alt="img" />
              <div className="teacher_card_right">
                <p className="teacher_card_head">{card.head}</p>
                <p className="teacher_card_body">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="teacher_video_container">
        <div className="teacher_section_title">
          <h2>How It Works?</h2>
        </div>
        <div className="teacher_row teacher_center">
          {[{
            icon: "1",
            bgClass: "teacher_bg1",
            title: "Sign up for free",
            body: "Create your profile and submit for approval. Once it is approved you will be listed on our website."
          }, {
            icon: "2",
            bgClass: "teacher_bg2",
            title: "Introduction Video",
            body: "Record a video explaining about yourself, your teaching experience and skill set."
          }, {
            icon: "3",
            bgClass: "teacher_bg3",
            title: "Enhance your student base",
            body: "Start teaching on Neurolingua platform, reach out to more number of students across the globe."
          }].map((step, idx) => (
            <div key={idx} className={`teacher_row_card teacher_center`}>
              <div className={`teacher_card_icon ${step.bgClass} teacher_center`}>{step.icon}</div>
              <div className="teacher_card_content teacher_center">
                <span>{step.title}</span>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="teacher_video">
          <iframe
            src="https://www.youtube.com/embed/3zPNkKS98NY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="teacher_faq teacher_center">
        <p className="teacher_faq_head">Frequently Asked Questions</p>
        {[{
          title: "Application",
          questions: [
            {
              ques: "How do I apply to teach?",
              ans: "Sign up for free and submit your application by completing the registration process."
            },
            {
              ques: "When I will hear back from Neurolingua?",
              ans: "You will receive an email from our team with the application status within 5 working days of submitting your application."
            }
          ]
        }, {
          title: "Teaching",
          questions: [
            {
              ques: "Who set fees for my sessions?",
              ans: "Teachers set their own hourly fee."
            },
            {
              ques: "How many private sessions can I take?",
              ans: "There is no limit to the number of sessions you can take."
            },
            {
              ques: "How do I get students on Neurolingua?",
              ans: "Neurolingua is one of the best 1-on-1 online language-learning platforms. The platform has “built-in tools” to carry out the online learning process smoothly and allows you to connect to a huge community of students."
            }
          ]
        }, {
          title: "Payment",
          questions: [
            {
              ques: "How do I get paid?",
              ans: "After the student pays for the session, your earnings will get credited to your Neurolingua account."
            },
            {
              ques: "When can I withdraw my earnings?",
              ans: "You can withdraw your earnings after 5 working days from the completion for your session/sessions."
            },
            {
              ques: "How do I withdraw money from my teacher account?",
              ans: "You can withdraw your earnings from your Neurolingua account via PayPal, or net banking."
            }
          ]
        }].map((section, sIdx) => (
          <div key={sIdx} className={`teacher_faq_ques ${sIdx === 2 ? 'teacher_teacher_faq_mar' : ''}`}>
            <p className="teacher_faq_title">{section.title}</p>
            {section.questions.map((q, idx) => (
              <div key={idx} className="teacher_faq_box">
                <p className="teacher_ques teacher_center" onClick={() => toggle(sIdx*3 + idx + 1)}>
                  {q.ques}
                  {clicked === sIdx*3 + idx + 1 ? (
                    <img className="teacher_arrow_up" src={arrowUp} alt="up" />
                  ) : (
                    <img className="teacher_arrow_down" src={arrowDown} alt="down" />
                  )}
                </p>
                {clicked === sIdx*3 + idx + 1 && <p className="teacher_ans">{q.ans}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="teacher_teach">
        <h1>Teach a language today</h1>
        <h3>Get ready to learn and speak confidently with our online language teacher</h3>
        <button
          className="teacher_free_btn"
          onClick={() => navigate('/auth/signup', { state: { role: 'Teacher' } })}
        >
          Apply Now&nbsp;&nbsp;
          <img src={arrowForward} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Teacher;
