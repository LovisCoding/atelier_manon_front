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
	IconButton,
	Snackbar,
	Alert,
} from "@mui/material";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
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
	const [isOrdersOpen, setIsOrdersOpen] = useState(false);
	const [avis, setAvis] = useState({ contenu: "", note: 1 });
	const [hasAvis, setHasAvis] = useState(true);
	const { details, logout } = useAuth();

	// user address
	const [addressNumber, setAddressNumber] = useState(""); // string : can be "1 bis"
	const [addressStreet, setAddressStreet] = useState("");
	const [addressCity, setAddressCity] = useState("");
	const [addressPostalCode, setAddressPostalCode] = useState("");

	const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [inputError, setInputError] = useState("");

	const navigate = useNavigate();

	const handleNewsletterChange = (event) => {
		const checked = event.target.checked;
		setUserDetails({ ...userDetails, news: checked });
		if (event.target.checked) {
			subNewsletters(userDetails.email);
		} else {
			unsubNewletters();
		}
	};

	const handleAvisChange = () => {
		addAvis(avis.contenu, avis.note).then(() => {
			setHasAvis(true);
			setErrorMessage("Avis ajouté avec succès !");
			setIsErrorDisplayed(true);
		})
		.catch(err=>{
			console.log("error:",err)
			setErrorMessage("Erreur lors de l'ajout de l'avis.");
			setIsErrorDisplayed(true);
		});
	};

	const updateUserDetails = async () => {
		if (userDetails.nomCli === "") {
			setInputError("name");
			setErrorMessage("Veuillez renseigner un nom avant de valider.");
			setIsErrorDisplayed(true);
			return;
		}
		if (userDetails.preCli === "") {
			setInputError("firstname");
			setErrorMessage("Veuillez renseigner un prénom avant de valider.");
			setIsErrorDisplayed(true);
			return;
		}
		if ( addressStreet === "" || addressCity === "" ||addressPostalCode === "" ) {
			setInputError("address");
			setErrorMessage("Veuillez renseigner une adresse complète avant de valider.");
			setIsErrorDisplayed(true);
			return;
		}
		const res = await updateUserDetailsApi(userDetails.nomCli, userDetails.preCli, [addressNumber, addressStreet, addressCity, addressPostalCode]);
		setErrorMessage(res ? "Profil mis à jour avec succès !" : "Erreur lors de la mise à jour du profil. Veuillez réessayer.")
		setIsErrorDisplayed(true);
	};

	const disableAccount = async () => {
		const res = await disableMyAccount();
		if (res) logout();
	};

	useEffect(() => {
		getProfilCurrentSession().then((data) => {
			setUserDetails({ ...data, news: data.news });
		});
		getOrdersProfil().then(setOrders);
		getAvisBySession().then((data) => {
			if (data) setAvis(data);
			else setHasAvis(false);
		});
	}, []);

	useEffect(() => {
		console.log(userDetails);
		if (!userDetails.adresseFormat) return;
		const address = (userDetails.adresseFormat).split(",");
		if (address.length === 4) {
			setAddressNumber(address[0].replace(/"/g, ''));
			setAddressStreet(address[1].replace(/"/g, ''));
			setAddressCity(address[2].replace(/"/g, ''));
			setAddressPostalCode(address[3].replace(/"/g, ''));
		} else {
			setAddressNumber("");
			setAddressStreet(address[0].replace(/"/g, ''));
			setAddressCity(address[1].replace(/"/g, ''));
			setAddressPostalCode(address[2].replace(/"/g, ''));
		}
	}, [userDetails]);

	const placeholderStyle = {
		"& input::placeholder": {
			color: "blue",
			fontWeight: "bold",
		}
	}

	if (!details) {
		navigate("/login");
		return null;
	}

	return (
		<Container sx={{ mb: 4, mt: 2 }}>
			<ModalAskQuestion open={open} handleClose={() => setOpen(false)} />
			<Snackbar
				open={isErrorDisplayed}
				autoHideDuration={3000}
				onClose={()=>setIsErrorDisplayed(false)}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert onClose={()=>setIsErrorDisplayed(false)} severity={errorMessage.includes("succès") ? "success" : "error"} sx={{ width: "100%" }}>
					{errorMessage}
				</Alert>
			</Snackbar>

			<Stack maxWidth="sm" margin="0 auto" spacing={3}>
				<Typography variant="h1">Espace client</Typography>

				<FormControl component="form">
					<Stack spacing={3}>
						<Stack direction="row" justifyContent="space-between" spacing={2}>
							<TextField
								label="Nom"
								value={userDetails?.nomCli || ""}
								error={inputError === "name"}
								onChange={(e) =>
								setUserDetails({ ...userDetails, nomCli: e.target.value })
								}
								sx={{ width: "48%" }}  // Augmenter la largeur ici
								/>
							<TextField
								label="Prénom"
								value={userDetails?.preCli || ""}
								error={inputError === "firstname"}
								onChange={(e) =>
								setUserDetails({ ...userDetails, preCli: e.target.value })
								}
								sx={{ width: "48%" }}  // Augmenter la largeur ici
								/>
						</Stack>
						<Stack direction="column" >
							<Stack direction="row" gap="1rem" >
								<TextField
									aria-colspan={2}
									margin="normal"
									label="N°"
									type="text"
									id="addressNumber"
									autoComplete="addressNumber"
									value={addressNumber}
									onChange={e => setAddressNumber(e.target.value)}
									sx={{ ...placeholderStyle, flex: '0 0 5rem' }}
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									label="Rue / Voie / Lieu-Dit"
									error={inputError === "address"}
									type="text"
									id="addressStreet"
									autoComplete="addressStreet"
									value={addressStreet}
									onChange={e => setAddressStreet(e.target.value)}
									sx={placeholderStyle}
								/>

							</Stack>
							<Stack direction="row" gap="1rem" >
								<TextField
									margin="normal"
									required
									fullWidth
									label="Ville"
									error={inputError === "address"}
									type="text"
									id="addressCity"
									autoComplete="addressCity"
									value={addressCity}
									onChange={e => setAddressCity(e.target.value)}
									sx={placeholderStyle}
									/>
								<TextField
									margin="normal"
									required
									label="Code Postal"
									error={inputError === "address"}
									type="number"
									id="addressPostalCode"
									autoComplete="addressPostalCode"
									value={addressPostalCode}
									onChange={e => setAddressPostalCode(e.target.value)}
									sx={{ ...placeholderStyle, flex: '0 0 8rem' }}
									/>
							</Stack>

						</Stack>


						<Button onClick={updateUserDetails} variant="outlined" sx={{ mt: 2 }}>
							Modifier
						</Button>

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
							sx={{ width: "fit-content" }}
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
				<Box display="flex" justifyContent="space-between" >
					<Typography variant="h2">Vos commandes</Typography>
					<IconButton onClick={()=>setIsOrdersOpen(!isOrdersOpen)} >
						{ isOrdersOpen ? <CiCircleMinus size={30} /> : <CiCirclePlus size={30} /> }
					</IconButton>
				</Box>
				{isOrdersOpen && <Stack spacing={2}>
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
				</Stack>}

				<Button onClick={() => setOpen(true)} variant="contained">
					Poser une question
				</Button>

				{/* Boutons pour actions de connexion et réinitialisation */}
				<Stack direction="row" spacing={2} mb={3}>
					<Button fullWidth onClick={() => navigate("/forgot-password")} variant="contained">
						Réinitialiser le mot de passe
					</Button>
					<Button fullWidth onClick={logout} variant="contained" color="error">
						Déconnexion
					</Button>
				</Stack>

				{!details.isAdmin && (
					<Button onClick={disableAccount} color="error" variant="outlined">
						Désactiver le compte
					</Button>
				)}
				{details.isAdmin && (
					<Stack direction="row" justifyContent="center">
						<Button
							type="button"
							variant="outlined"
							onClick={() => navigate("/admin")}
						>
							Accéder à la page d'administrateur
						</Button>
					</Stack>
				)}
			</Stack>
		</Container>
	);
}