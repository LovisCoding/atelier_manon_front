import api from "../utils/api";


export const getPierres = async () => {
	const data = await api.get('/api/pierre/get-pierres')
	if (data.data) return data.data
	return null;
}
