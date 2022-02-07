import clsx from "clsx";
import styles from "./FormTodo.module.scss";
import DateFnsUtils from "@date-io/date-fns";

import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Bell, Palette, CalendarDay, Clock } from "react-bootstrap-icons";
function FormTodo({
  desTodo,
  setDesTodo,
  inputDate,
  handleDateChange,
  inputTime,
  handleTimeChange,
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form>
        <div className={styles.formInner}>
          <h3>Add a new to do!</h3>
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
              <li>other</li>
              <li>work</li>
              <li>personal</li>
            </ul>
          </div>
        </div>

        <button type="button" className={styles.addTodo}>
          + Add to do
        </button>
      </form>
    </MuiPickersUtilsProvider>
  );
}
export default FormTodo;
