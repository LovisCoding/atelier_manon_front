import {
	Box,
	Button,
	Paper,
	Stack, Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import SidebarMenu from "../SidebarMenu";
import Link from "../../../components/Link";
import { getAllCodesPromoWithUse } from "../../../services/CodesPromoService";

export default function CodesPromo() {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		getAllCodesPromoWithUse().then((data) => {
			
			setRows(data);
		});
	}, []);
	return (
		<Box display={'flex'}>
			<SidebarMenu />
			<Stack  sx={{ mt: 5, width: '100%' }} >
				<Stack sx={{ marginTop: "1rem"}} direction='row' justifyContent={'space-around'}>
					<Typography variant='h4'>Codes Promotion</Typography>
					<Button  LinkComponent={Link} href={"/admin/codesPromo/-1"} variant='contained' color='secondary'>Nouveau</Button>
				</Stack>
				<Box margin={4}>
				<TableContainer sx={{ margin: "0 auto", maxWidth: "30rem" }} component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nom du code promo</TableCell>
								<TableCell>Nombre d'utilisations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.code}
									hover
									style={{ cursor: "pointer" }}
									component={Link}
									href={'/admin/codesPromo/' + row.code}
								>
									<TableCell>{row.code}</TableCell>
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