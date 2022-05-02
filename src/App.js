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
import GlobalContext from "./components/GlobalContext";
function App() {
  return (
    <div className={styles.app}>
      <GlobalContext>
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
      </GlobalContext>
    </div>
  );
}

export default App;
