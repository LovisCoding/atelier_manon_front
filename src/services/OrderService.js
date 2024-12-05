import axios from "axios"

export const getOrders = async () => {
	let res = await axios.get("/api/admin/commande/get-commandes");
	if ( res.status == 200 ) return res.data;
	return [];
}