import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [details, setDetails] = useState(null);

  const getProfil = () => {
    axios.post("/api/client/account/get-compte")
      .then((res) => {
        if ( res.status == 200 ){
          let data = res.data;
          setDetails({
            firstname: data.preCli,
            lastname: data.nomCli,
            email: data.email
          })
        }
      })
  }

  const login = (email, password) => {
    axios.post("/api/account/login", {
      email,
      mdp: password
    }).then((res) => {
      if (res.status == 200) { getProfil() }
    })
  };

  const logout = () => {
    axios.post("/api/account/logout");
  };

  useEffect(() => {
    getProfil();
  }, []);

  return (
    <AuthContext.Provider value={{ details, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
