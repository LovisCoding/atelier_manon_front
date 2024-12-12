import api from "../utils/api";

export const getMateriaux = async () => {
	const data = await api.get('/api/materiau/get-materiaux')
	if (data.data) return data.data
	return null;
}