import { useState } from "react";
import clsx from "clsx";
import styles from "./ListProject.module.scss";
import Project from "../Project";
import AddNewProject from "../AddNewProject";
import { CaretUp, PencilFill, Palette } from "react-bootstrap-icons";

function ListProject() {
  const projects = [
    { id: 1, name: "personal", numberOfTodos: 0 },
    { id: 2, name: "work", numberOfTodos: 2 },
    { id: 3, name: "other", numberOfTodos: 3 },
  ];

  const [showMenu, setShowMenu] = useState(true);
  const [colorEdit, setColorEdit] = useState(false);
  const newColorEdit = colorEdit ? "#1ec94c" : "#000000";

  return (
    <div className={styles.listProject}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Palette style={{ marginRight: "2px" }} size="11" />
          <span>Projects</span>
        </div>
        <div className={styles.btns}>
          <span
            className="editProject"
            onClick={() => setColorEdit(!colorEdit)}
          >
            {showMenu && projects.length >= 0 && (
              <PencilFill color={newColorEdit} size="10" />
            )}
          </span>
          <span className="addProject">
            <AddNewProject size="16" />
          </span>
          <span className="arrow">
            <CaretUp size="16" />
          </span>
        </div>
      </div>
      <div className={styles.content}>
        {projects.map((project) => (
          <Project key={project.id} colorEdit={colorEdit} project={project} />
        ))}
      </div>
    </div>
  );
}
export default ListProject;
