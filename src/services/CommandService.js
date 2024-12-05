
import axios from "axios"

export const getCommand = async (idCommand) => {
    const data = await axios.get('/api/client/commande/get-commande', {params:{idCommande:idCommand}});
    if (!data.data) return null;
    return data.data
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


