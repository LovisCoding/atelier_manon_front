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
            email: data.email,
            isAdmin: data.estAdmin
          })
        } else if (res.status == 403) {return;}
      })
  };

  const register = async (firstname, lastname, email, password, adresse) => {
    let res = await axios.post("/api/account/register", { 
      "prenomCli": firstname,
      "nomCli": lastname,
      "email": email,
      "mdp": password,
      "adresse": adresse
     });
     if (res.status == 200){
      setDetails({
        firstname: firstname,
        lastname: lastname,
        email: email,
        adresse: adresse
      })
      return true;
     } else {
      return false;
     }
    return res.status == 200;
  }

  const login = async (email, password) => {
    try {
      let res = await axios.post("/api/account/login", {
        email,
        mdp: password
      });
      console.log("res:",res)
      console.log("status:",res.status)
      if (res.status === 200) { getProfil(); return true; }      
      return false;
    } catch (err) {
      console.error("Une erreur est survenue:",err)
      return false;
    }
  };

  const logout = () => {
    axios.post("/api/client/account/logout");
    setDetails(null);
  };

  useEffect(() => {
    getProfil();
  }, []);

  const isLogged = details !== null;

  return (
    <AuthContext.Provider value={{ details, login, logout, isLogged, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
