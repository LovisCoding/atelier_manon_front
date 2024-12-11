import SidebarMenu from "../SidebarMenu";
import Quill from "../../../components/Quill";
import { Box, Typography, Button, Snackbar, Alert, Stack } from "@mui/material";
import { useState, useEffect } from "react";

import { getEvenement, updateEvenement } from "../../../services/HomeService";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CGV() {

	const [message, setMessage] = useState("");
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [loading, setLoading] = useState(false);

	const updateCGV = async () => {
		const data = await updateEvenement('cgv', message);
		if (data) {
			setLoading(false);
			setSnackbarMessage("Page CGV mise à jour avec succès !");
			setOpenSnackbar(true);
		}
		else {
			setLoading(false);
			setSnackbarMessage("Erreur lors de la modification des conditions générales de ventes.");
			setOpenSnackbar(true);
		}
	}


	useEffect(() => {
		const exec = async () => {
			const response = await getEvenement('cgv');
			setMessage(response);
		}
		exec();
		setLoading(false);
	}, [])


	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	return (
		<Box display="flex" height="100vh" width="100%">
			<SidebarMenu />
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					padding: 2,
				}}
			>
				<Box
					sx={{
						width: "100%",
						maxWidth: "600px",
						bgcolor: "#ffffff",
						p: 3,
						borderRadius: 2,
						display: "flex",
						flexDirection: "column",
						marginTop: 2,
					}}
				>
					<Typography variant="h4" mb={5} textAlign="center">
						Modification de la page CGV
					</Typography>

					<Stack spacing={2}>
						<Quill title={"Contenu de la page CGV"} message={message} setMessage={setMessage}/>

						<Button
							variant="contained"
							color="primary"
							onClick={updateCGV}
							sx={{
								fontWeight: "bold",
								alignSelf: "center",
								paddingX: 4,
								paddingY: 1,
							}}
						>
							{loading ? "Envoi en cours..." : "Envoyer"}
						</Button>
					</Stack>
				</Box>
			</Box>


			{/* Snackbar pour afficher des notifications */}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity="success"
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>

		</Box>
	);
}