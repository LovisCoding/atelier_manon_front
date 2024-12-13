
import api from "../utils/api";


export const getProduct = async (id) => {
    const data = await api
        .get('/api/produit/get-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getAllProducts = async () => {
    const data = await api
        .get('/api/produit/get-all-produits')

    if (data.data) return data.data
    return null;
}

export const getAllProductsSales = async () => {
    const data = await api
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
  
    const data = await api
      .get(`/api/produit/get-produits?${queryParams.toString()}`);
  
    if (data.data) return data.data;
    return null;
};

export const getWires = async (id) => {
    const data = await api.get('/api/filprod/get-fils-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getMaterials = async (id) => {
    const data = await api.get('/api/matprod/get-materiaux-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getRocks = async (id) => {
    const data = await api.get('/api/pieprod/get-pierres-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getSizes = async (id) => {
    const data = await api.get('/api/taiprod/get-tailles-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

export const getPendants = async (id) => {
    const data = await api.get('/api/penprod/get-pendentifs-produit', { params: {idProd:id} })
    if (!data.data) return null;
    return data.data;
}

const apiClient = api.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getBestSellers = async () => {
    try {
        const { data } = await api.get('/produit/get-bestsellers', {
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
        const data = await api
            .post('/api/client/panier/add-product-panier' , {
                idProd : product.idProd,
                idCli : product.idCli,
                gravure : product.gravure || "",
                variante : variant
            }, { headers: { 'Content-Type':'application/json' } });
        return data;
    } catch (err) {
        console.error("Une erreur est survenue : "+err)
        return null;
    }
}

export const deleteProduct = async (idProd) => {
    try {
		const data = await api
			.delete('/api/admin/produit/delete-produit' , {
				data: { idProd }
			});
	} catch (err) {
		console.error("Une erreur est survenue : "+err)
	}
};

export const updateProduct = async (product) => {
	try {
		const data = await api
			.post('/api/admin/produit/update-produit' , {
				...product
			}, { headers: { 'Content-Type':'application/json' } });
		return data.data
	} catch (err) {
		return err
	}
}
export const addImage= async (idProd, image, libImage) => {
    try {

        const data = await api.post('/api/admin/produit/add-image', {
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
    const data = await api.post('/api/admin/produit/update-images-order', {
        idProd,
        tabPhoto
    })
}
export const deleteImage= async (idProd, libImage) => {
    const data = await api.post('/api/admin/produit/delete-image', {
        idProd,
        libImage
    })
}
