import axios from 'axios';

export const postNewsletter = async (data) => {
	try {
		const response = await axios.post('/api/admin/account/send-newsletter', data);
		if (response.data) {
			console.log(response.data);
			return response.data;
		}
		return null;
	} catch (error) {
		console.error('Erreur lors de la création de la newsletter:', error);
		return null;
	}
};