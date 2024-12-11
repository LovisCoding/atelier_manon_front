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

export const getEvenement = async (type) => {
	const data = await axios.get('/api/personnalisation/get-evenement', {
		params: {type}
	 })
	if (data.status == 200) return data.data;
	return "";
}

export const updateEvenement = async (type, message) => {
	const data = await axios.post('/api/personnalisation/update-evenement', {
		type, message
	 })
	return data.status == 200 || data.status == 201;
}

export const getImageURL = (type) => {
    return import.meta.env.VITE_API_URL+'personnalisation/get-image?type='+type;
}
