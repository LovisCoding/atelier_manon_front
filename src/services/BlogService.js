import api from "../utils/api";

export const getArticle = async (idArticle) => {
	return api.get("/api/article/get-article", { params: {
		idArticle: idArticle
	}})
	.then((res) => {
		if (res.status == 200) return res.data;
		return null;
	})
	.catch((err) => {
		return null;
	})
}

export const getArticles = async () => {
	return api.get("/api/article/get-articles")
		.then((res) => {
			if (res.status == 200) return res.data;
			return null;
		})
		.catch((err) => {
			return null;
		})
}