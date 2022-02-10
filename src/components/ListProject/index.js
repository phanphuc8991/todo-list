import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./ListProject.module.scss";
import Project from "../Project";
import AddNewProject from "../AddNewProject";
import { CaretUp, PencilFill, Palette } from "react-bootstrap-icons";
import { TodoContext } from "../GlobalContext";

function ListProject() {
  const { listProject } = useContext(TodoContext);

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
            {showMenu && listProject.length >= 0 && (
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
      <ul className={styles.content}>
        {listProject.map((project) => (
          <Project key={project.id} colorEdit={colorEdit} project={project} />
        ))}
      </ul>
    </div>
  );
}
export default ListProject;
