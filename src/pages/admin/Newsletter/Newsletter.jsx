import { useParams } from "react-router";
import SidebarMenu from "../SidebarMenu";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Newsletter() {
    const { id } = useParams();

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        alert(`Penser à faire l'envoi de la newsletter avec le sujet : ${subject}`);
    };

    return (
        <Box display="flex" height="100vh" width="100%">
            <SidebarMenu />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start", // Alignement en haut
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
                        marginTop: 2, // Ajoute un léger espace en haut
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

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{
                                fontWeight: "bold",
                                alignSelf: "center",
                                paddingX: 4,
                                paddingY: 1,
                            }}
                        >
                            Envoyer
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}