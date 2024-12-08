
import axios from "axios";

export const forgotPassword = async (email) => {
    try {
        const data = await axios.post('/api/account/forgot-password', {
            email
        })
        return data.data
    } catch (err) {
        console.error("Une erreur est survenue:",err);
        return err;
    }
}


