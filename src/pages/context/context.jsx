import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Context = createContext();

export const AuthContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token) => {
    setLogged(true);

    localStorage.tc = token;

    const userData = jwtDecode(token);
    setUser(userData);
  };

  const logout = () => {
    setLogged(false);

    localStorage.removeItem("tc");

    setUser(null);
  };

  useEffect(() => {
    if (localStorage.tc) {
      login(localStorage.tc);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        logged,
        setLogged,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Context);

  return context;
};