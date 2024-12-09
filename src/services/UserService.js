import axios from "axios";

export const register = async (firstname, lastname, email, password, adresse) => {
	let res = await axios.post("/api/account/register", { 
		"prenomCli": firstname,
		"nomCli": lastname,
		"email": email,
		"mdp": password,
		"adresse": [adresse]
	 });
	return res.status == 200;
}

export const getCompte = async (idCli) => {
	try {
		let res = await axios.get("/api/admin/account/get-compte-admin", { idCli });
        return data.data;
      } catch (error) {
        return null;
      }
}