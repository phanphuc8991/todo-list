import { useState, useEffect } from "react";
import styles from "./TodoContainer.module.scss";
import Sidebar from "../Sidebar";
import User from "../User";
import AddNewTodo from "../AddNewTodo";
import Calendar from "../Calendar";
import ListProject from "../ListProject";
import Main from "../Main";
import ListTodo from "../ListTodo";
import EditTodo from "../EditTodo";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function TodoContainer() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = async () => {
      // await onAuthStateChanged(auth, (user) => {
      //   console.log(user);
      //   if (user) {
      //     navigate("/");
      //   } else {
      //   }
      // });
    };
    navigate("/login");
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className={styles.appContanier}>
      <Sidebar>
        <User />
        <Calendar />
        <AddNewTodo />
        <ListProject />
      </Sidebar>
      <Main>
        <ListTodo />
        <EditTodo />
      </Main>
    </div>
  );
}

export default TodoContainer;
