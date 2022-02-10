import { useState, createContext, useEffect } from "react";
import { useTodos, useProjects } from "../../hooks";
export const TodoContext = createContext();

function GlobalContext({ children }) {
  const listTodo = useTodos();
  const listProject = useProjects(listTodo);

  const [selectedProject, setSelectedProject] = useState("other");
  const selectedTodo = {
    selectedProject,
    setSelectedProject,
    listTodo,
    listProject,
  };

  return (
    <TodoContext.Provider value={selectedTodo}>{children}</TodoContext.Provider>
  );
}
export default GlobalContext;
