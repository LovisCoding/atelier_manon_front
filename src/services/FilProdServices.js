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
