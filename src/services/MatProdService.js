import axios from "axios";

export const getMatProd = async (idProd) => {
    const data = await axios.get('/api/admin/matprod/get-materiaux-produit', {
       params: {idProd}
    })
    if (data.data) return data.data
    return null;
}
export const updateMatProd = async (idProd, tabMateriaux) => {
    const data = await axios.post('/api/admin/pieprod/update-pierres-produit', {
        idProd,
        tabMateriaux
    })
}