import axios from "axios";

export const getPierres = async () => {
	const data = await axios.get('/api/pierre/get-pierres')
	if (data.data) return data.data
	return null;
}
