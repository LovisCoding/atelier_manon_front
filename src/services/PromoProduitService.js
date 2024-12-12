import api from "../utils/api";


export const getProduitsByPromo = async (code) => {
    const data = await api
        .get('/api/admin/promoproduit/get-produits-promo', {
            params: { code }
        })
    if (data.data) return data.data
    return null;
}

export const addProduitToPromo = async (idProd, code) => {
	const data = await api
		.post('/api/admin/promoproduit/add-promoproduit', { idProd, code })
	if (data.data) return data.data
	return null;
}

export const DeleteProduitFromPromo = async (idProd, code) => {
	const data = await api.delete('/api/admin/promoproduit/delete-promoproduit', {
		data: { idProd, code }
	});
	if (data.data) return data.data
	return null;
}

export const addProduitsToPromo = async (tabProd, code) => {
	const data = await api
		.post('/api/admin/promoproduit/add-promoproduits', { tabProd, code })
	if (data.data) return data.data
	return null;
}

export const deleteProduitsFromPromo = async (tabProd, code) => {
	const data = await api.delete('/api/admin/promoproduit/delete-promoproduits', {
		data: { tabProd, code }
	});
	if (data.data) return data.data
	return null;
}
