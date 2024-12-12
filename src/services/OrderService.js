import api from "../utils/api";


export const getOrderAdminPage = async () => {
	let res = await api.get("", {

	});
	if (res.status != 200) return null;
	return res.data;
}


export const getOrdersProfil = async () => {
	let res = await api.get("/api/client/commande/get-commandes-client");
	if (res.status != 200) return [];
	return res.data;
}


export const updateState = async (orderId, state) => {
	return api.post('/api/admin/commande/update-etat-commande', {
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