import axios from "axios";

export const getPieProd = async (idProd) => {
    console.log(idProd)
    const data = await axios.get('/api/pieprod/get-pierres-produit', {
       params: {idProd}
    })
    if (data.data) return data.data
    return null;
}
export const updatePieProd = async (idProd, tabPierres) => {
    const data = await axios.post('/api/pieprod/update-pierres-produit', {
        idProd,
        tabPierres
    })
}