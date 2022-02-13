import { useState, createContext, useEffect } from "react";
import { useTodos, useProjects, useListTodoFilter } from "../../hooks";

export const TodoContext = createContext();

function GlobalContext({ children }) {
  const selectedProjectDefault = "today";
  const listTodo = useTodos();
  const listProject = useProjects(listTodo);

  const [selectedProject, setSelectedProject] = useState(
    selectedProjectDefault
  );
  const listTodoFilter = useListTodoFilter(listTodo, selectedProject);
  const selectedTodo = {
    selectedProject,
    setSelectedProject,
    listTodoFilter,
    listProject,
    selectedProjectDefault,
  };

  return (
    <TodoContext.Provider value={selectedTodo}>{children}</TodoContext.Provider>
  );
}
export default GlobalContext;
