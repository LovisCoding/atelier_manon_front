import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ConfirmAccount() {

	const navigate = useNavigate();
	const { token } = useParams();
	const [msg, setMsg] = useState("Confirmation du compte... ");
	const [subMsg, setSubMsg] = useState("");

	useEffect(() => {
		axios.post("/api/account/confirmAccount", {
			"token": token
		})
		.then((res) => {
			if (res.status == 201 || res.status == 200) {
				setMsg("Votre compte a été activé avec succès !");
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			} else {
				setMsg(res.data);
			}
		})
		.catch(() => {
			setMsg("Erreur lors de l'activation du compte.");
			setSubMsg("Le lien peut être invalide ou expiré.");
		})
	}, [])

	return(
		<>
			<Typography variant="h4" mt={5} textAlign="center" >{msg}</Typography>
			<Typography variant="h5" mt={3} textAlign="center" fontStyle="italic" >{subMsg}</Typography>
		</>
	)
}
