import clsx from "clsx";
import styles from "./FormProject.module.scss";

function FormProject({
  titleModal,
  valueInput,
  setValueInput,
  valuePlaceholder,
  valueBtn,
}) {
  return (
    <div className={styles.formProject}>
      <h3 className={styles.header}>{titleModal}</h3>
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
        <button>Cancel</button>
        <button>{valueBtn}</button>
      </div>
    </div>
  );
}
export default FormProject;
