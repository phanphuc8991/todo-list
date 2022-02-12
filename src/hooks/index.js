import { useState, useEffect } from "react";

import {
  collection,
  query,
  getDocs,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { calendarItems } from "../constants";
import moment from "moment";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const queryTodos = query(collection(db, "todos"), orderBy("time"));

    const unsubscribe = onSnapshot(queryTodos, (todos) => {
      const newTodos = todos.docs.map((todo) => ({
        id: todo.id,
        ...todo.data(),
      }));
      setTodos(newTodos);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return todos;
}
export function useListTodoFilter(listTodo, selectedProject) {
  let dataTodos;
  const [filteredTodos, setfilteredTodos] = useState([]);
  useEffect(() => {
    switch (selectedProject) {
      case calendarItems[0]:
        dataTodos = listTodo.filter((todo) => {
          return todo.date === moment(new Date()).format("DD/MM/YYYY");
        });
        break;
      case calendarItems[1]:
        const todayDateFormated = moment().format("DD/MM/YYYY");

        dataTodos = listTodo.filter((todo) => {
          const todoDate = moment(todo.date, "DD/MM/YYYY");
          const todayDate = moment(todayDateFormated, "DD/MM/YYYY");

          const dateInWeek = todoDate.diff(todayDate, "days");

          return dateInWeek >= 0 && dateInWeek <= 6;
        });

        break;
      case calendarItems[2]:
        dataTodos = [...listTodo];

        break;

      default:
        dataTodos = listTodo.filter(
          (todo) => todo.projectName === selectedProject
        );
    }
    setfilteredTodos(dataTodos);
  }, [listTodo, selectedProject]);

  return filteredTodos;
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
    const queryProjects = query(
      collection(db, "projects"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryProjects, (projects) => {
      const newProjects = projects.docs.map((project) => ({
        id: project.id,
        ...project.data(),
      }));
      setProjects(newProjects);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return newProject;
}
