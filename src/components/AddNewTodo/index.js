import React, { useState, useContext, useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import clsx from "clsx";
import styles from "./AddNewTodo.module.scss";
import Modal from "../Modal";
import FormTodo from "../FormTodo";
import { TodoContext } from "../GlobalContext";
import moment from "moment";
import randomColor from "randomcolor";
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
  const [projectName, setprojectName] = useState(selectedProject);
  useEffect(() => {
    setprojectName(selectedProject);
  }, [selectedProject]);

  function handleSubmit(event) {
    event.preventDefault();

    const dataTodo = {
      text: desTodo,
      date: moment(inputDate).format("DD/MM/YYYY"),
      time: moment(inputTime).format("hh:mm A"),
      day: moment(inputDate).format("d"),
      projectName: projectName,
      color: randomColor(),
      checked: false,
    };

    async function addTodo() {
      try {
        const newTodoFef = doc(collection(db, "todos"));

        const todosApi = await setDoc(newTodoFef, dataTodo);
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
    addTodo();
  }

  function handleDateChange(date) {
    setInputDate(date);
  }
  function handleTimeChange(time) {
    setInputTime(time);
  }

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
          handleSubmit={handleSubmit}
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
          projectName={projectName}
          setprojectName={setprojectName}
          selectedProject={selectedProject}
        />
      </Modal>
    </div>
  );
}
export default AddNewTodo;
