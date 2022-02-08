import { useState, createContext } from "react";
export const TodoContext = createContext();
function GlobalContext({ children }) {
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
