import { Button, Container, Grid2, IconButton, InputLabel, Stack, Table, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function CodesPromo() {
	const [promoTextfield, setPromoTextfied] = useState('')
	return (
		<Container maxWidth='lg' sx={{mt:5}}>
		<Stack direction='row'justifyContent={'space-around'}>
			<Typography variant='h4'>Codes Promotion</Typography>
			<Button variant='contained' color='primary'>Nouveau</Button>
		</Stack>
		<Table
		</Container>
	)
}