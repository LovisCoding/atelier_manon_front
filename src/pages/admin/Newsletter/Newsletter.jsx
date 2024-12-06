import { useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { postNewsletter } from "/src/services/NewsletterService";

export default function Newsletter() {
    const { id } = useParams();

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSave = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const data = { subject, content: description }; // Correspondance avec l'API
            const response = await postNewsletter(data);
            if (response) {
                setMessage("Newsletter envoyée avec succès !");
                setSubject(''); // Réinitialise l'objet
                setDescription(''); // Réinitialise la description
            } else {
                setMessage("Une erreur est survenue lors de l'envoi.");
            }
        } catch (error) {
            setMessage("Erreur : " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" height="100vh" width="100%">
            <SidebarMenu />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "600px",
                        bgcolor: "#ffffff",
                        p: 3,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 2,
                    }}
                >
                    <Typography variant="h4" mb={2} fontWeight="bold" textAlign="center">
                        Création de la Newsletter
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="Objet du mail"
                            variant="outlined"
                            fullWidth
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <TextField
                            label="Description du mail"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {message && (
                            <Typography
                                variant="body1"
                                color={message.includes("succès") ? "green" : "red"}
                                textAlign="center"
                            >
                                {message}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            disabled={loading || !subject || !description}
                            sx={{
                                fontWeight: "bold",
                                alignSelf: "center",
                                paddingX: 4,
                                paddingY: 1,
                            }}
                        >
                            {loading ? "Envoi en cours..." : "Envoyer"}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}