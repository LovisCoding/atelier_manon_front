import api from "../utils/api";

export const sendNewsletter = async (subject, content) => {
	try {
		const response = await api.post('/api/admin/account/send-newsletter', {
			subject,
			content
		});
		return response.data;
	} catch (error) {
		console.error('Newsletter Error:', error);
		return null;
	}
};

