import React from "react";
import styles from "./styles.module.css";
import { languages } from "../../../../utils/constants";

const AdminLanguages = () => {
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [formValues, setFormValues] = React.useState({
    language: "",
    course: "",
    selectedProgram: "",
  });
  const [programs, setPrograms] = React.useState([]);

  // Update programs whenever language or course changes
  React.useEffect(() => {
    const { language, course } = formValues;
    if (language && course) {
      setPrograms(languages[language]?.[course] || []);
    } else {
      setPrograms([]);
    }
  }, [formValues.language, formValues.course]);

  const addProgram = (e) => {
    e.preventDefault();
    const programToAdd = formValues.selectedProgram;
    if (!programToAdd) return;

    if (!selectedPrograms.includes(programToAdd)) {
      setSelectedPrograms([...selectedPrograms, programToAdd]);
    }
  };

  const removeProgram = (program) => {
    setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
  };

  return (
    <main className={styles.mainSection}>
      <h3>Languages</h3>

      <form className={styles.createLanguageForm}>
        {/* Language */}
        <div className={styles.formGroup}>
          <label>Language</label>
          <select
            value={formValues.language}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                language: e.target.value,
                selectedProgram: "",
              })
            }
          >
            <option value="">Select Language</option>
            {Object.keys(languages).map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Course */}
        <div className={styles.formGroup}>
          <label>Course</label>
          <select
            value={formValues.course}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                course: e.target.value,
                selectedProgram: "",
              })
            }
          >
            <option value="">Select Course</option>
            <option value="Academics">Academics</option>
            <option value="Spoken Languages">Spoken Languages</option>
            <option value="Test Preparation">Test Preparation</option>
          </select>
        </div>

        {/* Program */}
        <div className={styles.formGroup}>
          <label>Program</label>
          <div className={styles.programInput}>
            <select
              value={formValues.selectedProgram}
              onChange={(e) =>
                setFormValues({ ...formValues, selectedProgram: e.target.value })
              }
            >
              <option value="">Select Program</option>
              {programs.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
            <button type="button" onClick={addProgram}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Selected Programs */}
        <div className={styles.selectedPrograms}>
          {selectedPrograms.map((program) => (
            <div key={program} className={styles.program}>
              <p>{program}</p>
              <i
                className="fas fa-trash"
                onClick={() => removeProgram(program)}
              ></i>
            </div>
          ))}
        </div>
      </form>

      {/* Create Button */}
      <div className={styles.buttonGroup}>
        <button type="button">Create</button>
      </div>
    </main>
  );
};

export default AdminLanguages;
