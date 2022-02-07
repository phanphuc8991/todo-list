import clsx from "clsx";
import styles from "./Calendar.module.scss";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { calendarItems } from "../../constants";
function Calendar() {
  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.title}>
          <CalendarDate style={{ marginRight: "2px" }} size="11" />
          <span>Calendar</span>
        </div>
        <div className={styles.btns}>
          <span>
            <CaretUp size="16" />
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <ul>
          {calendarItems.map((calendar) => (
            <li key={calendar}>{calendar}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Calendar;
