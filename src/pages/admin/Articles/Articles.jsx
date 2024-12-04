import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { useState } from "react";
import SidebarMenu from "../SidebarMenu";
import Link from "../../../components/Link";

export default function Articles() {
    const rows = [
        { id: 1, title: "Article 1", description: "Description de l'article 1", date: "2024-12-01" },
        { id: 2, title: "Article 2", description: "Description de l'article 2", date: "2024-12-02" },
        { id: 3, title: "Article 3", description: "Description de l'article 3", date: "2024-12-03" },
    ];

    return (
        <Box display={'flex'}>
            <SidebarMenu />
            <Stack sx={{ mt: 5, width: '100%' }}>
                <Stack direction='row' justifyContent={'space-around'}>
                    <Typography variant='h4'>Articles</Typography>
                    <Button LinkComponent={Link} href={"/admin/blog/-1"} variant='contained' color='secondary'>
                        Nouvel Article
                    </Button>
                </Stack>
                <Box mx={15} mt={8}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titre</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        hover
                                        style={{ cursor: "pointer" }}
                                        component={Link}
                                        href={'/admin/blog/' + row.id}
                                    >
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </Box>
    );
}
