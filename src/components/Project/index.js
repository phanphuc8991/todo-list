import { useState, useContext } from "react";
import clsx from "clsx";
import styles from "./Project.module.scss";
import RenameProject from "../RenameProject";
import { Pencil, XCircle } from "react-bootstrap-icons";
import { TodoContext } from "../GlobalContext";
import Dialog from "@mui/material/Dialog";

import Alert from "@mui/material/Alert";

import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
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
  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const { setSelectedProject, selectedProjectDefault } =
    useContext(TodoContext);

  async function deleteProject(project) {
    try {
      await deleteDoc(doc(db, "projects", project.id));
      const queryTodos = query(
        collection(db, "todos"),
        where("projectName", "==", project.name)
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
    <div className={styles.project}>
      <li onClick={() => setSelectedProject(project.name)}>
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
              <div className={styles.deleteProject} onClick={handleOpen}>
                <XCircle size="10" />
              </div>
            </div>
          ) : project.numOfTodos === 0 ? (
            ""
          ) : (
            <div className={styles.totalTodos}>
              <span>{project.numOfTodos}</span>
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
