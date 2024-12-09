
import axios from 'axios';


export const getProduct = async (id) => {
    const data = await axios
        .get('/api/produit/get-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}
export const getAllProducts = async () => {
    const data = await axios
        .get('/api/produit/get-all-produits')

    if (data.data) return data.data
    return null;
}

export const getWires = async (id) => {
    const data = await axios.get('/api/filprod/get-fils-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getMaterials = async (id) => {
    const data = await axios.get('/api/matprod/get-materiaux-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getRocks = async (id) => {
    const data = await axios.get('/api/matprod/get-pierres-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

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
    return import.meta.env.VITE_API_URL+'img/'+imgName;
}


export const addProductToPanier = async (product) => {
    let variant = product.materiel ? product.materiel+" " : "";
    variant += product.pierre ? product.pierre+" " : "";
    variant += product.fil ? product.fil : "";

    try {
        const data = await axios
            .post('/api/client/panier/add-product-panier' , {
                idProd : product.idProd,
                idCli : product.idCli,
                gravure : product.gravure || "",
                variante : variant
            }, { headers: { 'Content-Type':'application/json' } });
        console.log("Response :",data.data)
    } catch (err) {
        console.error("Une erreur est survenue : "+err)
    }
}


