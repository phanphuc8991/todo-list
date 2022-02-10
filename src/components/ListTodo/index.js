import { useContext } from "react";
import clsx from "clsx";
import styles from "./ListTodo.module.scss";
import Todo from "../Todo";
import NextSevenDays from "../NextSevenDays";
import { TodoContext } from "../GlobalContext";

function ListTodo() {
  const { selectedProject, listTodo } = useContext(TodoContext);

  return (
    <div className={styles.listTodo}>
      <div className={styles.selectedProject}>
        <span>{selectedProject}</span>
      </div>
      <ul className={styles.contentListTodo}>
        {selectedProject === "next seven days" ? (
          <NextSevenDays listTodo={listTodo} />
        ) : (
          listTodo.map((todo) => <Todo key={todo.id} todo={todo} />)
        )}
      </ul>
    </div>
  );
}
export default ListTodo;
