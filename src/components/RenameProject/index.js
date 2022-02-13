import { useState, useContext, useRef } from "react";
import clsx from "clsx";
import styles from "./RenameProject.module.scss";
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
import { TodoContext } from "../GlobalContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function RenameProject({ showModal, setShowModal, project }) {
  const openRef = useRef(false);
  const [valueInput, setValueInput] = useState(project.name);
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  function handleSubmit(e) {
    e.preventDefault();
    const oldValueInput = selectedProject;
    async function updateProject() {
      try {
        const projectsApi = await getDocs(
          query(collection(db, "projects"), where("name", "==", valueInput))
        );

        const newProject = {
          name: valueInput,
          createdAt: project.createdAt,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (projectsApi.empty) {
          openRef.current = true;
          await setDoc(doc(db, "projects", project.id), newProject);
          setSelectedProject(valueInput);
          const todosApi = await getDocs(
            query(
              collection(db, "todos"),
              where("projectName", "==", oldValueInput)
            )
          );
          if (!todosApi.empty) {
            console.log("d");
            todosApi.forEach((todo) => {
              async function updateTodos() {
                await setDoc(doc(db, "todos", todo.id), {
                  ...todo.data(),
                  projectName: valueInput,
                });
              }
              updateTodos();
            });
          }

          setShowModal(false);
          openRef.current = false;
        } else {
          alert("Project already exists");
        }
      } catch (error) {
        setShowModal(false);
      }
    }
    updateProject();
  }
  return (
    <div className="renameProject">
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openRef.current}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <FormProject
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
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
