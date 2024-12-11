import { useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import { Box, Button, Typography, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "../../../components/Link";
import { useNavigate } from "react-router-dom";
import { getAllProductsSales, getProductImage } from "../../../services/ProductService";

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
            <Box sx={{ padding: 3, flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                        <Typography variant="h4" sx={{ textAlign: 'center', width: '100%' }}>Configurer les Produits</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                            <Button variant="contained" component={Link} href={'/admin/products/-1'} color="secondary" sx={{ fontWeight: 'bold' }}>Nouveau</Button>
                        </Box>
                    </Box>
                    <TableContainer component={Paper} sx={{ maxHeight: 700, width: 700, margin: '0 auto', marginTop: 5 }}>
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
                </Box>
            </Box>
        </Box>
    );
}