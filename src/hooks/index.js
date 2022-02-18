import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import firebase, { db } from "../firebase";
import { calendarItems } from "../constants";
import moment from "moment";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
export function useAuth() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        async function getUser() {
          try {
            const { displayName, email, photoURL, uid } = user;
            const newUser = {
              displayName,
              email,
              photoURL,
              userId: uid,
            };
            const qFirst = query(
              collection(db, "users"),
              where("userId", "==", newUser.userId)
            );

            const querySnapshotFirst = await getDocs(qFirst);

            if (querySnapshotFirst.docs.length === 0) {
              const newUserFef = doc(collection(db, "users"));
              await setDoc(newUserFef, {
                ...newUser,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              });

              const qSecond = query(
                collection(db, "users"),
                where("userId", "==", newUser.userId)
              );
              const querySnapshotSecond = await getDocs(qSecond);

              querySnapshotSecond.forEach((doc) => {
                setUser({
                  id: doc.id,
                  ...doc.data(),
                });
              });
            } else {
              querySnapshotFirst.forEach((doc) => {
                setUser({
                  id: doc.id,
                  ...doc.data(),
                });
              });
            }
          } catch (error) {
            console.log("error", error);
          }
        }
        getUser();
        navigate("/");
        return;
      }
      navigate("/login");
    });

    return () => unsubscribe();
  }, []);

  return user;
}

export function useTodos(auth) {
  // STATE
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const queryTodos = query(collection(db, "todos"), orderBy("time"));

    const unsubscribe = onSnapshot(queryTodos, (todos) => {
      const filterTodo = todos.docs.filter(
        (todo) => todo.data().userId === auth.userId
      );
      const newTodos = filterTodo.map((todo) => ({
        id: todo.id,
        ...todo.data(),
      }));
      console.log("newTodo", newTodos);
      setTodos(newTodos);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  return todos;
}

export function useListTodoFilter(listTodo, selectedProject) {
  let dataTodos;

  // STATE
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

export function useProjects(auth) {
  // STATE
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const queryProjects = query(
      collection(db, "projects"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryProjects, (projects) => {
      const filterProjects = projects.docs.filter(
        (project) => project.data().userId === auth.userId
      );

      const newProjects = filterProjects.map((project) => {
        return {
          ...project.data(),
          id: project.id,
        };
      });
      console.log("newProjects", newProjects);
      setProjects(newProjects);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return projects;
}

export function useProjectsWithStats(todos, projects) {
  // STATE
  const [projectWithStats, setprojectWithStats] = useState([]);

  function getNumOfTodos(project, todos) {
    const numOfTodos = todos.filter((todo) => {
      return todo.projectName === project.name && !todo.checked;
    });
    return numOfTodos.length;
  }
  useEffect(() => {
    const newProjectsWithStats = projects.map((project) => {
      return {
        ...project,
        numOfTodos: getNumOfTodos(project, todos),
      };
    });

    setprojectWithStats(newProjectsWithStats);
  }, [projects, todos]);

  return projectWithStats;
}
