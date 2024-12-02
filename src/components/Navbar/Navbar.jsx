import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ImgMui from "../ImgMui"; // Vérifiez que ce composant fonctionne
import Link from "../Link"; // Vérifiez si ce composant est bien défini
import { FaSearch } from "react-icons/fa";
import imgManon from "../../assets/img/logo_manon.webp"
import MenuNavbar from "./md/dropDownMenu";
import { useLocation } from "react-router";
import { IoMenu } from "react-icons/io5";
import MenuMd from "./md/NavbarMd";
import NavbarSm from "./sm/NavbarSm";
import NavbarMd from "./md/NavbarMd";

export default function Navbar() {
	
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));

	console.log(md);
	
	
	const logoTitle = (
		<Stack direction="row" spacing={2} alignItems="center">
				<ImgMui sx={{ width: 40, height: 40 }} alt="logo" src={imgManon} />
				<Typography variant="h6" sx={{ fontWeight: 200 }}>
				  L'Atelier de Manon
				</Typography>
			  </Stack>
	)
	return (
		<>
		  {md ? (
			<NavbarMd logoTitle={logoTitle}/>
			
		  ) : (
			<NavbarSm logoTitle={logoTitle} />
		  )
			}
		</>
	  );
	  
}
