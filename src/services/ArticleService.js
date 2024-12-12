import api from "../utils/api";


export const getArticles = async () => {
	const data = await api
		.get('/api/article/get-articles')
	if (!data.data) return null;
	return data.data;
}

export const getArticleById = async (id) => {
    try {
        const response = await api.get(`/api/article/get-article/?idArticle=${id}`);
        if (response.data) {
            return response.data; 
        }
        return null;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'article avec l'ID ${id} :`, error);
        return null;
    }
};

export const createArticle = async (article) => {
    try {
        const response = await api.post('/api/admin/article/add-update-article', article);
        if (response.status === 201) return true;
        return false;
    } catch (error) {
        console.error('Erreur lors de la création de l\'article :', error);
        return false;
    }
};