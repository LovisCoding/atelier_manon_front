import axios from "axios";

export const register = async (firstname, lastname, email, password, adresse) => {
	let res = await axios.post("/api/account/register", {
		"email": email,
		"mdp": password,
		"nomCli": lastname,
		"prenomCli": firstname,
		"adresse": adresse
	});
	return res.status == 201;
}