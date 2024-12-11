
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

export const getAllProductsSales = async () => {
    const data = await axios
        .get('/api/admin/produit/produits-vente')

    if (data.data) return data.data
    return null;
}

export const getProducts = async (params) => {
    const { search, category, priceInf, priceSup, nbDisplay, page } = params;
    
    const queryParams = new URLSearchParams({
      search,
      category,
      priceInf,
      priceSup,
      nbDisplay,
      page,
    });
  
    const data = await axios
      .get(`/api/produit/get-produits?${queryParams.toString()}`);
  
    if (data.data) return data.data;
    return null;
};

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
    const data = await axios.get('/api/pieprod/get-pierres-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getSizes = async (id) => {
    const data = await axios.get('/api/taiprod/get-tailles-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getPendants = async (id) => {
    const data = await axios.get('/api/penprod/get-pendentifs-produit', { params: {idProd:id} })
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

export const getProductImage = (imgName, width, idProd) => {
    return import.meta.env.VITE_API_URL+'img/'+imgName+(idProd ? '?idProd='+idProd : '')  + (width ? '&width='+width : '')  ;
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
        return data;
    } catch (err) {
        console.error("Une erreur est survenue : "+err)
        return null;
    }
}

export const deleteProduct = async (idProd) => {
    try {
		const data = await axios
			.delete('/api/admin/produit/delete-produit' , {
				data: { idProd }
			});
		console.log("Response :",data.data)
	} catch (err) {
		console.error("Une erreur est survenue : "+err)
	}
};

export const updateProduct = async (product) => {
	try {
		const data = await axios
			.post('/api/produit/update-produit' , {
				...product
			}, { headers: { 'Content-Type':'application/json' } });
		return data.data
	} catch (err) {
		return err
	}
}
export const addImage= async (idProd, image, libImage) => {
    try {

        const data = await axios.post('/api/produit/add-image', {
            idProd,
            image,
            libImage
        })
    } catch (err) {
        console.error("Une erreur est survenue : ",err)
        return err;
    }
}
export const reorderImages= async (idProd, tabPhoto) => {
    const data = await axios.post('/api/admin/produit/update-images-order', {
        idProd,
        tabPhoto
    })
}
export const deleteImage= async (idProd, libImage) => {
    const data = await axios.post('/api/produit/delete-image', {
        idProd,
        libImage
    })
}
