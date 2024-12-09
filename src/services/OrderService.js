import axios from "axios"

export const getOrderAdminPage = async () => {
	let res = await axios.get("", {

	});
	if (res.status != 200) return null;
	return res.data;
}


export const getOrdersProfil = async () => {
	let res = await axios.get("/api/client/commande/get-commandes-client");
	if (res.status != 200) return [];
	return res.data;
}