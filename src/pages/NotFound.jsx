import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "../components/Link";

export default function NotFound() {

	return (
		<>
		<Box py={12}></Box>
		<Stack alignItems={'center'}>
			
		<Stack py={4} display={'flex'} alignItems={'center'}>
			<Typography variant={'h1'}> 404</Typography>
			<Typography variant="h6">Page non trouvée</Typography>
		</Stack>
		<Link variant="home" sx={{my:6}} to={'/'}>Retour</Link>
		</Stack>
		</>
	)
}