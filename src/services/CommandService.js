
import axios from "axios"

export const getCommand = async (idCommand) => {
    const data = await axios
        .get('/api/client/commande/get-commande', {params:{idCommande:idCommand}});
    if (!data.data) return null;
    return data.data
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

export const getCommandProducts = async (idCommand) => {
    const data = await axios
        .get('/api/client/commandeproduit/get-produits-commande', {params:{idCommande:idCommand}}).catch((error) => { return null });
    if (!data.data) return null;
    return data.data;
}

export const getProduitsCommande = async (idCommand) => {
    try {
        const data = await axios.get("/api/client/commandeproduit/get-produits-commande", { params: { idCommande: idCommand } } );
        return data.data;
      } catch (error) {
        return null;
      }
}