import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import UploadMaterial from "./uploadMaterial";

const CreateLesson = ({ showModal, setModal, modalType }) => {
  const materialOptionsRef = useRef();
  const [materialType, setMaterialType] = useState("Link");
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  const handleClickOutside = (e) => {
    if (materialOptionsRef.current && !materialOptionsRef.current.contains(e.target)) {
      materialOptionsRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!showModal) return null;

  return (
    <>
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          <i
            className={`${styles.closeBtn} fas fa-close`}
            onClick={() => setModal(false)}
          ></i>
          <h3 className={styles.heading}>Create {modalType}</h3>

          <textarea
            placeholder="Course Description"
            className={styles.textarea}
          ></textarea>

          {modalType === "Lesson" && (
            <input
              type="text"
              placeholder="Course Level"
              className={styles.input}
            />
          )}

          <div className={styles.chooseFiles}>
            <label className={styles.fileUploadBtn}>
              Cover Image <i className="fas fa-upload"></i>
              <input type="file" style={{ display: "none" }} />
            </label>

            <div className={styles.addMaterialWrapper}>
              <button
                type="button"
                className={styles.addMaterialBtn}
                onClick={() => {
                  if (materialOptionsRef.current) materialOptionsRef.current.style.display = "block";
                }}
              >
                Add Material <i className="fas fa-plus"></i>
              </button>
              <ul className={styles.materialOptions} ref={materialOptionsRef}>
                <li
                  onClick={() => {
                    setMaterialType("Link");
                    setShowMaterialModal(true);
                    materialOptionsRef.current.style.display = "none";
                  }}
                >
                  Link
                </li>
                <li
                  onClick={() => {
                    setMaterialType("File");
                    setShowMaterialModal(true);
                    materialOptionsRef.current.style.display = "none";
                  }}
                >
                  File
                </li>
              </ul>
            </div>
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
  );
};

export default CreateLesson;
