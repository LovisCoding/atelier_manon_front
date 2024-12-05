import { useLocation, useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import { Box, Button, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { getOneCodePromo } from "../../../services/CodesPromoService";
import { getAllProduits } from "../../../services/ProductService";
import axios from "axios";

export default function CodePromo() {
	const {id} = useParams();
	
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState('E');
  const [selectedRows, setSelectedRows] = useState([]); // Liste des lignes sélectionnées
  const [selectAll, setSelectAll] = useState(false); // Checkbox global
  const [exist, setExist] = useState(false);

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id) // Désélectionner la ligne
        : [...prevSelected, id] // Sélectionner la ligne
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Si tout est sélectionné, on désélectionne tout
    } else {
      setSelectedRows(rows.map((row) => row.idProd)); // Sélectionner toutes les lignes
    }
    setSelectAll(!selectAll); // Inverser l'état de la checkbox globale
  };

  const [rows, setRows] = useState([
    { idProd: 1, libProd: 'Cupcake', calories: 305, image: 'https://placehold.co/50x50' },
    { idProd: 2, libProd: 'Donut', calories: 452, image: 'https://placehold.co/50x50' },
    { idProd: 3, libProd: 'Eclair', calories: 262, image: 'https://placehold.co/50x50' },
    { idProd: 4, libProd: 'Frozen yoghurt', calories: 159, image: 'https://placehold.co/50x50' },
    { idProd: 5, libProd: 'Gingerbread', calories: 356, image: 'https://placehold.co/50x50' },
  ]);

  useEffect(() => {	
	getOneCodePromo(id).then((data) => {
		setName(data.code);
		setValue(data.reduc)
    setSelectValue(data.type);
  });
  getAllProduits().then((data) => {
		console.log(data[0].tabPhoto);
	});
	  }, [id]);

  return (
    <Box display="flex"	  justifyContent={'center'} >
      <SidebarMenu />
      <Stack spacing={3} mt={5}>
        <Typography variant="h4">Détail du code de promotion</Typography>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          label="Nom du code promo"
          variant="outlined"
		  size="small"
		  disabled={!exist}
        />
        <TextField
          label="Entrez la valeur du code promo"
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
		  disabled={!exist}
		  sx={{pr:0}}
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
					disabled={!exist}
                  >
                    <MenuItem value="E">€</MenuItem>
                    <MenuItem value="P">%</MenuItem>
                  </Select>
                </InputAdornment>
              ),
            },
          }}
        />
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table>
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
        </TableContainer>
		<Button variant='yellowButton'>Enregistrer</Button>
      </Stack>
	  
    </Box>
  );
}
