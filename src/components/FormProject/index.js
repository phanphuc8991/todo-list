import { useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "./FormProject.module.scss";
import { TodoContext } from "../GlobalContext";
import { calendarItems } from "../../constants";
function FormProject({
  titleModal,
  valueInput,
  setValueInput,
  valuePlaceholder,
  valueBtn,
  handleSubmit,
  setShowModal,
}) {
  const { selectedProject, listProject } = useContext(TodoContext);
  useEffect(() => {
    const checkCalendarItems = calendarItems.includes(selectedProject);
    if (listProject.length === 0 || checkCalendarItems === true) {
      setValueInput("");
    } else {
      setValueInput(selectedProject);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.formProject}>
      <div className={styles.header}>{titleModal}</div>
      <div className={styles.inputProject}>
        <input
          type="text"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder={valuePlaceholder}
          autoFocus
        />
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </button>
        <button type="submit">{valueBtn}</button>
      </div>
    </form>
  );
}
export default FormProject;
