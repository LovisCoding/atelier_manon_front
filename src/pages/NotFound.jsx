import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "../components/Link";
import Footer from "../components/Footer";

export default function NotFound() {

	return (
		<Box py={12} sx={{height: "calc(100vh - 270px)"}}>
		
		<Stack alignItems={'center'}>
			
		<Stack py={4} display={'flex'} alignItems={'center'}>
			<Typography variant={'h1'}> 404</Typography>
			<Typography variant="h6">Page non trouvée</Typography>
		</Stack>
		<Link variant="home" sx={{ my: 6, border: '1px solid', padding: '8px 16px', borderRadius: '4px' }} href={'/'}>Retour</Link>
		</Stack>
		</Box>
	)
}
