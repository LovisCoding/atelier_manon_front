import axios from "axios";

export const getMatProd = async (idProd) => {
    const data = await axios.get('/api/matprod/get-materiaux-produit', {
       params: {idProd}
    })
    if (data.data) return data.data
    return null;
}
export const updateMatProd = async (idProd, tabMateriaux) => {
    const data = await axios.post('/api/admin/matprod/update-materiaux-produit', {
        idProd,
        tabMateriaux
    })
}