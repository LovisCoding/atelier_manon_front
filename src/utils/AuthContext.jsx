import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const login = (email, password) => {
    // fetch
  };

  const logout = () => {
    // fetch
  };

  useEffect(() => {
    const checkAuth = () => {
        
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
