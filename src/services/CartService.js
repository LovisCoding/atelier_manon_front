
import axios from "axios";

export const getCartProducts = async () => {
    try {
        const data = await axios
        .get('/api/client/panier/get-panier-client');
        if (!data.data || data.status === 403) return null;
        data.data.forEach(prod => {
            prod.idProd = parseInt(prod.idProd);
            prod.idCli = parseInt(prod.idCli);
            prod.qa = parseInt(prod.qa);
            prod.produit.prix = parseFloat(prod.produit.prix);
        });
        return data.data;
    } catch (err) {
        // console.log("Une erreur est survenue:",err);
        return null;
    }
};

export const addProductPanier = async (product) => {
    try {
        const data = await axios
            .post('/api/client/panier/add-product-panier' , {
                idProd : product.idProd,
                idCli : product.idCli,
                gravure : product.gravure,
                variante : product.variante
            }, { headers: { 'Content-Type':'application/json' } });
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
};

export const reduceProductPanier = async (product) => {
    try {
        const data = await axios
            .post('/api/client/panier/reduce-product-panier' , {
                idProd : product.idProd,
                idCli : product.idCli,
                gravure : product.gravure,
                variante : product.variante
            }, { headers: { 'Content-Type':'application/json' } });
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
};

export const deleteProductPanier = async (product) => {
    try {
      const response = await axios
            .delete('/api/client/panier/delete-product-panier', {
                headers: { 'Content-Type': 'application/json' },
                data: {
                    idProd: product.idProd,
                    idCli: product.idCli,
                    gravure: product.gravure,
                    variante: product.variante
                }
            });
    } catch (err) {
      console.error("Une erreur est survenue : ", err);
    }

};

export const addCommande = async (commentary, isGift, giftCommentary, codesPromo) => {
    try {
        const data = await axios
            .post('/api/client/commande/add-commande' , {
                comm : commentary ,
                estCadeau : isGift,
                carte : giftCommentary,
                codesPromo
            }, { headers: { 'Content-Type':'application/json' } });
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
}


