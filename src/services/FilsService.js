import axios from "axios";

export const getFilsById = async (id) => {
    const data = await axios
        .get('/api/fil/get-fils')
    if (!data.data) return null
    return data.data;
}
