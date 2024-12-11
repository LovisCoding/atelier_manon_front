import { useParams } from "react-router";
import { Box, Button, Stack, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import SidebarMenu from "../SidebarMenu";
import { getArticleById, createArticle } from "/src/services/ArticleService"; // Assurez-vous que createArticle est implémenté
import { useNavigate } from 'react-router';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from "../../../components/Quill";

export default function Article() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [newArticleError, setNewArticleError] = useState("");


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
    }, []);

    const handleSave = async () => {
        if (!title) setNewArticleError("Veuillez renseigner un titre");
        if (!description) return setNewArticleError("Veuillez renseigner une description");
        if (!date) return setNewArticleError("Veuillez renseigner une date de publication");

        const newArticle = {
            idArticle: parseInt(id),
            titreArticle: title,
            contenu: description,
            date
        };

        const data = await createArticle(newArticle);
        if (data) navigate('/admin/blog');
        else return setNewArticleError("Une erreur est survenue lors de la création de votre article. Veuillez réessayer.");

    };

    useEffect(() => {
        setNewArticleError("");
    }, [title, description])

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
            <Stack spacing={3} mt={5} width="100%" mx={3}>
                <Snackbar
                    open={newArticleError !== ""}
                    autoHideDuration={3000}
                    onClose={() => setNewArticleError("")}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={() => setNewArticleError("")} severity="error" sx={{ width: "fit-content" }}>
                        {newArticleError}
                    </Alert>
                </Snackbar>
                <Typography variant="h4">{id === "-1" ? "Créer un nouvel article" : "Détail de l'Article"}</Typography>

                <TextField
                    label="Titre de l'article"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Quill title={" Description de l'article"} message={description} setMessage={setDescription} />

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