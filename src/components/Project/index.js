import { useState } from "react";
import clsx from "clsx";
import styles from "./Project.module.scss";
import RenameProject from "../RenameProject";
import { Pencil, XCircle } from "react-bootstrap-icons";

function Project({ project, colorEdit }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <ul className={styles.project}>
      <li>
        <span className="projectTitle">{project.name}</span>
        <div className={styles.btns}>
          {colorEdit ? (
            <div className={styles.editDelete}>
              <div
                className={styles.editProject}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <Pencil size="10" />
              </div>
              <div className={styles.deleteProject}>
                <XCircle size="10" />
              </div>
            </div>
          ) : project.numberOfTodos === 0 ? (
            ""
          ) : (
            <div className={styles.totalTodos}>
              <span>{project.numberOfTodos}</span>
            </div>
          )}
        </div>
      </li>

      <RenameProject
        showModal={showModal}
        project={project}
        setShowModal={setShowModal}
      />
    </ul>
  );
}
export default Project;
