
import axios from 'axios';


export const getBestSellers = async () => {
    const data = await axios
        .get('/api/produit/get-bestsellers', { params: { quantiteToDisplay: 3 } })
    if (data.data) return data.data
    return null;
}
export const getAllProduits = async () => {
    const data = await axios
        .get('/api/produit/get-all-produits')
    if (data.data) return data.data
    return null;
}

export const getProductImage = (imgName) => {
    return import.meta.env.VITE_API_URL+'img/'+imgName;
}

