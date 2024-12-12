import api from "../utils/api";


export const getPendentifs = async () => {

   const data = await api.get('/api/pendentif/get-pendentifs')

    return data.data
}