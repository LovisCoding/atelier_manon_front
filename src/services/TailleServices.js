import api from "../utils/api";

export const getTailles = async () => {
	const data = await api
		.get('/api/taille/get-tailles')
	if (!data.data) return null;
	return data.data;
}