import axios from 'axios';

// Services
export const getAllMateriau = async () => {
    const data = await axios
        .get('/api/materiau/get-materiaux');
    if (data.data) return data.data;
    return null;
};

export const getAllFils = async () => {
    const data = await axios
        .get('/api/fil/get-fils');
    if (data.data) return data.data;
    return null;
};

export const getAllPierres = async () => {
    const data = await axios
        .get('/api/pierre/get-pierres');
    if (data.data) return data.data;
    return null;
};

export const addMatProd = async (data) => {
    try {
        const response = await axios.post(
            '/api/admin/materiau/add-materiau',
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du matériau :', error);
        return null;
    }
};

export const addFilProd = async (data) => {
	try {
		const response = await axios.post(
			'/api/admin/fil/add-fil',
			data,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		if (response.data) return response.data;
		return null;
	} catch (error) {
		console.error('Erreur lors de l\'ajout du fil :', error);
		return null;
	}
}

export const addPierreProd = async (data) => {
	try {
		const response = await axios.post(
			'/api/admin/pierre/add-pierre',
			data,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		if (response.data) return response.data;
		return null;
	} catch (error) {
		console.error('Erreur lors de l\'ajout de la pierre :', error);
		return null;
	}
}

export const deleteMatProd = async (id) => {
    try {
        const response = await axios.request({
            url: `/api/admin/materiau/delete-materiau`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { libMateriau: id }
        });
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression du matériau :', error);
        return null;
    }
};

export const deleteFilProd = async (id) => {
    try {
        const response = await axios.request({
            url: `/api/admin/fil/delete-fil`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { libFil: id }
        });
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression du fil :', error);
        return null;
    }
};

export const deletePierreProd = async (id) => {
    try {
        const response = await axios.request({
            url: `/api/admin/pierre/delete-pierre`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { libPierre: id }
        });
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression de la pierre :', error);
        return null;
    }
};
