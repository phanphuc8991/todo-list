import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact element={<Login />} path="/login" />
        <Route element={<TodoContainer />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
