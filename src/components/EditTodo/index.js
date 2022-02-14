import { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "./EditTodo.module.scss";
import FormTodo from "../FormTodo";
import { TodoContext } from "../GlobalContext";
import moment from "moment";
import { doc, setDoc } from "firebase/firestore";
import firebase, { db } from "../../firebase";
function EditTodo() {
  // STATES
  const [desTodo, setDesTodo] = useState("");
  const [inputDate, setInputDate] = useState(new Date());
  const [inputTime, setInputTime] = useState(new Date());
  const [projectName, setprojectName] = useState("");
  // CONTEXT
  const { selectedTodoEdit, selectedProject, listProject } =
    useContext(TodoContext);
  useEffect(() => {
    if (selectedTodoEdit) {
      setDesTodo(selectedTodoEdit.text);
      setInputDate(moment(selectedTodoEdit.date, "DD/MM/YYYY"));
      setInputTime(moment(selectedTodoEdit.time, "hh:mm A"));
      setprojectName(selectedTodoEdit.projectName);
    }
  }, [selectedTodoEdit]);

  useEffect(() => {
    if (selectedTodoEdit) {
      async function editTodo() {
        const newProject = {
          ...selectedTodoEdit,
          text: desTodo,
          date: moment(inputDate).format("DD/MM/YYYY"),
          time: moment(inputTime).format("hh:mm A"),
          projectName: projectName,
          // updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        delete newProject.id;
        await setDoc(doc(db, "todos", selectedTodoEdit.id), newProject);
      }
      editTodo();
    }
  }, [desTodo, inputDate, inputTime, projectName]);

  function handleDateChange(date) {
    setInputDate(date);
  }
  function handleTimeChange(time) {
    setInputTime(time);
  }
  return (
    <>
      {selectedTodoEdit && (
        <div className={styles.editTodo}>
          <FormTodo
            headingTodo="Edit todo"
            desTodo={desTodo}
            setDesTodo={setDesTodo}
            inputDate={inputDate}
            handleDateChange={handleDateChange}
            inputTime={inputTime}
            handleTimeChange={handleTimeChange}
            selectedProject={selectedProject}
            projectName={projectName}
            setprojectName={setprojectName}
            listProject={listProject}
          />
        </div>
      )}
    </>
  );
}
export default EditTodo;
