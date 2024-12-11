import React, { useEffect, useState } from 'react'; 
import { Typography, Select, MenuItem, TextField, Button, Box, Stack } from '@mui/material'; 
import { IoTimeOutline } from "react-icons/io5"; 
import { getMaterials, getRocks, getWires, getSizes, getPendants } from '../../services/ProductService';
import {addSingleProductCommande} from '../../services/CommandService';
import { useNavigate } from 'react-router';

export default function ProductDetails({product, validateCallback}) {
	const navigate = useNavigate();

	const [wires, setWires] = useState([]);
	const [materials, setMaterials] = useState([]);
	const [rocks, setRocks] = useState([]);
	const [engraving, setEngraving] = useState("");
	const [sizes, setSizes] = useState([]);
	const [pendants, setPendants] = useState([]);

	const [isWireError, setIsWireError] = useState(false);
	const [isMaterialError, setIsMaterialError] = useState(false);
	const [isRockError, setIsRockError] = useState(false);
	const [isSizeError, setIsSizeError] = useState(false);
	const [isPendantError, setIsPendantError] = useState(false);

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

	useEffect(() => {
		const exec = async () => {
			const data = await getSizes(product.idProd);
			if (data) setSizes(data);
		}
		exec();
	}, []);

	useEffect(() => {
		const exec = async () => {
			const data = await getPendants(product.idProd);
			if (data) setPendants(data);
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
		if (sizes && sizes.length >= 1 && !product.taille) {setIsSizeError(true); error=true;}
		else setIsSizeError(false);
		if (pendants && pendants.length >= 1 && !product.pendentif) {setIsPendantError(true); error=true;}
		else setIsPendantError(false);
		return error;
	}

	const generateVariant = () => {
		let variant = "";
		if (wires && wires.length >= 1 && product.fil) variant += "fil: "+product.fil+" ; ";
		if (materials && materials.length >= 1 && product.materiel) variant += "materiel: "+product.materiel+" ; ";
		if (rocks && rocks.length >= 1 && product.pierre) variant += "pierre: "+product.pierre+" ; ";
		if (sizes && sizes.length >= 1 && product.taille) variant += "taille: "+product.taille+" ; ";
		if (pendants && pendants.length >= 1 && product.pendentif) variant += "pendentif: "+product.pendentif+" ; ";
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
			<Box mb={3}>
				<Typography variant="h4">{product.libProd}</Typography>
				<Box display={"flex"} alignItems={"center"}>
					<IoTimeOutline />
					<Typography marginLeft={1} variant="subtitle2" color="customYellow">
						expédié sous {product.tempsRea} jours
					</Typography>
				</Box>
			</Box>

			<Typography mb={3} fontWeight='bold' fontSize={20} >{product.prix} €</Typography>

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
					<MenuItem value="" disabled>Selectionner un matériau</MenuItem>
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

			{sizes && sizes.length >= 1 &&
				<Select fullWidtht defaultValue="" error={isSizeError} displayEmpty onChange={(e)=>product.taille = e.target.value} >
					<MenuItem value="" disabled>Selectionner une taille</MenuItem>
					{sizes.map((size) =>
						<MenuItem value={size} >{size}</MenuItem>
					)}
				</Select>}

			{pendants && pendants.length >= 1 &&
				<Select fullWidtht defaultValue="" error={isPendantError} displayEmpty onChange={(e)=>product.pendentif = e.target.value} >
					<MenuItem value="" disabled>Selectionner un pendentif</MenuItem>
					{pendants.map((pendant) =>
						<MenuItem value={pendant} >{pendant}</MenuItem>
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
						variant='contained'
						color="primary"
						onClick={handleAddToCart}
						sx={{width:'59%'}}
					>Ajouter au panier</Button>
					<Button
						variant='outlined'
						color="primary"
						onClick={createSingleProductCommand}
						sx={{width:'40%', outlineColor:'customYellow', borderColor: 'customYellow'}}
					>Passer la commande</Button>
				</Box>
				
			</Stack>
		</Box>
	);
}
