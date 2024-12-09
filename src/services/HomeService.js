import axios from 'axios';

export const addImage= async (image, type) => {
	const data = await axios.post('/api/admin/personnalisation/upload-image', {
		image,
		type
	})
}