import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedData = jwtDecode(token);
        setUser(decodedData);
        setAuth(
          decodedData.role === "customer" || decodedData.role === "admin"
        );
      } else {
        setUser(null);
        setAuth(false);
      }
    } catch (error) {
      setUser(null);
      setAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
