import { useParams, useNavigate } from "react-router";
import SidebarMenu from "../SidebarMenu";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getQuestionsById, updateQuestion, deleteQuestion } from "/src/services/FAQService";

export default function FAQDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [faq, setFaq] = useState({
        contenu: '',
        reponse: ''
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchFaqData = async () => {
            if (id !== "-1") {
                const data = await getQuestionsById(id);
                if (data) {
                    setFaq({
                        contenu: data.contenu,
                        reponse: data.reponse
                    });
                }
            }
            setLoading(false);
        };
        fetchFaqData();
    }, [id]);

    const handleChange = (field, value) => {
        setFaq((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (isSaving) return;

        setIsSaving(true);

        const updatedFaq = {
            idQuestion: id,
            contenu: faq.contenu,
            reponse: faq.reponse
        };

        const response = await updateQuestion(updatedFaq);

        if (response) {
            alert("FAQ mise à jour avec succès");
        } else {
            alert("Erreur lors de la mise à jour de la FAQ");
        }

        setIsSaving(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette FAQ ?");

        if (confirmDelete) {
            const response = await deleteQuestion(id);

            if (response) {
                alert("FAQ supprimée avec succès");
                navigate("/faq");
            } else {
                alert("Erreur lors de la suppression de la FAQ");
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex">
                <SidebarMenu />
                <Stack spacing={3} mt={5} width="100%" mx={15}>
                    <Typography variant="h4">Chargement de la FAQ...</Typography>
                </Stack>
            </Box>
        );
    }

    return (
        <Box display="flex">
            <SidebarMenu />
            <Stack spacing={3} mt={5} width="100%" mx={15}>
                <Typography variant="h4">{id === "-1" ? "Nouvelle FAQ" : "Détail de la FAQ"}</Typography>

                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={faq.contenu}
                    onChange={(e) => handleChange('contenu', e.target.value)}
                    inputProps={{ style: { color: 'black' } }}
                />

                <TextField
                    label="Réponse"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={faq.reponse}
                    onChange={(e) => handleChange('reponse', e.target.value)}
                    inputProps={{ style: { color: 'black' } }}
                />

                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSave} 
                        sx={{ fontWeight: 'bold' }}
                        disabled={isSaving}
                    >
                        {isSaving ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    {id !== "-1" && (
                        <Button variant="contained" color="error" onClick={handleDelete} sx={{ fontWeight: 'bold' }}>
                            Supprimer
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}