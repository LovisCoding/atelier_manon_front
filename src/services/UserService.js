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