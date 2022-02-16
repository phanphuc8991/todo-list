import { useEffect } from "react";
import clsx from "clsx";
import styles from "./FormTodo.module.scss";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Bell, Palette, CalendarDay, Clock, X } from "react-bootstrap-icons";

function FormTodo({
  handleSubmit,
  headingTodo,
  desTodo,
  setDesTodo,
  inputDate,
  handleDateChange,
  inputTime,
  handleTimeChange,
  setShowModal,
  showButton = false,
  listProject = [],
  projectName,
  setprojectName,
  selectedProject,
}) {
  useEffect(() => {
    if (selectedProject !== projectName) {
      setprojectName(selectedProject);
    }
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formInner}>
          {showButton && (
            <div
              className={styles.exitModal}
              onClick={() => setShowModal(false)}
            >
              <X size="20" />
            </div>
          )}

          <div className={styles.headingTodo}>{headingTodo}</div>
          <div className={styles.inputDesTodo}>
            <input
              type="text"
              placeholder="To do ..."
              value={desTodo}
              onChange={(e) => {
                setDesTodo(e.target.value);
              }}
              autoFocus
            />
          </div>
          <div className={clsx(styles.remindMe, styles.generalFlex)}>
            <Bell style={{ marginRight: "5px" }} />
            <span>Remind Me!</span>
          </div>
          <div className={styles.chooseDateAndTime}>
            <div className={styles.chooseDate}>
              <div className={clsx(styles.generalFlex)}>
                <CalendarDay style={{ marginRight: "5px" }} />
                <span>Choose a day</span>
              </div>
              <DatePicker value={inputDate} onChange={handleDateChange} />
            </div>
            <div className={styles.chooseTime}>
              <div className={clsx(styles.generalFlex)}>
                <Clock style={{ marginRight: "5px" }} />
                <span>Choose time</span>
              </div>
              <TimePicker value={inputTime} onChange={handleTimeChange} />
            </div>
          </div>
          <div className={styles.chooseProject}>
            <div className={clsx(styles.generalFlex)}>
              <Palette style={{ marginRight: "5px" }} />
              <span>Choose a project</span>
            </div>

            <ul className="listProject">
              {listProject.length > 0 ? (
                listProject.map((project) => (
                  <li
                    className={clsx({
                      [styles.projectActive]: projectName === project.name,
                    })}
                    onClick={() => {
                      setprojectName(project.name);
                    }}
                    key={project.id}
                  >
                    {project.name}
                  </li>
                ))
              ) : (
                <span style={{ color: "#ff0000" }}>
                  Please add project before proceeding!
                </span>
              )}
            </ul>
          </div>
        </div>
        {showButton && (
          <button type="submit" className={styles.addTodo}>
            <span> + Add to do </span>
          </button>
        )}
      </form>
    </MuiPickersUtilsProvider>
  );
}
export default FormTodo;
