import { useEffect, useContext, useRef } from "react";
import styles from "./Sidebar.module.scss";
import { TodoContext } from "../GlobalContext";
function SideBar({ children }) {
  // STATE
  const sidebarRef = useRef();

  // CONTEXT
  const { setSelectedTodoEdit } = useContext(TodoContext);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  // METHOD
  function handleClick(e) {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodoEdit(undefined);
    }
  }

  return (
    <div ref={sidebarRef} className={styles.sideBar}>
      {children}
    </div>
  );
}
export default SideBar;
