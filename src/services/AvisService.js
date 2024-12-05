
import axios from 'axios';


export const getAllAvis = async () => {
    const data = await axios
        .get('/api/avis/get-all-avis')
    if (data.data) return data.data
    return null;
}


