import { IconButton, Stack} from "@mui/material";
import Link from "../../Link"; // Vérifiez si ce composant est bien défini
import { FaSearch } from "react-icons/fa";
import MenuNavbar from "./dropDownMenu";
import { useLocation } from "react-router";

export default function NavbarMd({logoTitle}) {
	const location = useLocation()
	function equalPathSx(path) {
		return location.pathname === path ? {fontWeight: 'bold'} : null
	}
	return (
		<Stack
			  sx={{
				display: 'flex',
				justifyContent: 'space-between',
				py: 1,
				pl: 3,
				background: 'red',
			  }}
			  pr={1}
			  direction={'row'}
			>
			  {/* Logo and title */}
			  {logoTitle}
			  {/* Navigation links */}
			  <Stack direction="row" spacing={2} alignItems="center">
				<Link
				  variant="navbar"
				  sx={equalPathSx('/')}
				  to="/home"
				>
				  Accueil
				</Link>
				<MenuNavbar />
				<Link
				  variant="navbar"
				  sx={equalPathSx('/about')}
				  to="/about"
				>
				  À propos
				</Link>
				<Link
				  variant="navbar"
				  sx={equalPathSx('/faq')}
				  to="/faq"
				>
				  FAQ
				</Link>
				<Link
				  variant="navbar"
				  sx={equalPathSx('/contact')}
				  to="/contact"
				>
				  Contact
				</Link>
				<IconButton>
				  <FaSearch />
				</IconButton>
			  </Stack>
			</Stack>
		  
	)
}