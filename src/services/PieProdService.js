import api from "../utils/api";


export const getPieProd = async (idProd) => {
    const data = await api.get('/api/pieprod/get-pierres-produit', {
       params: {idProd}
    })
    if (data.data) return data.data
    return null;
}
export const updatePieProd = async (idProd, tabPierres) => {
    const data = await api.post('/api/admin/pieprod/update-pierres-produit', {
        idProd,
        tabPierres
    })
}