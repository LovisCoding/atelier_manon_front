import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getBestSellers = async () => {
    try {
        const { data } = await apiClient.get('/produit/get-bestsellers', {
            params: { quantiteToDisplay: 3 },
        });
        return data || null;
    } catch (error) {
        console.error('Erreur lors de la récupération des best-sellers:', error);
        return null;
    }
};

export const getProductImage = (imgName) => {
    return `${import.meta.env.VITE_API_URL}img/${imgName}`;
};

export const getProducts = async (params = {}) => {
    try {
        const { data } = await apiClient.get('/produit/get-produits', { params });
        return data || null;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error.message);
        return null;
    }
};