import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./Todo.module.scss";
import { doc, deleteDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Circle,
  CheckCircleFill,
  Trash,
  ArrowClockwise,
} from "react-bootstrap-icons";
import moment from "moment";
import { TodoContext } from "../GlobalContext";
import { useSpring, animated, useTransition } from "react-spring";

function Todo({ todo }) {
  // STATE
  const [showTrash, setShowTrash] = useState(false);

  // CONTEXT
  const { selectedTodoEdit, setSelectedTodoEdit } = useContext(TodoContext);

  // ANIMATED
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: "0" },
    to: { marginTop: "0", opacity: "1" },
  });

  const transitionTodo = useTransition(todo.checked, {
    from: { transform: "scale(0)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0)" },
  });

  const transitionLine = useTransition(todo.checked, {
    from: { width: "0" },
    enter: { width: "100%" },
    leave: { width: "0" },
  });

  // METHOD
  async function handleCheckedTodo(todo) {
    const newTodo = {
      ...todo,
      checked: true,
    };
    delete newTodo.id;
    await setDoc(doc(db, "todos", todo.id), newTodo);
  }
  async function handleNotCheckTodo(todo) {
    const newTodo = {
      ...todo,
      checked: false,
    };
    delete newTodo.id;
    await setDoc(doc(db, "todos", todo.id), newTodo);
  }
  function handleDeleteTodo(todo) {
    deleteTodo(todo);
    console.log(selectedTodoEdit.createdAt.nanoseconds);
    console.log(todo.createdAt.nanoseconds);

    if (selectedTodoEdit.createdAt.nanoseconds === todo.createdAt.nanoseconds) {
      console.log("bang nhau");
      setSelectedTodoEdit(undefined);
    }
  }
  async function deleteTodo(todo) {
    await deleteDoc(doc(db, "todos", todo.id));
  }
  async function repeatTodo(todo) {
    const nextDate = moment(todo.date, "DD/MM/YYYY").add(1, "d");
    const dataTodo = {
      ...todo,
      date: nextDate.format("DD/MM/YYYY"),
      day: nextDate.format("d"),
      checked: false,
    };
    delete dataTodo.id;
    try {
      const newTodoFef = doc(collection(db, "todos"));
      await setDoc(newTodoFef, dataTodo);
    } catch (error) {
      alert("error", error);
    }
  }
  return (
    <animated.li
      style={fadeIn}
      className={styles.todo}
      onMouseEnter={() => {
        setShowTrash(true);
      }}
      onMouseLeave={() => {
        setShowTrash(false);
      }}
    >
      <div className={styles.checkTodo}>
        {transitionTodo((props, item) =>
          item ? (
            <animated.div
              style={props}
              className={styles.checkedTodo}
              onClick={() => handleNotCheckTodo(todo)}
            >
              <CheckCircleFill size="13" color="#bebebe" />
            </animated.div>
          ) : (
            <animated.div
              className={styles.unCheckedTodo}
              style={props}
              onClick={() => handleCheckedTodo(todo)}
            >
              <Circle size="13" color={todo.color} />
            </animated.div>
          )
        )}
      </div>

      <div
        className={clsx(styles.desTodo, {
          [styles.desTodoCheckColor]: todo.checked,
        })}
        onClick={() => setSelectedTodoEdit(todo)}
      >
        <div className={styles.nameTodo}>
          {todo.text}

          {transitionLine(
            (props, item) =>
              item && (
                <animated.div
                  style={props}
                  className={styles.line}
                ></animated.div>
              )
          )}
        </div>
        <div
          className={styles.timeTodo}
        >{`${todo.time} - ${todo.projectName}`}</div>
      </div>

      <div className={styles.addAndDeleteTodo}>
        <div className={styles.addToNextToday} onClick={() => repeatTodo(todo)}>
          {todo.checked && <ArrowClockwise size="13" />}
        </div>
        <div
          className={styles.deleteTodo}
          onClick={() => handleDeleteTodo(todo)}
        >
          {(todo.checked || showTrash) && <Trash size="13" />}
        </div>
      </div>
    </animated.li>
  );
}
export default Todo;
