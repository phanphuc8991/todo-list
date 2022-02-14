import { useEffect, useContext, useRef } from "react";
import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import { TodoContext } from "../GlobalContext";
function SideBar({ children }) {
  // STATE
  const sidebarRef = useRef();

  // CONTEXT
  const { setSelectedTodoEdit } = useContext(TodoContext);

  function handleClick(e) {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodoEdit(undefined);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div ref={sidebarRef} className={styles.sideBar}>
      {children}
    </div>
  );
}
export default SideBar;
