import { createContext, useContext, useEffect, useState } from "react";

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
      const req = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!req.ok) {
        console.log("Logout failed");
      }

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
        const req = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        const res = await req.json();

        if (req.ok) {
          setLogged(true);
          setUser(res.user);
        } else {
          setLogged(false);
          setUser(null);
        }
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