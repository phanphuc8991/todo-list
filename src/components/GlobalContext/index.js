import { useState, createContext, useRef } from "react";
import {
  useTodos,
  useProjects,
  useListTodoFilter,
  useProjectsWithStats,
} from "../../hooks";

export const TodoContext = createContext();

function GlobalContext({ children }) {
  const selectedProjectDefault = "today";
  const calendarItem = useRef("today");
  const [selectedProject, setSelectedProject] = useState(
    selectedProjectDefault
  );
  const [selectedTodoEdit, setSelectedTodoEdit] = useState(undefined);
  const listTodo = useTodos();
  const listProject = useProjects(listTodo);
  const projectsWithStats = useProjectsWithStats(listTodo, listProject);
  const listTodoFilter = useListTodoFilter(listTodo, selectedProject);
  const selectedTodo = {
    selectedProject,
    setSelectedProject,
    listTodo: listTodoFilter,
    listProject: projectsWithStats,
    selectedProjectDefault,
    selectedTodoEdit,
    setSelectedProject,
    setSelectedTodoEdit,
    calendarItem,
  };

  return (
    <TodoContext.Provider value={selectedTodo}>{children}</TodoContext.Provider>
  );
}
export default GlobalContext;
