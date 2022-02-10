import { useState } from "react";
import clsx from "clsx";
import styles from "./Todo.module.scss";
import {
  Circle,
  CheckCircleFill,
  Trash,
  ArrowClockwise,
} from "react-bootstrap-icons";

function Todo({ todo }) {
  const [showTrash, setShowTrash] = useState(false);
  return (
    <li
      className={styles.todo}
      onMouseEnter={() => {
        setShowTrash(true);
      }}
      onMouseLeave={() => {
        setShowTrash(false);
      }}
    >
      <div className={styles.checkTodo}>
        {todo.checked ? (
          <div className={styles.checkedTodo}>
            <CheckCircleFill size="12" color="#bebebe" />
          </div>
        ) : (
          <div className={styles.unCheckedTodo}>
            <Circle size="12" color={todo.color} />
          </div>
        )}
      </div>
      <div
        className={clsx(styles.desTodo, {
          [styles.desTodoCheckColor]: todo.checked,
        })}
      >
        <div className={styles.nameTodo}>
          {todo.text}
          {todo.checked && <div className={styles.line}></div>}
        </div>
        <div
          className={styles.timeTodo}
        >{`${todo.time} - ${todo.projectName}`}</div>
      </div>

      <div className={styles.addAndDeleteTodo}>
        <div className={styles.addToNextToday}>
          {todo.checked && <ArrowClockwise size="12" />}
        </div>
        <div className={styles.deleteTodo}>
          {(todo.checked || showTrash) && <Trash size="12" />}
        </div>
      </div>
    </li>
  );
}
export default Todo;
