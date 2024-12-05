
import axios from "axios";

export const getCartProducts = async ({idUser}) => {
    const data = await axios
        .get('/api/panier/get-panier-client', {params: {idCli:2}});
    if (!data.data) return null;
    data.data.forEach(prod => {
        prod.idProd = parseInt(prod.idProd);
        prod.idCli = parseInt(prod.idCli);
        prod.qa = parseInt(prod.qa);
        prod.produit.prix = parseFloat(prod.produit.prix);
    });
    return data.data;
}
