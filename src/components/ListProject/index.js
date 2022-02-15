import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./ListProject.module.scss";
import Project from "../Project";
import AddNewProject from "../AddNewProject";
import { CaretUp, PencilFill, Palette } from "react-bootstrap-icons";
import { TodoContext } from "../GlobalContext";
import { useSpring, animated } from "react-spring";
function ListProject() {
  // STATE
  const { listProject } = useContext(TodoContext);
  const [colorEdit, setColorEdit] = useState(false);
  const newColorEdit = colorEdit ? "#1ec94c" : "#000000";
  const [menu, setMenu] = useState(false);
  // ANIMATION
  const spin = useSpring({
    transform: menu ? "rotate(180deg)" : "rotate(0deg)",
    config: { friction: 10 },
  });

  const menuAnimation = useSpring({
    display: menu ? "block" : "none",
    height: menu ? "16px" : "0",
  });

  return (
    <div className={styles.listProject}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Palette style={{ marginRight: "2px" }} size="11" />
          <span>Projects</span>
        </div>
        <div className={styles.btns}>
          {listProject.length > 0 && (
            <span
              className="editProject"
              onClick={() => setColorEdit(!colorEdit)}
            >
              <PencilFill color={newColorEdit} size="10" />
            </span>
          )}

          <span className="addProject">
            <AddNewProject size="16" />
          </span>
          <animated.span
            style={spin}
            className="arrow"
            onClick={() => setMenu(!menu)}
          >
            <CaretUp size="16" />
          </animated.span>
        </div>
      </div>
      <ul className={styles.content}>
        {listProject.map((project) => (
          <animated.li key={project.id} style={menuAnimation}>
            <Project key={project.id} colorEdit={colorEdit} project={project} />
          </animated.li>
        ))}
      </ul>
    </div>
  );
}
export default ListProject;
