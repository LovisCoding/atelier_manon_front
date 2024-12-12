import api from "../utils/api";
;

export const getFilsById = async (id) => {
    const data = await api
        .get('/api/fil/get-fils')
    if (!data.data) return null
    return data.data;
}
