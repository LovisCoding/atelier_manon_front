import { Box,CircularProgress } from "@mui/material";
import api from "./api";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [details, setDetails] = useState(null);
  const [firstFetch, setFirstFetch] = useState(false);

  const getProfil = () => {
    setFirstFetch(false);
    api.get("/api/client/account/get-compte")
      .then((res) => {
        if ( res.status == 200 ){
          let data = res.data;
          setDetails({
            firstname: data.preCli,
            lastname: data.nomCli,
            email: data.email,
            isAdmin: data.estAdmin
          })
        } else if (res.status == 403) {; return;}
        setFirstFetch(true);

      }).catch(err=>setFirstFetch(true));
  };

  const register = async (firstname, lastname, email, password, adresse) => {
    let res = await api.post("/api/account/register", {
      "prenomCli": firstname,
      "nomCli": lastname,
      "email": email,
      "mdp": password,
      "adresse": adresse
     });
    return res.status == 200;
  }

  const login = async (email, password) => {
    try {
      let res = await api.post("/api/account/login", {
        email,
        mdp: password
      });
      if (res.status === 200) { getProfil(); return true; }
      return false;
    } catch (err) {
      console.error("Une erreur est survenue:",err)
      return false;
    }
  };

  const logout = () => {
    api.post("/api/client/account/logout");
    setDetails(null);
  };

  useEffect(() => {
    getProfil();
  }, []);

  const isLogged = details !== null;

  return (
    <AuthContext.Provider value={{ details, login, logout, isLogged, register }}>
      {
        firstFetch ? children : <Box display="flex" justifyContent="center" mt={5} ><CircularProgress size={60} thickness={5} color="" /></Box>
      }
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
