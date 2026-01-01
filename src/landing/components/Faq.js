import React, { useState } from "react";
//images
import arrowDown from '../../assets/icons/down_arrow_icon.svg';
import arrowUp from '../../assets/icons/up-arrow.svg';
import flag from '../../assets/icons/flag_icon.svg';
import dollar from '../../assets/icons/dollar-symbol.png';
import studentGraduate from '../../assets/icons/student.png';
import info from '../../assets/icons/information-button.png';
import edit from '../../assets/icons/editing.png';
import book from '../../assets/icons/open-book.png';
//css
import './Faq.css';

const Faq = () => {
  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(1);

  const setTab = (ind, id) => {
    setShow(ind);
    const cs = document.getElementsByClassName("faq_current")[0];
    cs.classList.remove("faq_current");
    document.getElementById(id).classList.add("faq_current");
  };

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };



  const teacher = [
    {
      ques: "How do I get started?",
      ans: "Click on the become a teacher option and set your account up, add your credentials and qualifications, and the subjects and topics you would like to teach.",
    },
    {
      ques: "How do I update my credentials once I have created my account?",
      ans: "You can update your credentials, add new qualifications and edit the list of subjects and topics you teach using the edit profile option, available on the bottom left corner of your dashboard.",
    },
    {
      ques: "Which platform will the classes happen on?",
      ans: "You need not download any video conferencing applications (like Zoom or Skype). We have a fully featured classroom that fits your needs. You can check out the resources we offer and also add your own library.",
    },
    {
      ques: "Do I get paid for my trial lessons?",
      ans: "No.",
    },
    {
      ques: "A student booked my class, how can I attend it?",
      ans: "Your class will take place right here in the Neurolingua classroom. You don’t need to download any video conference applications like zoom or skype.",
    },
    {
      ques: "Is there a mobile application that I have to install to attend classes?",
      ans: "No. Classes happen on the fully equipped Neurolingua classroom, within the website. You can access the same from a web browser of your choice, from any device, including a desktop, laptop, tablet PC or mobile phone.",
    },
    {
      ques: "What is a coin?",
      ans: "Students have coins as a means of payment. They can pay for your classes with those coins. Every 1000 coin is equal to 1 real US Dollar.",
    },
    {
      ques: "What is a ticket?",
      ans: "As Neurolingua, we want our students to meet you and see how it will be like if they were your student, without any hesitation. As a welcome gift, we grant 3 tickets for 3 trial classes. So, they can try your classes for free",
    },
    {
      ques: "I have a personal emergency; I will not be able to join my class. How can I cancel?",
      ans: "We hope everything is/will be okay with you. Click cancel and inform your student with a text. Students will be able to re-book the class upon your cancellation, and will be issued a full refund.",
    },
    {
      ques: "What happens if my student is late to the class?",
      ans: "We all can be late for various reasons. If they are late by around 5 minutes (sometimes, our computers refresh in inconvenient times, we forget time while we brew coffee) please wait for them, and text them if necessary. If a student informs you about them being late, you may agree on a new starting time (like 10 minutes later than booking time).  In that case, we encourage our teachers to expand their class for a couple of minutes if they see fit and if they don’t have another class afterwards. However, the class officially ends on its original ending time.If your student didn’t show up and they did not inform you or reply to your messages, you may leave the class after half of the class has passed. Once you leave, the class ends. Halfway to a 30-minute class is 15 minutes; a 50-minute class is 25 minutes.",
    },
    {
      ques: "How do I apply to teach?",
      ans: "Sign up for free and submit your application by completing the registration process.",
    },
    {
      ques: "When will I hear back from Neurolingua?",
      ans: "You will receive an email from our team with the application status within 5 working days of submitting your application.",
    },
    {
      ques: "Do I have to be a native speaker?",
      ans: "No! You need not be a native speaker. However, you should have a very good command over the language that you wish to teach, at least C1(Proficiency) level.",
    },
    {
      ques: "Do I have to be a certified teacher?",
      ans: "No, you are not required to be certified. A certification or teaching experience is recommended as it will give you an edge over others for students to choose you. Candidates who neither have a certificate nor a verifiable teaching experience cannot be accepted.",
    },
    {
      ques: "Can I teach more than one language?",
      ans: "Yes, you can teach more than one language provided you have C1 level (Proficiency) and a very good command over these languages.",
    },
    {
      ques: "Who sets the fees for my sessions?",
      ans: "Teachers set their own hourly fee.",
    },
    {
      ques: "How should my profile picture look like?",
      ans: "• Your profile picture should not be too close or too far, it should be of normal size (600x600 pixels). \n • The attire should look not too formal, but it should look friendly, sober, recent, clear and recognizable. \n • The profile picture should be of high quality and not be blurry, lack of light, including other people or group, using filter that disrupts your appearance, or include inappropriate background. \n",
    },
    {
      ques: "How do I get a good profile video?",
      ans: "• A good profile video should be small (3-4 minutes), simple and straight forward. \n • Introduce yourself by mentioning your skills, past experience, and your session plan. \n • Show your face and make sure it is clear, visible and with good lighting and use high quality audio and video. \n • At least one portion of your video should be in the language that you are teaching. \n \n • Discuss about the activity or session in an interactive manner.",
    },
    {
      ques: "How do I add resumé items to my profile?",
      ans: "Your resumé items should include your education details, work experience and certifications. \n You can add your resumé items in “Academic details” under ‘Teacher Details form’ in profile settings.",
    },
    {
      ques: "How do I add accents, dialects and skills to my profile?",
      ans: "You can add your accents, dialects and skills to your profile by following the given steps: \n • Click “Skill” within your ‘Teacher Details form’ in profile settings. \n • Click all the check boxes that apply. \n • Your selected accent, dialect and skill will be automatically updated to your profile. \n • If you did not find your particular accent, dialect or skill, click “Suggest accent, dialect or skill”.",
    },
    {
      ques: "How does Neurolingua work and what should I know?",
      ans: "Neurolingua does not assign students to teachers, neither you can reach out to new students that did not visit your profile. But as a new teacher, you will be given a ranking which will boost your profile and list you in the top teachers’ list. So, you should make sure your profile is attractive to students.",
    },
    {
      ques: "How many private sessions can I take?",
      ans: "There is no limit to the number of sessions you can take.",
    },
    {
      ques: "How do I get students on Neurolingua?",
      ans: "Neurolingua is one of the best 1-on-1 online language-learning platforms. The platform has “built-in tools” to carry out the online learning process smoothly and allows you to connect to a huge community of students.",
    },
    {
      ques: "How do I communicate with students?",
      ans: "Teachers and students can use Neurolingua messenger to communicate from their dashboards.",
    },
    {
      ques: "How much will I earn?",
      ans: "Your earnings depend on the number of sessions you provide, number of students you continue to teach and the hourly fee you set for your sessions.",
    },
    {
      ques: "How do I retain my existing students?",
      ans: "1. Being punctual and never missing a session, will help you retain your students. If you miss a session or appears late, you should resolve this issue as soon as possible. Your ‘unresolved issue’ will be notified on your dashboard. If you have not started any scheduled session, it will also be posted on your dashboard as ‘incomplete sessions’ whether or not it has been reported by your student. \n 2. You can also build your trust among students, by helping them resolve any technical problems relating to the website. \n 3. Create learning materials and plans for each session to help students learn the language easily. \n 4. Add structure to your sessions by using new teaching tools. \n 5. Motivate your students through your teaching skills to buy a bundle of course that you are engaged in. Your students can find your course by entering your name and book a course with you.",
    },
    {
      ques: "How I resolve an issue with my session (teacher)?",
      ans: "You can resolve the issue as follows: \n1. Go to your Dashboard. \n2. Go to the session where the issue occurred and click “Resolve Issue”. \n3. In the pop-up screen, select the relevant issue with your session, or select “other” if your issue is not listed. \n4. You can also include comments about the situation. These comments will be sent to your student. \n5. Click “Next”. \n6. In the pop-up screen, select your desired solution. Solutions may vary depending on the issue reported. \n7. Click “Resolve”, and that’s it! The resolution will be posted in the chat with your student.\n Note: \n• If your student reports the issue it will appear on your Dashboard, if the issue is not reported, you have to report the issue by following the above steps.\n • Issues can only be resolved after the duration of session has passed.\n• If you issue any refund to your student, its cost will be taken from your pay for this session.\n• If you reset the session, your student will be able to reschedule the session and take it again.\n• You will not receive payment for your original session in such case.",
    },
    {
      ques: "What is the Neurolingua Teacher Code of conduct?",
      ans: "TEACHER BEHAVIOUR GUIDELINES:\nThe Teachers are expected to comply with the following guidelines:\n1. To Act as a Brand Ambassador. Teachers are expected to behave in a professional manner as the Teacher represents the Client and its business; and you must not make any disparaging or negative comments about the Service to your students or parents, or guardians of the students. \n2. Not to promote its own business. \n3. Not to share any personal information including email address, phone number, social media, or links to any social media profile in any live teaching platform, during the course of this Agreement. \n4. The lessons should be delivered only on the said website or platform;\n 5. The lessons can be recorded only with express permission of the students. \n6. In the event of connection issues, or technical difficulties, you should remain calm and report the same to the platform and maintain a back-up plan for the sessions. \n7. In the event of missed lessons, only two will be permitted, although we reserve the right to treat and evaluate each case individually.\n8. We reserve the right to choose at our discretion, who serves our customers without any contractual obligations to provide notice of removal. \n Neurolingua’s course of actions and rules: \n 1. All sessions must be taught on the website only using Skype. If you face any issues please contact us at support@neurolingua.in \n2. All communication should be made through Neurolingua website only. Neither teacher nor student is permitted to share their Facebook, WhatsApp, Skype IDs, email, phone numbers or any other personal contact information. \n3. Always maintain etiquettes while interacting with teachers and students.\n 4. Do not seek to influence or try to promote the students to other competing apps and services. \n5. Do not enlist the students or teachers to study or work on competing platforms, websites or schools. \n6. Do not send or receive money off platform, from the students or teachers engaged with the website.",
    },
    {
      ques: "What teacher tools are available on Neurolingua?",
      ans: "The Following useful teaching tools are available on Neurolingua:\n • Screenshare \n• Collaborative Materials (including; files, homework, assignments, session plan, etc.) \n• Record feature \n• Corrections",
    },
    {
      ques: "How do I share my screen?",
      ans: "You can share your screen by following the given steps: \n Start your call by selecting contact on the Recent Chats list and clicking the phone icon in the top-right corner.\n Click the double square “Share Screen” icon on the hideaway toolbar to share the screen.\n",
    },
    {
      ques: "Can I connect with students off Neurolingua’s Site?",
      ans: "No, you cannot connect with students off Neurolingua Website. If you do so your account will be banned.",
    },
    {
      ques: "What should I do if I can’t attend a session a student booked?",
      ans: "If you know in advance i.e. 12 hours away of your session, that you are unable to attend it ‘reschedule’ or ‘unscheduled’ your session. If you are less than 12 hours away of your session you can ‘cancel’ your session.\nNote: It is at teachers’ discretion to provide student partial or full refund or book another session for any missed sessions.",
    },
    {
      ques: "What is the minimum age required to become a teacher at Neurolingua?",
      ans: "You should be at least 18 Years old.",
    },
  ];
  const student = [
    {
      ques: "How do I get started?",
      ans: "If you can see this message; you are ready! Neurolingua sets everything up for you. Just signup and go to the find a course page, select your language and choose your teacher, from among the best language teachers available online! \n All time slots listed are as per your own time zone. You can easily select a slot for your trial. You can also use the messaging feature to contact the teacher if you have any questions that need to be addressed before booking. \nYou don’t need to download any video conferencing applications (like Zoom or Skype). All you need is your enthusiasm! Show up for class and we will welcome you in our fully featured classroom.",
    },
    {
      ques: "Do I have to pay for my first trial lesson?",
      ans: "No. As a welcome gift; 3 tickets that you can use 3 different trial lessons are already issued in your account. Just book your classes and be prepared to begin your journey.",
    },
    {
      ques: "How can I book a class?",
      ans: "Easy! First, choose your teacher here. Go to their profile, select a preferred timeslot and click approve.",
    },
    {
      ques: "Now that I have booked my class, how can I attend it?",
      ans: "Your class will take place right here in the Neurolingua classroom. You don’t need to download any video conferencing applications (like Zoom or Skype).",
    },
    {
      ques: "Is there a mobile application that I have to install to attend classes?",
      ans: "No. Classes happen on the fully equipped Neurolingua classroom, within the website. You can access the same from a web browser of your choice, from any device, including a desktop, laptop, tablet PC or mobile phone.",
    },
    {
      ques: "I see some coins in my dashboard. What are they and what can I do with them?",
      ans: "Coins are legal tender (currency) in Neurolingua! You can save them in your wallet to save time and effort when booking new session. And, yes. You will be earning them all around you can even have free classes with them. \n Don’t forget! Every 1000 coins is equal to 1 real US Dollar.",
    },
    {
      ques: "What is a ticket",
      ans: "Welcome to Neurolingua. As a welcome gift, we got you 3 tickets to have 3 trial classes. So, you can start learning right now before paying for anything! Want more? You can easily purchase tickets for Just 3 USD each only.",
    },
    {
      ques: "What happens if I am late to class?",
      ans: "We can all be late for various reasons. If you are late by around 5 minutes (sometimes, our computers refresh in inconvenient times or we forget time while we brew coffee) your teacher will wait for you in the classroom. \n If you are stuck in traffic or a meeting, you should inform your teacher that you are being late.  You can agree with the teacher to start at a later time, but the class will end at the time it was originally supposed to conclude. If you are late and are unable to inform the teacher, you teacher will wait for you until halfway through the class before leaving the classroom. Once the teacher leaves, the class ends. \n (Halfway to a 30-minute class is 15 minutes; a 50-minute class is 25 minutes).",
    },
    {
      ques: "I booked my class, but now I have something on that time. How can I cancel?",
      ans: "We are sorry to hear that. No worries. Cancelling a class is easy. Make sure you send a message explaining your reason.",
    },
    {
      ques: "What happens if I cancel a class?",
      ans: "We have a 24-hour full refund policy. If you cancel your class 24 (or more) hours before the time of commencement of your class, you will find the option to rebook your class on your dashboard. You will receive a full refund and can reschedule the class without making any payments.  \n If you cancel between 24 hours-12hours to the class time of commencement, you will receive a 50% refund in coins. For example, if you cancel a class, when there are 10 hours left until the start time (or anytime between 12-4), you will receive 50% (half) of its value in coins. A 10 USD class will be refunded as 5000 coins (equivalent to 5 dollars). You can find it in your dashboard the next day.\n If you cancel your class when there are 4 hours (or less) left until the time of commencement, NO REFUND will be issued.",
    },
    {
      ques: "If my teacher cancels a class, what will happen?",
      ans: "Just like students, teachers can have personal emergencies g that prevent them from being present in the class on time. You are free to communicate and find out why they had to cancel the class. Regardless of when the class was cancelled, you can find the option to reschedule it as per your convenience, on your dash board.",
    },
    {
      ques: "If I cancel all my classes, can I get a cash refund?",
      ans: "Receiving refunds in coins is the fastest and easiest way. If you need to receive a refund to your account (or your payment method); you can start the refunding process here and it is assumed that it should take 90 days for the payment to arrive at your bank.",
    },
    {
      ques: "How do I rate my teacher/give feedback after class?",
      ans: "You will find the option rate and review your teacher and provide feedback, in your student dashboard. The said option will be added for each class you have finished soon after the completion of the class.",
    },
    {
      ques: "How do I get in touch with my chosen language tutor?",
      ans: "First you need to sign up for free to book a lesson, ask questions, enquire about availability. then you can send a message or mail from your dashboard directly. ",
    },
    {
      ques: "How do I pay for my language lessons?",
      ans: "After you choose the time of the session, proceed to payment by choosing a payment method. We accept all major cards, PayPal and mobile wallets.",
    },
    {
      ques: "How long does each session last?",
      ans: "Each session is scheduled for 60 minutes.",
    },
    {
      ques: "Can I take a trial session?",
      ans: "Yes. We offer either a free session or discounted evaluation session so you can try our service before you book a session.",
    },
    {
      ques: "How do I purchase a session?",
      ans: "1. Click on “Find” a Course. \n\n2. Choose a language and the course you wish to learn.\n3. Click on the profile of a teacher you wish to learn from.\n4. Go through the teacher’s intro video, profile details, and availability schedule to ascertain if he or she is the right teacher for you.\n5. Click on “Book a session” on the teacher’s profile page.\n6. Choose the number of sessions you would like to buy, and add your payment information.\n7. Confirm your purchase by clicking “Proceed to Checkout”.\n8. You can schedule your session now or at a later date from your dashboard.",
    },
    {
      ques: "What does a trial session include?",
      ans: "Trial session includes the following features: \n\n• How to set up your camera and microphone?\n• How to join a session?\n• How to chat and create vocabulary cards?\n• How to upload PDFs and other session materials?\n• How to create shared text pads with your teacher?",
    },
    {
      ques: "Can I book a session that suits my requirement?",
      ans: "Yes, you can search for a language teacher by availability(time), price, profile and language.",
    },
  ];
  const payment = [
    {
      ques: "How do I get paid?",
      ans: "After the student pays for the session, your earnings will get credited to your Neurolingua account.",
    },
    {
      ques: "When can I withdraw my earnings?",
      ans: "You can withdraw your earnings after 5 working days from the completion for your session/sessions.",
    },
    {
      ques: "How do I withdraw money from my teacher account?",
      ans: "You can withdraw your earnings from your Neurolingua account via PayPal, or net banking.",
    },
    {
      ques: "What is Neurolingua Refund Policy?",
      ans: "You can check Neurolingua’s Refund Policy at the following link: Refund Policy",
    },
    {
      ques: "Will I get a full refund upon the cancellation of a session?",
      ans: "In case of cancellations due to unavoidable reasons, you are entitled to receive full refund if such cancellation is made 24 hours prior to the time of commencement of the scheduled class.",
    },
    {
      ques: "What if I cancel my scheduled class when there is less than 24 hours left for the class to start?",
      ans: "Students are eligible for 50% refund for cancellation between 24-12 hours from the time of commencement of the scheduled class and NO refund for cancellation made 4 (or less) hours prior to the time of commencement of the scheduled class.",
    },
    {
      ques: "How long does it take to get my refund back?",
      ans: "A refund is issued within 60 business days from the date of cancellation.",
    },
    { ques: "Is platform fee refundable?", ans: "No, it is non-refundable." },
    {
      ques: "I want a refund for all my purchases. When will I get it?",
      ans: "The refund is issued within 90 business days. “Platform fee” is non-refundable.",
    },
  ];
  const policy = [
    {
      ques: "What are Neurolingua’s general guidelines?",
      ans: "1. All sessions must be taught on the Neurolingua only. If you face any issues, please contact us at support@neurolingua.in\n 2. All communication should be made through the Neurolingua website only. Neither teacher nor student is permitted to share their Facebook, WhatsApp, Skype IDs, email, phone numbers or any other personal contact information.\n 3. Always maintain etiquettes while interacting with teachers and students.\n 4. Do not seek to influence or induce students to use other competing apps and services or attempt to promote such apps and services.\n 5. Do not enlist students or teachers to study or work on competing platforms, websites or schools.\n 6. Do not send or receive money from students or teachers engaged with the website on other platforms.",
    },
    {
      ques: "What are the actions that would deactivate your account or ban you from accessing it?",
      ans: "1. 	Scheduling and giving sessions to fake students or with yourself.\n 2. 	Any attempt to send or receive money off platform, from the students or teachers engaged with the website.\n 3. 	Any attempt to enlist the students or teachers to study or work on competing platforms, websites or schools.\n 4. 	Sending or requesting Neurolingua teacher or student to share their Facebook, Instagram, WhatsApp, Skype IDs, email, phone numbers or any other personal contact information.\n 5. 	Conducting any sessions off the platform without prior written permission from Neurolingua or its officially authorised representatives.\n 6. 	Sexually coloured remarks, nudity, romantic/sexual advances and/or attempts to use the website as a dating website.\n 7. 	Using abusive, offensive language, threats or bullying teachers or students using the website.\n 8. 	Frequently asking for free sessions and services.\n 9. 	Spamming mails or messages to teachers or students from the website.\n 10.  Performing fraudulent activities such as using fake credit cards or other payment methods.\n 11.  Using fake identities.\n 12.  Engaging in money laundering or theft on the website. ",
    },
    {
      ques: "What is Neurolingua’s Privacy Policy?",
      ans: "You can check Neurolingua’s Privacy Policy at the following link: Privacy policy",
    },
    {
      ques: "How do I request a copy of my personal data from Neurolingua?",
      ans: "You can request a copy of your personal information at support@neurolingua.in or click on the chat bubble at the bottom right corner of your Dashboard.",
    },
    {
      ques: "How do I delete my account and personal details form Neurolingua?",
      ans: "If you wish to delete your account and personal details, send your request at support@neurolingua.in or click on the chat bubble at the bottom right corner of your Dashboard requesting the same.",
    },
    {
      ques: "What is Neurolingua’s Cookie Policy?",
      ans: "You can check Neurolingua’s Cookie Policy at the following link: Cookie Policy ",
    },
    {
      ques: "What is Neurolingua’s Terms of Services?",
      ans: "You can check Neurolingua’s Terms of Services at the following link: Terms of services ",
    },
  ];
  const shooting = [
    {
      ques: "What do I require to teaching?",
      ans: "You will need a laptop or desktop computer with a camera and microphone and internet with good speed. Neurolingua functions smoothly on Google Chrome , Safari, Microsoft Edge or Opera Browser.",
    },
    {
      ques: "What video streaming do I use to teach?",
      ans: "The sessions can be conducted on Neurolingua’s own classroom.",
    },
    {
      ques: "I am having connection issues; how can I resolve it?",
      ans: "a) If you are facing connection issues, it is highly advisable to use a computer instead of mobile application for smooth functioning; or\n b) Log out of your Neurolingua account and log in back to try again; or\n c) Restart your device;\n d) Close other tabs that are not in use. Make sure all other programs or apps are completely closed and not running in the background.\n e) Switch browsers.",
    },
    {
      ques: "What do I do if I forgot my password?",
      ans: "You can reset your password in case you forget it, by simply following the link “forgot password” on your login screen.",
    },
  ];
  const start = [
    {
      ques: "What are Neurolingua’s course of actions and Rules?",
      ans: "1. All sessions must be taught on the website only using Skype. If you face any issues please contact us at support@neurolingua.in\n 2. All communication should be made through Neurolingua website only. Neither teacher nor student is permitted to share their Facebook, WhatsApp, Skype IDs, email, phone numbers or any other personal contact information.\n 3. Always maintain etiquettes while interacting with teachers and students.\n 4. Do not seek to influence or try to promote the students to other competing apps and services.\n 5. Do not enlist the students or teachers to study or work on competing platforms, websites or schools.\n 6. Do not send or receive money off platform, from the students or teachers engaged with the website.",
    },
    {
      ques: "What are the actions that would deactivate or ban you from accessing the Account?",
      ans: "1. Scheduling and giving sessions to fake students or with yourself.\n 2. Any attempt to send or receive money off platform, from the students or teachers engaged with the website.\n 3. Any attempt to enlist the students or teachers to study or work on competing platforms, websites or schools.\n 4. Sending or requesting Neurolingua teacher nor student to share their Facebook, WhatsApp, Skype IDs, email, phone numbers or any other personal contact information.\n 5. Conducting any sessions off the platform without prior written permission from the Neurolingua website.\n 6. Sexual talk, nudity, and/or attempts to use the website as a dating website.\n 7. Using abusive, offensive language, threats or bullying the teachers or students engaged on the website.\n 8. Frequently asking for free sessions and services.\n 9. Spamming mails or messages to teachers or students from the website.\n 10. Performing fraudulent activities such as using fake credit card or other payment methods or using fake identity.\n 11. Engaging in money laundering or theft on the website.",
    },
    {
      ques: "What is Neurolingua’s content policy?",
      ans: "Unless otherwise agreed to in a written agreement between you and Neurolingua that was signed by an authorized representative of Neurolingua, if you submit, transmit, display, perform, post or store Content using Neurolingua Services, you grant Neurolingua and its assigns, to the full extent in perpetuity, an unrestricted, worldwide, irrevocable, fully sub-licensable, non-exclusive, and royalty-free right to use, reproduce, modify, adapt, publish, translate, create derivative work from, distribute, perform and display such Content including, but not limited to, for promoting and redistributing part or all the Neurolingua Services and derivative thereof, and including without limitation any recorded session videos created by Neurolingua or any of Neurolingua’s users in any format, form, media or media channels now known or later developed or discovered.",
    },
    {
      ques: "What is General Data Protection Regulation (GDPR)?",
      ans: "The General Data Protection Regulation (GDPR) is a European regulation designed to unify the privacy rights across the countries of the European Economic Area (EEA) and strengthen individual data subjects’ rights for EEA residents. This includes the ability to correct, delete, and transport personal data on Neurolingua.\n In compliance with the GDPR policies we have updated our Terms of Services, Privacy Policy, and Cookie Policy to be more transparent about how we use and store your personal data on our website.\n Age restrictions, Product features and processing data by Third Party vendors are also in compliance with the GDPR.",
    },
    {
      ques: "What time zone are my sessions listed?",
      ans: "Your sessions are listed in your time zone or the time zone selected by you. You can set your time zone by going to the setting here: (Student).\n Your sessions will be listed on your Neurolingua dashboard near your name and location.\n If your sessions are listed on wrong time zone you will be shown error on your dashboard. If you do not correct your time zone your sessions will be scheduled incorrectly.",
    },
    {
      ques: "Is there any age restriction to use Neurolingua?",
      ans: "YES, in order to use Neurolingua website, you must be above thirteen (13) years of age, unless you are from the European Economic Area (EEA), in which case the following ages of consent shall apply:\n 16 years old:\n • Belgium\n • Bulgaria\n • Croatia\n • Cyprus\n • Estonia\n • France\n • Germany\n • Greece\n • Hungary\n • Italy\n • Latvia\n • Lithuania\n • Luxembourg\n • Malta\n • Netherlands\n • Portugal\n • Romania\n • Slovakia\n • Slovenia 15 years old:\n • Finland\n 14 years old:\n • Austria\n 13 years old:\n • Czech Republic\n • Denmark\n • Ireland\n • Poland\n • Spain\n • Sweden\n • UK\n Neurolingua users under 18 years of age must attend the session under the supervision of their parents. These restrictions are levied to protect the interest of minors.\n *This list is current as of December 2020, to confirm the age of consent in your country, please consult local guidance from the data protection authority where you reside.",
    },
  ];
  const data = [start, teacher, student, payment, shooting, policy];

  return (
    <div className="faq_section">
      <div className="faq_content">
        <p className="faq_home">Home &nbsp;{">"}&nbsp; FAQ's</p>
        <p className="faq_faq">Frequently Asked Question</p>
      </div>
      <div className="faq_question_tab">
          <ul className="faq_center">
            <li
              className="faq_type faq_current faq_center"
              id="start"
              onClick={( ) => setTab(0,"start")}
            >
              <img className="faq_icon_flag" src={flag} alt="errImg"/>
              <span>Getting Started</span>
            </li>
            <li
              className="faq_type faq_center"
              id="teacher"
              onClick={( ) => setTab(1,"teacher")}
            >
              <img className="faq_icons" src={book} alt="errImg"/>
              <span>For Teacher</span>
            </li>
            <li
              className="faq_type faq_center"
              id="student"
              onClick={( ) => setTab(2,"student")}
            >
              <img className="faq_icons" src={studentGraduate} alt="errImg"/>
              <span>For Student</span>
            </li>
            <li
              className="faq_type faq_center"
              id="payment"
              onClick={( ) => setTab(3,"payment")}
            >
              <img className="faq_icons" src={dollar} alt="errImg"/>
              <span>Payment & Refund</span>
            </li>
            <li
              className="faq_type faq_center"
              id="shooting"
              onClick={( ) => setTab(4,"shooting")}
            >
              <img className="faq_icons" src={info} alt="errImg"/>
              <span>Troubleshooting</span>
            </li>
            <li className="faq_type faq_center" id="policy" onClick={( ) => setTab(5,"policy")}>
              <img className="faq_icons" src={edit} alt="errImg"/>
              <span>Policies</span>
            </li>
          </ul>
        <div className="faq_t faq_center">
          <p className="faq_head">Frequently Asked Question</p>
          <div className="faq_ques">
            {data[show].map((item, index) => {
            return (
              <div className="faq_box">
                <p className="faq_question faq_center" onClick={() => toggle(index)}>
                  {item.ques}
                  {clicked === index ? <img className="faq_arrow_up" src={arrowUp} alt="errImg"/> : <img className="faq_arrow_down" src={arrowDown} alt="errImg"/>}
                </p>
                {clicked === index && (
                  <p className="faq_ans">
                    {item.ans}
                  </p>
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
