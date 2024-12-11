import SidebarMenu from "../SidebarMenu";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "../../../components/Link";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getProductImage } from "../../../services/ProductService";
import Categories from './Categories.jsx';

export default function Produits() {
    const navigate = useNavigate();

    const [rows, setRows] = useState([
        { id: 1, name: 'Cupcake', calories: 305, image: 'https://placehold.co/50x50', prixU: 10, total: 50 },
        { id: 2, name: 'Donut', calories: 452, image: 'https://placehold.co/50x50', prixU: 15, total: 75 },
        { id: 3, name: 'Eclair', calories: 262, image: 'https://placehold.co/50x50', prixU: 20, total: 100 },
        { id: 4, name: 'Frozen yoghurt', calories: 159, image: 'https://placehold.co/50x50', prixU: 25, total: 125 },
        { id: 5, name: 'Gingerbread', calories: 356, image: 'https://placehold.co/50x50', prixU: 30, total: 150 },
    ]);

    useEffect(() => {
        getAllProductsSales().then((data) => {
            const tmpData = data.produits.map((row) => ({
                id: row.idProd,
                name: row.libProd,
                prixU: row.prix,
                total: row.prixEstime,
                image: getProductImage(row.photo)
            }));
            setRows(tmpData);
        });
    }, []);

    const handleRowClick = (id) => {
        navigate(`/admin/products/${id}`);
    };

    return (
        <Box display="flex" sx={{ width: '100%' }}>
            <SidebarMenu />
            <Stack spacing={5} mt={5} direction={"column"} >
                <Stack direction={'row'} spacing={4}>
                    <Typography variant="h4">Configurer les Produits</Typography>
                    <Button variant="contained" component={Link} href={'/admin/products/-1'} color="secondary"> Nouveau</Button>
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
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => handleRowClick(row.id)}
                                >
                                    <TableCell sx={{ p: 2 }}>
                                        <img src={row.image} alt={row.name} width="50" height="50" />
                                    </TableCell>
                                    <TableCell width={'30%'}>{row.name}</TableCell>
                                    <TableCell>{(row.prixU + "").replace('.', ',') + " €"}</TableCell>
                                    <TableCell>{(row.total + "").replace('.', ',') + " €"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Categories />
            </Stack>
        </Box>
    );
}