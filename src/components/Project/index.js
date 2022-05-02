import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./Project.module.scss";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSpring, animated, useTransition } from "react-spring";
import { Pencil, XCircle } from "react-bootstrap-icons";
import { TodoContext } from "../GlobalContext";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import RenameProject from "../RenameProject";

// STYLE
const styleButtonDialog = {
  width: "50%",
  border: "none",
  backgroundColor: "#0080ff",
  borderBottomRightRadius: "2px",
  color: "white",
  padding: "4px",
  cursor: "pointer",
};
const styleDesDialog = {
  fontSize: "1.1rem",
  display: "block",
};

function Project({ project, colorEdit }) {
  // STATE
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // CONTEXT
  const { setSelectedProject, selectedProjectDefault, calendarItem, auth } =
    useContext(TodoContext);

  // ANIMATED
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: "0" },
    to: { marginTop: "0", opacity: "1" },
  });

  const transitionProject = useTransition(colorEdit, {
    from: { opacity: "0", right: "-20px" },
    enter: { opacity: "1", right: "0" },
    leave: { opacity: "0", right: "-20px" },
  });

  // METHOD
  async function deleteProject(project) {
    try {
      await deleteDoc(doc(db, "projects", project.id));
      const queryTodos = query(
        collection(db, "todos"),
        where("projectName", "==", project.name),
        where("userId", "==", auth.userId)
      );
      const querySnapshotTodos = await getDocs(queryTodos);

      querySnapshotTodos.forEach((todo) => {
        deleteDoc(doc(db, "todos", todo.id));
      });
      setSelectedProject(selectedProjectDefault);
    } catch (error) {
      alert("Error do not delete");
    }
  }
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <animated.div
        style={fadeIn}
        className={styles.project}
        onClick={() => {
          calendarItem.current = project.name;
          setSelectedProject(project.name);
        }}
      >
        <Dialog open={open} onClose={handleClose}>
          <div>
            <Alert severity="warning">
              <span style={styleDesDialog}>
                When delele this project {project.name}
              </span>
              <span style={styleDesDialog}>
                It will all todos under the {project.name}
              </span>
            </Alert>
          </div>
          <div style={{ display: "flex" }}>
            <button
              className={styles.btnDialog}
              style={{
                ...styleButtonDialog,
                backgroundColor: "#abadac",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              style={{
                ...styleButtonDialog,
                backgroundColor: "#0080ff",
              }}
              type="submit"
              onClick={() => {
                deleteProject(project);
              }}
            >
              Delete
            </button>
          </div>
        </Dialog>
        <span
          className={clsx(styles.projectTitle, {
            [styles.active]: calendarItem.current === project.name,
          })}
        >
          {project.name}
        </span>
        <div className={styles.btns}>
          {transitionProject((props, item) =>
            item ? (
              <animated.div style={props} className={styles.editDelete}>
                <div
                  className={styles.editProject}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <Pencil size="10" />
                </div>
                <div className={styles.deleteProject} onClick={handleOpen}>
                  <XCircle size="10" />
                </div>
              </animated.div>
            ) : project.numOfTodos === 0 ? (
              ""
            ) : (
              <animated.div style={props} className={styles.totalTodos}>
                <span>{project.numOfTodos}</span>
              </animated.div>
            )
          )}
        </div>
      </animated.div>
      <RenameProject
        showModal={showModal}
        project={project}
        setShowModal={setShowModal}
      />
    </>
  );
}
export default Project;
