import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./Todo.module.scss";
import {
  Circle,
  CheckCircleFill,
  Trash,
  ArrowClockwise,
} from "react-bootstrap-icons";
import { doc, deleteDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import { TodoContext } from "../GlobalContext";
function Todo({ todo }) {
  // STATE
  const [showTrash, setShowTrash] = useState(false);

  // CONTEXT
  const { selectedTodoEdit, setSelectedTodoEdit } = useContext(TodoContext);

  async function handleCheckedTodo(todo) {
    await setDoc(doc(db, "todos", todo.id), {
      ...todo,
      checked: true,
    });
  }
  async function handleNotCheckTodo(todo) {
    await setDoc(doc(db, "todos", todo.id), {
      ...todo,
      checked: false,
    });
  }
  function handleDeleteTodo(todo) {
    deleteTodo(todo);
    console.log("selectedTodoEdit", selectedTodoEdit);
    console.log("todo", todo);
    if (selectedTodoEdit.id === todo.id) {
      console.log("d");
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
          <div
            className={styles.checkedTodo}
            onClick={() => handleNotCheckTodo(todo)}
          >
            <CheckCircleFill size="12" color="#bebebe" />
          </div>
        ) : (
          <div
            className={styles.unCheckedTodo}
            onClick={() => handleCheckedTodo(todo)}
          >
            <Circle size="12" color={todo.color} />
          </div>
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
          {todo.checked && <div className={styles.line}></div>}
        </div>
        <div
          className={styles.timeTodo}
        >{`${todo.time} - ${todo.projectName}`}</div>
      </div>

      <div className={styles.addAndDeleteTodo}>
        <div className={styles.addToNextToday} onClick={() => repeatTodo(todo)}>
          {todo.checked && <ArrowClockwise size="12" />}
        </div>
        <div
          className={styles.deleteTodo}
          onClick={() => handleDeleteTodo(todo)}
        >
          {(todo.checked || showTrash) && <Trash size="12" />}
        </div>
      </div>
    </li>
  );
}
export default Todo;
