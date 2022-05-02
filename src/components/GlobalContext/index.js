import { useState, createContext, useRef } from "react";
import {
  useTodos,
  useProjects,
  useListTodoFilter,
  useProjectsWithStats,
  useAuth,
} from "../../hooks";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
export const TodoContext = createContext();

function GlobalContext({ children }) {
  const auth = useAuth();
  const selectedProjectDefault = "today";
  const calendarItem = useRef("today");
  const [selectedProject, setSelectedProject] = useState(
    selectedProjectDefault
  );
  const [selectedTodoEdit, setSelectedTodoEdit] = useState(undefined);

  const listTodo = useTodos(auth);

  const listProject = useProjects(auth);
  const projectsWithStats = useProjectsWithStats(listTodo, listProject);
  const listTodoFilter = useListTodoFilter(listTodo, selectedProject);
  const selectedTodo = {
    selectedProject,
    setSelectedProject,
    listTodo: listTodoFilter,
    listProject: projectsWithStats,
    selectedProjectDefault,
    selectedTodoEdit,
    setSelectedTodoEdit,
    calendarItem,
    auth,
  };

  return (
    <TodoContext.Provider value={selectedTodo}>
      {console.log("auth", auth)}
      {auth.length === 0 && (
        <Box sx={{ width: "100%" }} style={{ position: "fixed", zIndex: 1 }}>
          <LinearProgress />
        </Box>
      )}

      {children}
    </TodoContext.Provider>
  );
}
export default GlobalContext;
