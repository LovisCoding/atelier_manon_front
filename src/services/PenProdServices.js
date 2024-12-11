import axios from 'axios';



export const getPendentifsProduit = async (idProd) => {
    const data = await axios
        .get('/api/penprod/get-pendentifs-produit', {
            params: {
                idProd
            }
        })
    return data.data;
}

export const deletePenProd = async (idProd, idPenProd) => {
    try {
        const { data } = await axios.delete('/api/admin/penprod/delete-penprod', {
            data: {
                idProd,
                idPenProd,
            },
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        throw error; // Vous pouvez décider de propager l'erreur ou de gérer différemment
    }
};

export const updatePenProd = async (idProd, tabPendentifs) => {
    try {
        const { data } = await axios.post('/api/admin/penprod/update-pendentifs-produit', {
            idProd,
            tabPendentifs
        });
        return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        throw error; // Vous pouvez décider de propager l'erreur ou de gérer différemment
    }
};
