import api from "../utils/api";

export const getMatProd = async (idProd) => {
    const data = await api.get('/api/matprod/get-materiaux-produit', {
       params: {idProd}
    })
    if (data.data) return data.data
    return null;
}
export const updateMatProd = async (idProd, tabMateriaux) => {
    const data = await api.post('/api/admin/matprod/update-materiaux-produit', {
        idProd,
        tabMateriaux
    })
}