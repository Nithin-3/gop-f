import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useWindowDimensions } from "../../../../utils/util";
import { getTeacherData } from "../../../../store/actions/teacher";

import BasicInfo from "./basicInfo/basicInfo";
import Certifications from "./certifications/certifications";
import LanguageSkills from "./languageSkills/languageSkill";
import ChangePassword from "./password/password";
import SelfIntro from "./selfIntro/selfIntro";

import styles from "./styles.module.css";

const TeacherSettings = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const [myDetails, setMyDetails] = useState();
  const [apiCalled, setApiCalled] = useState(false);

  // Tab buttons
  const basicInfoButton = useRef();
  const languageSkillsButton = useRef();
  const selfIntroButton = useRef();
  const passwordButton = useRef();
  const certificationsButton = useRef();

  // Tab content
  const basicInfoTab = useRef();
  const languageSkillsTab = useRef();
  const selfIntroTab = useRef();
  const passwordTab = useRef();
  const certificationsTab = useRef();

  const tabList = [
    { btnRef: basicInfoButton, tabRef: basicInfoTab },
    { btnRef: languageSkillsButton, tabRef: languageSkillsTab },
    { btnRef: selfIntroButton, tabRef: selfIntroTab },
    { btnRef: passwordButton, tabRef: passwordTab },
    { btnRef: certificationsButton, tabRef: certificationsTab },
  ];

  useEffect(() => {
    setApiCalled(true);
    async function fetchTeacherDetails() {
      try {
        const result = await dispatch(getTeacherData());
        setMyDetails(result);
        activateTab(basicInfoButton);
      } catch (err) {
        toast.error("Failed to fetch your details");
        console.error(err);
      }
    }
    fetchTeacherDetails();
  }, [dispatch]);

  const activateTab = (ref) => {
    tabList.forEach(({ btnRef, tabRef }) => {
      if (btnRef.current && tabRef.current) {
        btnRef.current.classList.remove(styles.active);
        tabRef.current.style.display = "none";

        if (btnRef === ref) {
          btnRef.current.classList.add(styles.active);
          tabRef.current.style.display = "block";
        }
      }
    });
  };

  return (
    <main className={styles.mainSection} style={{ width: width >= 992 ? "100%" : "" }}>
      <div className={styles.tabsContainer}>
        <button ref={basicInfoButton} className={styles.active} onClick={() => activateTab(basicInfoButton)}>
          Basic Info
        </button>
        <button ref={languageSkillsButton} onClick={() => activateTab(languageSkillsButton)}>
          Language Skills
        </button>
        <button ref={selfIntroButton} onClick={() => activateTab(selfIntroButton)}>
          Self Intro
        </button>
        <button ref={passwordButton} onClick={() => activateTab(passwordButton)}>
          Password
        </button>
        <button ref={certificationsButton} onClick={() => activateTab(certificationsButton)}>
          Resume
        </button>
      </div>

      <div className={styles.tabs}>
        <div ref={basicInfoTab} className={styles.tab}>
          <BasicInfo myDetails={myDetails} setApiCalled={setApiCalled} />
        </div>
        <div ref={languageSkillsTab} className={styles.tab}>
          <LanguageSkills myDetails={myDetails} setApiCalled={setApiCalled} />
        </div>
        <div ref={selfIntroTab} className={styles.tab}>
          <SelfIntro myDetails={myDetails} setApiCalled={setApiCalled} />
        </div>
        <div ref={passwordTab} className={styles.tab}>
          <ChangePassword />
        </div>
        <div ref={certificationsTab} className={styles.tab}>
          <Certifications myDetails={myDetails} setApiCalled={setApiCalled} />
        </div>
      </div>
    </main>
  );
};

export default TeacherSettings;
