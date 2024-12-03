import {
	Button, Container, Grid2, IconButton, InputLabel, Stack, Table, TableContainer, TextField, Typography,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import SidebarMenu from "./SidebarMenu";
import {

} from "@mui/material";

export default function CodesPromo() {
	const [promoTextfield, setPromoTextfied] = useState('')
	const rows = [
		{ id: 1, name: "John Doe", age: 25, occupation: "Developer" },
		{ id: 2, name: "Jane Smith", age: 30, occupation: "Designer" },
		{ id: 3, name: "Alice Johnson", age: 28, occupation: "Product Manager" },
	];
	const handleRowClick = (row) => {
		alert(`You clicked on: ${row.name}`);
	};
	return (
		<>
			<SidebarMenu />
			<Container maxWidth='lg' sx={{ mt: 5 }}>
				<Stack direction='row' justifyContent={'space-around'}>
					<Typography variant='h4'>Codes Promotion</Typography>
					<Button variant='contained' color='primary'>Nouveau</Button>
				</Stack>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Age</TableCell>
								<TableCell>Occupation</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.id}
									hover
									style={{ cursor: "pointer" }}
									onClick={() => handleRowClick(row)}
								>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.age}</TableCell>
									<TableCell>{row.occupation}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}