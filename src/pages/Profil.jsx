import {
	Button,
	Typography,
	Stack,
	Container,
	FormControl,
	TextField,
	Select,
	MenuItem,
	Box,
	Modal,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
	addAvis,
	getAvisBySession,
} from "../services/AvisService";
import {
	getOrdersProfil,
} from "../services/OrderService";
import {
	getProfilCurrentSession,
	disableMyAccount,
	updateUserDetailsApi,
} from "../services/AccountService";
import {
	addQuestion,
} from "../services/FAQService";
import {
	subNewsletters,
	unsubNewletters,
} from "../services/UserService";
import { useAuth } from "../utils/AuthContext";

// Styles pour la Modal
const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	maxWidth: "80vw",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
};

// Composant pour poser une question
const ModalAskQuestion = ({ open, handleClose }) => {
	const [msg, setMsg] = useState("");

	const submitNewQuestion = () => {
		addQuestion(msg).then((res) => {
			if (res) {
				setMsg("");
				handleClose();
			}
		});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box sx={modalStyle}>
				<Typography id="modal-title" variant="h6">
					Posez votre question
				</Typography>
				<TextField
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					rows={3}
					multiline
					fullWidth
					sx={{ mt: 2, mb: 2 }}
				/>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={submitNewQuestion}
						variant="contained"
						fullWidth
					>
						Envoyer
					</Button>
					<Button
						onClick={handleClose}
						variant="outlined"
						color="error"
						fullWidth
					>
						Fermer
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

// Composant principal
export default function Profil() {
	const [open, setOpen] = useState(false);
	const [userDetails, setUserDetails] = useState({});
	const [orders, setOrders] = useState([]);
	const [avis, setAvis] = useState({ contenu: "", note: 1 });
	const [hasAvis, setHasAvis] = useState(true);
	const { details, logout } = useAuth();
	const navigate = useNavigate();

	const handleNewsletterChange = (event) => {
		const checked = event.target.checked;
		setUserDetails({ ...userDetails, news: checked });
		if (checked) {
			subNewsletters(userDetails.email);
		} else {
			unsubNewletters();
		}
	};

	const handleAvisChange = () => {
		addAvis(avis.contenu, avis.note).then(() => setHasAvis(true));
	};

	const updateUserDetails = () => {
		updateUserDetailsApi(userDetails.nomCli, userDetails.preCli);
	};

	const disableAccount = async () => {
		const res = await disableMyAccount();
		if (res) logout();
	};

	useEffect(() => {
		getProfilCurrentSession().then((data) => {
			setUserDetails({ ...data, news: data.news === "t" });
		});
		getOrdersProfil().then(setOrders);
		getAvisBySession().then((data) => {
			if (data) setAvis(data);
			else setHasAvis(false);
		});
	}, []);

	if (!details) {
		navigate("/login");
		return null;
	}

	return (
		<Container sx={{ mb: 4, mt: 2 }}>
			<ModalAskQuestion open={open} handleClose={() => setOpen(false)} />

			<Stack maxWidth="sm" margin="0 auto" spacing={3}>
				<Typography variant="h1">Espace client</Typography>

				<FormControl component="form">
					<Stack spacing={3}>
						{/* Nom et Prénom */}
						<Stack direction="row" justifyContent="space-between" spacing={2}>
							<TextField
								label="Nom"
								value={userDetails?.nomCli || ""}
								onChange={(e) =>
									setUserDetails({ ...userDetails, nomCli: e.target.value })
								}
							/>
							<TextField
								label="Prénom"
								value={userDetails?.preCli || ""}
								onChange={(e) =>
									setUserDetails({ ...userDetails, preCli: e.target.value })
								}
							/>
							<Button onClick={updateUserDetails} variant="outlined">
								Modifier
							</Button>
						</Stack>

						{/* Email */}
						<Typography variant="body1">
							<strong>Email :</strong> {userDetails?.email}
						</Typography>

						{/* Avis */}
						<Stack gap={1}>
							<Typography variant="h5">Avis {hasAvis && `: ${avis.note}/5`}</Typography>
							{hasAvis ? (
								<Typography>{avis.contenu}</Typography>
							) : (
								<Stack spacing={2}>
									<TextField
										label="Votre avis"
										multiline
										rows={3}
										value={avis.contenu || ""}
										onChange={(e) =>
											setAvis({ ...avis, contenu: e.target.value })
										}
									/>
									<Select
										value={avis.note}
										onChange={(e) =>
											setAvis({ ...avis, note: e.target.value })
										}
									>
										{[1, 2, 3, 4, 5].map((note) => (
											<MenuItem key={note} value={note}>
												{note}/5
											</MenuItem>
										))}
									</Select>
									<Button onClick={handleAvisChange} variant="outlined">
										Envoyer
									</Button>
								</Stack>
							)}
						</Stack>

						{/* Newsletter */}
						<FormControlLabel
							label="S'abonner à la newsletter"
							sx={{width:'fit-content'}}
							control={
								<Checkbox
									checked={userDetails.news || false}
									onChange={handleNewsletterChange}
								/>
							}
						/>
					</Stack>
				</FormControl>

				{/* Commandes */}
				<Typography variant="h2">Vos commandes</Typography>
				<Stack spacing={2}>
					{orders.length === 0 ? (
						<Typography>Aucune commande disponible</Typography>
					) : (
						orders.map((order) => (
							<Stack
								key={order.idCommande}
								direction="row"
								justifyContent="space-between"
								padding={2}
								sx={{ borderBottom: "1px solid grey" }}
							>
								<Typography>#{order.idCommande}</Typography>
								<Typography>{order.etat}</Typography>
								<Typography>{order.dateCommande}</Typography>
								<Link to={`/command/${order.idCommande}`}>Voir plus</Link>
							</Stack>
						))
					)}
				</Stack>

				<Button onClick={() => setOpen(true)} variant="contained">
					Poser une question
				</Button>

				{/* Boutons Actions */}
				<Stack direction="row" spacing={2}>
					<Button fullWidth onClick={() => navigate("/forgot-password")} variant="contained">
						Réinitialiser le mot de passe
					</Button>
					<Button fullWidth onClick={logout} variant="outlined">
						Déconnexion
					</Button>
				</Stack>


				{!details.isAdmin && (
					<Button onClick={disableAccount} color="error" variant="outlined">
						Désactiver le compte
					</Button>
				)}
				{details.isAdmin &&
					<Stack direction="row" justifyContent="center" >
						<Button type="button" variant="outlined" onClick={() => navigate("/admin")}
						>Accéder à la page d'administrateur</Button>
					</Stack>}
			</Stack>
		</Container>
	);
}
