import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [details, setDetails] = useState(null);

  const getProfil = () => {
    axios.get("/api/client/account/get-compte")
      .then((res) => {
        if ( res.status == 200 ){
          let data = res.data;
          setDetails({
            firstname: data.preCli,
            lastname: data.nomCli,
            email: data.email
          })
        } else if (res.status == 403) {return;}
      })
  };

  const login = async (email, password) => {
    try {
      let res = await axios.post("/api/account/login", {
        email,
        mdp: password
      })
      if (res.status === 200) { getProfil(); return true; }
      console.log("c'est pas normal")

    } catch (err) {
      console.error("Une erreur est survenue:",err)
      return false;
    }
  };

  const logout = () => {
    axios.post("/api/account/logout");
    setDetails(null);
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
