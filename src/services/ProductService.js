
import axios from 'axios';


export const getProduct = async (id) => {
    const data = await axios
        .get('/api/produit/get-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
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


export const getBestSellers = async () => {
    const data = await axios
        .get('/api/produit/get-bestsellers', { params: { quantiteToDisplay: 3 } })
    if (!data.data) return null;
    return data.data;
}

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

