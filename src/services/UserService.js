import axios from "axios";

export const register = async (firstname, lastname, email, password, adresse) => {
	let res = await axios.post("/api/account/register", { 
		"prenomCli": firstname,
		"nomCli": lastname,
		"email": email,
		"mdp": password,
		"adresse": adresse
	 });
	return res.status == 200;
}

export const getCompte = async (idCli) => {
	let res = await axios.get("/api/admin/account/get-compte-admin", { idCli });
	if (res.status !== 200) return null;
	return res.data;
}