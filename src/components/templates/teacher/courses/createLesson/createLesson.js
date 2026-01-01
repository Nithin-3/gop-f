import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import UploadMaterial from "./uploadMaterial";

const CreateLesson = (props) => {
  const materialOptions = useRef();
  const [materialType, setMaterialType] = useState("Link");
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  const handleClickOutside = (e) => {
    if (materialOptions.current && !materialOptions.current.contains(e.target)) {
      materialOptions.current.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return props.showModal ? (
    <>
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          {/* Header */}
          <i
            className={`${styles.closeBtn} fas fa-close`}
            onClick={() => props.setModal(false)}
          ></i>
          <h3 className={styles.heading}>Create {props.modalType}</h3>

          {/* Body */}
          <textarea placeholder="Course Description"></textarea>
          {props.modalType === "Lesson" && (
            <input type="text" placeholder="Course Level" />
          )}

          <div className={styles.chooseFiles}>
            <button>
              Cover Image <i className="fas fa-upload"></i>
              <input type="file" />
            </button>
            <button
              onClick={() => {
                if (materialOptions.current) materialOptions.current.style.display = "block";
              }}
            >
              Add Material <i className="fas fa-add"></i>
              <ul className={styles.materialOptions} ref={materialOptions}>
                <li
                  onClick={() => {
                    setMaterialType("Link");
                    setShowMaterialModal(true);
                  }}
                >
                  Link
                </li>
                <li
                  onClick={() => {
                    setMaterialType("File");
                    setShowMaterialModal(true);
                  }}
                >
                  File
                </li>
              </ul>
            </button>
          </div>

          <button className={styles.submitButton}>
            Submit <i className="fas fa-check-circle"></i>
          </button>
        </div>
      </div>

      <UploadMaterial
        materialType={materialType}
        showMaterialModal={showMaterialModal}
        setShowMaterialModal={setShowMaterialModal}
      />
    </>
  ) : null;
};

export default CreateLesson;
