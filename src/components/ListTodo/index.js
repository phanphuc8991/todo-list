import clsx from 'clsx'
import styles from "./ListTodo.module.scss";
import Todo from "../Todo";
import NextSevenDays from "../NextSevenDays";

function ListTodo() {
    return (
        <div className={styles.listTodo}>
           
          
           <Todo/>
           <NextSevenDays/>
            </div>
    )
}
export default ListTodo;