import axios from "axios";

export const getTaillesProduit = async (idProd) => {
    const data = await axios.get('/api/taiprod/get-tailles-produit', { params: {idProd} })
    if (!data.data) return null;
    return data.data;
}
export const deleteTailleProduit = async (idProd, libTaille) => {
    const data = await axios.delete('/api/admin/taiprod/delete-taiprod', { params: {data: {idProd, libTaille}} })
    if (!data.data) return null;
    return data.data;
}
export const updateTaillesProduit = async (idProd, tabTailles) => {
    const data = await axios.post('/api/admin/taiprod/update-tailles-produit', {idProd, tabTailles})
    if (!data.data) return null;
    return data.data;
}
