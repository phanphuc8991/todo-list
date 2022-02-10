import { useState, useEffect } from "react";

import {
  collection,
  query,
  getDocs,
  where,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const q = query(collection(db, "todos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const todos = [];
          querySnapshot.forEach((doc) => {
            todos.push(doc.data());
          });
          console.log(todos);
        });
        console.log(unsubscribe);
        // const todosApi = await getDocs(collection(db, "todos"));
        // const todos = todosApi.docs.map((todo) => {
        //   return {
        //     id: todo.id,
        //     ...todo.data(),
        //   };
        // });
        // setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);

  return todos;
}

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);
  let newProject = [];
  if (todos.length > 0) {
    function getnNumberOfTodos(todos, project) {
      const numberOfTodos = todos.filter(
        (todo) => project.name === todo.projectName
      );
      return numberOfTodos.length;
    }
    newProject = projects.map((project) => ({
      numberOfTodos: getnNumberOfTodos(todos, project),
      ...project,
    }));
  }

  useEffect(() => {
    async function getProjects() {
      try {
        const projectsCol = collection(db, "projects");
        const projectsApi = await getDocs(projectsCol);
        const projects = projectsApi.docs.map((project) => {
          return {
            id: project.id,
            ...project.data(),
          };
        });
        setProjects(projects);
      } catch (error) {
        console.log(error);
      }
    }
    getProjects();
  }, []);

  return newProject;
}
