import { useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import { Box, Button, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

export default function CodePromo() {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [selectedRows, setSelectedRows] = useState([]); // Liste des lignes sélectionnées
  const [selectAll, setSelectAll] = useState(false); // Checkbox global

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
      setSelectedRows(rows.map((row) => row.id)); // Sélectionner toutes les lignes
    }
    setSelectAll(!selectAll); // Inverser l'état de la checkbox globale
  };

  const rows = [
    { id: 1, name: 'Cupcake', calories: 305, image: 'https://placehold.co/50x50' },
    { id: 2, name: 'Donut', calories: 452, image: 'https://placehold.co/50x50' },
    { id: 3, name: 'Eclair', calories: 262, image: 'https://placehold.co/50x50' },
    { id: 4, name: 'Frozen yoghurt', calories: 159, image: 'https://placehold.co/50x50' },
    { id: 5, name: 'Gingerbread', calories: 356, image: 'https://placehold.co/50x50' },
  ];

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
        />
        <TextField
          label="Entrez la valeur du code promo"
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
		  
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
                  >
                    <MenuItem value="option1">€</MenuItem>
                    <MenuItem value="option2">%</MenuItem>
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
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelect(row.id)}
                      inputProps={{ 'aria-labelledby': `checkbox-${row.id}` }}
                    />
                  </TableCell>
                  <TableCell>
                    <img src={row.image} alt={row.name} width="50" height="50" />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
		<Button variant='yellowButton'  >Enregistrer</Button>
      </Stack>
	  
    </Box>
  );
}
