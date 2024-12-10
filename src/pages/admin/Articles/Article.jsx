import { useParams } from "react-router";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import SidebarMenu from "../SidebarMenu";
import { getArticleById, createArticle } from "/src/services/ArticleService"; // Assurez-vous que createArticle est implémenté
import { useAuth } from "../../../utils/AuthContext";
import { Navigate, useNavigate } from 'react-router';

export default function Article() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (id !== "-1") {
            const fetchArticle = async () => {
                const article = await getArticleById(id);

                if (article) {
                    setTitle(article.titreArticle);
                    setDescription(article.contenu);
                    setDate(article.dateArticle);
                } else {
                    setError(true);
                }
                setLoading(false);
            };

            fetchArticle();
        } else {
            setLoading(false);
        }
    }, [id]);

    const handleSave = async () => {
        const newArticle = {
            idArticle: parseInt(id),
            titreArticle: title,
            descriptionProd: description,
            contenu: description,
        };

        await createArticle(newArticle);
        navigate('/admin/blog');
    };

    if (loading) {
        return (
            <Box display="flex">
                <SidebarMenu />
                <Stack spacing={3} mt={5} width="100%" mx={15}>
                    <Typography variant="h4">Chargement de l'article...</Typography>
                </Stack>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex">
                <SidebarMenu />
                <Stack spacing={3} mt={5} width="100%" mx={15}>
                    <Typography variant="h4" color="error">
                        Erreur : Article introuvable ou problème lors de la création.
                    </Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box display="flex">
            <SidebarMenu />
            <Stack spacing={3} mt={5} width="100%" mx={15}>
                <Typography variant="h4">{id === "-1" ? "Créer un nouvel article" : "Détail de l'Article"}</Typography>

                <TextField
                    label="Titre de l'article"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    label="Description de l'article"
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={25}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    label="Date de publication"
                    variant="outlined"
                    fullWidth
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button variant="contained" color="primary" onClick={handleSave}>
                    {id === "-1" ? "Créer" : "Enregistrer"}
                </Button>
            </Stack>
        </Box>
    );
}