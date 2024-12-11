import axios from "axios";

export const getPendentifs = async () => {

   const data = await axios.get('/api/pendentif/get-pendentifs')

    return data.data
}