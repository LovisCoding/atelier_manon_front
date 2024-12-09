import axios from "axios"

export const getProfilCurrentSession = async () => {
	let res = await axios.get("/api/client/account/get-compte");
	if ( res.status != 200 ) return null;
	return res.data;
}