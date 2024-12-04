
import axios from 'axios';


export const getBestSellers = async () => {
    const data = await axios
        .get('/api/produit/get-bestsellers', { params: { quantiteToDisplay: 3 } })
    if (data.data) return data.data
    return null;
}

export const getProductImage = async (imgName) => {
    const data = await axios
        .get(`/api/img/${imgName}`)
    if (data.data) return data.data
    return null;
}

