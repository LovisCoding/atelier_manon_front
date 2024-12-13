import api from "../utils/api";

export const getCategories = async () => {
	const data = await api
		.get('/api/categorie/get-categories')
	if (data.data) return data.data;
	return null;
}

export const addCategorie = async (libCateg) => {
	const data = await api.post('/api/admin/categorie/add-categorie', 
		libCateg
	);
	if (data.data) return data.data;
	return null;
}

export const deleteCategorie = async (idCateg) => {
	const data = await api.delete('/api/admin/categorie/delete-categorie', {data:{idCateg}});
	if (data.data) return data.data;
	return null;
}


export const getImageURL = (type) => {
    return import.meta.env.VITE_API_URL+'personnalisation/get-image?type='+type;
}
