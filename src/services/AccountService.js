import axios from "axios"

export const getProfilCurrentSession = async () => {
	let res = await axios.get("https://atelier-manon.bernouy.fr/api/client/account/get-compte");
	if ( res.status != 200 ) return null;
	return res.data;
}

export const disableMyAccount = async () => {
	let res = await axios.post("/api/client/account/disable-account");
	if ( res.status != 200 ) return false;
	return true;
}

export const updateUserDetailsApi = async (firstname, lastname) => {
	try {
        const data = await axios
            .post('/api/client/account/update-nom-prenom' , {
                nom : firstname,
                prenom : lastname
            });
		return data == 200 || data == 201;
    } catch (err) {
        return false;
    }
}