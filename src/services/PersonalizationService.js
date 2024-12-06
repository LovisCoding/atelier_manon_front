import axios from 'axios';

export const getAllMateriau = async () => {
    const data = await axios
        .get('/api/materiau/get-materiaux')
    if (data.data) return data.data
    return null;
}

export const getAllFils = async () => {
	const data = await axios
		.get('/api/fil/get-fils')
	if (data.data) return data.data
	return null;
}

export const getAllPierres = async () => {
	const data = await axios
		.get('/api/pierre/get-pierres')
	if (data.data) return data.data
	return null;
}