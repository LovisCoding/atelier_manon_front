import api from "../utils/api";


export const forgotPassword = async (email) => {
    try {
        const data = await api.post('/api/account/forgot-password', {
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
        const data = await api.post('/api/account/reset-password', {
            token
        })
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue:",err);
        return err;
    }
}

export const resetPassword = async (token, password, confirmPassword) => {
    try {
        const data = await api.post('/api/account/update-password', {
            token,
            password,
            confirm_password: confirmPassword
        })
        return data.data;
    } catch (err) {
        console.error("Une erreur est survenue:",err);
        return err;
    }
}

