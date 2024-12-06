
import axios from "axios"

export const getCommand = async (idCommand) => {
    const data = await axios.get('/api/client/commande/get-commande', {params:{idCommande:idCommand}});
    if (!data.data) return null;
    return data.data
}


export const getOrderAdminDetail = async (orderId) => {
    const data = await axios.get('/api/client/commande/get-commande', {params:{idCommande:orderId}});
    if (!data.data) return null;
    return data.data
}


