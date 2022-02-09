import { useState, useEffect } from "react";
import app from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
const db = getFirestore(app);

export function useTodos() {
  console.log("useCustomHook");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const todosCol = collection(db, "todos");
        const todosApi = await getDocs(todosCol);
        const todos = todosApi.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTodos(todos);
        console.log("useEffect 1");
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);
  return todos;
}

export function useProjects(todos) {
  const db = getFirestore(app);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      try {
        const projectsCol = collection(db, "projects");
        const projectsApi = await getDocs(projectsCol);
        const projects = projectsApi.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setProjects(projects);
      } catch (error) {
        console.log(error);
      }
    }
    getProjects();
  }, []);
  return projects;
}
