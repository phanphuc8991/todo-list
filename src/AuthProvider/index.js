import { useEffect, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
export const TodoContext = createContext();
function AuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/todo");
        return;
      }
      navigate("/login");
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
}
export default AuthProvider;
