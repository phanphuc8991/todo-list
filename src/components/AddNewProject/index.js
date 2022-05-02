import { useState, useContext } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import firebase, { db } from "../../firebase";
import { calendarItems } from "../../constants";
import { Plus } from "react-bootstrap-icons";
import Modal from "../Modal";
import FormProject from "../FormProject";
import { TodoContext } from "../GlobalContext";

function AddNewProject() {
  // CONTEXT
  const { auth } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);
  const [valueInput, setValueInput] = useState("");

  // METHOD
  function handleSubmit(event) {
    event.preventDefault();
    if (valueInput) {
      async function addProject() {
        try {
          const newProjectFef = doc(collection(db, "projects"));
          const projectsApi = await getDocs(
            query(
              collection(db, "projects"),
              where("name", "==", valueInput),
              where("userId", "==", auth.userId)
            )
          );
          const checkInputSameCalendar = calendarItems.includes(valueInput);
          if (projectsApi.empty && !checkInputSameCalendar) {
            await setDoc(newProjectFef, {
              name: valueInput,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              userId: auth.userId,
            });
            setShowModal(false);
            setValueInput("");
          } else {
            alert("Project already exists or Same with calendar");
          }
        } catch (error) {
          setShowModal(false);
        }
      }
      addProject();
    } else {
      alert("Please enter information");
    }
  }

  return (
    <>
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
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
        />
      </Modal>
    </>
  );
}
export default AddNewProject;
