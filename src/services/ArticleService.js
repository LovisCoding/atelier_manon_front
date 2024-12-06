import axios from 'axios';

export const getArticles = async () => {
	const data = await axios
		.get('/api/article/get-articles')
	if (!data.data) return null;
	return data.data;
}

export const getArticleById = async (id) => {
    try {
        const response = await axios.get(`/api/article/get-article/?idArticle=${id}`);
        if (response.data) {
			console.log(response.data);
            return response.data; 
        }
        return null;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'article avec l'ID ${id} :`, error);
        return null;
    }
};