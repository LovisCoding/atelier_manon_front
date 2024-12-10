import SidebarMenu from "../SidebarMenu";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { sendNewsletter } from "/src/services/NewsletterService";

export default function Newsletter() {

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);


    const handleSave = async () => {
        setLoading(true);
        setMessage("");
        try {
            const response = await sendNewsletter(subject, description);
            if (response) {
                setMessage("Newsletter envoyée avec succès !");
                setSubject('');
                setDescription('');
            } else {
                setMessage("Une erreur est survenue lors de l'envoi des emails.");
            }
            setIsError(true);
        } catch (error) {
            setMessage(error.message);
            setIsError(true);
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
                    <Typography variant="h4" mb={5} textAlign="center">
                        Création de la Newsletter
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            label="Objet du mail"
                            variant="outlined"
                            fullWidth
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            onInput={()=>setIsError(false)}
                        />

                        <TextField
                            label="Description du mail"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onInput={()=>setIsError(false)}
                        />

                        {isError &&
                            <Typography
                                variant="body1"
                                color={message.includes("succès") ? "green" : "red"}
                                textAlign="center"
                            >
                                {message}
                            </Typography>
                        }

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