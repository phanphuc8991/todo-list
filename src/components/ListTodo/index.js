import { useContext } from "react";
import clsx from "clsx";
import styles from "./ListTodo.module.scss";
import Todo from "../Todo";
import NextSevenDays from "../NextSevenDays";
import { TodoContext } from "../GlobalContext";

function ListTodo() {
  const { selectedProject } = useContext(TodoContext);

  const listTodo = [
    {
      id: "1",
      text: "run",
      time: "10:00 AM",
      date: "03/03/2021",
      day: "6",
      checked: true,
      color: "#00ff00",
      project: "personal",
    },
    {
      id: "2",
      text: "wash dishes",
      time: "10:00 AM",
      date: "03/03/2021",
      day: "1",
      checked: false,
      color: "#00ff00",
      project: "work",
    },
  ];
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
