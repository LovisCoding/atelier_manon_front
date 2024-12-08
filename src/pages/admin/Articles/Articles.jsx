import { Box, Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import SidebarMenu from "../SidebarMenu";
import Link from "../../../components/Link";
import { getArticles } from "/src/services/ArticleService"; // Assurez-vous d'importer la méthode

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getArticles();
            if (data) {
                setArticles(data);
            }
            setLoading(false);
        };
        fetchArticles();
    }, []);

    if (loading) {
        return (
            <Box display={'flex'}>
                <SidebarMenu />
                <Stack sx={{ mt: 5, width: '100%' }}>
                    <Typography variant='h4'>Chargement des articles...</Typography>
                </Stack>
            </Box>
        );
    }

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
                                {articles.map((article) => (
                                    <TableRow
                                        key={article.idArticle}
                                        hover
                                        style={{ cursor: "pointer" }}
                                        component={Link}
                                        href={`/admin/blog/${article.idArticle}`}
                                    >
                                        <TableCell>{article.titreArticle}</TableCell>
                                        <TableCell>{article.contenu}</TableCell>
                                        <TableCell>{article.dateArticle}</TableCell>
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