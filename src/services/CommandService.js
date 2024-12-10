
import axios from "axios"

export const getCommand = async (idCommand) => {
    try {
        const data = await axios
            .get('/api/client/commande/get-commande', {params:{idCommande:idCommand}});
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue:",err)
        return err;
    }
}

export const getOrderAdminDetail = async (orderId) => {
    try {
        const data = await axios.get('/api/client/commande/get-commande', {
          params: { idCommande: orderId },
        });
        return data.data;
      } catch (error) {
        return null; // Gérer l'erreur
      }
}

export const addCommande = async (idCli, commentary, isGift, giftCommentary, codesPromo) => {
    try {
        const data = await axios
            .post('/api/client/commande/add-commande' , {
                idCli : idCli,
                comm : commentary,
                estCadeau : isGift,
                carte : giftCommentary,
                codesPromo: codesPromo?.length ? codesPromo : []
            }, { headers: { 'Content-Type':'application/json' } });
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue : ",err.response?.data);
        return null;
    }
};

export const getOrdersForAdmin = async () => {
    const data = await axios.get('/api/admin/commande/get-commandes');
    if (!data.data) return null;
    return data.data
}

export const getCommandProducts = async (idCommand) => {
    const data = await axios
        .get('/api/client/commandeproduit/get-produits-commande', {params:{idCommande:idCommand}}).catch((error) => { return null });
    if (!data.data) return null;
    return data;
}

export const getProduitsCommande = async (idCommand) => {
    try {
        const data = await axios.get("/api/client/commandeproduit/get-produits-commande", { params: { idCommande: idCommand } } );
        return data.data;
      } catch (error) {
        return null;
      }
}


export const addSingleProductCommande = async (idProd, variante, gravure) => {
    try {
        const data = await axios.post("/api/client/commande/add-single-product-commande", {
            idProd,
            variante: variante || "",
            gravure: gravure || ""
        })
        return data.data
    } catch (err) {
        return null;
    }
}

