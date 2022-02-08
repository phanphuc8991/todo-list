import clsx from "clsx";
import styles from "./EditTodo.module.scss";
import FormTodo from "../FormTodo";

function EditTodo() {
  return (
    <div className={styles.editTodo}>
      <FormTodo headingTodo="Edit todo" />
    </div>
  );
}
export default EditTodo;
