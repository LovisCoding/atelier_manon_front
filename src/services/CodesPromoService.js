
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
    const data = await axios
        .post('/api/codepromo/add-codepromo', {
            ...obj
        })
    if (data.data) return data.data
    return null;
}


