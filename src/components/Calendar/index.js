import { useContext, useState } from "react";
import clsx from "clsx";
import styles from "./Calendar.module.scss";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { calendarItems } from "../../constants";
import { TodoContext } from "../GlobalContext";
import { useSpring, animated } from "react-spring";

function Calendar() {
  // STATE
  const [menu, setMenu] = useState(false);

  // CONTEXT
  const { setSelectedProject, calendarItem } = useContext(TodoContext);

  // ANIMATED
  const spin = useSpring({
    transform: menu ? "rotate(180deg)" : "rotate(0deg)",
    config: { friction: 10 },
  });

  const menuAnimation = useSpring({
    display: menu ? "block" : "none",
    lineHeight: menu ? "1.2rem" : "0",
  });

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.title}>
          <CalendarDate style={{ marginRight: "2px" }} size="11" />
          <span>Calendar</span>
        </div>
        <div className={styles.btns} onClick={() => setMenu(!menu)}>
          <animated.span style={spin}>
            <CaretUp size="16" />
          </animated.span>
        </div>
      </div>
      <div className={styles.content}>
        <ul>
          {calendarItems.map((calendar) => (
            <animated.li
              style={menuAnimation}
              className={clsx(styles.calendarItem, {
                [styles.active]: calendar === calendarItem.current,
              })}
              key={calendar}
              onClick={() => {
                calendarItem.current = calendar;
                setSelectedProject(calendar);
              }}
            >
              {calendar}
            </animated.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Calendar;
