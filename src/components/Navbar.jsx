import { Box, IconButton, Stack, Typography } from "@mui/material";
import ImgMui from "./ImgMui"; // Vérifiez que ce composant fonctionne
import Link from "./Link"; // Vérifiez si ce composant est bien défini
import { IconSearch } from "@tabler/icons-react"; // Vérifiez si l'icône est bien importée
import imgManon from "../assets/img/logo_manon.webp"

export default function Navbar() {
	return (
		<Box sx={{display: 'flex', justifyContent: 'space-between', py:1, pl:3, background : 'red' }} >
			{/* Logo et titre */}
			<Stack direction="row" spacing={2} alignItems="center">
				<ImgMui sx={{ width: 40, height: 40 }} alt="test logo" src={imgManon} />
				<Typography variant="h6">L'Atelier de Manon</Typography>
			</Stack>

			{/* Liens de navigation */}
			<Stack direction="row" spacing={2} alignItems="center">
				<Link variant={"dashed"} to="/home">Accueil</Link>
				<Link variant={"dashed"} to="/bijoux">Bijoux</Link>
				<Link variant={"dashed"} to="/about">À propos</Link>
				<Link variant={"dashed"} to="/faq">FAQ</Link>
				<Link variant={"dashed"} to="/contact">Contact</Link>
				<IconButton>
					<IconSearch />
				</IconButton>
			</Stack>
		</Box>
	);
}
