import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"

export default function ConfirmAccount(){

	const navigate = useNavigate();
	const { token } = useParams();
	const [msg, setMsg] = useState("Confirmation du compte... ");

	useEffect(() => {
		axios.post("/api/account/confirmAccount", {
			"token": token
		})
		.then((res) => {
			if (res.status == 201) {
				navigate("/login");
				setMsg(res.data);
			} else {
				setMsg(res.data);
			}
		})
		.catch(() => {
			setMsg("Une erreur est survenue")
		})
	}, [])

	return(
		<Typography variant="h1" textAlign="center">{msg}</Typography>
	)
}