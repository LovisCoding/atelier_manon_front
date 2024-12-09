import { Container, Stack, Typography } from "@mui/material";
import Link from "../../components/Link";
import Paragraphes from "./Paragraphes";

function LegalMentions() {
	return (
		<Container maxWidth={'md'} sx={{py:4}}>
			<Typography variant={'h1'} textAlign={'center'} sx={{fontSize : '4rem'}}>Mentions Légales</Typography>
			<Stack mt={10}>
				<Typography variant={'h5'}>Conditions générales de vente</Typography>
				<Typography variant={'body1'} mt={4}>
					L'Atelier de Manon
				</Typography>
				<Typography variant={'body1'} mt={2}>
				Site internet : <Link href="atelierdemanon.com" sx={{textDecoration: 'underline'}} >atelierdemanon.com</Link>
				</Typography><Typography variant={'body1'} mt={2}>
				E-mail : [adresse email de contact]  
				</Typography>
				<Typography variant={'body1'} mt={2}>
				SIRET : [numéro de SIRET]  
				</Typography>
				<Typography variant={'body1'} mt={2}>
				Date de dernière mise à jour : 13/12/2024
				</Typography>
			</Stack>

			<Typography>
			Dernière mise à jour
			Ce document a été mis à jour le [date de la dernière mise à jour].
			</Typography>
			
		</Container>
	)
}

export default LegalMentions;