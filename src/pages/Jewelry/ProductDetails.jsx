import React, { useEffect, useState } from 'react'; 
import { Typography, Select, MenuItem, TextField, Button, Box, Stack } from '@mui/material'; 
import { IoTimeOutline } from "react-icons/io5"; 
import { getMaterials, getRocks, getWires } from '../../services/ProductService';
import {addSingleProductCommande} from '../../services/CommandService';
import { useNavigate } from 'react-router';

export default function ProductDetails({product, validateCallback}) {
	const navigate = useNavigate();

	const [wires, setWires] = useState(["laPremiere", "laDeuxieme", "laTroisieme"]);
	const [materials, setMaterials] = useState([]);
	const [rocks, setRocks] = useState([]);
	const [engraving, setEngraving] = useState("");

	const [isWireError, setIsWireError] = useState(false);
	const [isMaterialError, setIsMaterialError] = useState(false);
	const [isRockError, setIsRockError] = useState(false);

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

	const checkErrorInputs = () => {
		let error = false;
		if (wires && wires.length >= 1 && !product.fil) {setIsWireError(true); error=true;}
		else setIsWireError(false);
		if (materials && materials.length >= 1 && !product.materiel) {setIsMaterialError(true); error=true;}
		else setIsMaterialError(false);
		if (rocks && rocks.length >= 1 && !product.pierre) {setIsRockError(true); error=true;}
		else setIsRockError(false);
		return error;
	}

	const generateVariant = () => {
		let variant = "";
		if (wires && wires.length >= 1 && product.fil) variant += "fil: "+product.fil+" ; ";
		if (materials && materials.length >= 1 && product.materiel) variant += "materiel: "+product.materiel+" ; ";
		if (rocks && rocks.length >= 1 && product.pierre) variant += "pierre: "+product.pierre+" ; ";
		return variant;
	}

	const handleAddToCart = () => { if (!checkErrorInputs()) validateCallback(); }

	const createSingleProductCommand = () => {
		if (checkErrorInputs()) return;
		const exec = async () => {
			const data = await addSingleProductCommande(product.idProd, generateVariant(), product.gravure);
			if (data) navigate('/command/'+data)
		}
		exec();
	}

	return (
		<Box padding={2}>
			<Box marginBottom={3}>
				<Typography variant="h4">{product.libProd}</Typography>
				<Box display={"flex"} alignItems={"center"}>
					<IoTimeOutline />
					<Typography marginLeft={1} variant="subtitle2" color="customYellow">
						expédié sous {product.tempsRea} jours
					</Typography>
				</Box>
			</Box>


			<Typography marginBottom={4} variant="body1">{product.descriptionProd}</Typography>

			<Stack spacing={3}>

			{wires && wires.length >= 1 &&
				<Select fullWidth defaultValue="" error={isWireError} displayEmpty onChange={(e)=>product.fil = e.target.value} >
					<MenuItem value="" disabled>Selectionner un fil</MenuItem>
					{  wires.map( (wire) =>
						<MenuItem value={wire} >{wire}</MenuItem>
					) }
				</Select>}

			{materials && materials.length >= 1 &&
				<Select fullWidth defaultValue="" error={isMaterialError} displayEmpty onChange={(e)=>product.materiel = e.target.value} >
					<MenuItem value="" disabled>Selectionner un matériel</MenuItem>
					{ materials.map( (material) =>
						<MenuItem value={material} >{material}</MenuItem>
					) }
				</Select>}

			{rocks && rocks.length >= 1 &&
				<Select fullWidth defaultValue="" error={isRockError} displayEmpty onChange={(e)=>product.pierre = e.target.value} >
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
				<Box display="flex" gap={1} >
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddToCart}
						sx={{width:'59%'}}
					>Ajouter au panier</Button>
					<Button
						variant='outlined'
						color="primary"
						onClick={createSingleProductCommand}
						sx={{width:'40%'}}
					>Passer la commande</Button>
				</Box>
				
			</Stack>
		</Box>
	);
}
