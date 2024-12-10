
import axios from 'axios';


export const getAllCodesPromo = async () => {
    const data = await axios
        .get('/api/codepromo/get-codespromo')
    if (data.data) return data.data
    return null;
}
export const getAllCodesPromoWithUse = async () => {
    const data = await axios
        .get('/api/codepromo/get-codespromo-use')
    if (data.data) return data.data
    return null;
}
export const getOneCodePromo = async (code) => {
	const data = await axios
		.get('/api/codepromo/get-codespromo-id/', {
		params: {
			code
		}
	})
	if (data.data) return data.data
	return null;
}

export const CreatePromo = async (obj) => {
    return axios.post('/api/codepromo/add-codepromo', {
        ...obj
    })
    .then((res) => {
        if (res.status == 200 || res.status == 201) return true;
        return "Une erreur est survenue";
    })
    .catch((err) => {
        return err.response.data.messages.error;
    })
}

export const DeleteCodePromo = async (code) => {
    const data = await axios
        .delete('/api/codepromo/delete-codepromo', {
            data: {
                code
            }
        })
}

