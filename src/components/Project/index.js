import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./Project.module.scss";
import RenameProject from "../RenameProject";
import { Pencil, XCircle } from "react-bootstrap-icons";
import { TodoContext } from "../GlobalContext";

function Project({ project, colorEdit }) {
  const [showModal, setShowModal] = useState(false);
  const { setSelectedProject } = useContext(TodoContext);
  return (
    <div className={styles.project}>
      <li onClick={() => setSelectedProject(project.name)}>
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
    </div>
  );
}
export default Project;
