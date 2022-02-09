import { useState, createContext } from "react";
import { useTodos, useProjects } from "../../hooks";
export const TodoContext = createContext();

function GlobalContext({ children }) {
  const todos = useTodos();
  console.log("render");
  const [selectedProject, setSelectedProject] = useState("other");
  const selectedTodo = {
    selectedProject,
    setSelectedProject,
  };

  return (
    <TodoContext.Provider value={selectedTodo}>{children}</TodoContext.Provider>
  );
}
export default GlobalContext;
