import { Button, Typography, Stack, Container, FormControl, TextField, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { addAvis, getAvisBySession } from "../services/AvisService";
import { getOrdersProfil } from "../services/OrderService";
import { getProfilCurrentSession, disableMyAccount, updateUserDetailsApi } from "../services/AccountService";
import { useAuth } from "../utils/AuthContext";

export default function Profil() {

	const [userDetails, setUserDetails] = useState();
	const [orders, setOrders] = useState([]);
	const [avis, setAvis] = useState({
		contenu: "",
		note: 1
	});

	const { details, logout } = useAuth();
	const navigate = useNavigate();

	const updateUserDetails = () => {
		updateUserDetailsApi(userDetails.nomCli, userDetails.preCli);
	}

	const handleAddAvis = () => {
		addAvis(avis.contenu, avis.note);
	}
 
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
	}

	useEffect(() => {
		getProfilCurrentSession().then((data) => {
			setUserDetails(data);
		})
		getOrdersProfil().then((data) => {
			setOrders(data);
		})
		getAvisBySession().then((data) => {
			if (data) setAvis(data);
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
								<Stack direction="row" spacing={1}>
									<TextField
										value={userDetails && userDetails.nomCli}
										onChange={(e) => {
											setUserDetails({ ...userDetails, nomCli: e.target.value })
										}}
									/>
								</Stack>
							</Stack>

							<Stack fullWidth spacing={1}>
								<Typography variant="h5">Prénom</Typography>
								<Stack direction="row" spacing={1}>
									<TextField
										value={userDetails && userDetails.preCli}
										onChange={(e) => {
											setUserDetails({ ...userDetails, preCli: e.target.value })
										}}
									/>
								</Stack>
							</Stack>
							<Button 
							onClick={() => {
								updateUserDetails();
							}}
							sx={{
								alignSelf: "end",
								height: "fit-content"
							}} variant="outlined">Modifier</Button>
						</Stack>

						<Stack spacing={1}>
							<Typography variant="h5">Email</Typography>
							<Typography>{userDetails && userDetails.email}</Typography>
						</Stack>
						<Stack spacing={1}>
							<Typography variant="h5">Avis</Typography>

							<Stack direction="row" spacing={1}>
								<TextField
									fullWidth
									multiline
									rows={5}
									value={avis.contenu && avis.contenu}
									onChange={(e) => {
										setAvis({ ...avis, contenu: e.target.value })
									}}
								/>
							<Stack spacing={3}>
								<Select
									value={avis && avis.note}
									onChange={(e) => {
										setAvis({...avis, note: e.target.value})
									}}
								>
									<MenuItem value="1">1/5</MenuItem>
									<MenuItem value="2">2/5</MenuItem>
									<MenuItem value="3">3/5</MenuItem>
									<MenuItem value="4">4/5</MenuItem>
									<MenuItem value="5">5/5</MenuItem>
								</Select>
								<Button onClick={() => handleAddAvis()} sx={{
									alignSelf: "end",
									height: "fit-content"
								}} variant="outlined">Modifier</Button>
							</Stack>

							</Stack>
						</Stack>
					</Stack>
				</FormControl>


				<Typography variant="h2">Vos commandes</Typography>
				<Stack>
					{orders.length == 0 && <Typography>Votre compte ne possède aucune commande</Typography>}
					{
						orders.map((order) => (
							<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"} justifyContent="space-between">
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