import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "./AddNewTodo.module.scss";
import Modal from "../Modal";
import FormTodo from "../FormTodo";
import { TodoContext } from "../GlobalContext";
function AddNewTodo() {
  const projects = [
    { id: 1, name: "personal", numberOfTodos: 0 },
    { id: 2, name: "work", numberOfTodos: 2 },
    { id: 3, name: "other", numberOfTodos: 3 },
  ];
  const { selectedProject } = useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);
  const [desTodo, setDesTodo] = useState("");
  const [inputDate, setInputDate] = useState(new Date());
  const [inputTime, setInputTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);
  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);
  function handleDateChange(e) {}
  function handleTimeChange() {}

  return (
    <div className={styles.addNewTodo}>
      <div className={clsx(styles["addNewTodo__btnOutside"])}>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          + New Todo
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <FormTodo
          headingTodo="Add a new to do!"
          desTodo={desTodo}
          setDesTodo={setDesTodo}
          inputDate={inputDate}
          handleDateChange={handleDateChange}
          inputTime={inputTime}
          handleTimeChange={handleTimeChange}
          setShowModal={setShowModal}
          showButton={true}
          projects={projects}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          selectedProject={selectedProject}
        />
      </Modal>
    </div>
  );
}
export default AddNewTodo;
