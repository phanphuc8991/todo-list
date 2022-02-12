import { useState } from "react";
import clsx from "clsx";
import styles from "./AddNewProject.module.scss";
import { Plus } from "react-bootstrap-icons";
import Modal from "../Modal";
import FormProject from "../FormProject";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import firebase, { db } from "../../firebase";
function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [valueInput, setValueInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    async function addProject() {
      try {
        const newProjectFef = doc(collection(db, "projects"));
        const projectsApi = await getDocs(
          query(collection(db, "projects"), where("name", "==", valueInput))
        );
        if (projectsApi.empty) {
          await setDoc(newProjectFef, {
            name: valueInput,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          alert("Project already exists");
        }
      } catch (error) {
        setShowModal(false);
      }
    }
    addProject();
    setShowModal(false);
    setValueInput("");
  }
  return (
    <div>
      <div
        className="addNewProject"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <Plus size="16" />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <FormProject
          titleModal="New project!"
          valueInput={valueInput}
          setValueInput={setValueInput}
          valuePlaceholder="project name..."
          valueBtn="+ Add Project"
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}
export default AddNewProject;
