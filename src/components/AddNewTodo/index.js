import React, { useState } from "react";

import clsx from "clsx";
import styles from "./AddNewTodo.module.scss";
import Modal from "../Modal";
import FormTodo from "../FormTodo";

function AddNewTodo() {
  const [showModal, setShowModal] = useState(false);
  const [desTodo, setDesTodo] = useState("");
  const [inputDate, setInputDate] = useState(new Date());
  const [inputTime, setInputTime] = useState(new Date());
  function handleDateChange() {}
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
          desTodo={desTodo}
          setDesTodo={setDesTodo}
          inputDate={inputDate}
          setInputDate={setInputDate}
          inputTime={inputTime}
          setInputTime={setInputTime}
        />
      </Modal>
    </div>
  );
}
export default AddNewTodo;
