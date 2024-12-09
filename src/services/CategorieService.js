import axios from 'axios';

export const getCategories = async () => {
	const data = await axios
		.get('/api/categorie/get-categories')
	if (!data.data) return null;
	return data.data;
}