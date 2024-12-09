import axios from 'axios';

export const sendNewsletter = async (subject, content) => {
	try {
		const response = await axios.post('/api/admin/account/send-newsletter', {
			subject,
			content
		});
		return response.data;
	} catch (error) {
		console.error('Newsletter Error:', error);
		return null;
	}
};

