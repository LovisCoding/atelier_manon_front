import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import SidebarMenu from "../SidebarMenu";
import Link from "../../../components/Link";
import { getArticles } from "/src/services/ArticleService"; // Assurez-vous d'importer la méthode
import DOMPurify from 'dompurify';

const truncateText = (text, wordLimit) => {
    const words = text.split("<br>");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

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
            <Box display="flex" sx={{ width: '100%' }}>
                <SidebarMenu />
                <Box sx={{ padding: 3, flexGrow: 1, width: '100%' }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', width: '100%' }}>Chargement des articles...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box display="flex" sx={{ width: '100%' }}>
            <SidebarMenu />
            <Stack sx={{ mt: 5, width: '100%' }}>
                <Stack direction='row' justifyContent={'space-around'}>
                    <Typography variant='h4'>Articles</Typography>
                    <Button LinkComponent={Link} href={"/admin/blog/-1"} variant='contained' color='secondary'>
                        Nouvel Article
                    </Button>
                </Stack>

                <Box mx={5} mt={5}>
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
                                        <TableCell>
                                            <div 
                                                style={{
                                                    overflowWrap: "break-word",
                                                    whiteSpace: "normal",
                                                    wordBreak: "break-word",
                                                    }}
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(truncateText(article.contenu, 3)),
                                            }} />
                                        </TableCell>
                                        <TableCell style={{ whiteSpace: "nowrap" }}> 
                                            {new Date(article.dateArticle).toLocaleDateString("fr-FR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </TableCell>
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