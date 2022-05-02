import { useContext } from "react";
import styles from "./ListTodo.module.scss";
import { TodoContext } from "../GlobalContext";
import Todo from "../Todo";
import NextSevenDays from "../NextSevenDays";
import Skeleton from "@mui/material/Skeleton";
// import clsx from "clsx";

function ListTodo() {
  // CONTEXT
  const { selectedProject, listTodo } = useContext(TodoContext);
  console.log("listTodo", listTodo);
  return (
    <div className={styles.listTodo}>
      <div className={styles.selectedProject}>
        <span>{selectedProject}</span>
      </div>
      {
        <ul className={styles.contentListTodo}>
          {selectedProject === "next seven days" ? (
            <NextSevenDays listTodo={listTodo} />
          ) : (
            listTodo.map((todo) => <Todo key={todo.id} todo={todo} />)
          )}
        </ul>
      }
    </div>
  );
}
export default ListTodo;
