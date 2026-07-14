import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../../services/api";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setLogged(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();

      setLogged(false);
      setUser(null);
    } catch (e) {
      console.log(e.message);

      setLogged(false);
      setUser(null);
    }
  };

  useEffect(() => {
  const checkUser = async () => {
    try {
      const res = await getCurrentUser();

      setLogged(true);
      setUser(res.user);
    } catch (e) {
      setLogged(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkUser();
}, []);

  return (
    <Context.Provider
      value={{
        logged,
        setLogged,
        user,
        setUser,
        loading,
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