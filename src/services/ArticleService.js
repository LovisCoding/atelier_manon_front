import axios from 'axios';

export const getArticles = async () => {
	const data = await axios
		.get('/api/article/get-articles')
	if (!data.data) return null;
	return data.data;
}