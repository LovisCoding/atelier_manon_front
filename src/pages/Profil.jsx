import { Button, Typography, Stack, Container, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { getAvisBySession } from "../services/AvisService";
import { getOrdersProfil } from "../services/OrderService";
import { getProfilCurrentSession, disableMyAccount } from "../services/AccountService";
import { useAuth } from "../utils/AuthContext";

export default function Profil() {

	const [userDetails, setUserDetails] = useState();
	const [orders, setOrders] = useState([]);
	const [avis, setAvis] = useState("");

	const { details, logout } = useAuth();
	const navigate = useNavigate();

	const disconnect = () => {
		logout();
	}

	const resetPassword = () => {
		navigate('/forgot-password')
	}

	const adminPage = () => {
		if (details.isAdmin) navigate('/admin');
		return;
	}

	const disableAccount = async () => {
		const res = await disableMyAccount();
		if (res) logout();
		return;
	};

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

	if (details == null) {
		navigate('/login');
		return;
	}

	return (
		<Container sx={{
			marginBottom: "2rem",
			mt:2
		}}>
			<Stack margin={"0 auto"} maxWidth={"sm"} spacing={3}>

				<Typography variant="h1">Espace client</Typography>

				<FormControl>
					<Stack spacing={3}>

						<Stack direction="row" justifyContent="space-between" >
							<Stack spacing={1}>
								<Typography variant="h5">Nom</Typography>
								<Typography>{userDetails && userDetails.nomCli}</Typography>
							</Stack>

							<Stack spacing={1}>
								<Typography variant="h5">Prénom</Typography>
								<Typography>{userDetails && userDetails.preCli}</Typography>
							</Stack>
						</Stack>

						<Stack spacing={1}>
							<Typography variant="h5">Email</Typography>
							<Typography>{userDetails && userDetails.email}</Typography>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">Avis</Typography>
							<Typography>{avis || "Aucun avis pour le moment"}</Typography>
						</Stack>
					</Stack>
				</FormControl>


				<Typography variant="h2">Vos commandes</Typography>
				<Stack>
					{orders.length == 0 && <Typography>Votre compte ne possède aucune commande</Typography>}
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
					<Button onClick={() => resetPassword()} fullWidth variant="yellowButton" color="secondary">Réinitialiser le mot de passe</Button>
					<Button onClick={() => disconnect()} fullWidth variant="yellowButton" color="secondary">Déconnexion</Button>
				</Stack>

				{ !details.isAdmin &&
				<Stack direction="row" justifyContent="center" >
					<Button type="button" variant="outlined" onClick={() => adminPage()}
					>Accéder à la page d'administrateur</Button>
				</Stack>}

				{ details.isAdmin &&
				<Stack direction="row" justifyContent="center" >
					<Button type="button" variant="outlined" onClick={() => disableAccount()}
						sx={{color: 'red', borderColor: 'red'}}
					>Désactiver le compte</Button>
				</Stack>}
			</Stack>
		</Container>

	)
}