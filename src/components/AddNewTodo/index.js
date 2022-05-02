import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "./AddNewTodo.module.scss";
import { collection, doc, setDoc } from "firebase/firestore";
import firebase, { db } from "../../firebase";
import { TodoContext } from "../GlobalContext";
import { calendarItems } from "../../constants";
import moment from "moment";
import randomColor from "randomcolor";
import Modal from "../Modal";
import FormTodo from "../FormTodo";

function AddNewTodo() {
  // CONTEXT
  const { selectedProject, listProject, auth } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);
  const [desTodo, setDesTodo] = useState("");
  const [inputDate, setInputDate] = useState(new Date());
  const [inputTime, setInputTime] = useState(new Date());
  const [projectName, setprojectName] = useState(selectedProject);

  useEffect(() => {
    setprojectName(selectedProject);
  }, [selectedProject]);

  // METHOD
  function handleSubmit(event) {
    event.preventDefault();

    const checkprojectNameExist = calendarItems.includes(projectName);

    if (desTodo && !checkprojectNameExist) {
      const dataTodo = {
        text: desTodo,
        date: moment(inputDate).format("DD/MM/YYYY"),
        time: moment(inputTime).format("hh:mm A"),
        day: moment(inputDate).format("d"),
        projectName: projectName,
        color: randomColor(),
        checked: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: auth.userId,
      };

      async function addTodo() {
        try {
          const newTodoFef = doc(collection(db, "todos"));
          await setDoc(newTodoFef, dataTodo);
        } catch (error) {
          setShowModal(false);
        }
      }
      addTodo();
      setShowModal(false);
      setDesTodo("");
      setInputDate(new Date());
      setInputTime(new Date());
    } else {
      alert("Please enter information ");
    }
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
          listProject={listProject}
          projectName={projectName}
          setprojectName={setprojectName}
          selectedProject={selectedProject}
        />
      </Modal>
    </div>
  );
}
export default AddNewTodo;
