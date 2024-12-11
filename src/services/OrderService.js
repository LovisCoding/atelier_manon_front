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
	console.log("data:",res.data);
	return res.data;
}


export const updateState = async (orderId, state) => {
	return axios.post('/api/admin/commande/update-etat-commande', {
		idCommande: orderId,
		etat: state
	})
		.then((res) => {
			return res.status == 200 || res.status == 201;
		})
		.catch((err) => {
			return null;
		})
}