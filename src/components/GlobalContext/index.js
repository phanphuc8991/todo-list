import { useState, createContext, useEffect } from "react";
import { useTodos, useProjects, useListTodoFilter } from "../../hooks";

export const TodoContext = createContext();

function GlobalContext({ children }) {
  const listTodo = useTodos();
  const listProject = useProjects(listTodo);

  const [selectedProject, setSelectedProject] = useState("today");
  const listTodoFilter = useListTodoFilter(listTodo, selectedProject);
  const selectedTodo = {
    selectedProject,
    setSelectedProject,
    listTodoFilter,
    listProject,
  };

  return (
    <TodoContext.Provider value={selectedTodo}>{children}</TodoContext.Provider>
  );
}
export default GlobalContext;
