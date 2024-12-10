import axios from "axios";

export const getMateriaux = async () => {
	const data = await axios.get('/api/materiau/get-materiaux')
	if (data.data) return data.data
	return null;
}