import styles from "./App.module.scss";
import { useContext, useLayoutEffect } from "react";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import AddNewTodo from "./components/AddNewTodo";
import Calendar from "./components/Calendar";
import ListProject from "./components/ListProject";
import Main from "./components/Main";
import ListTodo from "./components/ListTodo";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <div className={styles.app}>
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

export default App;
