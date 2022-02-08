import { useState } from "react";
import clsx from "clsx";
import styles from "./AddNewProject.module.scss";
import { Plus } from "react-bootstrap-icons";
import Modal from "../Modal";
import FormProject from "../FormProject";
function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [valueInput, setValueInput] = useState("");
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
        />
      </Modal>
    </div>
  );
}
export default AddNewProject;
