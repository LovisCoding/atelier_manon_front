import api from "../utils/api";

// Services
export const getAllMateriau = async () => {
    const data = await api
        .get('/api/materiau/get-materiaux');
    if (data.data) return data.data;
    return null;
};

export const getAllFils = async () => {
    const data = await api
        .get('/api/fil/get-fils');
    if (data.data) return data.data;
    return null;
};

export const getAllPierres = async () => {
    const data = await api
        .get('/api/pierre/get-pierres');
    if (data.data) return data.data;
    return null;
};

export const getAllTailles = async () => {
    const data = await api
        .get('/api/taille/get-tailles');
    if (data.data) return data.data;
    return null;
};

export const getAllPendentifs = async () => {
    const data = await api
        .get('/api/pendentif/get-pendentifs');
    if (data.data) return data.data;
    return null;
};

export const addMatProd = async (data) => {
    try {
        const response = await api.post(
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
		const response = await api.post(
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

export const addTailleProd = async (data) => {
	try {
		const response = await api.post(
			'/api/admin/taille/add-taille',
			data,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		if (response.data) return response.data;
		return null;
	} catch (error) {
		console.error('Erreur lors de l\'ajout de la taille :', error);
		return null;
	}
}


export const addPendentifProd = async (data) => {
	try {
		const response = await api.post(
			'/api/admin/pendentif/add-pendentif',
			data,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		if (response.data) return response.data;
		return null;
	} catch (error) {
		console.error('Erreur lors de l\'ajout de la taille :', error);
		return null;
	}
}

export const addPierreProd = async (data) => {
	try {
		const response = await api.post(
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
        const response = await api.request({
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
        const response = await api.request({
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
        const response = await api.request({
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

export const deleteTailleProd = async (id) => {
    try {
        const response = await api.request({
            url: `/api/admin/taille/delete-taille`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { libTaille: id }
        });
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression de la taille :', error);
        return null;
    }
};

export const deletePendentifProd = async (id) => {
    try {
        const response = await api.request({
            url: `/api/admin/pendentif/delete-pendentif`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { libPendentif: id }
        });
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression du pendentif :', error);
        return null;
    }
};