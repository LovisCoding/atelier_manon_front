import { Container, Stack, Typography, Box } from "@mui/material";
import Link from "../../components/Link";
import Paragraphes from "./Paragraphes";
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

import { styled } from '@mui/system';

import { getEvenement } from "../../services/HomeService";


export default function CGV() {

	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const exec = async () => {
			const response = await getEvenement('cgv');
			setMessage(response);
		}
		exec();
		setLoading(false);
	}, [])

	const StyledDiv = styled('div')(({ theme }) => ({
		'& h1, & h2, & h3, & h4, & h5, & h6': {
			...theme.typography.h6, // Utilise les styles de Typography variant="h5"
			marginBottom: theme.spacing(1),
		},
		'& p, & span': {
			...theme.typography.body1, // Utilise les styles de Typography variant="body1"
			marginBottom: theme.spacing(1),
		},
		'& a': {
			...theme.typography.body1, // Utilise les styles de Typography pour les liens
			color: theme.palette.primary.main,
			textDecoration: 'underline',
		},
		'& ul, & ol': {
			...theme.typography.body1,
			paddingLeft: theme.spacing(3),
			marginBottom: theme.spacing(1),
		},
		'& li': {
			marginBottom: theme.spacing(1),
		},
	}));

	return (
		<Container maxWidth={'md'} sx={{ py: 4 }}>
			{/* <Typography variant={'h1'} textAlign={'center'} sx={{ fontSize: '4rem' }}>CGV</Typography>
			<Stack mt={10}>
				<Typography variant={'h5'}>Conditions générales de vente</Typography>
				<Typography variant={'body1'} mt={4}>
					L'Atelier de Manon
				</Typography>
				<Typography variant={'body1'} mt={2}>
					Site internet : <Link href="atelierdemanon.com" sx={{ textDecoration: 'underline' }} >atelierdemanon.com</Link>
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
			<Paragraphes /> */}

			<Typography variant={'h1'} textAlign={'center'} sx={{ fontSize: '4rem' }}>CGV</Typography>

			<StyledDiv
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(message),
				}}
			/>

		</Container>

		
	)
}