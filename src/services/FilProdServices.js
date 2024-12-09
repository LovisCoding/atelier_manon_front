import axios from 'axios';

export const getFilsById = async (idProd) => {
    const data = await axios
        .get('/api/filprod/get-fils-produit', {
            params: {
                idProd
            }
        })
    if (!data.data) return null
    return data.data;
}
export const updateFilsProd = async (idProd, tabFils) => {
    const data = await axios
        .post('/api/admin/filprod/update-fils-produit', {
            idProd,
            tabFils
        })
}
