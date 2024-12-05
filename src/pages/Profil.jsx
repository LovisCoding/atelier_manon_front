import { Button, TextField, Typography, Stack, Container, FormControl } from "@mui/material";
import { Link } from "react-router";

export default function Profil() {
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
							<TextField fullWidth id="outlined-basic" label="firstname" variant="outlined" defaultValue={"Matthias"} />
							<Button>OK</Button>
						</Stack>

						<Stack direction="row">
							<TextField fullWidth id="outlined-basic" label="lastname" variant="outlined" defaultValue={"Bernouy"} />
							<Button>OK</Button>
						</Stack>

						<Stack direction="row">
							<TextField fullWidth id="outlined-basic" label="email" variant="outlined" defaultValue={"matt.bernouy@orange.fr"} />
							<Button>OK</Button>
						</Stack>
					</Stack>
				</FormControl>


				<Typography variant="h2">Vos commandes</Typography>
				<Stack>

					<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"}>
						<Typography>#4</Typography>
						<Typography variant="h5">54,85 €</Typography>
						<Typography>En cours</Typography>
						<Typography>23 novembre 2024</Typography>
						<Link to={"/order/1"}><Typography>voir plus</Typography></Link>
					</Stack>
					<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"}>
						<Typography>#3</Typography>
						<Typography variant="h5">54,85 €</Typography>
						<Typography>En cours</Typography>
						<Typography>23 novembre 2024</Typography>
						<Link to={"/order/1"}><Typography>voir plus</Typography></Link>
					</Stack>
					<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"}>
						<Typography>#2</Typography>
						<Typography variant="h5">54,85 €</Typography>
						<Typography>En cours</Typography>
						<Typography>23 novembre 2024</Typography>
						<Link to={"/order/1"}><Typography>voir plus</Typography></Link>
					</Stack>
					<Stack borderBottom={"1px solid grey"} padding={3} direction={"row"} spacing={4} alignItems={"center"}>
						<Typography>#1</Typography>
						<Typography variant="h5">54,85 €</Typography>
						<Typography>En cours</Typography>
						<Typography>23 novembre 2024</Typography>
						<Link to={"/order/1"}><Typography>voir plus</Typography></Link>
					</Stack>
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