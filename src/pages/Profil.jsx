import { Button, TextField, Typography, Stack, Container, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Profil() {

	const [userDetails, setUserDetails] = useState({
		"email": "",
		"firstname": "",
		"lastname": ""
	});
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		let getOrders = [
			{
				"id": "1",
				"amount": "1",
				"state": "En cours",
				"delivery": "13 novembre 2024"
			},
			{
				"id": "2",
				"amount": "1",
				"state": "En cours",
				"delivery": "13 novembre 2024"
			},
			{
				"id": "3",
				"amount": "1",
				"state": "En cours",
				"delivery": "13 novembre 2024"
			}
		]
		let getUserDetails = {
			"email": "matt.bernouy@orange.fr",
			"firstname": "Matthias",
			"lastname": "Bernouy"
		}
		setUserDetails(getUserDetails);
		setOrders(getOrders);
	}, [])

	return (
		<Container sx={{
			marginBottom: "2rem",
			marginTop: "2rem"
		}}>
			<Stack margin={"0 auto"} maxWidth={"sm"} spacing={3}>

				<Typography variant="h1">Espace client</Typography>

				<FormControl>
					<Stack spacing={3}>
						<Stack direction="row">
							<TextField fullWidth id="outlined-basic" label="firstname" variant="outlined" defaultValue={userDetails.firstname} />
							<Button>OK</Button>
						</Stack>

						<Stack direction="row">
							<TextField fullWidth id="outlined-basic" label="lastname" variant="outlined" defaultValue={userDetails.lastname} />
							<Button>OK</Button>
						</Stack>

						<Stack spacing={1}>
							<Typography variant="h5">Email</Typography>
							<Typography>{userDetails.email}</Typography>
						</Stack>
					</Stack>
				</FormControl>


				<Typography variant="h2">Vos commandes</Typography>
				<Stack>
					{
						orders.map((order) => (
							<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"}>
								<Typography>#{order.id}</Typography>
								<Typography>{order.amount} €</Typography>
								<Typography>{order.state}</Typography>
								<Typography>{order.date}</Typography>
								<Link to={`/order/${order.id}`}><Typography>voir plus</Typography></Link>
							</Stack>
						))
					}
				</Stack>

				<Stack direction={"row"} spacing={3}>
					<Button fullWidth variant="outlined" color="danger">Supprimer le compte</Button>
					<Button fullWidth variant="outlined" color="secondary">Déconnexion</Button>
				</Stack>


			</Stack>
		</Container>

	)
}



function OrderLine() {
	return (
		<Typography>Commande 4</Typography>
	)
}