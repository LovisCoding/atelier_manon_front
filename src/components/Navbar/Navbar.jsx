import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import NavbarSm from "./sm/NavbarSm";
import NavbarMd from "./md/NavbarMd";

export default function Navbar() {
	
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up('md'));
	
	return (
		<>
		  {md ? (
			<NavbarMd />
			
		  ) : (
			<NavbarSm />
		  )
			}
		</>
	);
}