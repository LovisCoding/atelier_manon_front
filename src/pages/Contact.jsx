import { useTheme } from "@emotion/react";
import { Box, Card, Typography, TextField, TextareaAutosize, Button, Snackbar, Alert } from "@mui/material";

import { useState } from "react";

import { addNewsLetter, sendContactMail } from "../services/ContactService";
import { useAuth } from "../utils/AuthContext";

function Contact() {

    const {isLogged} = useAuth();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [subject, setSubject] = useState("");

    const theme = useTheme();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info'); 

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    const handleContact = async () => {
        const response = await sendContactMail(subject, name, email, comment);
        if (!response) {
            setSnackbarMessage("Une erreur est survenue lors de l'envoi, veuillez réessayer");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }   
        else {
            setSnackbarMessage("Nous avons bien reçu votre demande !");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setEmail("");
            setName("");
            setComment("");
            setSubject("");
        }
    }

    const handleNewsletter = async (email) => {
        const response = await addNewsLetter(email);
        if (!response) {
            setSnackbarMessage("Une erreur est survenue lors de l'inscription.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
        else {
            setSnackbarMessage("Merci de vous être inscrit à la newsletter !");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        }
    }

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" mb={5} gap={5} >
                <Box width="30rem" >

                    <Typography
                        fontWeight="bold"
                        variant="h5"
                        color="customYellow"
                        mt={2} mb={2} ml={3}
                    >Me Contacter</Typography>
                    <Card >
                        <Box padding={3} display="flex" flexDirection="column" gap={1} justifyContent="center" >

                            <Typography
                                variant="h6"
                            >Envoyer une demande</Typography>
                            <Typography>Je suis disponible 7j/7 pour vous conseiller et répondre à toutes vos demandes. Remplissez le formulaire de contact ou envoyez-moi un message sur Instagram (@latelierdemanoncreations). Je reviendrai vers vous rapidement pour vous offrir une expérience personnalisée et authentique !</Typography>

                            <Box>
                                <ContactLabel textContent="Votre adresse email" required />
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    color="customYellow"
                                    id="email"
                                    autoFocus
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <ContactLabel textContent="Votre nom" required />
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    color="customYellow"
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <ContactLabel textContent="Objet" required />
                                <TextField
                                    margin="dense"
                                    required
                                    fullWidth
                                    color="customYellow"
                                    id="subject"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <ContactLabel textContent="Description" required />
                                <TextareaAutosize
                                    multiline
                                    required
                                    minRows={4}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        fontSize: "16px",
                                        borderRadius: "6px",
                                        border: "1px solid #ccc",
                                        resize: " none",
                                        outlineColor: theme.palette.customYellow.main,
                                        fontWeight: 'normal',
                                        margin: '8px 0 4px 0'
                                    }}
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                            </Box>

                            <Button
                                variant="yellowButton"
                                onClick={e => handleContact()}
                                sx={{ width: 'fit-content', alignSelf: 'end' }}
                            >Envoyer</Button>

                        </Box>
                    </Card>
                </Box>
                {isLogged &&
                    <Box maxWidth="60rem" >
                        <Card sx={{ padding: '1rem 2rem' }} >
                            <Box display="flex" flexDirection="column" gap={2} >
                                <Typography
                                    variant="h4"
                                    color={theme.palette.text.primary}
                                >Inscris toi à la newsletter !</Typography>
                                <Typography
                                    variant="h6"
                                    color={theme.palette.text.primary}
                                >Abonne-toi pour recevoir en avant-première les nouveautés, des offres exclusives et des conseils pour sublimer vos bijoux personnalisés. Merci de faire partie de l'aventure artisanale !</Typography>
                                <NewsletterInput newsletterHandler={handleNewsletter} />
                            </Box>
                        </Card>
                    </Box>}
            </Box>

            {/* Snackbar pour afficher les messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}


const ContactLabel = ({ textContent, required }) => {
    return (
        <Typography fontWeight="bold" >
            {textContent} {required && <span style={{ color: 'red' }}>*</span>}
        </Typography>
    )
}

const NewsletterInput = ({ newsletterHandler }) => {

    const theme = useTheme();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [email, setEmail] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handler = () => {
        if (!emailRegex.test(email)) {
            setSnackbarMessage("L'adresse e-mail n'est pas valide");
            setSnackbarOpen(true);
            return;
        }
        newsletterHandler(email);
        setEmail('');
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };


    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                border="1px solid"
                borderColor={theme.palette.customYellow.main}
                borderRadius="4px"
                overflow="hidden"
                padding="0"
                height="3rem"
                mb={3}
            >
                <TextField
                    placeholder="Votre adresse mail"
                    variant="outlined"
                    fullWidth
                    sx={{
                        border: 'none',
                        fontWeight: 'bold',
                        color: 'customYellow',
                        padding: 0,
                        margin: '0 .5rem',
                        "& fieldset": { border: "none" },
                        "& input": { padding: 0 }
                    }}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.customYellow.main,
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: 0,
                        height: '100%',
                        textTransform: "none",
                        "&:hover": { bgcolor: theme.palette.customYellow.main }
                    }}
                    onClick={handler}
                >
                    Envoyer
                </Button>
            </Box>

            {/* Snackbar pour afficher les messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>


    );

}


export default Contact;
