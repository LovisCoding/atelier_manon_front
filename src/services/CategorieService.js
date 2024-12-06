

import axios from 'axios';



export const getAllCategories = async () => {
	const data = await axios
		.get('/api/categorie/get-categories')
	if (data.data) return data.data
	return null;
}