import { useState } from "react";
import clsx from "clsx";
import styles from "./RenameProject.module.scss";
import Modal from "../Modal";
import FormProject from "../FormProject";

function RenameProject({ showModal, setShowModal, project }) {
  const [valueInput, setValueInput] = useState(project.name);

  return (
    <div className="renameProject">
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <FormProject
          titleModal="Edit project name!"
          valueInput={valueInput}
          setValueInput={setValueInput}
          valuePlaceholder="project name..."
          valueBtn="Confirm"
        />
      </Modal>
    </div>
  );
}
export default RenameProject;
