
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

export const validateToken = async (token) => {
    try {
        const data = await axios.post('/api/account/reset-password', {
            token
        })
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue:",err);
        return err;
    }
}

export const resetPassword = async (token, password) => {
    try {
        const data = await axios.post('/api/account/update-password', {
            token,
            password
        })
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue:",err);
        return err;
    }
}

