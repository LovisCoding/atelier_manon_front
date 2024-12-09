
import axios from 'axios';


export const getAllAvis = async () => {
    const data = await axios
        .get('/api/avis/get-all-avis')
    if (!data.data) return null
    return data.data;
}

export const getAvisBySession = async () => {
    const res = await axios
        .get('api/avis/getAvisBySession');
    console.log(res);
    if (res.status == 200) return res.data;
    return "";
}
