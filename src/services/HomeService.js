import axios from 'axios';

export const addImage = async (image, type) => {
	const data = await axios.post('/api/admin/personnalisation/upload-image', {
		image,
		type
	})
}

export const addImageCateg = async (idCateg, libImage, image) => {
	const data = await axios.post('/api/categorie/update-image', {
		idCateg,
		libImage,
		image
	})
}

export const getEvenement = async () => {
	const data = await axios.get('/api/personnalisation/get-evenement');
	if (data.status == 200) return data.data;
	return "";
}
