import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./NextSevenDays.module.scss";
import Todo from "../Todo";
import moment from "moment";

function NextSevenDays({ listTodo }) {
  const days = ["0", "1", "2", "3", "4", "5", "6"];
  const [weekTodos, setWeekTodos] = useState([]);

  useEffect(() => {
    const sortedListTodoByDay = days.map((day) => {
      return {
        todos: listTodo.filter((todo) => todo.day === day),
        number: day,
      };
    });
    const today = moment().format("d");
    const arranged = [
      ...sortedListTodoByDay.slice(today),
      ...sortedListTodoByDay.slice(0, today),
    ];
    setWeekTodos(arranged);
  }, [listTodo]);

  return (
    <div className={styles.nextSevenDays}>
      {weekTodos.map((weekTodo, index) => (
        <div key={index}>
          <div className={styles.day}>
            <div className={styles.nameDay}>
              {moment(weekTodo.number, "d").format("dddd")}
              {moment(weekTodo.number, "d").format("dddd") ===
                moment().format("dddd") && (
                <span style={{ marginLeft: "3px" }}>(Today)</span>
              )}
            </div>
            <div className={styles.totalTodos}>({weekTodo.todos.length})</div>
          </div>
          <div className={styles.todos}>
            <ul>
              {weekTodo.todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
export default NextSevenDays;
