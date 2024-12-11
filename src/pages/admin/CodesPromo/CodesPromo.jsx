import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import SidebarMenu from "../SidebarMenu";
import Link from "../../../components/Link";
import { getAllCodesPromoWithUse } from "../../../services/CodesPromoService";

export default function CodesPromo() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllCodesPromoWithUse().then((data) => {
            setRows(data);
        });
    }, []);

    return (
        <Box display="flex" sx={{ width: '100%' }}>
            <SidebarMenu />
            <Box sx={{ padding: 3, flexGrow: 1, width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', width: '100%' }}>Codes Promotion</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                        <Button component={Link} href="/admin/codesPromo/-1" variant="contained" color="secondary" sx={{ fontWeight: 'bold' }}>Nouveau</Button>
                    </Box>
                </Box>

                <Box mx={15} mt={8}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom du code promo</TableCell>
                                    <TableCell>Nombre d'utilisations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.code}
                                        hover
                                        style={{ cursor: "pointer" }}
                                        component={Link}
                                        href={'/admin/codesPromo/' + row.code}
                                    >
                                        <TableCell>{row.code}</TableCell>
                                        <TableCell>{row.use}</TableCell>
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