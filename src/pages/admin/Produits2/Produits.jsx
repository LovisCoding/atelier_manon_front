import { useParams } from "react-router";
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
import Link from "../../../components/Link";
import { getAllProduits, getProductImage } from "../../../services/ProductService";

export default function Produits() {
  

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [selectedRows, setSelectedRows] = useState([]); // Liste des lignes sélectionnées
  const [selectAll, setSelectAll] = useState(false); // Checkbox global

 

  const [rows, setRows] = useState([
    { id: 1, name: 'Cupcake', calories: 305, image: 'https://placehold.co/50x50', prixU: 10, total: 50 },
    { id: 2, name: 'Donut', calories: 452, image: 'https://placehold.co/50x50', prixU: 15, total: 75 },
    { id: 3, name: 'Eclair', calories: 262, image: 'https://placehold.co/50x50', prixU: 20, total: 100 },
    { id: 4, name: 'Frozen yoghurt', calories: 159, image: 'https://placehold.co/50x50', prixU: 25, total: 125 },
    { id: 5, name: 'Gingerbread', calories: 356, image: 'https://placehold.co/50x50', prixU: 30, total: 150 },
  ]);

  useEffect(()=> {
	getAllProduits().then((data) => {
		const tmpData = [];
		data.forEach((row) => {
			row.image = getProductImage(row.photo);
			tmpData.push(
				{id: row.idProd, name: row.libProd, prixU: row.prix, total: row.total, image: row.image}
			);
		})
		setRows(tmpData);
	})
  },[])
  return (
    <Box display="flex"	 justifyContent={'center'}  >
		
      <SidebarMenu />
      <Stack spacing={5} mt={5}>
		<Stack direction={'row'} spacing={4}>
		<Typography variant="h4">Configurer les Produits</Typography>
		<Button variant="contained" LinkComponent={Link} href={'/admin/products/-1'} color="secondary"> Nouveau</Button>
		</Stack>
        
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell></TableCell>
                <TableCell>Titre du produit</TableCell>
				<TableCell>Prix unitaire</TableCell>
                <TableCell>Total des ventes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {rows.map((row) => (
                <TableRow sx={{p:4}} key={row.id} component={Link} href={"/admin/products/" + row.id}>
                  <TableCell sx={{p:2}}>
                    <img src={row.image} alt={row.name} width="50" height="50" />
                  </TableCell>
                  <TableCell  width={'30%'}>{row.name}</TableCell>
				  <TableCell >{(row.prixU +"").replace('.', ',')+ " €"}</TableCell>
				  <TableCell >{(row.total+"").replace('.',',')+ " €"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> 
		
      </Stack>
    </Box>
  );
}
