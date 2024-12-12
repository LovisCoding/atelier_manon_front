import api from "../utils/api";

export const getFilsById = async (idProd) => {
    const data = await api
        .get('/api/filprod/get-fils-produit', {
            params: {
                idProd
            }
        })
    if (!data.data) return null
    return data.data;
}
export const updateFilsProd = async (idProd, tabFils) => {
    const data = await api
        .post('/api/admin/filprod/update-fils-produit', {
            idProd,
            tabFils
        })
}
