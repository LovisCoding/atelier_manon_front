import axios from 'axios';

export const getTailles = async () => {
	const data = await axios
		.get('/api/taille/get-tailles')
	if (!data.data) return null;
	return data.data;
}