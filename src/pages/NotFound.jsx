import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "../components/Link";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

export default function NotFound() {

	const navigate = useNavigate();
	return (
		<Box py={12} sx={{height: "calc(100vh - 270px)"}}>
		
		<Stack alignItems={'center'}>
			
		<Stack py={4} display={'flex'} alignItems={'center'}>
			<Typography variant={'h1'}> 404</Typography>
			<Typography variant="h6">Page non trouvée</Typography>
		</Stack>
		<Button  sx={{ my: 6, border: '1px solid', padding: '8px 16px', borderRadius: '4px' }} onClick={() => navigate(-1)}>Retour</Button>
		</Stack>
		</Box>
	)
}
