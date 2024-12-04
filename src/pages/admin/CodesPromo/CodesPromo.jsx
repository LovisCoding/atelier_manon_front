import {
	Box,
	Button, Container,
	Paper,
	Stack, Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { useState } from "react";
import SidebarMenu from "../SidebarMenu";
import Link from "../../../components/Link";
import axios from "axios";

export default function CodesPromo() {
	const [promoTextfield, setPromoTextfied] = useState('')
	const rows = [
		{ id: 1, name: "NOEL_PROMO", use: 123 },
		{ id: 2, name: "ETE_PROMO", use: 87 },
		{ id: 3, name: "HIVER_PROMO", use: 15 },
	];
	axios.get(
		'/api/codepromo/get-codespromo'
	).then((response) => {
		console.log(response.data);
	}).catch((error) => {
		console.error(error);
	}
	)
	return (
		<Box display={'flex'}>
			<SidebarMenu />
			<Stack  sx={{ mt: 5, width: '100%' }} >
				<Stack direction='row' justifyContent={'space-around'}>
					<Typography variant='h4'>Codes Promotion</Typography>
					<Button  LinkComponent={Link} href={"/admin/codesPromo/-1"} variant='contained' color='secondary'>Nouveau</Button>
				</Stack>
				<Box mx={15} mt={8}>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nom du code promo</TableCell>
								<TableCell>Nombre d'utilisation</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.id}
									hover
									style={{ cursor: "pointer" }}
									component={Link}
									href={'/admin/codesPromo/' + row.id}
								>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.use}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				</Box>
			</Stack>
		</Box>
	)
}