
import axios from 'axios';


export const getAllAvis = async () => {
    const data = await axios
        .get('/api/avis/get-all-avis')
    if (!data.data) return null
    return data.data;
}

export const getAvisBySession = async () => {
    return axios.get('/api/avis/getAvisBySession')
    .then((res) => {
        if (res.status == 200) return res.data;
        return null
    })
    .catch(() => {
        return null;
    })    
}

export const addAvis = async (content, note) => {
    axios.post("/api/client/avis/add-avis", {
        contenu: content,
        note: note
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}