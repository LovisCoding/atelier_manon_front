
import axios from 'axios';


export const getAllAvis = async () => {
    const data = await axios
        .get('api/avis/get-all-avis')
    if (data.data) return data.data
    return null;
}

export const getAvisBySession = async () => {
    return "Avis Temporaire, modifier getAvis dans AvisService";
    const data = await axios
        .get('api/avis/getAvisBySession');
    if (data.status == 200) return data.data;
    return "";
}
