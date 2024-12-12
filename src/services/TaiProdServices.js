import api from "../utils/api";


export const getTaillesProduit = async (idProd) => {
    const data = await api.get('/api/taiprod/get-tailles-produit', { params: {idProd} })
    if (!data.data) return null;
    return data.data;
}
export const deleteTailleProduit = async (idProd, libTaille) => {
    const data = await api.delete('/api/admin/taiprod/delete-taiprod', { params: {data: {idProd, libTaille}} })
    if (!data.data) return null;
    return data.data;
}
export const updateTaillesProduit = async (idProd, tabTailles) => {
    const data = await api.post('/api/admin/taiprod/update-tailles-produit', {idProd, tabTailles})
    if (!data.data) return null;
    return data.data;
}
