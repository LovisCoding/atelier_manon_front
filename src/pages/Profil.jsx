import { Button, TextField, Typography, Stack, Container, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getAvisBySession } from "../services/AvisService";
import { getOrdersProfil } from "../services/OrderService";
import { getProfilCurrentSession } from "../services/AccountService";
import { useAuth } from "../utils/AuthContext";
import axios from "axios";

export default function Profil() {

	const [userDetails, setUserDetails] = useState();
	const [orders, setOrders] = useState([]);
	const [avis, setAvis] = useState("");

	const auth = useAuth();
	const navigate = useNavigate();

	const disconnect = () => {
		auth.logout();
	}

	const resetPassword = () => {
		axios.post("/api/account/reset-password").then((res) => {
			if (res.status == 200 || res.status == 201) navigate("/email-sent");
		}).catch((error) => {
			console.log(error);
		})
	}

	useEffect(() => {
		getProfilCurrentSession().then((data) => {
			setUserDetails(data);
		})
		getOrdersProfil().then((data) => {
			setOrders(data);
		})
		getAvisBySession().then((data) => {
			setAvis(data);
		})
	}, [])

	if ( auth.details == null ){
		return ( <Typography mt={5} variant="h1" textAlign="center">Vous n'êtes pas connecté</Typography> )
	}

	return (
		<Container sx={{
			marginBottom: "2rem",
			marginTop: "2rem"
		}}>
			<Stack margin={"0 auto"} maxWidth={"sm"} spacing={3}>

				<Typography variant="h1">Espace client</Typography>

				<FormControl>
					<Stack spacing={3}>
						
						<Stack spacing={1}>
							<Typography variant="h5">Nom</Typography>
							<Typography>{userDetails && userDetails.nomCli}</Typography>
						</Stack>

						<Stack spacing={1}>
							<Typography variant="h5">Prénom</Typography>
							<Typography>{userDetails && userDetails.preCli}</Typography>
						</Stack>

						<Stack spacing={1}>
							<Typography variant="h5">Email</Typography>
							<Typography>{userDetails && userDetails.email}</Typography>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">Avis</Typography>
							<Typography>{ avis || "Aucun avis pour le moment" }</Typography>
						</Stack>
					</Stack>
				</FormControl>


				<Typography variant="h2">Vos commandes</Typography>
				<Stack>
					{ orders.length == 0 && <Typography>Votre compte ne possède aucune commande</Typography> }
					{
						orders.map((order) => (
							<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"}>
								<Typography>#{order.idCommande}</Typography>
								<Typography>{order.etat}</Typography>
								<Typography>{order.dateCommande}</Typography>
								<Link to={`/command/${order.idCommande}`}><Typography>voir plus</Typography></Link>
							</Stack>
						))
					}
				</Stack>

				<Stack direction={"row"} spacing={3}>
					<Button type="button" onClick={() => resetPassword()} fullWidth variant="outlined" color="secondary">Réinitialiser le mot de passe</Button>
					<Button type="button" onClick={() => disconnect()} fullWidth variant="outlined" color="secondary">Déconnexion</Button>
				</Stack>


			</Stack>
		</Container>

	)
}