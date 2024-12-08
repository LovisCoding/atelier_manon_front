
import axios from "axios"

export const getCommand = async (idCommand) => {
    const data = await axios
        .get('/api/client/commande/get-commande', {params:{idCommande:idCommand}});
    if (!data.data) return null;
    return data.data
}


export const getOrdersForAdmin = async () => {
    const data = await axios.get('/api/admin/commande/get-commandes');
    if (!data.data) return null;
    return data.data
}
export const getCommandProducts = async (idCommand) => {
    const data = await axios
        .get('/api/client/commandeproduit/get-produits-commande', {params:{idCommande:idCommand}});
    if (!data.data) return null;
    return data.data;
}

