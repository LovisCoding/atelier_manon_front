import api from "../utils/api";
;

export const addNewsLetter = async (email) => {
    try {
        const data = await api
            .post('/api/client/account/add-newsletter' , {
                mail : email
            }, { headers: { 'Content-Type':'application/json' } });
		return data.data
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
}

export const sendContactMail = async (objet, nom, mail, content) => {
    try {
        const data = await api
            .post('/api/account/send-mail' , {
                objet : objet,
				nom: nom,
				mail: mail,
				content: content
            }, { headers: { 'Content-Type':'application/json' } });
		return data.data;
    } catch (err) {
        console.error("Une erreur est survenue : "+err);
        return null;
    }
}