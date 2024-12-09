import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
} from "@mui/material";
import SidebarMenu from "../SidebarMenu";

import {
  CreatePromo,
  DeleteCodePromo,
  getOneCodePromo,
  getAllProduits,
  getProductImage,
  addProduitsToPromo,
  addProduitToPromo,
  DeleteProduitFromPromo,
  deleteProduitsFromPromo,
  getProduitsByPromo
} from "@services";

export default function CodePromo() {
	const { id } = useParams();
	const theme = useTheme()
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [value, setValue] = useState('');
	const [selectValue, setSelectValue] = useState('E');
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const [exist, setExist] = useState(false);

	const [message, setMessage] = useState('');
	const [snOpenValue, setSnOpenValue] = useState(false);
	
	const handleSelectChange = (event) => {
		setSelectValue(event.target.value);
	};

	const handleRowSelect = (idRow) => {


		setSelectedRows((prevSelected) => {
			setSelectAll(prevSelected.length === rows.length - 1);

			if (prevSelected.includes(idRow)) { 
				DeleteProduitFromPromo(idRow,id)
				return prevSelected.filter((id) => id !== idRow)
			}
			else { 
				addProduitToPromo(idRow, id)
				return [...prevSelected, idRow]
			
			}
			
		});
	};

	const handleSelectAll = () => {
		if (selectAll) {
			//delete only the products that are already in the promo
			deleteProduitsFromPromo(rows.filter((row) => selectedRows.includes(row.idProd)).map((row) => row.idProd), id)
			
			//deleteProduitsFromPromo(rows.map((row) => row.idProd), id)
			setSelectedRows([]); // Si tout est sélectionné, on désélectionne tout
		} else {
			// add only the products that are not already in the promo
			addProduitsToPromo(rows.filter((row) => !selectedRows.includes(row.idProd)).map((row) => row.idProd), id)
			setSelectedRows(rows.map((row) => row.idProd)); // Sélectionner toutes les lignes
		}
		setSelectAll(!selectAll); // Inverser l'état de la checkbox globale
		
	};

	const [rows, setRows] = useState([]);

	useEffect(() => {
		getOneCodePromo(id).then((data) => {
			setName(data.code);
			setValue(data.reduc)
			setSelectValue(data.type);
			setExist(true);
		});
		getAllProduits().then((data) => {
			const tmpData = [...data]
			tmpData.forEach((row) => {
				row.image = getProductImage(row.photo);
			})
			
			setRows(data);
		});
		getProduitsByPromo(id).then((data) => {
			setSelectedRows(data.map((row) => row.idProd));
		}
		);
	}, [id]);

	const handleCreate = () => {
		if (name == '' || value == '') {
			setMessage('Veuillez remplir tous les champs');	
			return setSnOpenValue(true);
		}
		const obj = {
			code: name,
			reduc: parseFloat(value) ,
			type: selectValue,	
		}
		try {
			CreatePromo(obj)
		}
		catch (err) {
			console.error("Une erreur est survenue : " + err)
		}
		
		
	}

	const handleDelete = () => {
		try {
			DeleteCodePromo(id)
			navigate('/admin/codesPromo')
		}
		catch (err) {
			console.error("Une erreur est survenue : " + err)
		}

	}
	return (
		<Box display="flex" justifyContent={'center'} >
			<SidebarMenu />
			<Stack spacing={3} mt={5}>
				<Typography variant="h4">Détail du code de promotion</Typography>
				<TextField
					onChange={(e) => setName(e.target.value)}
					value={name}
					label="Nom du code promo"
					variant="outlined"
					size="small"
					disabled={exist}
				/>
				<TextField
					label="Entrez la valeur du code promo"
					variant="outlined"
					fullWidth
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={exist}
					sx={{ pr: 0 }}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<Select
										value={selectValue}
										onChange={handleSelectChange}
										displayEmpty
										sx={{ minWidth: 80 }}
										size={'small'}
										disabled={exist}
									>
										<MenuItem value="E">€</MenuItem>
										<MenuItem value="P">%</MenuItem>
									</Select>
								</InputAdornment>
							),
						},
					}}
				/>
				{
					id != -1 ?
					<TableContainer component={Paper} sx={{ maxHeight: 500 }}>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectAll}
										onChange={handleSelectAll}
										inputProps={{ 'aria-label': 'select all desserts' }}
									/>
								</TableCell>
								<TableCell></TableCell>
								<TableCell>Produits</TableCell>

							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.idProd}>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedRows.includes(row.idProd)}
											onChange={() => handleRowSelect(row.idProd)}
											inputProps={{ 'aria-labelledby': `checkbox-${row.idProd}` }}
										/>
									</TableCell>
									<TableCell>
										<img src={row.image} alt={row.libProd} width="50" height="50" />
									</TableCell>
									<TableCell>{row.libProd}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer> : ''
				}
				
				{id == -1 ? <Button variant='yellowButton' onClick={handleCreate} >Enregistrer</Button> : ''}
				{id != -1 ? <Button sx={{background: theme.palette.primary.error, color: theme.palette.text.white}} onClick={handleDelete} >Supprimer</Button> : ''}
			</Stack>
			<Snackbar open={snOpenValue} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnOpenValue(false)} message={message} />
		</Box>
	);
}