import React from "react";
import styles from "./styles.module.css";

const UploadMaterial = ({ showMaterialModal, setShowMaterialModal, materialType }) => {
  if (!showMaterialModal) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        {materialType === "Link" ? (
          <div className={styles.addLink}>
            <h4>Material Link</h4>
            <input type="url" required placeholder="Enter link" />
            <div className={styles.modalButtons}>
              <button onClick={() => setShowMaterialModal(false)}>Cancel</button>
              <button>Add</button>
            </div>
          </div>
        ) : (
          <div className={styles.addFile}>
            <h4>Upload File</h4>
            <div className={styles.chooseFiles}>
              <button>
                Choose File <i className="fas fa-upload"></i>
                <input type="file" />
              </button>
            </div>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowMaterialModal(false)}>Cancel</button>
              <button>Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadMaterial;
