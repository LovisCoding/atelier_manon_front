import React, { useEffect, useState } from 'react'; 
import { Typography, Select, MenuItem, TextField, Button, Box, Stack } from '@mui/material'; 
import { IoTimeOutline } from "react-icons/io5"; 
import { getMaterials, getRocks, getWires } from '../../services/ProductService';

export default function ProductDetails({product, validateCallback}) {

	const [wires, setWires] = useState(["laPremiere", "laDeuxieme", "laTroisieme"]);
	const [materials, setMaterials] = useState([]);
	const [rocks, setRocks] = useState([]);
	const [engraving, setEngraving] = useState("");

	useEffect(() => {
		const exec = async () => {
			const data = await getWires(product.idProd);
			if (data) setWires(data);
		}
		exec();
	}, []);

	useEffect(() => {
		const exec = async () => {
			const data = await getMaterials(product.idProd);
			if (data) setMaterials(data);
		}
		exec();
	}, []);

	useEffect(() => {
		const exec = async () => {
			const data = await getRocks(product.idProd);
			if (data) setRocks(data);
		}
		exec();
	}, []);


	useEffect(() => { product.gravure = engraving; }, [engraving]);



	return (
		<Box padding={2}>
			<Box marginBottom={3}>
				<Typography variant="h4">{product.libProd}</Typography>
				<Box display={"flex"} alignItems={"center"}>
					<IoTimeOutline />
					<Typography marginLeft={1} variant="subtitle2" color="customYellow">
						disponible sous {product.tempsRea} jours
					</Typography>
				</Box>
			</Box>


			<Typography marginBottom={4} variant="body1">{product.descriptionProd}</Typography>

			<Stack spacing={3}>
				{/* <Select fullWidth defaultValue="" displayEmpty>
					<MenuItem value="" disabled>Variante</MenuItem>
					<MenuItem value="option1">Option 1</MenuItem>
					<MenuItem value="option2">Option 2</MenuItem>
				</Select> */}

			{wires && wires.length >= 1 &&
				<Select fullWidth defaultValue="" displayEmpty onChange={(e)=>product.fil = e.target.value} >
					<MenuItem value="" disabled>Selectionner un fil</MenuItem>
					{  wires.map( (wire) =>
						<MenuItem value={wire} >{wire}</MenuItem>
					) }
				</Select>}

			{materials && materials.length >= 1 &&
				<Select fullWidth defaultValue="" displayEmpty onChange={(e)=>product.materiel = e.target.value} >
					<MenuItem value="" disabled>Selectionner un matériel</MenuItem>
					{ materials.map( (material) =>
						<MenuItem value={material} >{material}</MenuItem>
					) }
				</Select>}

			{rocks && rocks.length >= 1 &&
				<Select fullWidth defaultValue="" displayEmpty onChange={(e)=>product.pierre = e.target.value} >
					<MenuItem value="" disabled>Selectionner une pierre</MenuItem>
					{rocks.map((rock) =>
						<MenuItem value={rock} >{rock}</MenuItem>
					)}
				</Select>}

				{/** TODO: estGravable == false != "f" */}
				{product.estGravable && <TextField
					fullWidth
					label="Rentrer une gravure"
					value={engraving}
					onChange={(e) =>{product.gravure = e.target.value; setEngraving(e.target.value)}}
				/>}
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={validateCallback}
				>Ajouter au panier</Button>
			</Stack>
		</Box>
	);
}
